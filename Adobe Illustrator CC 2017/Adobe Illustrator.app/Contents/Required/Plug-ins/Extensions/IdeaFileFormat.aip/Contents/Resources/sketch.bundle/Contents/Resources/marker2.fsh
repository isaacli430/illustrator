#ifdef GL_ES
#extension GL_EXT_shader_framebuffer_fetch : require

// define default precision for float, vec, mat.
precision highp float;
#endif

// texture coordinates
varying vec2 v_texturePos;
varying vec2 v_paperPos;

// parameters for source ink: form its given in, scale factor, and e^-(max value)
uniform int inkForm;
uniform float inkScale;
uniform float inkMinT;
// how to apply color
uniform int method;
// ink texture
uniform sampler2D texture;

// paper texture
uniform sampler2D paper;
// km lut
uniform sampler2D kmlut;
// source color
uniform vec4 color;
uniform vec4 colorK;
uniform vec4 colorS;
// kappa, Sb
uniform vec4 kappa;
uniform vec4 Sb;

#ifdef GL_ES
highp vec4 gl_LastFragData[gl_MaxDrawBuffers];
#else
// read back from texture since gl_LastFragData not supported on Mac
uniform sampler2D lastFragTexture;
#endif

// map rgb to vab. v in [0,1], a,b in [-0.5,0.5]. the a,b components are
// red-cyan and green-blue. v is value.
vec3 rgb_to_vab(vec3 rgb)
{
    float v = max(rgb.r, max(rgb.g, rgb.b));
    rgb = rgb/(v + 1.0e-8);
    float a = dot(vec3(1.0/2.0, -1.0/4.0, -1.0/4.0), rgb);
    float b = 0.5 * (rgb.g - rgb.b);
    return vec3(v, a, b);
}

// map rgb color to reflectivity
vec3 rgb_to_R(vec3 c)
{
    // map for black and white pts
    float Cb = kappa.y;
    float Cw = kappa.z;
    return c * c * (Cw - Cb) + Cb;
}

// map reflectivity to rgb color
vec3 R_to_rgb(vec3 R)
{
    // undo mapping
    float Cb = kappa.y;
    float Cw = kappa.z;
    R = (R - Cb) / (Cw - Cb);
    return sqrt(clamp(R, 0.0, 1.0));
}

// map K/S to hiding reflectivity
vec3 KS_to_Rinf(vec3 KS)
{
    return vec3(1.0) + KS - sqrt(KS * (KS + 2.0));
}

// map hiding reflectivity to K/S
vec3 Rinf_to_KS(vec3 R)
{
    return (vec3(1.0) - R) * (vec3(1.0) - R) / (R * 2.0);
}

void rgb_to_K_S(vec3 c, out vec4 K, out vec4 S)
{
    // color components are expected to be in [0,1]. in particular the calculation of S
    // needs this to be true.
    c = clamp(c, 0.0, 1.0);
    
    vec3 vab = rgb_to_vab(c);
    
    // lookup S for ab
    vec2 uv = vec2(vab.y*16.0/17.0 + 17.0/34.0, vab.z*16.0/17.0 + 17.0/34.0);
    vec4 Shs = texture2D(kmlut, uv);
    
    // combine with black
    S = mix(Shs, Sb, pow((1.0 - vab.x), kappa.w));
    
    // get K/S
    vec3 Rinf = rgb_to_R(c);
    vec4 KS = vec4(Rinf_to_KS(Rinf), 0.0);
    
    // and return K
    K = KS * S;
}

// mix colors assuming hiding thickness and determined scattering
vec3 km_mix(vec4 K1, vec4 S1, vec4 K2, vec4 S2, float t)
{
    const float eps = 1.0e-8;
    
    // blend Kp,Sp
    vec4 Kr = mix(K1, K2, t);
    vec4 Sr = mix(S1, S2, t);
    
    // recover color
    vec3 KSr = Kr.rgb/(Sr.rgb + eps);
    return R_to_rgb(KS_to_Rinf(KSr));
}

vec4 avg_mix(vec4 cd, vec4 KD, vec4 SD, vec4 cs, vec4 KS, vec4 SS, int method)
{
    const float eps = 1.0e-8;

    // convert opacity to transparency
    float ts = 1.0 - cs.a;
    float td = 1.0 - cd.a;
    
    // map opacity to ink kd is in [0,1] and ks in [0,16]
    float ks = inkScale * log(max(ts, inkMinT));
    float kd = log(max(td, 0.10)) / log(0.10);
    
    // attenuate deposited (source) ink according to amount present
    //float f = 1.0 - kappa.x * kd;
    float f = exp(-kappa.x * kd);
    ks = ks * f;
    
    // determine result opacity
    ts = pow(ts, f);
    float ar = 1.0 - td * ts;

    // mix colors
    if (method == 0)
    {
        float t = kd / (ks + kd + eps);
        vec3 cr = km_mix(KS, SS, KD, SD, t);
        return vec4(cr * ar, ar);
    }
    else if (method == 1)
    {
        float t = 1.0 / (ks + 1.0);
        vec3 cm = km_mix(KS, SS, KD, SD, t);
        vec3 cr = cm*(1.0-td) + cs.rgb*((1.0-ts)*td/(cs.a+eps));
        return vec4(cr, ar);
    }
    else if (method == 2)
    {
        vec3 cm = km_mix(KS, SS, KD, SD, 0.5);
        vec3 cr = cm*(1.0-ts)*(1.0-td) + cs.rgb*((1.0-ts)*td/(cs.a+eps)) + cd.rgb*ts;
        return vec4(cr, ar);
    }
    else
    {
        float K = ks + kd;
        cs = cs * (ks/(cs.a*K + eps));
        cd = cd * (kd/(cd.a*K + eps));
        vec3 cr = cs.rgb + cd.rgb;
        return vec4(cr * ar, ar);
    }
}

// color update -- source is one of
// inkForm=0: rgba
// inkForm=1: a = 1 - e^-ink
// inkForm=2: r = 1 - e^-ink, g = 1 - e^-ink/16
void main()
{
    const float eps = 1.0e-8;
    
    // determine dest color
#ifdef GL_ES
    vec4 cd = gl_LastFragData[0];
#else
    vec4 cd = texture2D(lastFragTexture, v_texturePos);
#endif
    
    // determine source color
    vec4 cs = texture2D(texture, v_texturePos);
    if (inkForm == 1)
    {
        cs = color * cs.a;
    }
    else if (inkForm == 2)
    {
        // when tx is small ty is a better estimate when available
        float tx = 1.0 - cs.x;
        float ty = pow(1.0 - cs.y, 8.0);
        float ts = mix(ty, tx, tx);
        cs = color * (1.0 - ts);
    }

    if (cs.a == 0.0)
    {
        gl_FragColor = cd;
    }
    else
    {
        // adjust source alpha for paper
        vec4 p = texture2D(paper, v_paperPos);
        cs = cs * (1.0 + p.r*(1.0-cs.a));
        
        // get dest KM coefficients
        vec4 KD, SD;
        rgb_to_K_S(cd.rgb / (cd.a + eps), KD, SD);

        // determine results
        if (inkForm == 0)
        {
            vec4 KS, SS;
            rgb_to_K_S(cs.rgb / (cs.a + eps), KS, SS);
            gl_FragColor = avg_mix(cd, KD, SD, cs, KS, SS, method);
        }
        else
        {
            gl_FragColor = avg_mix(cd, KD, SD, cs, colorK, colorS, method);
        }
    }
}

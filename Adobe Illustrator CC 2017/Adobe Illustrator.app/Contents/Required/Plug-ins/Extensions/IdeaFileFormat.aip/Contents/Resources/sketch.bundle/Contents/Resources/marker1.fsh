
#ifdef GL_ES
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
// define default precision for float, vec, mat.
precision highp float;
#else
#extension GL_ARB_shader_texture_lod : enable
#endif

// u,v,r,s relative to centerline
varying vec4 v_uvrs;

// longitudinal attributes. a = width, b = pressure, c = length, d = unused.
varying vec4 v_abcd;

// coverage scale factor
uniform float coverscale;
// flow rate
uniform float flowrate;
// pressure gamma
uniform float gamma;
// diameter in user space for texture level 0
uniform float diameter0;

// summed area table
uniform sampler2D texture;

// color to use
uniform vec4 color;


// map width to mip map level
float level(float w)
{
    // 64 -> 0, 32 -> 1 etc
    return max(log2(diameter0/w), 0.0);
}

// the integral between a and b
vec4 sigma(float a, float b, float t)
{
    // the simulator sometimes gives incorrect results if we let a be -ve.
    a = clamp(a, 0.0, 1.0);
    b = clamp(b, 0.0, 1.0);
    
    vec4 sa = texture2D(texture, vec2(a, t));
    vec4 sb = texture2D(texture, vec2(b, t));
    return sb - sa;
}

// the integral between a and b from level l
vec4 sigma(float a, float b, float t, float l)
{
    // the simulator sometimes gives incorrect results if we let a be -ve.
    a = clamp(a, 0.0, 1.0);
    b = clamp(b, 0.0, 1.0);
    
    vec4 sa = texture2DLod(texture, vec2(a, t), l);
    vec4 sb = texture2DLod(texture, vec2(b, t), l);
    return sb - sa;
}

// coverage
// sl, sr are arc length from left and right
// v is signed distance from center
// w is width
// q is flow rate
float coverage(float sl, float sr, float v, float w, float q)
{
    const vec4 f = vec4(1.0, 1.0/2.0, 1.0/3.0, 1.0/4.0);

    // evaluate stamp integral
    // [0,1] the vertical position in the stamp and horizontal
    float t = v/w + 0.5;
    float ul = sl/w;
    float ur = 1.0-sr/w;

    vec4 si = (diameter0 == 0.0) ? sigma(ur, ul, t) : sigma(ur, ul, t, level(w));
    
    // flow rate
    float q2 = q*q;
    vec4 qv = vec4(q, q2, q*q2, q2*q2);
    float k = dot(f, qv*si) * coverscale;
    return k;
}

vec4 coverage_to_aa(float k)
{
    vec2 xy = 1.0 - exp(-vec2(k, k/8.0));
    return vec4(xy, 0.0, 0.0);
}

vec4 coverage_to_rgba(float k)
{
    // the pigment compositor applies a paper texture before compositing via mix(a*p, 1, a) which
    // darkens the output. this does the same with p=1 so that the stroke appears the same.
    float a = 1.0 - exp(-k);
    a = mix(a, 1.0, a);
    return color * a;
}

// if color undefined blend mode must be cr = cs + (1-cs) cd
// returns ink amounts in r = 1 - e^-ink, g = 1 - e^-ink/16
// if color defined blend mode must be cr = cs + (1-ca) cd
// returns rgba
void main()
{
    float sl = v_uvrs.x;
    float sr = v_uvrs.z;
    float d = v_uvrs.y;
    float w = v_abcd.x;
    float q = v_abcd.y;

    // determine local flow rate
    q = flowrate * pow(q, gamma);

    // calculate the result
    if (color.a == 0.0)
        gl_FragColor = coverage_to_aa(coverage(sl, sr, d, w, q));
    else
        gl_FragColor = coverage_to_rgba(coverage(sl, sr, d, w, q));
}

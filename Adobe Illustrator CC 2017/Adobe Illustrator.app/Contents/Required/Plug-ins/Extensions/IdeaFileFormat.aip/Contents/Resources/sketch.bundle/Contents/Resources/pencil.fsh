
#ifdef GL_ES
#extension GL_EXT_shader_texture_lod : enable
#define texture2DLod texture2DLodEXT
// define default precision for float, vec, mat.
precision highp float;
#else
#extension GL_ARB_shader_texture_lod : enable
#endif

// sampling position for texture 1 (the BTF)
varying vec2 v_texture1Pos;

// u,v relative to centerline [-w/2, w/2]
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

// the BTF, maps position + local pressure to deposition
uniform sampler2D texture1;
// maps (u,v) to pressure integral
uniform sampler2D texture2;

// colors to use at the center line and at the edge
uniform vec4 color0;
uniform vec4 color1;


// map width to mip map level
float level(float w)
{
    // 64 -> 0, 32 -> 1 etc
    return max(log2(diameter0/w), 0.0);
}

// brush integral between a and b
vec4 sigma(float a, float b, float t)
{
    // the simulator sometimes gives incorrect results if we let a be -ve.
    a = clamp(a, 0.0, 1.0);
    b = clamp(b, 0.0, 1.0);

    vec4 sa = texture2D(texture2, vec2(a, t));
    vec4 sb = texture2D(texture2, vec2(b, t));
    return sb - sa;
}

// the integral between a and b from level l
vec4 sigma(float a, float b, float t, float l)
{
    // the simulator sometimes gives incorrect results if we let a be -ve.
    a = clamp(a, 0.0, 1.0);
    b = clamp(b, 0.0, 1.0);
    
    vec4 sa = texture2DLod(texture2, vec2(a, t), l);
    vec4 sb = texture2DLod(texture2, vec2(b, t), l);
    return sb - sa;
}

// transfer function
vec4 eff(vec2 xy)
{
    // converts bernstein to polynomial basis. note column major.
    const mat4 MB2P = mat4(4.0, -12.0, 12.0, -4.0,
                           0.0, 6.0, -12.0, 6.0,
                           0.0, 0.0, 4.0, -4.0,
                           0.0, 0.0, 0.0, 1.0);

    vec4 p = texture2D(texture1, xy);
    p = exp(p * log(3.0)) - 1.0;
    p = MB2P * p;
    return p;
}

// coverage
// xy are the canvas coordinates
// sl, sr are arc length from left and right
// v is signed distance from center
// w is width
// q is pressure
float coverage(vec2 xy, float sl, float sr, float v, float w, float q)
{
    // apply flow and gamma to pressure
    q = flowrate * pow(q, gamma);
    float q2 = q*q;
    
    // [0,1] the vertical position in the stamp and horizontal
    float t = v/w + 0.5;
    float ul = sl/w;
    float ur = 1.0-sr/w;
    
    vec4 s = (diameter0 == 0.0) ? 0.5*sigma(ur, ul, t) : 0.5*sigma(ur, ul, t, level(w));
    vec4 f = eff(xy);
    vec4 p = vec4(q, q2, q*q2, q2*q2);
    
    float r = dot(f, min(p*s*coverscale, vec4(1.0)));
    
    float a = 1.0 - exp(-r);

    return clamp(a, 0.0, 1.0);
}

void main()
{
    float sl = v_uvrs.x;
    float sr = v_uvrs.z;
    float d = v_uvrs.y;
    float w = v_abcd.x;
    float q = v_abcd.y;
    
    float a = coverage(v_texture1Pos, sl, sr, d, w, q);
    
    vec4 color = mix(color1, color0, a);
    gl_FragColor = color;
}

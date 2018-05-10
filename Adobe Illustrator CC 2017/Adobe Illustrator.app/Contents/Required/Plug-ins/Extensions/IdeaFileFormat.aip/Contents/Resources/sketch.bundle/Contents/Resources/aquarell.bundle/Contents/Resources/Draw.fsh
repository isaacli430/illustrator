//
//  Draw.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
#extension GL_EXT_shader_framebuffer_fetch : require

precision highp float;
precision highp int;
precision highp sampler2D;
highp vec4 gl_LastFragData[gl_MaxDrawBuffers];

#define DRAW_CHANEL_R       0
#define DRAW_CHANEL_G       1
#define DRAW_CHANEL_B       2
#define DRAW_CHANEL_A       3
#define DRAW_CHANEL_ALL     4

//varying vec4 v_color;
varying vec2 v_st;
varying vec2 tex_0;

uniform float u_paperWeight;
uniform vec4 u_drawGain;
uniform vec4 u_drawCenter;
uniform vec2 u_texel2FragCoord;
uniform vec2 u_paperTextureSize;

uniform int u_drawWhat;
uniform int u_visualizeWater;

uniform sampler2D s_texture;            // 0
uniform sampler2D s_uvfc;               // 1
uniform sampler2D s_mask;               // 2
//uniform sampler2D s_transmittance;      // 3
uniform sampler2D s_checker;            // 4
uniform sampler2D s_pppp;               // 6
//uniform sampler2D s_qqqq;               // 7
uniform sampler2D s_hxxx;               // 8


const float PI = 3.14159265358979323846264;
const float eps = 1.e-6;
const vec3 ZERO3 = vec3(0,0,0);

#define AQL_DRAW_CANVAS     (0)
#define AQL_DRAW_BLK        (1)
#define AQL_DRAW_UV         (2)
#define AQL_DRAW_WF         (3)
#define AQL_DRAW_PPPP       (4)
#define AQL_DRAW_QQQQ       (5)
#define AQL_DRAW_MASK       (6)
#define AQL_DRAW_H          (7)
#define AQL_DRAW_BRUSH      (8)

#define SOLID_WHITE     (vec4(1.0, 1.0, 1.0, 1.0))

// === Kubelka-Munk model ===

vec3 sinh(vec3 a)
{
    return ( exp(a) - exp(-a) ) * 0.5;
}

vec3 cosh(vec3 a)
{
    return ( exp(a) + exp(-a) ) * 0.5;
}

#if 0

const vec3 K_pigment0 = vec3(0.14, 1.08, 1.68);
const vec3 S_pigment0 = vec3(0.015, 0.018, 0.02);

const vec3 K_pigment1 = vec3(1.08, 0.14, 0.94);
const vec3 S_pigment1 = vec3(0.015, 0.018, 0.02);

const vec3 K_pigment2 = vec3(1.68, 1.08, 0.14);
const vec3 S_pigment2 = vec3(0.015, 0.018, 0.02);
//const vec3 S_pigment2 = vec3(0.15, 1.8, 20);

const vec3 K_pigment3 = vec3(0.1, 0.36, 3.45);
const vec3 S_pigment3 = vec3(0.97, 0.65, 0.007);

#else

uniform vec3 K_pigment0;
uniform vec3 S_pigment0;

uniform vec3 K_pigment1;
uniform vec3 S_pigment1;

uniform vec3 K_pigment2;
uniform vec3 S_pigment2;

uniform vec3 K_pigment3;
uniform vec3 S_pigment3;

#endif

/*
 * GLSL HSV to RGB+A conversion. Useful for many effects and shader debugging.
 *
 * Copyright (c) 2012 Corey Tabaka
 *
 * Hue is in the range [0.0, 1.0] instead of degrees or radians.
 * Alpha is simply passed through for convenience.
 */

vec4 hsv_to_rgb(float h, float s, float v, float a)
{
    float c = v * s;
    h = mod((h * 6.0), 6.0);
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    vec4 color;
    
    if (0.0 <= h && h < 1.0) {
        color = vec4(c, x, 0.0, a);
    } else if (1.0 <= h && h < 2.0) {
        color = vec4(x, c, 0.0, a);
    } else if (2.0 <= h && h < 3.0) {
        color = vec4(0.0, c, x, a);
    } else if (3.0 <= h && h < 4.0) {
        color = vec4(0.0, x, c, a);
    } else if (4.0 <= h && h < 5.0) {
        color = vec4(x, 0.0, c, a);
    } else if (5.0 <= h && h < 6.0) {
        color = vec4(c, 0.0, x, a);
    } else {
        color = vec4(0.0, 0.0, 0.0, a);
    }
    
    color.rgb += v - c;
    
    return color;
}

// === end Kubelka-Munk model ===

void main()
{
    vec4 c = texture2D( s_texture, v_st );
    vec4 uvfc = texture2D( s_uvfc, v_st );
//    vec3 R = texture2D( s_reflectance, v_st ).rgb;
//    vec3 T = texture2D( s_transmittance, v_st ).rgb;
    vec3 checker = texture2D( s_checker, v_st * vec2(2048.0, 1536.0) / 32.0 ).rgb;
    
    vec4 pppp = texture2D( s_pppp, v_st );
//    vec4 qqqq = texture2D( s_qqqq, v_st );
    vec4 hxxx = texture2D( s_hxxx, v_st / u_texel2FragCoord / u_paperTextureSize );
    
    if (AQL_DRAW_CANVAS==u_drawWhat) {
        
        //c.rgb = checker;
        //c.a = 1.0;
        c = gl_LastFragData[0];

        if (pppp.a > 1.0)
            pppp /= pppp.a;
        
        pppp = pppp * (1.0 - u_paperWeight) + vec4(hxxx.xxx, 1.0) * u_paperWeight * pppp.a;

        c = pppp + c * (1.0-pppp.a);

        if (u_visualizeWater!=0) {
            
            float m  = smoothstep(0.0, 4.0, -texture2D(s_mask, tex_0).r);
            
            c.rgb = mix(c.rgb, ZERO3, clamp(uvfc.b, 0.0, 0.1) * m);
            c.a = 1.0 - (1.0-c.a) * (1.0-clamp(uvfc.b, 0.0, 0.1) * m);
        }
    }
    else if (AQL_DRAW_BLK==u_drawWhat) {
        
#if 0
        if (c.x > 1024.0) // block
            c.rgb = vec3(0.6, 0.1, 0.1);
        else
            c.rgb = c.xxx;
#else
        if (uvfc.b == 0.0) // wf
            c.rgb = vec3(0.6, 0.1, 0.1);
        else
            c.rgb = c.zzz;
#endif
        c.a = 1.0;
    }
    else if (AQL_DRAW_UV==u_drawWhat) {
        
        c = vec4(uvfc.rg, 0.0, 1.0);
        
        float t = atan(c.r, c.g);
        float l = length(c.rg);
        c = hsv_to_rgb((t+PI)/2.0/PI, 1.0, 1.0, 1.0);
        c.rgb *= l;
    }
    else if (AQL_DRAW_WF==u_drawWhat) {
        
        if (uvfc.b < 0.0)
            c = vec4(0.1, 0.25, 0.1, 1.0);
        else if (uvfc.b < eps)
            c = vec4(0.25, 0.1, 0.1, 1.0);
        else
            c = vec4(uvfc.bbb, 1.0);
    }
    else if (AQL_DRAW_PPPP==u_drawWhat || AQL_DRAW_QQQQ==u_drawWhat) {
            
        c.rgb /= (c.a+eps);
        c.a = clamp(c.a, 0.0, 1.0);
        c.rgb = mix(checker, c.rgb, c.a);
       
        c.a = 1.0;
    }
    else if (AQL_DRAW_MASK==u_drawWhat) {
        
        if (c.r < 0.0)
            c.rgb = vec3(smoothstep(0.0, 4.0, -c.r));
        else
            //c.rgb = vec3(0.75, 0.4, 0.84);
            c.rgb = vec3(0.0);
    }
    else if (AQL_DRAW_H==u_drawWhat) {
        
        c.rgb = c.rrr;
        c.a = 1.0;
    }
    else if (AQL_DRAW_BRUSH==u_drawWhat) {
        
    }
    
    c.rgb = c.rgb * u_drawGain.rgb + u_drawCenter.rgb;
    //c = mix(vec4(1,1,1,1), c, c.a);

    c = clamp(c, 0.0, 1.0);
    gl_FragColor = c;
}

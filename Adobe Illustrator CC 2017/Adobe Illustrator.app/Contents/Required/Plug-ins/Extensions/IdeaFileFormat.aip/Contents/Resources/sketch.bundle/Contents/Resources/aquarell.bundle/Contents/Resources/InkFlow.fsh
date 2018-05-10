//
//  InkFlow.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
#extension GL_EXT_shader_framebuffer_fetch : require

precision highp float;
precision highp int;
precision highp sampler2D;
highp vec4 gl_LastFragData[gl_MaxDrawBuffers];

// samplers

uniform sampler2D s_uvfc;
uniform sampler2D s_pppp;
//uniform sampler2D s_qqqq;
uniform sampler2D s_mask;

// uniforms and constants

uniform vec2 u_texel2FragCoord;

uniform float u_dt;
uniform float u_length_scale;
uniform float u_rewetting;

const float Eps = 1.e-4;
const float Threshold = 0.1;
const float Diffusion = 0.0;
const float Barrier = 0.0;
const float Advection = 1.0;
const float AdvectionThreshold = (1.0/1024.0);
const float Mixing = 0.2;
const float CFL = 0.5;
const float AQL_PIGMENT_MAX_LEVEL = 1024.0;

// varying inputs

varying vec2 tex_0;

varying vec2 tex_N;
varying vec2 tex_E;
varying vec2 tex_W;
varying vec2 tex_S;

varying vec2 tex_NE;
varying vec2 tex_SE;
varying vec2 tex_NW;
varying vec2 tex_SW;

void main()
{
    vec4 pppp   =  texture2D( s_pppp, tex_0 );

    vec4 uvfc   =  texture2D( s_uvfc, tex_0 );
    
    float  wf = uvfc.b;
    float lwf = uvfc.a;
    
    if (lwf > 0.0)
    {
        
#if 0 // Ink Drying and Remixing
        {
            //vec4 qqqq   =  texture2D( s_qqqq, tex_0 );
            //pppp = mix(pppp, qqqq, u_rewetting * lwf * m);
            
            float dwf = lwf-wf;           // typically positive, mainly due to evaporation, but also because of numerical issues
            
            if (lwf > Threshold) {
                
                pppp -= pppp * (dwf / lwf);
            }
            else {
                
                pppp -= pppp;
            }

        }
#endif

#if 1 // Upwind Advection
        if (lwf > Threshold)  // Simulate only in the wet areas, taken out larger Threshold as simulation seems to be running ok even at small water levels
        {
            vec4 pppp_l =  texture2D( s_pppp, tex_W );
            vec4 pppp_r =  texture2D( s_pppp, tex_E );
            vec4 pppp_b =  texture2D( s_pppp, tex_S );
            vec4 pppp_t =  texture2D( s_pppp, tex_N );

            float dx = 1.0 * u_length_scale;
            float m  = smoothstep(0.0, 4.0, -texture2D(s_mask, tex_0).r);
            
            vec4 dpppp = vec4(0.0);

            float u   =   uvfc.r * Advection * m * dx;
            float v   =   uvfc.g * Advection * m * dx;
            
            if (u > 0.0)
                dpppp += min(u, CFL) * (pppp_l-pppp);
            else if (u < 0.0)
                dpppp += max(u,-CFL) * (pppp-pppp_r);
            
            if (v > 0.0)
                dpppp += min(v, CFL) * (pppp_t-pppp);
            else if (v < 0.0)
                dpppp += max(v,-CFL) * (pppp-pppp_b);

            if (abs(dpppp.a) > AdvectionThreshold) { // Half-float precision problem workaround, this was one of the source of color shift artifacts during simulation
                
                //pppp = mix(pppp+dpppp, pppp, Mixing);
                pppp = pppp + dpppp;
                pppp *= 1.0002; // Biggest hack ever, pigments disappearing under advection
            }
        }
#endif

    }
    
    gl_FragColor = pppp;
}

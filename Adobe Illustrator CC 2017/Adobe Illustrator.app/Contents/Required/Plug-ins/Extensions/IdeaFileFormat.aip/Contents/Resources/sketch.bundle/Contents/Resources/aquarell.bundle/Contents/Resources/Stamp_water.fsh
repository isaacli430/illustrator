//
//  Stamp_water.fsh
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

uniform sampler2D s_brush;

// uniforms
uniform vec2 u_texel2FragCoord;
uniform vec2 u_stampPos;
uniform float u_stampSize;

uniform float u_dw;
uniform float u_receptivity;                // lambda = [0.3 to 1.0], see section 5.2,
uniform float u_baseMaskValue;              // base mask value, see section 5.2

uniform float AQL_FLOW_WATER_MAX_LEVEL;

// constants

// varying inputs

varying vec2 tex_0;

void main()
{
    vec2 r = (tex_0 / u_texel2FragCoord - u_stampPos) / u_stampSize * 2.0;
    r = r * 0.5 + vec2(0.5, 0.5);
    
    float mask;
    if (r.x < 0.0 || r.x > 1.0 || r.y < 0.0 || r.y > 1.0) {
        
        mask = 0.0;
    }
    else {
        
        mask = texture2D( s_brush, r ).r;
        
        if (u_stampSize < 8.0) {
            
            r = r * 2.0 - vec2(1.0, 1.0);
            float nmask = max(0.0, 1.0 - sqrt(r.x * r.x + r.y * r.y));
            mask = mix(nmask, mask, clamp((u_stampSize-4.0)/4.0, 0.0, 1.0));
        }
        if (u_stampSize < 4.0)
            mask *= (max((u_stampSize-2.0), 0.0)/2.0);
    }
    
    vec4  uvfc = gl_LastFragData[0];
    
    float w   = uvfc.z;
    float dw  = u_dw * mask;
    
    dw *= max(1.0 - w/u_receptivity, u_baseMaskValue); // Somehow, this effect gives rise to stamping artifacts
    
    w = clamp(w+dw, 0.0, AQL_FLOW_WATER_MAX_LEVEL);
    
    uvfc.z = w;
    gl_FragColor = uvfc;
}

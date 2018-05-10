//
//  LBM1-collide2.fsh
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

uniform sampler2D s_uvfc;                               // wf is read, for the site and 9 neighbours, to compute pinning. Also, f_eq is based on uv.

// constants

const float  u_Advect_p = 0.35;                       // 0.2 to 0.5 would work, alpha in eq. 8
const float  u_Omega    = 0.6;

// varying inputs

varying vec2 tex_0;

// D2Q9i: fi_eq  = 1/36 * p + p0 * (1/12 dot(ei,v) + 1/8 * dot(ei,v)^2 - 1/24 * dot(v, v))
//        fi_new = lerp(fi, fi_eq, Omega)
void main()
{
    const float A = 1.0/36.0;
    const float B = 1.0/12.0;
    const float C = 1.0/8.0;
    const float D = 1.0/24.0;

    vec4 f = gl_LastFragData[0];
    vec4 uvfc  = texture2D(s_uvfc,  tex_0);

    // Derive ad
    float  p = uvfc.z; // wf
    float ad = smoothstep(0.0, u_Advect_p, p);

    // Derive f_eq
    vec2 uv     = uvfc.xy;
    vec4 eiDotv = vec4(-uv.y + uv.x, uv.y + uv.x, -uv.y - uv.x, uv.y - uv.x); // NE, SE, NW, SW
    vec4 f_eq = A * p + ad * (B * eiDotv + C * eiDotv * eiDotv - D * dot(uv, uv)); // p == wf, the distributions are synced here wrt wf, that has new water added from surface layer
    
    f = mix(f, f_eq, u_Omega);
    gl_FragColor = f;
}

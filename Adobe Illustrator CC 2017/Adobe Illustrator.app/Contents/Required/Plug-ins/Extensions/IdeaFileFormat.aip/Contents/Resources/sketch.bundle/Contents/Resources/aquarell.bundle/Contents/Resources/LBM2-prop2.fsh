//
//  LBM2-prop2.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
precision highp float;
precision highp int;
precision highp sampler2D;

// samplers

uniform sampler2D s_block;                              // blkx9 is used by prop()
uniform sampler2D s_dist2;

// uniforms

uniform float u_Evap_b;

// constants

const float Eps = 1.e-6;

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
    float b0  = texture2D(s_block, tex_0 ).x;
    float bNE = texture2D(s_block, tex_NE).x;
    float bSE = texture2D(s_block, tex_SE).x;
    float bNW = texture2D(s_block, tex_NW).x;
    float bSW = texture2D(s_block, tex_SW).x;

    vec4  f   = texture2D(s_dist2, tex_0);

    vec4 f_in;
    
    f_in.x = texture2D(s_dist2, tex_SW).x;
    f_in.y = texture2D(s_dist2, tex_NW).y;
    f_in.z = texture2D(s_dist2, tex_SE).z;
    f_in.w = texture2D(s_dist2, tex_NE).w;
    
    vec4 b = vec4(bSW, bNW, bSE, bNE); // b[SW, NW, SE, NE]
    
    b = (b + vec4(b0)) / 2.0;
    
    vec4 pinned = step(1.0, b);
    b = min(b, vec4(1.0));
    
    // Stream with partial bounce-back
    f = mix(f_in, f.wzyx, b);
    
    // Lower wf at pinned edge
    //f = max(f - pinned * u_Evap_b, Eps);
    
    gl_FragColor = f;
}

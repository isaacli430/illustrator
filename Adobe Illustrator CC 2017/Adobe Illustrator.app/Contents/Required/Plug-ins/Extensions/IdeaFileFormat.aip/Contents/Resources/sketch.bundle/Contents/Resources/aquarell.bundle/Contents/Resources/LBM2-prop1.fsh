//
//  LBM2-prop1.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
precision highp float;
precision highp int;
precision highp sampler2D;

// samplers

uniform sampler2D s_block;                              // blkx9 is used by prop()
uniform sampler2D s_dist1;

// uniforms

//uniform float u_Evap_b;

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
    float bN  = texture2D(s_block, tex_N ).x;
    float bE  = texture2D(s_block, tex_E ).x;
    float bW  = texture2D(s_block, tex_W ).x;
    float bS  = texture2D(s_block, tex_S ).x;
    
    vec4  f   = texture2D(s_dist1, tex_0);
    
    vec4 f_in;
    
    f_in.x = texture2D(s_dist1, tex_S ).x;
    f_in.y = texture2D(s_dist1, tex_W ).y;
    f_in.z = texture2D(s_dist1, tex_E ).z;
    f_in.w = texture2D(s_dist1, tex_N ).w;
    
    vec4 b = vec4(bS, bW, bE, bN); // b[S, W, E, N]
    
    b = (b + vec4(b0)) / 2.0;
    
    vec4 pinned = step(1.0, b);
    b = min(b, vec4(1.0));
    
    // Stream with partial bounce-back
    f = mix(f_in, f.wzyx, b);
    
    // Lower wf at pinned edge
    //f = max(f - pinned * u_Evap_b, Eps); // moved to velDen
    
    gl_FragColor = f;
}

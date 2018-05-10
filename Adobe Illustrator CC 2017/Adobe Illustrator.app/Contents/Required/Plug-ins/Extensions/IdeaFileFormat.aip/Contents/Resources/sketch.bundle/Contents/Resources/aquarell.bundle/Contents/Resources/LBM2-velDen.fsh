//
//  LBM2.fsh
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
uniform sampler2D s_dist2;

// uniforms

uniform float u_Evap;
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

float horiz_add(vec4 v)
{
    return v.r + v.g + v.b + v.a;
}

void main()
{
    vec4 block = texture2D(s_block, tex_0);
    vec4 dist1 = texture2D(s_dist1, tex_0);
    vec4 dist2 = texture2D(s_dist2, tex_0);
    
    float f0 = block.y;
    
    // Derive uv
    vec2 uv; // uv.x = (E, NE, SE) - (W, NW, SW); uv.y = (S, SE, SW) - (N, NE, NW)
    uv.x = (dist1.y + dist2.x + dist2.y) - (dist1.z + dist2.z + dist2.w);
    uv.y = (dist1.w + dist2.y + dist2.w) - (dist1.x + dist2.x + dist2.z);

    // Derive wf
    float  wf = f0 + horiz_add(dist1+dist2);
    float lwf = wf;
    
    wf = max(wf - u_Evap, 0.0);
    
#if 0
    float bN  = texture2D(s_block, tex_N ).x;
    float bE  = texture2D(s_block, tex_E ).x;
    float bW  = texture2D(s_block, tex_W ).x;
    float bS  = texture2D(s_block, tex_S ).x;
    float bNE = texture2D(s_block, tex_NE).x;
    float bSE = texture2D(s_block, tex_SE).x;
    float bNW = texture2D(s_block, tex_NW).x;
    float bSW = texture2D(s_block, tex_SW).x;
    
    float pinned = 0.0;
    pinned  = horiz_add( step(1.0, vec4(bS, bW, bE, bN)) );
    pinned += horiz_add( step(1.0, vec4(bSW, bNW, bSE, bNE)) );
    pinned /= 8.0;

    if (wf > 0.0)
        wf = max(wf - pinned * u_Evap_b, 0.1);
#endif
    
    gl_FragColor = vec4(uv, wf, lwf); // uvfc = [uv, wf, lwf]
}

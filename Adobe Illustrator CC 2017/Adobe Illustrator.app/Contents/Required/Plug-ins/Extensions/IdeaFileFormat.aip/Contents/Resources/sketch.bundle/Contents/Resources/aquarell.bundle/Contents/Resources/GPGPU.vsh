//
//  Render.vsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
precision highp float;
precision highp int;
precision highp sampler2D;

// uniforms

uniform vec2 u_texel2FragCoord;
uniform mat4 u_mvp;

// varying inputs

attribute vec4 a_position;

// varying outputs

varying vec2 v_st;

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
    v_st = a_position.xy * 0.5 + vec2(0.5, 0.5);    // v_st is [0,1] for the unit quad being drawn

    gl_Position = u_mvp * a_position;
    
    tex_0 = gl_Position.xy * 0.5 + vec2(0.5, 0.5) + vec2(0.0005,0.0005) * u_texel2FragCoord;
    
    tex_N = tex_0 + vec2( 0.0,  1.0) * u_texel2FragCoord;
    tex_E = tex_0 + vec2( 1.0,  0.0) * u_texel2FragCoord;
    tex_W = tex_0 + vec2(-1.0,  0.0) * u_texel2FragCoord;
    tex_S = tex_0 + vec2( 0.0, -1.0) * u_texel2FragCoord;

    tex_NE = tex_0 + vec2( 1.0,  1.0) * u_texel2FragCoord;
    tex_SE = tex_0 + vec2( 1.0, -1.0) * u_texel2FragCoord;
    tex_NW = tex_0 + vec2(-1.0,  1.0) * u_texel2FragCoord;
    tex_SW = tex_0 + vec2(-1.0, -1.0) * u_texel2FragCoord;
}

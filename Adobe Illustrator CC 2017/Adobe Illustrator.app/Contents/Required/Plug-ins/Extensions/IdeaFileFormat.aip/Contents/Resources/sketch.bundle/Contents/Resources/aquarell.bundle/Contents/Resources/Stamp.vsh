//
//  Stamp.vsh
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
uniform vec2 u_stampPos;
uniform float u_stampSize;

// varying inputs

attribute vec4 a_position;

// varying outputs

varying vec2 tex_0;

void main()
{
    gl_Position = u_mvp * a_position;
    
    tex_0 = gl_Position.xy * 0.5 + vec2(0.5, 0.5) + vec2(0.0005,0.0005) * u_texel2FragCoord;
}

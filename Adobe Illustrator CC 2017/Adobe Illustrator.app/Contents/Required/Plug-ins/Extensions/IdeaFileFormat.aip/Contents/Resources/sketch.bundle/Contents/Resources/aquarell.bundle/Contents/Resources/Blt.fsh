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

// uniforms

uniform sampler2D s_texture;
uniform sampler2D s_checker;

// varying inputs

varying vec2 v_st;
varying vec2 tex_0;

void main()
{
    vec4 c = gl_LastFragData[0];
    //vec4 b = texture2D( s_checker, v_st * vec2(2048.0, 1536.0) / 32.0 );
    vec4 a = texture2D( s_texture, v_st );
    
    c = c * (1.0 - a.a) + a;
    
    gl_FragColor = c;
}

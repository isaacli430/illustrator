//
//  Blt_alpha.fsh
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

uniform sampler2D s_pppp;

uniform float AQL_FLOW_WATER_MAX_LEVEL;

// constants

const float eps = 1.e-6;

// varying inputs

varying vec2 v_st;

void main()
{
    vec4 pppp = texture2D( s_pppp, v_st );

    gl_FragColor = vec4(pppp.a / AQL_FLOW_WATER_MAX_LEVEL, vec3(0.0));
}

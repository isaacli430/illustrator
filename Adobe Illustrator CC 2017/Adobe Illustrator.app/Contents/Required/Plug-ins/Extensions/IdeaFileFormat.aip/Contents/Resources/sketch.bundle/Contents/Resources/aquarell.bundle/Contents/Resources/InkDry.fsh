//
//  InkDry.fsh
//
//  Created by Sunil Hadap on 6/3/2015.
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
uniform sampler2D s_hxxx;
uniform sampler2D s_mask;

// uniforms and constants

uniform float u_paperWeight;
uniform float u_rewetting;

const float Eps = 1.0e-6;
const float Threshold = 0.1;

// varying inputs

varying vec2 tex_0;

void main()
{
    vec4 qqqq = gl_LastFragData[0];

    vec4 uvfc = texture2D( s_uvfc, tex_0 );
    float lwf = uvfc.a;

    if (lwf > 0.0)
    {
#if 1
        vec4 pppp = texture2D( s_pppp, tex_0 );
        vec4 hxxx = texture2D( s_hxxx, tex_0 );
        
        float  wf = uvfc.b;
        
        //qqqq = mix(qqqq, pppp, u_rewetting * lwf * m);

        float dwf = lwf-wf;     // typically positive, mainly due to evaporation, but also because of numerical issues
        
        if (lwf > Threshold) {

            qqqq += pppp * (1.0 - hxxx.x * u_paperWeight) * (dwf / lwf);     // drying
        }
        else {
            
            pppp.a *= (1.0 - hxxx.x * u_paperWeight);
            if (pppp.a > 1.0)
                pppp /= pppp.a;
            
            qqqq = pppp + qqqq * (1.0-pppp.a);
        }
        
        if (qqqq.a > 1.0)
            qqqq /= qqqq.a;         // unlike pppp.a, qqqq.a is [0,1]
#endif
    }

    gl_FragColor = clamp(qqqq, 0.0, 1.0);
}

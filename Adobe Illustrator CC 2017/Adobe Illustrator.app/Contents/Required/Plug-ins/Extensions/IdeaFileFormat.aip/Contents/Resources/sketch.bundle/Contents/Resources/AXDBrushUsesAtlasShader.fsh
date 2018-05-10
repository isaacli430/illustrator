//
//
//  AXDBrushUsesAtlasShader.fsh
//  Adobe Line
//
//  Created by Greg Muscolino on 10/12/13.
//  Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//

#ifdef GL_ES
    #define LOWP lowp
    #define pointCoord gl_PointCoord
#else
    #define LOWP
    varying vec2 pointCoord;
#endif

uniform sampler2D texture;
uniform LOWP float texSegmentSize;

varying LOWP vec4 tintColor;
varying LOWP vec2 texSeg;
varying LOWP float texDV;

void main()
{
    LOWP vec2 uv = vec2(pointCoord.x, (0.5 - pointCoord.y)*texDV + 0.5);
    gl_FragColor = tintColor * texture2D(texture, uv * texSegmentSize + floor(texSeg/texSegmentSize + 0.5) * texSegmentSize);
}

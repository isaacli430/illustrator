//
//  AXDBrushShader.vsh
//  Adobe Line
//
//  Created by Greg Muscolino on 10/12/13.
//  Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//

#ifdef GL_ES
    #define LOWP lowp
#else
    #define LOWP
    #define tintColor tintColorIn
    #define texSeg texSegIn
    #define aa aaIn
#endif

attribute vec4 position;
attribute float lineWidth;
attribute float opacity;
attribute vec2 texSegment;

uniform mat4 MVP;
uniform LOWP vec4 color;
uniform LOWP float scale;
uniform float aaScale;
uniform float aaBaseLineWidth;

varying LOWP vec4 tintColor;
varying LOWP vec2 texSeg;
varying LOWP float aa;
varying LOWP float texDV;

void main()
{
	gl_Position = MVP * position;
    gl_PointSize = lineWidth * scale;
    tintColor = color * opacity;
    texSeg = texSegment;
    aa = max(aaScale * lineWidth/aaBaseLineWidth, 1.0);
    texDV = sign(MVP[1].y);
}

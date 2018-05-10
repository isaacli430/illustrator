#ifdef INCLUDEASSTRING
  R"ENDSHADER(
#else //INCLUDEASSTRING

/************************************************************************* 
 *
 * ADOBE CONFIDENTIAL
 * ___________________
 * 
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 **************************************************************************/  

#ifndef GL_ES
	#define highp
#else
	precision mediump float;
#endif

uniform sampler2D t_tex;			
uniform sampler2D t_noisetex;	

varying highp vec4 v_uv;						
varying highp vec2 v_screenuv;												
varying vec4 v_mul;								
varying vec2 v_dw;											// distance, width

uniform float mono;														
uniform float aascale;					
uniform float noiseamount;									// 0 = max noise, 1 = no noise
uniform vec3 rgb2luma; 

vec3 overlay(vec3 a, vec3 b) {
	vec3 low = a*b;
	vec3 high = a + b - vec3(0.5,0.5,0.5) - low;
	vec3 select = step(0.5,a);
	return mix(low,high,select) * 2.0;
}

void main(void) {									
	vec4 c = texture2D(t_tex, vec2(v_uv.x, v_uv.w));
		
	// mono	and mix
	c.w *= v_mul.w;
	float luma = dot(c.xyz, rgb2luma );
	vec4 cmono = vec4(v_mul.x,v_mul.y,v_mul.z,(1.0 - luma)*c.w);
	c.xyz = overlay(c.xyz, v_mul.xyz);
	c = mix(c,cmono,mono);

	// noise
	float n = texture2D(t_noisetex,v_screenuv).x;
	c.w = c.w*mix(1.0,n,noiseamount);
				
	// aa after noise
	float d = v_dw.y - v_dw.x;								// width - distance
	d = clamp(d*aascale,0.0,1.0);							// aascale is 1/pixelwidthofblend		
	c.w *= d;		
	
	// for erasing, we want to output a constant color
	// c.xyz = mix(c.xyz,constcolor.xyz,constcolor.w);	
	
	c.xyz *= c.w; 
	gl_FragColor = c;								 
}													

// map used for automatically assigning texture indices in gltools	
//					
// texmap: t_tex : 0								
// texmap: t_noisetex : 1		

// name: unweighted

//)ENDSHADER"; 
#endif




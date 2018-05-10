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

varying highp vec4 v_uv;						
varying highp vec4 v_uv2;																
varying vec4 v_mul;					

uniform float binarize;
uniform vec3 rgb2luma;

void main(void) {								
	// stretch
	vec4 c = texture2D(t_tex, vec2(v_uv.x, v_uv.w));								 

	// ended - just mark ends 
	if ( v_uv2.x > 0.0 ) {
		float w = min(v_uv2.x,1.0);		
		w = w*w*(3.0-w-w);				
		vec4 c2 = texture2D(t_tex, v_uv2.zw);		
		c = mix(c,c2,w);		
	} else if ( v_uv2.y > 0.0 ) {				 
		float w = min(v_uv2.y,1.0);		
		w = w*w*(3.0-w-w);				
		vec4 c2 = texture2D(t_tex, vec2(v_uv.y, v_uv.w));				
		c = mix(c,c2,w);		
	}

	float luma = dot(c.xyz, rgb2luma );	
	luma = step(binarize,luma);
		
	// mono	and mix	
	c = vec4(v_mul.x,v_mul.y,v_mul.z,(1.0 - luma)*v_mul.w);
	
	c.xyz *= c.w; 

	gl_FragColor = c;								 
}													

// map used for automatically assigning texture indices in gltools	
//					
// texmap: t_tex : 0								

// name: vectorstretch

//)ENDSHADER"; 
#endif




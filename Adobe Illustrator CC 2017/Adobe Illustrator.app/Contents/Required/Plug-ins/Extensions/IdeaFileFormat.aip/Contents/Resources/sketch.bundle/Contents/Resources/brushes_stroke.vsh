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

#ifndef LARGETRANSFORM
	uniform mat4 modelViewMatrix;
#else
	uniform vec3 os2ws0;				
	uniform vec3 os2ws1;					
	uniform vec3 ws2display0;				
	uniform vec3 ws2display1;				
#endif

#ifndef GL_ES
	#define highp
#endif

uniform vec4 uvscales;						// normal: 1,1,1,1   cheap: 1,1,1,1   weighted: 1/(2-2*weightramp), 1, 1/(2-2*weightramp),1 
uniform vec4 uvoffsets;						//		   0,0,0,0          0,0,.5,0            0,0, (1.0 - weightramp), 0 

uniform vec4 screenscaleoffset; 

attribute vec2 a_pos;				
attribute vec2 a_uv;				
attribute vec4 a_add;				
attribute vec4 a_mul;				
attribute float a_distance;			
attribute float a_width;			

varying highp vec4 v_uv;		
varying highp vec2 v_screenuv;					
varying vec4 v_mul;					
varying vec2 v_dw;				
		
void main(void) {				
	#ifndef LARGETRANSFORM
		vec4 p = modelViewMatrix * vec4(a_pos,0.0,1.0);
		v_screenuv = p.xy * screenscaleoffset.xy + screenscaleoffset.zw; 
		gl_Position = p;
	#else
		vec3 posos = vec3(a_pos, 1.0);		
		vec3 posws;							
		posws.x = dot(os2ws0, posos);		
		posws.y = dot(os2ws1, posos);		
		posws.z = 1.0;						
		vec2 posss;							
		posss.x = dot(ws2display0, posws);	
		posss.y = dot(ws2display1, posws);				
		gl_Position = vec4(posss, 0.0, 1.0);		
		v_screenuv = posss * screenscaleoffset.xy + screenscaleoffset.zw; 
	#endif

	vec4 uv = vec4(a_uv.x, a_uv.x, a_uv.x, a_uv.y);	    // this is u,u,u,v! have to be careful in fragment shader with this! 
	v_uv = (uv+uvoffsets)*uvscales;						// wrong way around for mad... opt: move around				
	v_mul = a_mul;						
	v_dw = vec2 (a_distance, a_width);  	
}				

// map used for automatically assigning attribute indices in gltools	
//					
// attribmap: a_pos : 0			
// attribmap: a_uv  : 1			
// attribmap: a_mul  : 2		
// attribmap: a_add  : 3		
// attribmap: a_distance : 4	
// attribmap: a_width : 5		

// name: base

//)ENDSHADER"; 
#endif



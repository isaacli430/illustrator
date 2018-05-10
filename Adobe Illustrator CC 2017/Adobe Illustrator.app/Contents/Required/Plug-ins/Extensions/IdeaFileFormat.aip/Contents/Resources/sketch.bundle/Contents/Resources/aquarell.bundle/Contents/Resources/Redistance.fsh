//
//  Redistance.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
precision highp float;
precision highp int;
precision highp sampler2D;

// samplers

uniform vec2 u_texel2FragCoord;

uniform sampler2D s_block;
uniform sampler2D s_mask;

// uniforms

// constants

const float Eps = 1.e-4;
const float CFL = 0.5;

// varying inputs

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
    float boundary = texture2D(s_block, tex_0).w;
    
    vec4 mask = texture2D(s_mask, tex_0);
    
    float phi = mask.x;
    float phi_W = texture2D(s_mask, tex_W).x;
    float phi_E = texture2D(s_mask, tex_E).x;
    float phi_S = texture2D(s_mask, tex_S).x;
    float phi_N = texture2D(s_mask, tex_N).x;

    float dt = CFL;
    
    // forward differene a_{x+1} - a_{x}
    // backward difference a_{x} - a_{x-1}
    
    float a = phi - phi_W;
    float b = phi_E - phi;
    float c = phi - phi_S;
    float d = phi_N - phi;
    
    float S = boundary / sqrt(boundary*boundary + Eps);
    
    float G;
    if (S==0.0) {
        
        phi = 0.0;
    }
    else if (S > 0.0 && phi <= 0.0) {
        
        phi = 1.0;
    }
    else if (S < 0.0 && phi >= 0.0) {
        
        phi = -1.0;
    }
    else {
        
        S = phi / sqrt(phi*phi + 1.0);

        if (S > 0.0) {
            G = sqrt( max(max(a,0.0)*max(a,0.0), min(b,0.0)*min(b,0.0)) + max(max(c,0.0)*max(c,0.0), min(d,0.0)*min(d,0.0)) ) - 1.0;
        }
        else if (S < 0.0) {
            G = sqrt( max(min(a,0.0)*min(a,0.0), max(b,0.0)*max(b,0.0)) + max(min(c,0.0)*min(c,0.0), max(d,0.0)*max(d,0.0)) ) - 1.0;
        }
        else {
            G = 0.0;
        }
        
        phi = phi - dt * G * S;
    }

    gl_FragColor = vec4(phi, mask.yzw);
}


/*
void main()
{
    float boundary = texture2D(s_block, tex_0).w;
    
    vec4 mask = texture2D(s_mask, tex_0);
    
    float phi   = mask.x;
    float phi_W = texture2D(s_mask, tex_W).x;
    float phi_E = texture2D(s_mask, tex_E).x;
    float phi_S = texture2D(s_mask, tex_S).x;
    float phi_N = texture2D(s_mask, tex_N).x;
    
    vec2  phixy   = vec2(phi_E-phi_W, phi_N-phi_S) / 2.0;
    float slopeMag= sqrt(phixy.x*phixy.x + phixy.y*phixy.y + Eps);
    
    float sphi    = boundary / sqrt(boundary*boundary + Eps);
    float dt      = min(abs(slopeMag-1.)+0.2, 0.8);
    
    vec2  dsamp   = - phixy / slopeMag * sphi * dt;   // in pixel units
    vec2  uv_back = tex_0 + (dsamp * u_texel2FragCoord);
    
    float newPhi = texture2D(s_mask, uv_back).x;
    newPhi += sphi * dt;
    
    if (boundary==0.0)
        newPhi = 0.0;
    else if (boundary > 0.0 && newPhi == 0.0)
        newPhi = Eps;
    else if (boundary < 0.0 && newPhi == 0.0)
        newPhi = -Eps;
    
    if(phi*newPhi >= 0.) {
        gl_FragColor.x = newPhi;
    } else {
        gl_FragColor.x = phi * 0.9; // mask will be safe
    }
    gl_FragColor.yzw = vec3(0.,0.,0.);
}
*/
 
/*
void main()
{
    float boundary = texture2D(s_block, tex_0).w;
    
    vec4 mask = texture2D(s_mask, tex_0);
    
    float phi   = mask.x;
    float phi_W = texture2D(s_mask, tex_W).x;
    float phi_E = texture2D(s_mask, tex_E).x;
    float phi_S = texture2D(s_mask, tex_S).x;
    float phi_N = texture2D(s_mask, tex_N).x;
    
    vec2  phixy   = vec2(phi_E-phi_W, phi_N-phi_S) / 2.0;
    float slopeMag= sqrt(phixy.x*phixy.x + phixy.y*phixy.y + Eps);
    
    float sphi    = sign(phi);
    float dt      = min(abs(slopeMag-1.)+0.2, 0.8);
    vec2  dsamp   = - phixy / slopeMag * sphi * dt;   // in pixel units
    vec2  uv_back = tex_0 + (dsamp * u_texel2FragCoord);
    
    float newPhi = texture2D(s_mask, uv_back).x;
    newPhi += sphi * dt;
    
    if (boundary==0.0)
        newPhi = 0.0;
    else if (boundary > 0.0 && newPhi == 0.0)
        newPhi = Eps;
    else if (boundary < 0.0 && newPhi == 0.0)
        newPhi = -Eps;
    
    if(phi*newPhi >= 0.) {
        gl_FragColor.x = newPhi;
    } else {
        gl_FragColor.x = phi * 0.9; // mask will be safe
    }
    gl_FragColor.yzw = vec3(0.,0.,0.);
}
*/

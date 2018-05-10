//
//  LBM1-collid0_block_seep.fsh
//
//  Created by Sunil Hadap on 4/18/13.
//  Copyright (c) 2013 Imagination Lab, Adobe. All rights reserved.
//
#extension GL_EXT_shader_framebuffer_fetch : require

precision highp float;
precision highp int;
precision highp sampler2D;
highp vec4 gl_LastFragData[gl_MaxDrawBuffers];

// samplers

uniform sampler2D s_uvfc;                               // wf is read, for the site and 9 neighbours, to compute pinning. Also, f_eq is based on uv.
uniform sampler2D s_pppp;                               // flow pigments, needed to derive blk
//uniform sampler2D s_qqqq;                               // fixed pigments, needed to derive blk
uniform sampler2D s_disorder;                           // [grain, --cap--, alumBlock, pin]

// uniforms

uniform float u_disorderWeight;
uniform vec2 u_texel2FragCoord;
uniform vec2 u_disorderTextureSize;

// constants

const float  u_Advect_p = 0.35;                       // 0.2 to 0.5 would work, alpha in eq. 8
const vec3   u_Blk_w    = vec3(0.01, 0.0, 0.0);       // blk wgt.[Glue, fblk, Swell]
const vec3   u_Pin_w    = vec3(0.1, 0.1, 0.1);        // Pin wgt.[base, disorder, fblk]
const float  u_toe_p    = 0.3;
const float  u_Omega    = 0.6;
const float  u_Corn_mul = 1.0;                        // corner multipler
//const float u_cap_s  = 5.0;                         // Max. water on surface

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

float horiz_add(vec4 v)
{
    return v.r + v.g + v.b + v.a;
}

void main()
{
    const float A0 = 4.0/9.0;
    const float D0 = 2.0/3.0;
    
    vec4 block = gl_LastFragData[0];
    vec4 uvfc  = texture2D(s_uvfc,  tex_0);

    vec4 uvfc_N = texture2D(s_uvfc, tex_N);
    vec4 uvfc_E = texture2D(s_uvfc, tex_E);
    vec4 uvfc_W = texture2D(s_uvfc, tex_W);
    vec4 uvfc_S = texture2D(s_uvfc, tex_S);
    
    vec4 uvfc_NE = texture2D(s_uvfc, tex_NE);
    vec4 uvfc_SE = texture2D(s_uvfc, tex_SE);
    vec4 uvfc_NW = texture2D(s_uvfc, tex_NW);
    vec4 uvfc_SW = texture2D(s_uvfc, tex_SW);
    
    vec4 pppp = texture2D(s_pppp, tex_0);         // flow pigments
    //vec4 qqqq = texture2D(s_qqqq, tex_0);         // fixed pigments
    vec4 disorder = texture2D(s_disorder, tex_0 / u_texel2FragCoord / u_disorderTextureSize); // [grain, -cap-, alumBlock, pin]
    
    // Derive ad: Less advection for lower wf
    float  wf = uvfc.z; // wf
    float ad = smoothstep(0.0, u_Advect_p, wf);
    
    // Derive f0
    vec2   uv   = uvfc.xy;
    float  f0   = block.y;
    float lwf   = uvfc.w;
    f0 = max(f0 + wf - lwf, 0.0);
    float f0_eq = A0 * wf - ad * D0 * dot(uv, uv);
    f0    = mix(f0, f0_eq, u_Omega);
    
    float alumBlock = disorder.z * u_disorderWeight;
    
    // Derive blk
    float glue    = pppp.a;
    float fblk    = 0.0; //qqqq.a;
    float blk   = alumBlock + u_Blk_w.x * glue + u_Blk_w.y * fblk;
    blk = min(1.0, blk);
    
    /// pinning = self dry
    bool pinning = (wf==0.0); // self dry
    
#if 0 // and all nei.rho < pin threshold. This makes watercolor stroke expand.
    float Pindisor = mix(disorder.x, disorder.w, smoothstep(0.0, u_toe_p, glue));
    float pin = u_Pin_w.x + u_Pin_w.y * Pindisor + u_Pin_w.z * fblk;
    
    // for Nearest
    pinning = pinning && (uvfc_N.z < pin);
    pinning = pinning && (uvfc_E.z < pin);
    pinning = pinning && (uvfc_W.z < pin);
    pinning = pinning && (uvfc_S.z < pin);
    
    pin *= u_Corn_mul; // for Next Nearest
    pinning = pinning && (uvfc_NE.z < pin);
    pinning = pinning && (uvfc_SE.z < pin);
    pinning = pinning && (uvfc_NW.z < pin);
    pinning = pinning && (uvfc_SW.z < pin);
#endif
    
    /// Derive final blk
    if (pinning) blk = 1.0/0.0; // infinite
    
    float boundary;
    if (uvfc.z > 0.0)
        boundary = -1.0;
    else if ( (uvfc_N.z > 0.0) || (uvfc_E.z  > 0.0) || (uvfc_W.z  > 0.0) || (uvfc_S.z  > 0.0) || (uvfc_NE.z  > 0.0) || (uvfc_SE.z  > 0.0) || (uvfc_NW.z  > 0.0) || (uvfc_SW.z  > 0.0) )
        boundary = 0.0;
    else
        boundary = 1.0;
    
    block = vec4(blk, f0, 0.0, boundary);
    gl_FragColor = block;
}


//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v) is relative to centerline of stroke [-w/2, w/2].
attribute vec4 uvrs;

// longitudinal attributes. a = width, b = pressure, c = length, d = unused.
attribute vec4 abcd;


//--- Uniforms

// the transform to normalized view coordinates
uniform mat4 modelViewMatrix;
// the transform from normalized view to media coords
uniform mat4 viewMediaMatrix;


//---  Outputs

// sampling position for texture 1 (the BTF)
varying vec2 v_texture1Pos;

// centerline relative position
varying vec4 v_uvrs;

// longitudinal attributes
varying vec4 v_abcd;


void main()
{
    // scale from media coordinates to texture coordinates. since the texture is
    // 1024 x 1024 this scale factor maps 1 media unit to 4 texture pixels. a media
    // unit corresponds to 1 model unit at 1:1.
    const float kTextureScale = 1.0/256.0;

    // map the input "model" position to view logical view coordinates
	gl_Position = modelViewMatrix * vec4(xy, 0.0, 1.0);

    // the sampling coordinates for texture1 (the BTF) are media relative
    // map position to media coordinates
    v_texture1Pos = (viewMediaMatrix * gl_Position).xy * kTextureScale;

    // pass on the centerline relative position
    v_uvrs = uvrs;

    // pass on the longitudinal attributes
    v_abcd = abcd;
}

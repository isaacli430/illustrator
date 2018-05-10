
//--- Uniforms

uniform mat4 transform;
uniform mat4 maskTransform;

//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v) position in texture.
attribute vec2 uv;

//---  Outputs

// sampling position for source texture and mask
varying vec2 v_texturePos;
varying vec2 v_maskPos;


void main()
{
	gl_Position = transform * vec4(xy, 0.0, 1.0);
    v_texturePos = uv;
    v_maskPos = (maskTransform * vec4(xy, 0.0, 1.0)).xy;
}

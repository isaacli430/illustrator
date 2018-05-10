
//--- Uniforms

uniform mat4 transform;

//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v) position in texture.
attribute vec2 uv;

//---  Outputs

// sampling position for texture
varying vec2 v_texturePos;


void main()
{
	gl_Position = transform * vec4(xy, 0.0, 1.0);
    v_texturePos = uv;
}

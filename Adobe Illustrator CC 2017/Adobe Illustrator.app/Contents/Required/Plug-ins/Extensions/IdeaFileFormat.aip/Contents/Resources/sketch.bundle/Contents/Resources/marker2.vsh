
//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v) from texture.
attribute vec2 uv;

//---  Outputs

// sampling positions for textures
varying vec2 v_texturePos;
varying vec2 v_paperPos;
// the transform from normalized view to media coords
uniform mat4 viewMediaMatrix;


void main()
{
    const float kTextureScale = 1.0/256.0;

	gl_Position = vec4(xy, 0.0, 1.0);
    v_texturePos = uv;
    v_paperPos = (viewMediaMatrix * gl_Position).xy * kTextureScale;
}

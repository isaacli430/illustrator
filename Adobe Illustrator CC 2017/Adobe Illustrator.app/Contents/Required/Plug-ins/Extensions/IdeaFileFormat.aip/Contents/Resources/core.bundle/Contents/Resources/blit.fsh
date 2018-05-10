
#ifdef GL_ES
// define default precision for float, vec, mat.
precision highp float;
#endif

varying vec2 v_texturePos;
uniform sampler2D texture;


void main()
{
    gl_FragColor = texture2D(texture, v_texturePos);
}

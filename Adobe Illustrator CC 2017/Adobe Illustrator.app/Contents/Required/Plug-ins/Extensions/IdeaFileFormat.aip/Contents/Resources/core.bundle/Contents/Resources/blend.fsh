

#ifdef GL_ES
    // define default precision for float, vec, mat.
    precision highp float;

    #define LOWP lowp
#else
    #define LOWP
#endif

varying vec2 v_texturePos;
uniform sampler2D texture;
uniform LOWP float alpha;


void main()
{
    vec4 src = texture2D(texture, v_texturePos);
    gl_FragColor = src * alpha;
}

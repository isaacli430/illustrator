

#ifdef GL_ES
    // define default precision for float, vec, mat.
    precision highp float;

    #define LOWP lowp
#else
    #define LOWP
#endif

varying vec2 v_texturePos;
varying vec2 v_maskPos;
uniform sampler2D texture;
uniform sampler2D maskTexture;
uniform LOWP float alpha0;
uniform LOWP float alpha1;


void main()
{
    vec4 src = texture2D(texture, v_texturePos);
    float alpha = alpha0;
    if (0.0 < v_maskPos.x && v_maskPos.x < 1.0 && 0.0 < v_maskPos.y && v_maskPos.y < 1.0)
        alpha = mix(alpha0, alpha1, texture2D(maskTexture, v_maskPos).x);
    gl_FragColor = src * alpha;
}

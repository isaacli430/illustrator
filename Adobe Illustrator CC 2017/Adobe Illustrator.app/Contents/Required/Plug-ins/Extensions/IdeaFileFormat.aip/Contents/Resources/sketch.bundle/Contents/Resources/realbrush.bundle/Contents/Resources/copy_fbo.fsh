precision highp float;
precision highp int;
precision highp sampler2D;
uniform sampler2D source;
varying vec2 v_st;

void main()
{
    gl_FragColor = texture2D( source, v_st );
}

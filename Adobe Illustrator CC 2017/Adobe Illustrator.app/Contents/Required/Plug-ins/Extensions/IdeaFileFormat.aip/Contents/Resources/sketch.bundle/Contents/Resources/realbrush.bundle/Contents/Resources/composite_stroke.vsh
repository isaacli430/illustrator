precision highp float;
precision highp int;
precision highp sampler2D;

attribute vec4 a_position;

varying vec2 v_st;

void main()
{
    gl_Position = a_position;
    v_st = a_position.xy * 0.5 + vec2(0.5, 0.5);
}

attribute vec4 position;
attribute vec4 inputTextureCoordinate;
attribute vec4 paperTextureCoordinate;
uniform	mat4 MVP;

varying vec2 textureCoordinate;
varying vec2 paperCoordinate;

void main()
{
    gl_Position = MVP * position;
    textureCoordinate = inputTextureCoordinate.xy;
    paperCoordinate = paperTextureCoordinate.xy;
}

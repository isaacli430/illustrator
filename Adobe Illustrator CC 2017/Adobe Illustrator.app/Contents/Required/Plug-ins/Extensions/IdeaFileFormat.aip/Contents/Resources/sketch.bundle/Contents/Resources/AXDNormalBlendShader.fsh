#ifdef GL_ES
	#extension GL_EXT_shader_framebuffer_fetch : require    
	#define LOWP lowp
    LOWP vec4 gl_LastFragData[gl_MaxDrawBuffers];
#else
    #define LOWP
    uniform sampler2D BaseImage;
#endif

uniform sampler2D BlendImage;
uniform sampler2D PaperImage;
uniform LOWP float Opacity;
varying LOWP vec2 textureCoordinate;

void main (void)
{
#ifdef GL_ES
    LOWP vec4 base = gl_LastFragData[0];
#else
    LOWP vec4 base  = texture2D(BaseImage, textureCoordinate);
#endif
    LOWP vec4 blend = texture2D(BlendImage, textureCoordinate);
    LOWP vec4 paper = texture2D(PaperImage, textureCoordinate);

    gl_FragColor = blend * Opacity + base * (1.0 - blend.a * Opacity);
}

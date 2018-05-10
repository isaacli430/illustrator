#ifdef GL_ES
	#extension GL_EXT_shader_framebuffer_fetch : require
    #define LOWP lowp
#else
    #define LOWP 
#endif

uniform sampler2D BlendImage;
uniform sampler2D PaperImage;
uniform LOWP float Opacity;

varying LOWP vec2 textureCoordinate;
varying LOWP vec2 paperCoordinate;

#ifdef GL_ES
    lowp vec4 gl_LastFragData[gl_MaxDrawBuffers];
#else
    // TY TODO: check, is all the wiring setup for this?
    // read back from texture since gl_LastFragData not supported on Mac
    uniform sampler2D BaseImage;
#endif


void main (void)
{
#ifdef GL_ES
    LOWP vec4 base = gl_LastFragData[0];
#else
	LOWP vec4 base  = texture2D(BaseImage, textureCoordinate);
#endif
    LOWP vec4 blend = texture2D(BlendImage, textureCoordinate);
    LOWP vec4 paper = texture2D(PaperImage, paperCoordinate);
    
    LOWP vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
    
    LOWP vec4 baseOnWhite = base + (1.0 - base.a);
    LOWP vec4 blendOnWhite = blend * Opacity + (1.0 - blend.a * Opacity);
    LOWP float alpha = base.a * (1.0 - blend.a) + blend.a;
    
    LOWP vec4 result = white - (white - blendOnWhite) * (white - paper);
    
    LOWP vec4 minified = min(result, baseOnWhite) - (1.0 - alpha);
    
    LOWP vec4 multiplied = (result - (1.0 - blend.a)) * baseOnWhite;
    multiplied = baseOnWhite * (1.0 - blend.a * Opacity) + multiplied * Opacity - (1.0 - alpha);
    
    LOWP float multiplyFraction = 0.25;
    gl_FragColor = multiplied * multiplyFraction + minified * (1.0 - multiplyFraction);
}

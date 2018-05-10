precision highp float;
precision highp int;
precision highp sampler2D;

uniform sampler2D strokeSampler;
uniform sampler2D canvasSampler;
uniform vec4 queryColor;
uniform float averageLuminance;

varying vec2 v_st;

vec3 chooseForegroundColor(vec3 givenColor, float luminance, float avgLuminance);
vec3 color_Lab_to_RGB( vec3 c );
vec3 color_RGB_to_Lab( vec3 c );

void main()
{
    vec4 strokeColorData = texture2D(strokeSampler, v_st);
    vec4 canvasColor = texture2D(canvasSampler, v_st);

	float strokeAlpha = clamp(strokeColorData.w, 0.0, 1.0);
    float strokeLuminance = clamp(strokeColorData.x * 100.0 / strokeAlpha, 0.0, 100.0);
    vec3 strokeLab = chooseForegroundColor(queryColor.xyz, strokeLuminance, averageLuminance);
    vec3 strokeRGB = color_Lab_to_RGB(strokeLab);
    vec4 strokeColor = vec4(strokeRGB * strokeAlpha, strokeAlpha);

 	vec4 result = strokeColor + canvasColor * (1.0 - strokeColor.a);
    /*
    if (strokeColorData.y > 0.4 && strokeColorData.y < 0.6) //magenta: negative alpha
        result = vec4(1.0, 0.0, 1.0, 1.0);
    else if (strokeColorData.y > 0.6)                       //cyan: exceed range of 1
        result = vec4(0.0, 1.0, 1.0, 1.0);
*/
 	gl_FragColor = result;
}


vec3 chooseForegroundColor(vec3 givenColor, float luminance, float avgLuminance){
    vec3 labColor;
	labColor.x = clamp(luminance, 0.0, 100.0);
	float amountColor = (100.0 - labColor.x) / 100.0;
	amountColor = amountColor * 1.5;

	labColor.x += givenColor.x - avgLuminance;
	labColor.x = clamp(labColor.x, 0.0, 100.0);
	labColor.y = givenColor.y * amountColor;
	labColor.z = givenColor.z * amountColor;
	return labColor;
}

vec3 color_Lab_to_LinearRGB(vec3 c){
	float X, Y, Z;
	Y = c[0] * (1.0/116.0) + 16.0/116.0;
	X = c[1] * (1.0/500.0) + Y;
	Z = c[2] * (-1.0/200.0) + Y;

	if (X > 6.0/29.0)
		X = X * X * X;
	else
		X = X * (108.0/841.0) - 432.0/24389.0;

	if (c[0] > 8.0)
		Y = Y * Y * Y;
	else
		Y = c[0] * (27.0/24389.0);

	if (Z > 6.0/29.0)
		Z = Z * Z * Z;
	else
		Z = Z * (108.0/841.0) - 432.0/24389.0;

	// normalized XYZ -> linear sRGB

	vec3 RGB;
	RGB.x = X * (1219569.0/395920.0)     + Y * (-608687.0/395920.0)    + Z * (-107481.0/197960.0);
	RGB.y = X * (-80960619.0/87888100.0) + Y * (82435961.0/43944050.0) + Z * (3976797.0/87888100.0);
	RGB.z = X * (93813.0/1774030.0)      + Y * (-180961.0/887015.0)    + Z * (107481.0/93370.0);
	return RGB;
}

float linear_to_rgb(float c){
	if (c > 0.0031308)
		return pow(c, 1.0 / 2.4) * 1.055 - 0.055;
	else
		return c * 12.92;
}

vec3 color_LinearRGB_to_RGB(vec3 c){
	float R, G, B;
	R = linear_to_rgb(c[0]);
	G = linear_to_rgb(c[1]);
	B = linear_to_rgb(c[2]);
	return vec3(R, G, B);
}

vec3 color_Lab_to_RGB( vec3 c ){
	vec3 result = color_Lab_to_LinearRGB( c );
	result = color_LinearRGB_to_RGB(result);
	result = clamp(result, 0.0, 1.0);
	return result;
}

float rgb_to_linear(float c){
	if (c > 0.0031308 * 12.92)
		return pow(c * (1.0 / 1.055) + (0.055 / 1.055), 2.4);
	else
		return c * (1.0 / 12.92);
}

vec3 color_RGB_to_LinearRGB( vec3 c){
	float R, G, B;
	R = rgb_to_linear(c[0]);
	G = rgb_to_linear(c[1]);
	B = rgb_to_linear(c[2]);
    return vec3(R, G, B);
}

float xyz_to_lab(float c){
	if (c > 216.0 / 24389.0)
		return pow(c, 1.0 / 3.0);
	else
		return c * (841.0/108.0) + (4.0/29.0);
}

vec3 color_LinearRGB_to_Lab(vec3 c){
	float R, G, B, X, Y, Z;
	R = c[0];
	G = c[1];
	B = c[2];

	// linear sRGB -> normalized XYZ (X,Y,Z are all in 0...1)
	X = xyz_to_lab(R * (10135552.0/23359437.0) + G * (8788810.0/23359437.0) + B * (4435075.0/23359437.0));
	Y = xyz_to_lab(R * (871024.0/4096299.0)    + G * (8788810.0/12288897.0) + B * (887015.0/12288897.0));
	Z = xyz_to_lab(R * (158368.0/8920923.0)    + G * (8788810.0/80288307.0) + B * (70074185.0/80288307.0));
    
	// normalized XYZ -> Lab
	vec3 Lab;
	Lab.x = Y * 116.0 - 16.0;
	Lab.y = (X - Y) * 500.0;
	Lab.z = (Y - Z) * 200.0;

	return Lab;
}

vec3 color_RGB_to_Lab( vec3 c ){
	vec3 result = color_RGB_to_LinearRGB( c );
	return color_LinearRGB_to_Lab(result);
}

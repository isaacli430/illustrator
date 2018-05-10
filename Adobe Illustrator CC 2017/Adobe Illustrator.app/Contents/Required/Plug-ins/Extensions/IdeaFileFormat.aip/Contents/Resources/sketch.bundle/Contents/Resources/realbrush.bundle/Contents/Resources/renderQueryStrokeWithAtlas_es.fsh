precision mediump float;
uniform sampler2D exemplar_atlas;
uniform sampler2D exemplar_alpha;
//uniform vec4 queryColor;
varying mediump vec4 _texCoords;
varying mediump vec2 _alphaFactors;
varying mediump vec2 _strokeCoords;
varying mediump float _flow;

float scaleAlpha(float alpha, float scale);
vec3 chooseForegroundColor(vec4 givenColor, vec3 texColor);
vec3 color_Lab_to_RGB( vec3 c );
vec3 color_RGB_to_Lab( vec3 c );

float linearstep(float x, float y, float a) {
	return a < x ? 0.0 : a > y ? 1.0 : (a - x) / (y - x);
}

float compress(float x, float s) {
	return (((-2.0 * s + 1.0) * x + (3.0 * s - 2.0)) * x + 1.0) * x;
}

void main() {
	vec4 texColor1 = texture2D(exemplar_atlas, _texCoords.xy);
	vec4 texColor2 = texture2D(exemplar_atlas, _texCoords.zw);
    float alpha1 = texture2D(exemplar_alpha, _texCoords.xy).x;
    float alpha2 = texture2D(exemplar_alpha, _texCoords.zw).x;

	float blend1 = _alphaFactors.x;
	float blend2 = _alphaFactors.y;

	vec4 blended = texColor1 * blend1 + texColor2 * blend2;
    float alpha = alpha1 * blend1 + alpha2 * blend2;

    vec3 foregroundColor;
    if (alpha < 0.0000001)
        foregroundColor = vec3(0.0);
    else
        foregroundColor = (blended.xyz - vec3(1.0 - alpha)) / alpha;
    
    float indicator = 0.0;
    if (foregroundColor.x < 0.0 || foregroundColor.y < 0.0 || foregroundColor.z < 0.0)
        indicator = 0.5;
    else if (foregroundColor.x > 1.0 || foregroundColor.y > 1.0 || foregroundColor.z > 1.0)
        indicator = 1.0;
    foregroundColor = clamp(foregroundColor, 0.0, 1.0);
    
	
	vec3 foregroundLab = color_RGB_to_Lab(foregroundColor);
    foregroundLab.x = clamp(foregroundLab.x, 0.0, 100.0);
    //alpha = scaleAlpha(alpha, queryColor.w * 2.0);
    alpha = scaleAlpha(alpha, _flow * 2.0); //Cynthia: use per-sample flow value

	vec4 result = vec4(foregroundLab.xxx / 100.0 *alpha, alpha);
	vec2 resultCoords = vec2(_strokeCoords.x, _strokeCoords.y / 2.5);
    //gl_FragColor = vec4(result.x, resultCoords.x, resultCoords.y / 255.0, result.w); //the y, z channels are not used in the "composite_stroke.fsh"
    
    gl_FragColor = vec4(result.x, indicator, resultCoords.y / 255.0, result.w);
	
	/*
	// Old style output, RGBA with fixed function blending.
    vec3 foreground = chooseForegroundColor(vec4(queryColor.xyz, 0.0), color_RGB_to_Lab(foregroundColor));
    foreground = color_Lab_to_RGB(foreground);
    gl_FragColor.xyz = foreground * alpha;
    gl_FragColor.w = alpha;
	*/
}

float scaleAlpha(float alpha, float scale) {
    alpha = clamp(alpha, 0.0, 1.0);

	scale *= smoothstep(0.01, 0.05, alpha);
    scale = clamp(scale, 0.0, 2.0);
    
    float result;
    if (scale > 1.0) {
        result = 1.0 - (1.0 - alpha) * (2.0 - scale);
    } else {
        result = alpha * scale;
    }
    return clamp(result, 0.0, 1.0);
}

vec3 chooseForegroundColor(vec4 givenColor, vec3 texColor){
	vec3 labColor = texColor;
	labColor.x = clamp(labColor.x, 0.0, 100.0);
	float amountColor = (100.0 - labColor.x) / 100.0;
	amountColor = amountColor * 1.5;

	labColor.x += givenColor.w * 100.0;
	labColor.x = clamp(labColor.x, 0.5, 99.5);
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

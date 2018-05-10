#extension GL_ARB_geometry_shader4 : enable

uniform mat4 MVP;
uniform float scale;

varying in vec4 tintColorIn[1];
varying in vec2 texSegIn[1];
varying in float aaIn[1];

varying out vec2 pointCoord;
varying out vec4 tintColor;
varying out vec2 texSeg;
varying out float aa;
varying out float texDV;

void main()
{
    vec4 p = gl_PositionIn[0];
    vec2 s = vec2(MVP[0][0], MVP[1][1]) * (gl_PointSizeIn[0]/(2.0*scale));
    
    gl_Position = vec4(p.x-s.x, p.y+s.y, p.z, p.w);
    pointCoord = vec2(0.0, 1.0);
    tintColor = tintColorIn[0];
    texSeg = texSegIn[0];
    aa = aaIn[0];
    texDV = -1.0;
    EmitVertex();

    gl_Position = vec4(p.x-s.x, p.y-s.y, p.z, p.w);
    pointCoord = vec2(0.0, 0.0);
    tintColor = tintColorIn[0];
    texSeg = texSegIn[0];
    aa = aaIn[0];
    texDV = -1.0;
    EmitVertex();
    
    gl_Position = vec4(p.x+s.x, p.y+s.y, p.z, p.w);
    pointCoord = vec2(1.0, 1.0);
    tintColor = tintColorIn[0];
    texSeg = texSegIn[0];
    aa = aaIn[0];
    texDV = -1.0;
    EmitVertex();
    
    gl_Position = vec4(p.x+s.x, p.y-s.y, p.z, p.w);
    pointCoord = vec2(1.0, 0.0);
    tintColor = tintColorIn[0];
    texSeg = texSegIn[0];
    aa = aaIn[0];
    texDV = -1.0;
    EmitVertex();

    EndPrimitive();
}

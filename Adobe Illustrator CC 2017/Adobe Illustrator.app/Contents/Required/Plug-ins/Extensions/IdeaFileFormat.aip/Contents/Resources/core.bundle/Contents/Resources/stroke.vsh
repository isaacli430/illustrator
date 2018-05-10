
//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v) is relative to centerline of stroke.
// dharmk - Removed the setAttributeConst3f call from the program interface and copied these
// constants from SimpleStrokePrograms.cpp
const vec4 uvrs = vec4(1.0, 0.0, 1.0, 1.0);

// longitudinal attributes. a = width, b = pressure, c = length, d = unused.
const vec4 abcd = vec4(2.0, 1.0, 0.0, 1.0);


//--- Uniforms

// the transform to normalized view coordinates
uniform mat4 modelViewMatrix;


//---  Outputs

// centerline relative position
varying vec4 v_uvrs;

// longitudinal attributes
varying vec4 v_abcd;


void main()
{
    // map the input "model" position to view logical view coordinates
	gl_Position = modelViewMatrix * vec4(xy, 0.0, 1.0);

    // pass on the centerline relative position
    v_uvrs = uvrs;

    // pass on the longitudinal attributes
    v_abcd = abcd;
}


//--- Attributes

// the position of the vertex.
attribute vec2 xy;

//  (u,v,r,s) is relative to centerline of stroke.
attribute vec4 uvrs;

// longitudinal attributes. a = width, b = pressure, c = length, d = unused.
attribute vec4 abcd;


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

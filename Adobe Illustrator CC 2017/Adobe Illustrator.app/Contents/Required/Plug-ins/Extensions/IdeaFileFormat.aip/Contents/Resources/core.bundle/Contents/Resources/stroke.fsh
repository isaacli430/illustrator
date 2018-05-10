
#ifdef GL_ES
// define default precision for float, vec, mat.
precision highp float;
#endif

// u,v,r,s relative to centerline
varying vec4 v_uvrs;

// longitudinal attributes. a = width, b = pressure, c = length, d = unused.
varying vec4 v_abcd;

// width of the edge transition
uniform float edgeWidth;

// colors to use at the center line and at the edge
uniform vec4 color0;
uniform vec4 color1;

void main()
{
    // half width
    float wh = 0.5 * v_abcd.x;
    
    // distance from nearest end
    float dl = wh - v_uvrs.x;
    float dr = wh - v_uvrs.z;
    float ds = max(max(dl, dr), 0.0);
    
    // distance from edge
    float dt = v_uvrs.y;
    
    // distance from path
    float d = wh - length(vec2(ds, dt));

    // fake anti-aliasing
    float a = smoothstep(0.0, edgeWidth, d);

    gl_FragColor = mix(color1, color0, a);
}

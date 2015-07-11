/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.Perseily = {

	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"time": { type: "f", value: 1.0 },
		"intensity": { type: "f", value: 0.005 },
		"scale": { type: "f", value: 1.4 },
		"speed": { type: "f", value: 0.4 },
		"x": { type: "f", value: 0.0 },
		"y": { type: "f", value: 0.0 }
	},

	vertexShader: [
		"varying vec2 vUv;",
		
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDiffuse2;",
		"uniform float time;",
		"uniform float intensity;",
		"uniform float scale;",
		"uniform float speed;",
		"uniform float x;",
		"uniform float y;",
		"varying vec2 vUv;",

"//",
"// Description : Array and textureless GLSL 2D simplex noise function.",
"//      Author : Ian McEwan, Ashima Arts.",
"//  Maintainer : ijm",
"//     Lastmod : 20110822 (ijm)",
"//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
"//               Distributed under the MIT License. See LICENSE file.",
"//               https://github.com/ashima/webgl-noise",
"// ",

"vec3 mod289(vec3 x) {",
"  return x - floor(x * (1.0 / 289.0)) * 289.0;",
"}",

"vec2 mod289(vec2 x) {",
"  return x - floor(x * (1.0 / 289.0)) * 289.0;",
"}",

"vec3 permute(vec3 x) {",
"  return mod289(((x*34.0)+1.0)*x);",
"}",

"float snoise(vec2 v)",
"  {",
"  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0",
"                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)",
"                     -0.577350269189626,  // -1.0 + 2.0 * C.x",
"                      0.024390243902439); // 1.0 / 41.0",
"// First corner",
"  vec2 i  = floor(v + dot(v, C.yy) );",
"  vec2 x0 = v -   i + dot(i, C.xx);",

"// Other corners",
"  vec2 i1;",
"  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0",
"  //i1.y = 1.0 - i1.x;",
"  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
"  // x0 = x0 - 0.0 + 0.0 * C.xx ;",
"  // x1 = x0 - i1 + 1.0 * C.xx ;",
"  // x2 = x0 - 1.0 + 2.0 * C.xx ;",
"  vec4 x12 = x0.xyxy + C.xxzz;",
"  x12.xy -= i1;",

"// Permutations",
"  i = mod289(i); // Avoid truncation effects in permutation",
"  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
"		+ i.x + vec3(0.0, i1.x, 1.0 ));",

"  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);",
"  m = m*m ;",
"  m = m*m ;",

"// Gradients: 41 points uniformly over a line, mapped onto a diamond.",
"// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)",

"  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
"  vec3 h = abs(x) - 0.5;",
"  vec3 ox = floor(x + 0.5);",
"  vec3 a0 = x - ox;",

"// Normalise gradients implicitly by scaling m",
"// Approximation of: m *= inversesqrt( a0*a0 + h*h );",
"  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",

"// Compute final noise value at P",
"  vec3 g;",
"  g.x  = a0.x  * x0.x  + h.x  * x0.y;",
"  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
"  return 130.0 * dot(m, g);",
"}",

"vec2 distortUV(vec2 uv, vec2 nUV)",
"{",
"    nUV.x += time*speed;",
"    nUV.y += time*speed;",
"    vec2 noise= vec2(snoise(nUV*scale), snoise(nUV*scale)); // no Ashima noise for me :( ",
"//    vec2 noise = texture2D(tDiffuse, nUV*scale).xy;",
"    uv += (-1.0+noise*2.0) * intensity;",
"    return uv;",
"}",
"   // ripped from: ",
"   // https://www.shadertoy.com/view/4llSDH", 
"precision lowp float;",
"void main()",
"{",
"    vec2 nUV = vUv;",
"    vec2 uv = vUv;",
"    //uv=Tex Coords,  nUV=Noise Coords",
"    //Many Passes improves the effect",
"    //Or you could use a higher quality noise like perlin",
"    uv = distortUV(uv, nUV);",
"    uv = distortUV(uv, vec2(nUV.x+0.1,nUV.y+0.1));",
"    uv = distortUV(uv, vec2(nUV.x+0.2,nUV.y+0.2));",
"    uv = distortUV(uv, vec2(nUV.x+0.3,nUV.y+0.3));",
"    uv = distortUV(uv, vec2(nUV.x+0.4,nUV.y+0.4));",
"    uv = distortUV(uv, vec2(nUV.x+0.5,nUV.y+0.5));",
"    uv = distortUV(uv, vec2(nUV.x+0.6,nUV.y+0.6));",
"    uv = distortUV(uv, vec2(nUV.x+0.7,nUV.y+0.7));",
"    uv = distortUV(uv, vec2(nUV.x+0.8,nUV.y+0.8));",
"    uv = distortUV(uv, vec2(nUV.x+0.9,nUV.y+0.9));",
/*"    uv = distortUV(uv, vec2(nUV.x+0.15,nUV.y+0.15));",
"    uv = distortUV(uv, vec2(nUV.x+0.25,nUV.y+0.25));",
"    uv = distortUV(uv, vec2(nUV.x+0.35,nUV.y+0.35));",
"    uv = distortUV(uv, vec2(nUV.x+0.45,nUV.y+0.45));",
"    uv = distortUV(uv, vec2(nUV.x+0.55,nUV.y+0.55));",
"    uv = distortUV(uv, vec2(nUV.x+0.65,nUV.y+0.65));",
"    uv = distortUV(uv, vec2(nUV.x+0.75,nUV.y+0.75));",
"    uv = distortUV(uv, vec2(nUV.x+0.85,nUV.y+0.85));",
"    uv = distortUV(uv, vec2(nUV.x+0.95,nUV.y+0.95));",
*/"    uv.x += x;",
"    uv.y += y;",
"    vec4 color= texture2D( tDiffuse, uv);",
"    gl_FragColor = vec4(color);",
"}"

	].join("\n")

};

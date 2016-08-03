/*
* StroboShader
*   Author : Stoneman
*   Usage :
*
       var stroboEffect = new THREE.ShaderPass(THREE.StroboShader);
       stroboEffect.uniforms['opacity'].value = 0;
       obj.effects['stroboEffect'] = stroboEffect;
       maincomposer.addPass(stroboEffect);
*
*   and in the render loop (something like this) : (first lines are checks to see it is not getting over 1 or below 0)

       if (this.effects['stroboEffect'].uniforms['opacity'].value < 0) {
           this.effects['stroboEffect'].uniforms['opacity'].value = 0;
       }

       if (this.effects['stroboEffect'].uniforms['opacity'].value > 1.0) {
           this.effects['stroboEffect'].uniforms['opacity'].value = 1.0;
       }

       this.effects['stroboEffect'].uniforms['color'].value.setRGB(255,0,0); //color set
       if (parttick > 2000 && parttick < 6000) { //time for the fade

           if (parttick < 4000) { //fadeout
               if (this.effects['stroboEffect'].uniforms['opacity'].value < 1.0) {
                   this.effects['stroboEffect'].uniforms['opacity'].value += parttick / 2000;
               }
           }

           if (parttick > 4000) { //fadein
               if (this.effects['stroboEffect'].uniforms['opacity'].value > 0.0) {
                   this.effects['stroboEffect'].uniforms['opacity'].value -= parttick / 2000;
               }
           }

       }
*
*/

THREE.StroboShader = {

    uniforms: {

        "tDiffuse": { type: "t", value: null },
        "color":    { type: "c", value: new THREE.Color( 0xffffff ) },
        "opacity":  { type: "f", value: 1.0 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join("\n"),

    fragmentShader: [

        "uniform float opacity;",
        "uniform vec3 color;",
        "uniform sampler2D tDiffuse;",

        "varying vec2 vUv;",

        "void main() {",

        "vec4 texel = texture2D( tDiffuse, vUv );",

        "vec3 finalColor = vec3(",
        "(opacity * color.x) + ((1.0 - opacity) * texel.x),",
        "(opacity * color.y) + ((1.0 - opacity) * texel.y),",
        "(opacity * color.z) + ((1.0 - opacity) * texel.z)",
        ");",

        "gl_FragColor = vec4( finalColor, texel.w );",

        "}"

    ].join("\n")

};

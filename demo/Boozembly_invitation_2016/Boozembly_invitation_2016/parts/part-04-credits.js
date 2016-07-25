{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - credits';
		ro.prewarm = true;
		ro.partlength =  100000;
		ro.cameras = {
			'creditscam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.effects = {};
		ro.composers = {};
		ro.passes = {};
		ro.rendertargets = {};
		ro.renderpasses = {};

		ro.scenes['credits'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();
			l(geometry);
			var map = THREE.ImageUtils.loadTexture( image_makkaratexture3.src );
			map.flipY = false;
				
			var bump = THREE.ImageUtils.loadTexture( image_makkarabump3.src );
			bump.flipY = false;
			
			var material = new THREE.MeshPhongMaterial({
					map: map,
					bumpMap: bump,
					bumpScale: 2,
					transparent: false
			});

			for (var i=0; i<100; i++) {
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(i * 10, 0, 0);
				mesh.rotation.set(0, 0, Math.PI / 2);
				scene.add(mesh);
			}
			
			var directionallight = new THREE.DirectionalLight(0xffffff, 1);
			directionallight.position.set( 0, 0, 1 );
			scene.add(directionallight);
			obj.lights['creditsdirectional'] = directionallight;
			
			scene.add(obj.cameras['creditscam']);
			obj.cameras['creditscam'].position.z = 900;
			
			return scene;
		}(ro));

		
		ro.scenes['composer'] = (function(obj) {		
			var scene = new THREE.Scene();
/*			
			var rendertarget = new THREE.WebGLRenderTarget(global_engine.getWidth(), global_engine.getHeight(), 
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false }
			);
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['makkarat'].renderTarget2.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['boozembly'].renderTarget2.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;
*/			
			return scene;
		}(ro));

		ro.functions = {
			updateCredits: function(pd, pt, gt) {
			}
		}


		ro.player = function(partdata, parttick, tick) {
			this.functions.updateCredits(partdata, parttick, tick);

			global_engine.renderers['main'].render(this.scenes['credits'], this.cameras['creditscam']);


/*
			var dt = global_engine.clock.getDelta();
			this.composers['makkarat'].render(dt);
			this.composers['boozembly'].render(dt);
			this.composers['composer'].render(dt);
*/			
		}
	
		return ro;
	}())
}


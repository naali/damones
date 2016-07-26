{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - final';
		ro.prewarm = true;
		ro.partlength =  27826;
		ro.cameras = {
			'pehucam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.effects = {};
		ro.composers = {};
		ro.passes = {};
		ro.rendertargets = {};
		ro.renderpasses = {};

		ro.scenes['pehu'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1920 * 2, 1080 * 2, 10, 10);
			var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, 0, 0);
			scene.add(mesh);
			
			geometry = new THREE.PlaneBufferGeometry(2048, 1024, 10, 10);
			material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture( image_pehu.src ), transparent: true }); 
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, 0, 500);
			scene.add(mesh);
			
			var directionallight = new THREE.DirectionalLight(0xffffff, 1);
			directionallight.position.set(0, 0, 1);
			scene.add(directionallight);
			obj.lights['pehudirectional'] = directionallight;

			scene.add(obj.cameras['pehucam']);
			obj.cameras['pehucam'].position.z = 2000;
			
			
			/* Fade to white -mesh */

			var whitegeometry = new THREE.PlaneBufferGeometry(1920 * 2, 1080 * 2, 1, 1);
			var whitematerial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
			var whitemesh = new THREE.Mesh(whitegeometry, whitematerial);
			whitemesh.position.set(0, 0, 700);
			whitemesh.material.opacity = 0.0;
			scene.add(whitemesh);
			obj.objects['whitemesh'] = whitemesh;
			
			/**/
			
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['pehucam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);
			
			obj.composers['pehu'] = composer;
			obj.rendertargets['pehu'] = rendertarget;
			
			return scene;
		}(ro));

		ro.scenes['composer'] = (function(obj) {		
			var scene = new THREE.Scene();

			var rendertarget = new THREE.WebGLRenderTarget(global_engine.getWidth(), global_engine.getHeight(), 
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false }
			);
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['pehu'].renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['pehu'].renderTarget2.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;

			return scene;
		}(ro));

		ro.functions = {
			updatePehu: function(pd, pt, gt) {
				var whitemesh = pd.data.objects['whitemesh'];
				
				if (pt < 8000) {
					var fade = 1 - (pt / 8000)
					whitemesh.material.opacity = fade;
					whitemesh.material.color.setHex(0xffffff);
					whitemesh.visible = true;
				} else if (pt + 2000 > pd.data.partlength) {
					var fade = 1 - (pd.data.partlength - pt) / 2000;
					whitemesh.material.opacity = fade;
					whitemesh.material.color.setHex(0x000000);
					whitemesh.visible = true;
				} else {
					whitemesh.material.opacity = 0;
					whitemesh.visible = false;
					whitemesh.material.color.setHex(0xffffff);
				}
			}
		}

		ro.player = function(partdata, parttick, tick) {
			this.functions.updatePehu(partdata, parttick, tick);

			var dt = global_engine.clock.getDelta();
			this.composers['pehu'].render(dt);
			this.composers['composer'].render(dt);

		}
	
		return ro;
	}())
}


{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - intro';
		ro.prewarm = true;
		ro.partlength =  13965;
		ro.cameras = {
			'makkaracam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000),
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.effects = {};
		ro.composers = {};
		ro.passes = {};
		ro.rendertargets = {};
		ro.renderpasses = {};

		ro.scenes['makkara'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var makkara_data = ["  --    ----   --   ---- ", 
								"  --    ----   --   ---- ", 
								"--  -- --  -- ---  --  --", 
								"--  -- --  -- ---  --  --", 
								"    -- --  --  --  --    ",
								"    -- --  --  --  --    ",
								"    -- --  --  --  --    ",
								" ----  --  --  --  ------",
								" ----  --  --  --  ------",
								"--     --  --  --  --  --",
								"--     --  --  --  --  --",
								"--     --  --  --  --  --",
								"--     --  --  --  --  --",
								"------  ----  ----  ---- ",   
								"------  ----  ----  ---- "];

			var makkara_materials = [];
			
			var makkara_texture_images = [
				{map: image_makkaratexture.src, bump: image_makkarabump.src}, 
				{map: image_makkaratexture3.src, bump: image_makkarabump3.src},
				{map: image_makkaratexture4.src, bump: image_makkarabump4.src}
			];
			
			for (var i=0; i<makkara_texture_images.length; i++) {
				var map = THREE.ImageUtils.loadTexture( makkara_texture_images[i].map );
				map.flipY = false;
				
				var bump = THREE.ImageUtils.loadTexture( makkara_texture_images[i].bump );
				bump.flipY = false;
				
				makkara_materials.push(
					new THREE.MeshPhongMaterial({
						map: map,
						bumpMap: bump,
						bumpScale: 2,
						transparent: false
					})
				);
			}
			
			obj.objects['makkarat'] = [];
			
			var half_x = makkara_data[i].length / 2; 
			var half_y = makkara_data.length / 2;
			
			var buffermakkara = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);

			for (var i=0; i<makkara_data.length; i++) {
				for (var j=0; j<makkara_data[i].length; j++) {
					if (makkara_data[i].charAt(j) == '-') {
						var mesh = new THREE.Mesh(buffermakkara, makkara_materials[0]);
						var target_position = { x: (j-half_x) * 80, y: -(i-half_y) * 30, z: -500 };
						var start_position = {x: target_position.x, y: target_position.y, z: 1100 };
						
						mesh.position.set(start_position.x, start_position.y, start_position.z);
						mesh.target_position = target_position;
						mesh.start_position = start_position;
						mesh.original_index = i * makkara_data.length + j;
						mesh.original_index_y = i;
						mesh.original_index_x = j;

						mesh.rotation.x = Math.random() * Math.PI * 180 * 2;
						mesh.scale.x = 1;
						mesh.scale.y = 1;
						mesh.scale.z = 1;
						
						scene.add(mesh);
						obj.objects['makkarat'].push(mesh);
					}
				}
			}
			
			obj.objects['makkarat'] = shuffle(obj.objects['makkarat']);
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['makkaraspot1'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['makkaraspot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['makkaraspot3'] = light;

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['makkaradirectional'] = directionallight;
			
			scene.add(obj.cameras['makkaracam']);
			obj.cameras['makkaracam'].position.z = 1000;

			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['makkaracam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			composer.clear = false;
			obj.composers['makkarat'] = composer;
			obj.rendertargets['makkarat'] = rendertarget;			
			
			return scene;
		}(ro));

		ro.scenes['logo'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1920, 1080, 1, 1);
			var material_boozembly = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( image_boozembly.src ), transparent: true } );
			var mesh_boozembly = new THREE.Mesh(geometry, material_boozembly);
			mesh_boozembly.position.x = 0;
			mesh_boozembly.position.y = 0;
			mesh_boozembly.position.z = 0;
			scene.add(mesh_boozembly);
			obj.objects['mesh_boozembly'] = mesh_boozembly;

			var material_disorganizing = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( image_disorganizing.src ), transparent: true } );
			var mesh_disorganizing = new THREE.Mesh(geometry, material_disorganizing);
			mesh_disorganizing.position.x = 0;
			mesh_disorganizing.position.y = 0;
			mesh_disorganizing.position.z = 0;
			scene.add(mesh_disorganizing);
			obj.objects['mesh_disorganizing'] = mesh_disorganizing;
			
			for (var i=0; i<3; i++) {
				var light = new THREE.SpotLight(0xffffff);
				light.intensity = 0.5;
				light.penumbra = 1;
				light.decay = 2;
				light.angle = Math.PI / 3 / 2;
				light.position.set(0, 0, 0);
				light.name = 'logospot' + i;
				light.target.position.set(0, 0, 0);
				scene.add(light);
				scene.add(light.target);
				obj.lights[light.name] = light;
			}

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.05 );
			directionallight.position.set( 0, 0, 1 );
			scene.add( directionallight );
			obj.lights['logodirectional'] = directionallight;
			
			scene.add(obj.cameras['logocam']);
			obj.cameras['logocam'].position.z = 1200;
			
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['logocam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			composer.clear = false;
			obj.composers['boozembly'] = composer;
			obj.rendertargets['boozembly'] = rendertarget;			
			
			return scene;
		}(ro));
		
		ro.scenes['composer'] = (function(obj) {
			var scene = new THREE.Scene();
			
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
			
			return scene;
		}(ro));

		ro.functions = {
			updateSausages: function(pd, pt, gt) {
				var lights = pd.data.lights;
				var makkarat = pd.data.objects['makkarat'];
				
				lights['makkaraspot1'].position.x = Math.sin(pt / 1000) * 200;
				lights['makkaraspot1'].position.y = Math.sin(pt / 1000) * 300;
			
				lights['makkaraspot2'].position.x = Math.sin(pt / 1000) * 123;
				lights['makkaraspot2'].position.y = Math.sin(pt / 1000) * 654;
			
				lights['makkaraspot3'].position.x = Math.sin(pt / 1000) * 453;
				lights['makkaraspot3'].position.y = Math.sin(pt / 1000) * 234;
			
				var speed = 65;
			
				for (var i=0; i<makkarat.length; i++) {
					makkarat[i].rotation.x = (pt + makkarat[i].original_index  * 10) / 600;
					makkarat[i].rotation.z = Math.sin((pt + makkarat[i].original_index * 10) / 200) * Math.PI / 4;
				
					if (pt > i * speed) {
						makkarat[i].position.z = makkarat[i].target_position.z;
					} else if ((pt + speed) > i * speed) {
						var smoother = smootherstep(0, speed, (i * speed - pt)) * 1600;
						makkarat[i].position.z = -500 + smoother;
					} else {
						makkarat[i].position.z = makkarat[i].start_position.z;
					}
				}
			},
			updateBoozembly: function(pd, pt, gt) {
				var objects = pd.data.objects;
				var lights = pd.data.lights;
				var cameras = pd.data.cameras;

				objects['mesh_boozembly'].position.z = pt / 1000 * 20 - 200;
				objects['mesh_disorganizing'].position.z = pt / 1000 * 40 - 400;
				objects['mesh_disorganizing'].position.y = pt / 1000 * 5;
		
				var foo = 64 / 14;
				for (var i=0; i<3; i++) {
					lights['logospot' + i].target.position.x = Math.floor((pt / 1000 * foo / 8 + i) % 4) * 400 - 800;
					lights['logospot' + i].target.position.y = Math.sin(pt / 1000 * foo / 8 * Math.PI + (i * Math.PI)) * 350;
					lights['logospot' + i].position.x = lights['logospot0'].target.position.x;
					lights['logospot' + i].position.y = -lights['logospot0'].target.position.y;
					lights['logospot' + i].position.z = 400;
					lights['logospot' + i].intensity = Math.min(Math.max(0.05, pt/13000), 0.7);
				}
			
				lights['logodirectional'].intensity = 0.05;
			
				cameras['logocam'].position.x = -Math.sin(pt/1000 / 14 * Math.PI * 2) * 500;

				var cutoff = 13000;
				var remain = pd.data.partlength - cutoff;

				if (pt > cutoff) {
					var z = pt - cutoff;
					cameras['logocam'].position.z = 1200 - (z / remain) * 200; 
					lights['logodirectional'].intensity = (z / remain);

					objects['mesh_boozembly'].material.opacity = 1 - (z / remain);
					objects['mesh_disorganizing'].material.opacity = 1 - (z / remain);
					l(z/remain);
				} else {
					cameras['logocam'].position.z = 1200;
					lights['logodirectional'].intensity = 0.05;
					objects['mesh_boozembly'].material.opacity = 1;
					objects['mesh_disorganizing'].material.opacity = 1;
				}
			}
		}


		ro.player = function(partdata, parttick, tick) {
			this.functions.updateBoozembly(partdata, parttick, tick);
			this.functions.updateSausages(partdata, parttick, tick);

			var dt = global_engine.clock.getDelta();
			this.composers['makkarat'].render(dt);
			this.composers['boozembly'].render(dt);
			this.composers['composer'].render(dt);
		}
	
		return ro;
	}())
}


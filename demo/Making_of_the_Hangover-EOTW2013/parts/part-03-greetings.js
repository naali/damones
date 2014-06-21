{
	data: (function() {
		var ro = {};
		ro.partname = 'greetings';
		ro.partlength = 15800;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		ro.frame_arrays = [];
		
		ro.char_meshes = [];
		ro.char_geometries = {};
		ro.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		ro.greets = [
			"",
			"fairlight",
			"accession",
			"pyrotech",
			"extend",
			"scoopex",
			"",
		];

		ro.scenes['photoscene'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var images = [
				image_start_00, image_start_01, image_start_02, image_start_03, image_start_04, 
				image_start_05, image_start_06, image_start_07, image_start_08, image_start_09, 
				image_start_10, image_start_11, image_start_12, image_start_13, image_start_14, 
				image_start_15, image_start_16, image_start_17, image_start_18, image_start_19, 
				image_start_20, image_start_21, image_start_22, image_start_23, image_start_24, 
				image_start_25, image_start_26,	image_start_27, image_start_28, image_start_29, 
				image_start_30, image_start_31, image_start_32, image_start_33, image_start_34, 
				image_start_35, image_start_36, image_start_37, image_start_38, image_start_39, 
				image_start_40, image_start_41, image_start_42, image_start_43, image_start_44, 
				image_start_45, image_start_46, image_start_47, image_start_48, image_start_49, 
				image_start_50, image_start_51, image_start_52, image_start_53, image_start_54, 
				image_start_55, image_start_56, image_start_57, image_start_58,	image_start_59,
				image_start_60, image_start_61, image_start_62,	image_start_63,	image_start_64, 
				image_start_65, image_start_66, image_start_67, image_start_68, image_start_69,
				image_start_70, image_start_71,	image_start_72, image_start_73, image_start_74, 
				image_start_75,	image_start_76, image_start_77, image_start_78, image_start_79, 
				image_start_80, image_start_81, image_start_82
			]
			
			obj.objects['photos'] = [];

			for (var i=0; i<images.length; i++) {
				var geometry = new THREE.PlaneGeometry(400, 400, 10, 10);
				var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( images[i].src ) } );
				var mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
				mesh.position.x = 0;
				mesh.position.y = 0;
				mesh.position.z = 0;
				mesh.visible = false;
				obj.objects['photos'].push(mesh);
			}
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 300);
			scene.add(light);
			obj.lights['spot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 300);
			scene.add(light);
			obj.lights['spot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 30);
			scene.add(light);
			obj.lights['spotstill'] = light;

			obj.cameras['perspective'].position.z = 500;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));

		ro.scenes['main'] = (function(obj) {
			var scene = new THREE.Scene();
			
			for (var i=0; i<obj.chars.length; i++) {
				var c = obj.chars.charAt(i);
				
				if (c !== ' ') {
					if (!obj.char_geometries[c]) {
						obj.char_geometries[c] = new THREE.TextGeometry(c, {
							size: 120,
							height: 15,
							curveSegments: 8,
							font: 'rustler',
							weight: 'normal',
							style: 'normal',
							bevelThickness: 1.4,
							bevelSize: 1.5,
							bevelSegments: 2, 
							bevelEnabled: true,
							bend: false
						});

						obj.char_geometries[c].computeBoundingBox();
					}
				}
			}
			
			var material = new THREE.MeshLambertMaterial({ transparent: true, color: 0xFF90FF, shininess: 1000, ambient: 0x505050});
			var is_first = true;
			
			var greetdims = {};
			
			for (var i=0; i<obj.greets.length; i++) {
				var width = 0;
				for (var cptr=0; cptr<obj.greets[i].length; cptr++) {
					var c = obj.greets[i].charAt(cptr);
					
					width += (obj.char_geometries[c].boundingBox.max.x - obj.char_geometries[c].boundingBox.min.x + 5);
				}
				
				greetdims[obj.greets[i]] = {w: width};
			}
			
			for (var g=0; g<obj.greets.length; g++) {
				var greet = obj.greets[g];
				var greetlen = 0;
				var chr_pos = [];
				
				var is_last = false;
				
				if (g == obj.greets.length-1) {
					is_last = true;
				}

				obj.frame_arrays[g] = [];
				
				for (var j=0; j<15; j++) {
					for (var i=0; i<obj.chars.length; i++) {
						var c = obj.chars.charAt(i);
						
						var pos = {};
						
						if (c==greet.charAt(j)) {
							var hc_width = (obj.char_geometries[c].boundingBox.max.x - obj.char_geometries[c].boundingBox.min.x + 5);

							chr_pos.push(obj.frame_arrays[g].length);
							
							var pos_x = greetdims[greet].w / 2;

							pos = { x: pos_x, y: -60, z: -100, rotm_x: 0, rotm_y: 0 };
							obj.frame_arrays[g].push(pos);
							
							if (is_first) {
								var mesh = new THREE.Mesh(obj.char_geometries[c], material);
								mesh.position.set(pos.x, pos.y, pos.z);
								obj.char_meshes.push(mesh);
								scene.add(mesh);
							}
							
							for (var posptr=0; posptr<chr_pos.length; posptr++) {
								obj.frame_arrays[g][chr_pos[posptr]].x -= hc_width;
								
								if (is_first) {
									obj.char_meshes[chr_pos[posptr]].position.x -= hc_width;
								}
							}
							
						} else {
							if (is_first || is_last) {
								pos = {
									x: 2000 - Math.random() * 4000, 
									y: 2000 - Math.random() * 4000,
									z: - Math.random() * 1000 + 1000, 
									rotm_x: Math.random() * 3 * Math.PI,
									rotm_y: Math.random() * 3 * Math.PI
								};
							} else {
								pos = { 
									x: 750 - Math.random() * 1500, 
									y: 750 - Math.random() * 1500,
									z: - Math.random() * 1000 - 400, 
									rotm_x: Math.random() * 3 * Math.PI,
									rotm_y: Math.random() * 3 * Math.PI
									};
							}
							obj.frame_arrays[g].push(pos);

							if (is_first) {
								var mesh = new THREE.Mesh(obj.char_geometries[c], material);
								mesh.position.set(pos.x, pos.y, pos.z);
								obj.char_meshes.push(mesh);
								scene.add(mesh);
							}
						}
						
					}
				}
				
				is_first = false;
			}

			geometry = new THREE.PlaneGeometry(4000, 4000/global_engine.getAspectRatio(), 10, 10);
			material = new THREE.MeshBasicMaterial({ map: global_engine.rendertargets['secondary'].target });
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = -1650;
			scene.add(mesh);
			obj.objects['photoplane'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, 160);
			scene.add(light);
			obj.lights['spot'] = light;
			
			light = new THREE.AmbientLight(0x101010);
			scene.add(light);
			obj.lights['ambient'] = light;

			obj.cameras['perspective'].position.z = 500;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
	
	
		ro.player = function(partdata, parttick, tick) {

/* Photoscene */		
			for (var i=0; i<this.objects['photos'].length; i++) {
				this.objects['photos'][i].visible = false;
				this.objects['photos'][i].position.z = 0;
			}
			
			if (tick > 2800) {
				var t = tick-2800;
				var idx = Math.floor(t/730);
				var rem = t % 730;

				this.objects['photos'][idx].visible = true;
				this.objects['photos'][idx].position.z = rem/1.9;
			}

			this.cameras['perspective'].lookAt(this.scenes['photoscene'].position);
			global_engine.renderers['main'].render(this.scenes['photoscene'], this.cameras['perspective'], global_engine.rendertargets['secondary'].target, false);

			var startframe = Math.floor(parttick/2800);
			var nextframe = startframe + 1;
			var dt = parttick - startframe * 2800;
			var foo = 0;
			var start = 0;
			var stop = 0;

			var start_rotm_x = 0;
			var stop_rotm_x = 0;
			var start_rotm_y = 0;
			var stop_rotm_y = 0;
			var ss = smoothstep(0, 2800, dt);
			
			if (startframe < this.frame_arrays.length-1) {
				for (var i=0; i<this.frame_arrays[startframe].length; i++) {
					start = this.frame_arrays[startframe][i].x;
					stop = this.frame_arrays[nextframe][i].x;

					start_rotm_x = this.frame_arrays[startframe][i].rotm_x;
					stop_rotm_x = this.frame_arrays[nextframe][i].rotm_x;

					start_rotm_y = this.frame_arrays[startframe][i].rotm_y;
					stop_rotm_y = this.frame_arrays[nextframe][i].rotm_y;


					this.char_meshes[i].position.x = start + (stop-start) * ss;
					this.char_meshes[i].rotation.x = start_rotm_x + (stop_rotm_x - start_rotm_x) * ss;
					
					start = this.frame_arrays[startframe][i].y;
					stop = this.frame_arrays[nextframe][i].y;
					this.char_meshes[i].position.y = start + (stop-start) * ss;
					this.char_meshes[i].rotation.y = start_rotm_y + (stop_rotm_y - start_rotm_y) * ss;
					
					start = this.frame_arrays[startframe][i].z;
					stop = this.frame_arrays[nextframe][i].z;
					this.char_meshes[i].position.z = start + (stop-start) * ss;
				}
			}
			
			this.lights['spot'].position.x = Math.sin(tick/1000) * 1023;
			this.lights['spot'].position.y = Math.cos(tick/2000) * 300;
			
			this.cameras['perspective'].lookAt(this.scenes['main'].position);
			
			global_engine.renderers['main'].render(this.scenes['main'], this.cameras['perspective']);

		}
	
		return ro;
	}())
}

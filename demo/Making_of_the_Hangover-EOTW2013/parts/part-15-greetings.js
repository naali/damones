{
	data: (function() {
		var ro = {};
		ro.partname = 'greetings';
		ro.partlength = 16000;
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
			"accession",
			"fairlight",
			"extend",
			"pyrotech",
			"kewlers",
			"byterapers",
			"hirmu",
			"scoopex",
			"",
		];
		
		ro.scenes['main'] = (function(obj) {
			var scene = new THREE.Scene();
			
			for (var i=0; i<obj.chars.length; i++) {
				var c = obj.chars.charAt(i);
				
				if (c !== ' ') {
					if (!obj.char_geometries[c]) {
						obj.char_geometries[c] = new THREE.TextGeometry(c, {
							size: 75,
							height: 15,
							curveSegments: 8,
							font: 'ranchers',
							weight: 'normal',
							style: 'normal',
							bevelThickness: 1.4,
							bevelSize: 0.5,
							bevelSegments: 6, 
							bevelEnabled: false,
							bend: false
						});

						obj.char_geometries[c].computeBoundingBox();
					}
				}
			}
			
			var material = new THREE.MeshPhongMaterial( { color: 0x45abec } );
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

				obj.frame_arrays[g] = [];
				
				for (var j=0; j<15; j++) {
					for (var i=0; i<obj.chars.length; i++) {
						var c = obj.chars.charAt(i);
						
						var pos = {};
						
						if (c==greet.charAt(j)) {
							var hc_width = (obj.char_geometries[c].boundingBox.max.x - obj.char_geometries[c].boundingBox.min.x + 5);

							chr_pos.push(obj.frame_arrays[g].length);
							
							var pos_x = greetdims[greet].w / 2;

							pos = { x: pos_x, y: -30, z: -100, rotm_x: 0, rotm_y: 0 };
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
							pos = { 
								x: 750 - Math.random() * 1500, 
								y: 750 - Math.random() * 1500,
								z: - Math.random() * 1000 - 400, 
								rotm_x: Math.random() * 3 * Math.PI,
								rotm_y: Math.random() * 3 * Math.PI
								};
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

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, 160);
			scene.add(light);
			obj.lights['spot'] = light;
			
			light = new THREE.AmbientLight(0x101010);
			scene.add(light);
			obj.lights['ambient'] = light;

			obj.cameras['perspective'].position.z = 300;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {
			var startframe = Math.floor(parttick/3000);
			var nextframe = startframe + 1;
			var dt = parttick - startframe * 3000;
			var foo = 0;
			var start = 0;
			var stop = 0;

			var start_rotm_x = 0;
			var stop_rotm_x = 0;
			var start_rotm_y = 0;
			var stop_rotm_y = 0;
			var ss = smoothstep(0, 3000, dt);
			
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
			

			this.cameras['perspective'].position.x = 0.25*Math.sin(tick/1000) * 300;
			this.cameras['perspective'].position.y = 0;
			
			this.lights['spot'].position.x = Math.sin(tick/1000) * 1023;
			this.lights['spot'].position.y = Math.cos(tick/2000) * 300;
			
			this.cameras['perspective'].lookAt(this.scenes['main'].position);
			
			global_engine.renderers['main'].render(this.scenes['main'], this.cameras['perspective']);
		}
	
		return ro;
	}())
}

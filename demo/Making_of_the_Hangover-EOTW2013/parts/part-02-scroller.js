{
	data: (function() {
		var ro = {};
		ro.partname = 'scroller';
		ro.partlength = 21500;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		ro.frame_arrays = [];
		
		ro.char_meshes = [];
		ro.char_geometries = {};
		ro.char_start_positions = []
		ro.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!?:;-_åäöÅÄÖ*#()&/=+1234567890';
		ro.scrolltext = "Hey milkmen, el Damones presents sumthing. Unalcoholic familymembers show their best parts. code: Kakka, Bionik - texts: Hoffi - music: T-101 - gfx: Hypo - photos: Norppa, Mr.Bean";

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
					try {

					if (!obj.char_geometries[c]) {
						obj.char_geometries[c] = new THREE.TextGeometry(c, {
							size: 60,
							height: 20,
							curveSegments: 8,
							font: 'rustler',
							weight: 'normal',
							style: 'normal',
							bevelThickness: 5,
							bevelSize: 5,
							bevelSegments: 16, 
							bevelEnabled: true,
							bend: false
						});

						obj.char_geometries[c].computeBoundingBox();
					}
					
					} catch (e) {
						console.log(e);
					}
				}
			}
			
			
			var material = new THREE.MeshLambertMaterial({ transparent: true, color: 0xFF90FF, shininess: 1000, ambient: 0x505050});

			var is_first = true;
			
			var scrollwidth = 0;
			
			for (var cptr=0; cptr<obj.scrolltext.length; cptr++) {
				var c = obj.scrolltext.charAt(cptr);

				if (c !== ' ') {
					scrollwidth += (obj.char_geometries[c].boundingBox.max.x - obj.char_geometries[c].boundingBox.min.x + 5);
				} else {
					scrollwidth += (obj.char_geometries['N'].boundingBox.max.x - obj.char_geometries['N'].boundingBox.min.x + 5);
				}
			}
			
			var x_pos = 1000;
			
			for (var j=0; j<obj.scrolltext.length; j++) {
				var c = obj.scrolltext.charAt(j);
				
				var pos = {};
				var hc_width = 0;
				
				if (c !== ' ') {
					hc_width = (obj.char_geometries[c].boundingBox.max.x - obj.char_geometries[c].boundingBox.min.x + 5);
				} else {
					hc_width = (obj.char_geometries['N'].boundingBox.max.x - obj.char_geometries['N'].boundingBox.min.x + 5);
				}
				
				var mesh = new THREE.Mesh(obj.char_geometries[c], material);
				
				pos = {x: x_pos, y: 0, z: 0, rot_y: 0};
				
				mesh.position.set(pos.x, pos.y, pos.z);
				obj.char_meshes.push(mesh);
				scene.add(mesh);
				
				obj.char_start_positions.push(pos);

				x_pos += hc_width;
			}
			
			geometry = new THREE.PlaneGeometry(1000, 1000/global_engine.getAspectRatio(), 10, 10);
			material = new THREE.MeshBasicMaterial({ map: global_engine.rendertargets['secondary'].target });
			mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
			obj.objects['photoplane'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, 160);
			scene.add(light);
			obj.lights['spot'] = light;
			
			light = new THREE.DirectionalLight(0xFFFFFF);
			light.position.set(0, 1, 0);
			scene.add(light);
			obj.lights['directional'] = light;
			
			light = new THREE.AmbientLight(0xFFFFFF);
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

/* Scroller */
		
			for (var i=0; i<this.scrolltext.length; i++) {
				this.char_meshes[i].position.y = Math.sin(i/3 + parttick/730)*100 * Math.sin(i/3 + parttick/440);
				this.char_meshes[i].position.x = this.char_start_positions[i].x - parttick/2 + (Math.sin(parttick/208) * 50 );
				this.char_meshes[i].rotation.x = Math.cos(i/.354 + parttick/123) / 3;
				this.char_meshes[i].rotation.z = Math.cos(parttick/100) / 2;
			}
			
			this.lights['spot'].position.x = Math.sin(tick/1000) * 1023;
			this.lights['spot'].position.y = Math.cos(tick/2000) * 300;
			
			this.cameras['perspective'].lookAt(this.scenes['main'].position);
			
			global_engine.renderers['main'].render(this.scenes['main'], this.cameras['perspective']);
		}
	
		return ro;
	}())
}

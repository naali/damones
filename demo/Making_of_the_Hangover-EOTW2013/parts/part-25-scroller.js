{
	data: (function() {
		var ro = {};
		ro.partname = 'scroller';
		ro.partlength = 10000;
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
		ro.scrolltext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in quam felis, nec imperdiet diam. Maecenas dapibus libero sit amet turpis aliquam nec faucibus nisi facilisis. Sed porta faucibus mauris. Fusce sed justo sapien. In sit amet tortor massa. Donec adipiscing leo ut lectus cursus ut facilisis quam viverra. Etiam id ligula quam. Suspendisse at nulla sem. Maecenas laoreet justo ut quam sodales ac sagittis nibh rutrum. Praesent id enim a sapien molestie sagittis. Nullam vel sem at leo facilisis mattis. Cras ut vulputate dolor. Sed iaculis magna id elit volutpat mattis gravida elit porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

		ro.scenes['main'] = (function(obj) {
			var scene = new THREE.Scene();
			
			for (var i=0; i<obj.chars.length; i++) {
				var c = obj.chars.charAt(i);
				
				if (c !== ' ') {
					try {

					if (!obj.char_geometries[c]) {
						obj.char_geometries[c] = new THREE.TextGeometry(c, {
							size: 55,
							height: 15,
							curveSegments: 8,
							font: 'rustler',
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
					
					} catch (e) {
						console.log(e);
					}
				}
			}
			
			
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_wood.src )  } );

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
			
			var x_pos = 0;
			
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

			var cubeimages = THREE.ImageUtils.loadTextureCube( [
				image_skybox_posX.src,
				image_skybox_negX.src,
				image_skybox_posY.src,
				image_skybox_negY.src,
				image_skybox_posZ.src,
				image_skybox_negZ.src,
			] );
			
			cubeimages.format = THREE.RGBFormat;
			
			var shader = THREE.ShaderLib['cube'];
			shader.uniforms['tCube'].value = cubeimages;
			
			material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			});
			
			mesh = new THREE.Mesh( new THREE.CubeGeometry(500, 500, 500), material );
			scene.add(mesh);


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

			obj.cameras['perspective'].position.z = 300;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {
		
			for (var i=0; i<this.scrolltext.length; i++) {
				this.char_meshes[i].position.y = Math.sin(i/3 + parttick/700)*100 * Math.sin(i/3 + parttick/440);
				this.char_meshes[i].position.x = this.char_start_positions[i].x - parttick/2 + (Math.sin(parttick/100) * 50 );
				this.char_meshes[i].rotation.x = Math.cos(i/.354 + parttick/123) / 3;
				this.char_meshes[i].rotation.z = Math.cos(parttick/100) / 2;
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

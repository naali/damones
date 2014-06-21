{
	data: (function() {
		var ro = {};
		ro.partname = 'end of the world 2014';
		ro.partlength = (2 * 60 + 20) * 1000 * 100;
		ro.cameras = {
			'bottlecam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'scrollercam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'ortho': new THREE.OrthographicCamera(global_engine.width / -2, global_engine.width / 2, global_engine.height / 2, global_engine.height / -2, 1, 1000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		
		ro.scenes['bottles'] = (function(obj) {
			var scene = new THREE.Scene();
			
			obj.cameras['bottlecam'].position.z = 0;
			scene.add(obj.cameras['bottlecam']);
			
			obj.objects['bottles'] = [];
			
			var colortable = [0xff0c00, 0xff6d00, 0xffda00, 0xfcff01, 0xb0f909, 0x47cd17, 0x00af2f, 0x00ba60, 0x00e5b8, 0x00f7ff, 0x00f7ff, 0x0030a6, 0x00008b, 0x350091, 0xc100b4, 0xff11ce];
			var materials = [];
			
			for (var i=0; i<colortable.length; i++) {
				var material = new THREE.MeshLambertMaterial({ transparent: false, color: colortable[i], shininess: 1000, ambient: 0x000000});		
				materials.push(material);
			}
						
			for (var i=0; i<5000; i++) {
				var mesh = new THREE.Mesh(object_pullo.children[1].geometry, materials[Math.floor(Math.random()*materials.length)]);
				mesh.position.y = Math.random() * 1000 - 500;
				mesh.position.x = Math.random() * 1000 - 500;
				mesh.position.z = Math.random() * 1000 - 500;
				mesh.scale.x = 3;
				mesh.scale.y = 3;
				mesh.scale.z = 3;
				
				mesh.rotation.x = Math.random() * Math.PI * 2;
				mesh.rotation.y = Math.random() * Math.PI * 2;
				mesh.rotation.z = Math.random() * Math.PI * 2;
				scene.add(mesh);
				obj.objects['bottles'][i] = mesh;
			}

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['directionallight'] = directionallight;
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.castShadow = false;
			light.position.set(200,200,400);
			scene.add(light);
			obj.lights['star-spot'] = light;

			scene.add(obj.cameras['bottlecam']);
			
			return scene;
		}(ro));
		
		ro.scenes['logo'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneGeometry(1024, 199, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_damones.src ), transparent: true } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 500;
			scene.add(mesh);
			obj.objects['logo'] = mesh;
			
			geometry = new THREE.PlaneGeometry(global_engine.getWidth(), global_engine.getHeight(), 1, 1);
			material = new THREE.MeshBasicMaterial({ map: global_engine.rendertargets['secondary'].target });
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			scene.add(mesh);
			obj.objects['bottleplane'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['logospot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['logospot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['logospot3'] = light;
			
			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['logodirectional'] = directionallight;
			
			scene.add(obj.cameras['logocam']);
			obj.cameras['logocam'].position.z = 1000;
			
			return scene;
		}(ro));
		
		ro.scenes['scroller'] = (function(obj) {
			var scene = new THREE.Scene();
			
			obj.objects['charmap'] = [];
			
			for (var i=0; i<256; i++) {
				var chardata = [];
				
				for (var j=0; j<16; j++) {
					var charline = raw_TopazPlus[i * 16 + j];
					var map = '';
					
					for (var k=0; k<8; k++) {
						if (charline & 0x80) {
							chardata.push(1);
							map += '1';
						} else {
							chardata.push(0);
							map += '0';
						}
						charline = charline << 1;
					}
				}
				
				obj.objects['charmap'].push(chardata);
			}
			console.log(obj.objects['charmap'][65]);

			obj.objects['scrolltext'] = '                        The drunken hobos are back! This time we would like to send the best birthday wishes to all the heroes at The End of The World 2014!        Zados always says that the only thing a demo needs is a scroller! aBHO says fuck you to all you nerds and drunks out there. We grab titties\'n\'ass if we want to, just like big boss Zados does. Need more beer? Kakka will helicopter you to the secret stash. Oh wait, there\'s no stash, we drank it all. Duncan passed out already - that wanky elevetor lamer. Where are some lamers we can puke on?!?            Credits for this eye cancer goes                Code: Kakka           Music: Abaddon & Tempest            Font: dMG...            Greetings fly to Extend, Scoopex, Komplex, Pyrotech, Dekadence, Fairlight, TRSi, HiRMU, Accession, Kewlers, Primitive, Darklite, CNCD, Byterapers, Orange, flo, MFX and all the rest!                    This message will now repeat.....................................                ';
			obj.objects['scrollpointer'] = 0;
			
			var geometry = new THREE.CubeGeometry(8, 8, 8);
			var colortable = [0x2f8cce, 0x479bd6, 0x67aee3, 0x8ac4f0, 0xaed9fd, 0xcfecff, 0xf2ffff, 0xfafefd, 0x9b751c, 0xae7000, 0xe1a603, 0xe6b529, 0xedc75e, 0xf4db97, 0xf9eecd, 0xfefcf8];
			var materials = [];
			
			for (var i=0; i<colortable.length; i++) {
				var material = new THREE.MeshBasicMaterial({ color: colortable[i] });
				materials.push(material);
			}
			
			obj.objects['scrollcubes'] = [];
			
			for (var i=0; i<30; i++) {
				for (var j=0; j<16; j++) {
					for (var k=0; k<8; k++) {
						var mesh = new THREE.Mesh(geometry, materials[j]);
						mesh.position.x = i * 10 * 8 + k * 10;
						mesh.position.y = -j * 10;
						mesh.position.z = 0;
						scene.add(mesh);
						obj.objects['scrollcubes'].push(mesh);
					}
				}
			}

			geometry = new THREE.PlaneGeometry(global_engine.getWidth(), global_engine.getHeight(), 1, 1);
			material = new THREE.MeshBasicMaterial({ map: global_engine.rendertargets['tertiary'].target });
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			mesh.scale.x = 1.5;
			mesh.scale.y = 1.5;
			scene.add(mesh);
			obj.objects['bottlelogoplane'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['cubespot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['cubespot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['cubespot3'] = light;
			
			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['cubedirectional'] = directionallight;
			
			scene.add(obj.cameras['scrollercam']);
			obj.cameras['scrollercam'].position.z = 1000;
			
			return scene;
		}(ro));
		
		ro.player = function(partdata, parttick, tick) {
			this.cameras['bottlecam'].position.x = Math.sin(tick/1000) * 70;
			this.cameras['bottlecam'].position.y = Math.sin(tick/700) * 50;
			this.cameras['bottlecam'].position.z = Math.sin(tick/800) * 40;

			this.cameras['bottlecam'].rotation.x = Math.sin(tick/1200);
			this.cameras['bottlecam'].rotation.y = Math.cos(tick/1000);
			this.cameras['bottlecam'].rotation.z = Math.sin(tick/809);
			
			this.objects['logo'].position.z = Math.sin(tick/200) * 400 + 500 + 1;
			this.objects['logo'].rotation.z = Math.sin(tick/12300) * Math.PI * 2 * Math.cos(tick/9000) * Math.PI * 2;
			
			var scrollpos = parttick;
			
			var scrollpos_x_sin = (Math.sin(parttick/500) * Math.cos(parttick/700) * 400) + parttick*2;
			
			var textpos = Math.floor(scrollpos_x_sin/200);
			var scrollspeed_remainder = textpos - (scrollpos_x_sin/200);
			
			var line_ypos = Math.sin(parttick/100) * 100 - 100 + 16 * 10;
			var line_zpos = Math.cos(parttick/1234) * 100 + 110;
			
			var cuberot_z = Math.sin(parttick/123) * Math.PI * 2;
			var cuberot_x = Math.cos(parttick/154) * Math.PI * 4;
			
			for (var i=0; i<30; i++) {
				var c = this.objects['scrolltext'].charAt((i + textpos) % this.objects['scrolltext'].length);
				var charmapdata = this.objects['charmap'][c.charCodeAt(0)];
				
				var charz = Math.sin((parttick)/200 + i/10) * 300 + 300;
				
				for (var j=0; j<16; j++) {
					for (var k=0; k<8; k++) {
						if (charmapdata[j*8 + k]) {
							this.objects['scrollcubes'][k + j*8 + i*16*8].visible = true;
						} else {
							this.objects['scrollcubes'][k + j*8 + i*16*8].visible = false;
						}
						
						var posx = i * 10 * 8 + k * 10 - (15*10*8);
						var spos = -scrollspeed_remainder * 80;

						this.objects['scrollcubes'][k + j*8 + i*16*8].position.x = posx - spos;
						this.objects['scrollcubes'][k + j*8 + i*16*8].position.y = -j * 10 + line_ypos;;
						this.objects['scrollcubes'][k + j*8 + i*16*8].position.z = line_zpos + charz;

						this.objects['scrollcubes'][k + j*8 + i*16*8].rotation.x = cuberot_x;
						this.objects['scrollcubes'][k + j*8 + i*16*8].rotation.z = cuberot_z;

//						this.objects['scrollcubes'][k + j*8 + i*16*8].position.y = -j * 10 * (Math.sin(parttick/1000 + k/10) * 2 - 1);
					}
				}
			}
			
			global_engine.renderers['main'].render(this.scenes['bottles'], this.cameras['bottlecam'], global_engine.rendertargets['secondary'].target, false);

			this.objects['bottleplane'].material.needsUpdate = true;

			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam'], global_engine.rendertargets['tertiary'].target, false);

			this.objects['bottlelogoplane'].material.needsUpdate = true;

//			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
			global_engine.renderers['main'].render(this.scenes['scroller'], this.cameras['scrollercam']);
		}
	
		return ro;
	}())
}


{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2015 - intro';
		ro.partlength = Math.floor(1000 * 15.24);
		ro.cameras = {
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['logo'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1920, 1080, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_boozembly.src ), transparent: true } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 500;
			scene.add(mesh);
			obj.objects['logo'] = mesh;

			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_disorganizing.src ), transparent: true } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 500;
			scene.add(mesh);
			obj.objects['disorg'] = mesh;

			
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

		ro.player = function(partdata, parttick, tick) {
			this.objects['logo'].position.z = -500 + 500 * smoothstep(0, 10000, tick);
			this.objects['disorg'].position.z = -500 + 300 * smoothstep(0, 10000, tick);

			this.lights['logospot1'].position.x = Math.sin(tick / 1000) * 200;
			this.lights['logospot1'].position.y = Math.sin(tick / 1000) * 300;
			
			this.lights['logospot2'].position.x = Math.sin(tick / 1000) * 123;
			this.lights['logospot2'].position.y = Math.sin(tick / 1000) * 654;
			
			this.lights['logospot3'].position.x = Math.sin(tick / 1000) * 453;
			this.lights['logospot3'].position.y = Math.sin(tick / 1000) * 234;
			
			if (tick < 1000) {
				this.objects['logo'].material.opacity = (tick/1000);

				if (tick > 200 && tick < 600) {
					var blink = tick % 2;
					
					if (blink == 0) {
						this.objects['logo'].material.opacity = (tick/1000);
					} else {
						this.objects['logo'].material.opacity = 0;
					}
				}
				this.objects['disorg'].material.opacity = 0;
			} else if (tick > 7000) {
				this.objects['logo'].material.opacity = 1 - (tick-7000) / 1000;
				this.objects['disorg'].material.opacity = 1 - (tick-7000) / 1000;
			} else {
				this.objects['logo'].material.opacity = 1;
			}
			
			if (tick > 1000 && tick < 2000) {
				if (tick > 1000 && tick < 1400) {
					var blink = tick % 2;
					
					if (blink == 0) {
						this.objects['disorg'].material.opacity = ((tick-1000)/1000);
					} else {
						this.objects['disorg'].material.opacity = 0;
					}
				} else {
					this.objects['disorg'].material.opacity = ((tick-1000)/1000);
				}
			}
			
			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


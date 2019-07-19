{
	data: (function() {
		var ro = {};
		ro.partname = 'EOTW 2016 - intro';
		ro.prewarm = true;
		ro.partlength = 15000;
		ro.cameras = {
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		ro.vars = {};

		ro.scenes['logo'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1024, 1024, 1, 1);
			
			obj.vars['camels'] = 30;

			for (var i=0; i<obj.vars['camels']; i++) {
				var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_camel.src ), transparent: true } );
				material.opacity = 1 - i / obj.vars['camels'];
				var mesh = new THREE.Mesh(geometry, material);
				

				mesh.position.x = 0;
				mesh.position.y = 0;
				mesh.position.z =  -300 - i * 100;
				scene.add(mesh);
				obj.objects['mesh_' + i] = mesh;
			}
			
			

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
			for (var i=0; i<this.vars['camels']; i++) {
				this.objects['mesh_' + i].position.x = (1920 / 8) * Math.sin((parttick + (i * 123)) / 345);
				this.objects['mesh_' + i].position.y = (1080 / 8) * (Math.cos((parttick + (i * 585)) / 794));
				this.objects['mesh_' + i].position.z = 500 - (i * 175 - ((Math.sin(parttick / (i * 74)) * 31)) )

//				this.objects['mesh_' + i].position.z = 500 - (i * 175 - ((Math.sin(parttick / (i * 74)) * 31)) )
				
			}
			
			this.lights['logospot1'].position.x = Math.sin(tick / 1000) * 200;
			this.lights['logospot1'].position.y = Math.sin(tick / 1000) * 300;
			
			this.lights['logospot2'].position.x = Math.sin(tick / 1000) * 123;
			this.lights['logospot2'].position.y = Math.sin(tick / 1000) * 654;
			
			this.lights['logospot3'].position.x = Math.sin(tick / 1000) * 453;
			this.lights['logospot3'].position.y = Math.sin(tick / 1000) * 234;

			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


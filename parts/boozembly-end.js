{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2014 - end';
		ro.partlength = 1000 * 8;
		ro.cameras = {
			'dunkkucam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['dunkku'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneGeometry(1920, 1920, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_dunkku_grillilla.src ), transparent: false } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 500;
			scene.add(mesh);
			obj.objects['dunkku'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['dunkkuspot1'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['dunkkuspot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['dunkkuspot3'] = light;

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['dunkkudirectional'] = directionallight;
			
			scene.add(obj.cameras['dunkkucam']);
			obj.cameras['dunkkucam'].position.z = 1000;
			
			return scene;
		}(ro));

		ro.player = function(partdata, parttick, tick) {
			this.objects['dunkku'].position.z = 500;
//			this.objects['dunkku'].position.y = smoothstep(0, 1000, parttick);
			
/*
			this.lights['dunkkuspot1'].position.x = Math.sin(tick / 1000) * 200;
			this.lights['dunkkuspot1'].position.y = Math.sin(tick / 1000) * 300;
			
			this.lights['dunkkuspot2'].position.x = Math.sin(tick / 1000) * 123;
			this.lights['dunkkuspot2'].position.y = Math.sin(tick / 1000) * 654;
			
			this.lights['dunkkuspot3'].position.x = Math.sin(tick / 1000) * 453;
			this.lights['dunkkuspot3'].position.y = Math.sin(tick / 1000) * 234;
*/			

			global_engine.renderers['main'].render(this.scenes['dunkku'], this.cameras['dunkkucam']);
		}
	
		return ro;
	}())
}


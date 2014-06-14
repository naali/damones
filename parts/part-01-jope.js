{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2014 - start';
		ro.partlength = 1000 * 2000;
		ro.cameras = {
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		
		
		ro.scenes['logo'] = (function(obj) {
			var imagenamesarr = [
				{ name: image_boozembly.src, width: 1920, height: 1080 },
				{ name: image_dunkku_grillilla.src, width: 1920, height: 1920 },
				{ name: image_dunkku_warrella.src, width: 1920, height: 1440 }				
			];

			obj.objects['images'] = [];
			
			for (var i =0; i<imagenamesarr.length; i++) {
				var geometry = new THREE.PlaneGeometry(imagenamesarr[i].width, imagenamesarr[i].height, 1, 1);
				var material = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture(image_dunkku_grillilla.src), transparent: true} );
				var mesh = new THREE.Mesh(geometry, material);
				obj.objects['images'].push(mesh);
			}
			
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_boozembly.src ), transparent: true } );
			var mesh = new THREE.Mesh(geometry, material);		
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 500;
			scene.add(mesh);
			
			obj.objects['logo'] = mesh;
			
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
			this.objects['logo'].position.z = -400 + Math.sin(tick/200) * 10;
//			this.objects['logo'].position.z = Math.sin(tick/200) * 400 + 500 + 1;
//			this.objects['logo'].rotation.z = Math.sin(tick/12300) * Math.PI * 2 * Math.cos(tick/9000) * Math.PI * 2;
			
			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


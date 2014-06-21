{
	data: (function() {
		var ro = {};
		ro.partname = 'end';
		ro.partlength = 13000;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['main'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneGeometry(1024, 576, 10, 10);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_pohja.src ) } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = 0;
			mesh.visible = false;
			scene.add(mesh);
			obj.objects['pohja'] = mesh;
			
			material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(image_pontto.src ), transparent: true});
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = 1;
			mesh.visible = false;
			scene.add(mesh);
			obj.objects['pontto'] = mesh;
			
			material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(image_damones.src ), transparent: true});
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = 2;
			mesh.visible = false;
			scene.add(mesh);
			obj.objects['damones'] = mesh;
			
			material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(image_hangover.src ), transparent: true});
			mesh = new THREE.Mesh(geometry, material);
			mesh.position.z = 3;
			mesh.visible = false;
			scene.add(mesh);
			obj.objects['hangover'] = mesh;
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, 160);
			light.intensity = 7;
			scene.add(light);
			obj.lights['spot'] = light;
			
			light = new THREE.AmbientLight(0x101010);
			scene.add(light);
			obj.lights['ambient'] = light;
			
			light = new THREE.DirectionalLight(0xFFFFFF);
			light.position.set(0,0,1000);
			light.intensity = 0.5;
			scene.add(light);
			obj.lights['directional'] = light;

			obj.cameras['perspective'].position.z = 900;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {
			this.objects['pohja'].visible = false;
			this.objects['pontto'].visible = false;
			this.objects['damones'].visible = false;
			this.objects['hangover'].visible = false;

			if (parttick > 600) {
				this.objects['pohja'].visible = true;
			}
			
			if (parttick > 800) {
				this.objects['damones'].visible = true;
			}
			
			if (parttick > 1000) {
				this.objects['hangover'].visible = true;
			}
			
			if (parttick > 1400) {
				this.objects['pontto'].visible = true;
			}
			
			if (parttick > 4000) {
				this.lights['directional'].intensity = 0.5 - ((parttick-4000) / 2000);
				this.lights['spot'].intensity = 7 - ((parttick-4000) / 2000);
			}
			
			this.lights['spot'].position.x = Math.sin(tick/1000) * 712;
			this.lights['spot'].position.y = Math.cos(tick/2000) * 431;
			
			this.cameras['perspective'].lookAt(this.scenes['main'].position);
			
			global_engine.renderers['main'].render(this.scenes['main'], this.cameras['perspective']);
		}
	
		return ro;
	}())
}

{
	data: (function() {
		var ro = {};
		ro.partname = 'testi';
		ro.partlength = 10000;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'perspective-insert': new THREE.PerspectiveCamera(45, global_engine.rendertargets['secondary'].getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		ro.scenes['insert'] = (function(obj) {
			var scene = new THREE.Scene();
			var geometry = new THREE.CubeGeometry(15, 15, 15, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_test.src ) });
			
			obj.objects['cubes'] = [];
			
			for (var i=0; i<1000; i++) {
				var mesh =  new THREE.Mesh(geometry, material);
				mesh.position.y = 50 - ( Math.random() * 300 );
				mesh.position.x = 50 - ( Math.random() * 300 );
				mesh.position.z = 50 - ( Math.random() * 300 );
				mesh.rotspeed = { x: Math.random(), y: Math.random(), z: Math.random() };
				
				obj.objects['cubes'].push(mesh);
				
				scene.add(mesh);
			}
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, -160);
			scene.add(light);
			obj.lights['spot'] = light;
			
			obj.cameras['perspective-insert'].position.z = 200;
			scene.add(obj.cameras['perspective-insert']);
		
			return scene;
		}(ro));
		
		ro.scenes['container'] = (function(obj) {
			var scene = new THREE.Scene();
			var geometry = new THREE.CubeGeometry(100, 100, 100, 1, 1);
			var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, map: global_engine.rendertargets['secondary'].target });

			var mesh = new THREE.Mesh(geometry, material);
			
			obj.objects['insertcontainer'] = mesh;
			scene.add(mesh);
			
			var light = new THREE.DirectionalLight(0xFFFFFF);
			light.position.set(0, 0, 1);
			scene.add(light);
			obj.lights['directional'] = light;
			
			obj.cameras['perspective'].position.z = 200;
			scene.add(obj.cameras['perspective']);
			
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {

// setup & render insert scene
			this.cameras['perspective-insert'].position.x = Math.sin(tick/1000) * 300;
			this.cameras['perspective-insert'].position.y = 0;
			
			for (var i=0; i<this.objects['cubes'].length; i++) {
				this.objects['cubes'][i].rotation.x = tick/500*this.objects['cubes'][i].rotspeed.x;
				this.objects['cubes'][i].rotation.y = tick/500*this.objects['cubes'][i].rotspeed.y;
				this.objects['cubes'][i].rotation.z = tick/500*this.objects['cubes'][i].rotspeed.z;
			}
	
			this.lights['spot'].position.x = Math.sin(tick/1000) * 300;
			this.lights['spot'].position.y = Math.cos(tick/2000) * 300;
			
			this.cameras['perspective-insert'].lookAt(this.scenes['insert'].position);
			global_engine.renderers['main'].render(this.scenes['insert'], this.cameras['perspective-insert'], global_engine.rendertargets['secondary'].target, false);

			
// and then handle container scene			

			this.objects['insertcontainer'].material.needsUpdate = true;
			
//			this.objects['insertcontainer'].rotation.x = tick/1000;
			this.objects['insertcontainer'].rotation.y = Math.sin(tick/321);

			this.cameras['perspective'].lookAt(this.scenes['container'].position);
			global_engine.renderers['main'].render(this.scenes['container'], this.cameras['perspective']);

		}
	
		return ro;
	}())
	
	
}

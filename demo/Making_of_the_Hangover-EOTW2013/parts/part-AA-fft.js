{
	data: (function() {
		var ro = {};
		ro.partname = 'template';
		ro.partlength = 10000;
		ro.cameras = [
			new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		];
		ro.scenes = [];
		ro.lights = [];
		ro.objects = [];
		ro.scenes[0] = (function(obj) {
			var scene = new THREE.Scene();
			var geometry = new THREE.CubeGeometry(10, 10, 10, 1, 1);
			var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_test.src ) } );
			
			var fbcount = global_engine.getFrequencyBinCount();
			
			for (var i=0; i<fbcount; i++) {
				var mesh =  new THREE.Mesh(geometry, material);
				mesh.position.y = ( i % 16 ) * 20 - 20*8;
				mesh.position.x = Math.floor(i / 16) * 20 - 8 * 20;
				
				obj.objects.push(mesh);
				
				scene.add(mesh);
			}
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, -160);
			scene.add(light);
			
			obj.lights.push(light);

			obj.cameras[0].position.z = 300;

			scene.add(obj.cameras[0]);
		
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {
			var foo = global_engine.getFloatFFTData(0.8);
			
			for (var i=0; i<foo.length; i++) {
				this.objects[i].position.z = foo[i] * 2; 
			}
			
			this.cameras[0].position.x = Math.sin(tick/1000) * 300;
			this.cameras[0].position.y = 0;
//			this.cameras[0].position.z = Math.cos(tick/1000) * 300;
			
			this.lights[0].position.x = Math.sin(tick/1000) * 1023;
			this.lights[0].position.y = Math.cos(tick/2000) * 300;
			
			this.cameras[0].lookAt(this.scenes[0].position);
			
			global_engine.renderers['main'].render(this.scenes[0], this.cameras[0]);
		}
	
		return ro;
	}())
}

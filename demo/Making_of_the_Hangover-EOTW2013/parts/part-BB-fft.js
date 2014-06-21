{
	data: (function() {
		var ro = {};
		ro.partname = 'stub';
		ro.partlength = 10000;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['main'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.TextGeometry(obj.partname, {
				size: 40,
				height: 15,
				curveSegments: 8,
				font: 'ranchers',
				weight: 'normal',
				style: 'normal',
				bevelThickness: 1.4,
				bevelSize: 0.5,
				bevelSegments: 6, 
				bevelEnabled: false,
				bend: false
			});

			geometry.computeBoundingBox();
			var material = new THREE.MeshPhongMaterial( { color: 0x45abec } );
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = (geometry.boundingBox.min.x - geometry.boundingBox.max.x) / 2;
			mesh.position.y = -20;
			scene.add(mesh);

			obj.objects['partname'] = mesh;

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(170, 330, 160);
			scene.add(light);
			obj.lights['spot'] = light;
			
			light = new THREE.AmbientLight(0x101010);
			scene.add(light);
			obj.lights['ambient'] = light;

			obj.cameras['perspective'].position.z = 300;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {

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

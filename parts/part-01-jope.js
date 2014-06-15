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
		
		var imagenamesarr = [];
		
		for(var i=1; i<10; i++){
			var name = eval('image_pic_' + i + '.src');
			var width = eval('image_pic_' + i + '.width');
			var height = eval('image_pic_' + i + '.height');
			imagenamesarr.push({name: name, width: width, height: height });	
		} 
			
			obj.objects['images'] = []; 
			
			for (var i =0; i<imagenamesarr.length; i++) {
				var geometry = new THREE.PlaneGeometry(imagenamesarr[i].width, imagenamesarr[i].height, 1, 1);
				var material = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture(imagenamesarr[i].name), transparent: true} );
				var mesh = new THREE.Mesh(geometry, material);
				mesh.start_x = -i * 150 + 1;
				mesh.start_y = -i * 23 + 1;
				mesh.start_z = -i * 100 + 1;
				mesh.position.x = mesh.start_x;
				mesh.position.y = mesh.start_y;
				mesh.position.z = mesh.start_z;
				obj.objects['images'].push(mesh);
			}
			
			var scene = new THREE.Scene();		
			for (var i=0; i<obj.objects['images'].length; i++) {
			 var mesh = obj.objects['images'][i];
			
				scene.add(mesh);
			
			}
			
								
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['logospot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
		//	scene.add(light);
			obj.lights['logospot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
		//	scene.add(light);
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
		
		for (var i=0; i<this.objects['images'].length; i++) {
			i % 2 == 0 ? this.objects['images'][i].position.x = this.objects['images'][i].start_x * (parttick/1200) + (parttick/10) : this.objects['images'][i].position.x = this.objects['images'][i].start_x * (parttick/1000) + (parttick/50) ;

			
			
			
			}
			//this.objects['images'][1].position.z = -600 + Math.sin(tick/200) * 10;
			//this.objects['images'][1].rotation.z =  Math.sin(tick/11200) * Math.cos(tick/9000);
			
			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


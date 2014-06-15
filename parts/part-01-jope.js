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
		
			var scene = new THREE.Scene();			

			var textarr = [
				[
					"Boozembly",
					"Disorganizing",
					"zzzzzzzzzzzzzzzz",
					"aaaaaaaaaaaaaaaa",
					"bbbbbbbbbbbbbbbb",
				],
			];
			
			ro.objects['textarr'] = textarr;
			
			obj.objects['chargeoms'] = [];
			
			
			
			for (var i=0; i<textarr.length; i++) {
				for (var j=0; j<textarr[i].length; j++) {
					for (var k=0; k<textarr[i][j].length; k++) {
						var c = textarr[i][j].charAt(k);

						if (!obj.objects['chargeoms'][c]) {
							var geometry = new THREE.TextGeometry(c, {
								size: 40,
								height: 20,
								curveSegments: 8,
								font: 'luckiest guy',
								weight: 'normal',
								style: 'normal',
								bevelThickness: 1.4,
								bevelSize: 0.5,
								bevelSegments: 6, 
								bevelEnabled: false,
								bend: false
							});
							
							geometry.computeBoundingBox();
							geometry.width = geometry.boundingBox.min.x - geometry.boundingBox.max.x - 5;
							
							obj.objects['chargeoms'][c] = geometry;
						}
					}
				}
			}
			
			function calculateLineLength(line) {
				var len = 0;
				for (var i=0; i<line.length; i++) {
					var c = line.charAt(i);
					len += obj.objects['chargeoms'][c].width;
				}
				
				return len;
			}
			
			

			for (var i=0; i<textarr.length; i++) {
				for (var j=0; j<textarr[i].length; j++) {
					var xpos = -calculateLineLength(textarr[i][j]) / 2;
						
					for (var k=0; k<textarr[i][j].length; k++) {
						var c = textarr[i][j].charAt(k);
						var material = new THREE.MeshLambertMaterial({ transparent: true, color: 0xFFFFFF });
						var mesh = new THREE.Mesh(obj.objects['chargeoms'][c], material);
						mesh.position.x = -xpos;
						mesh.position.y = (textarr[i].length / 2) * 50 - j * 50;
						xpos += obj.objects['chargeoms'][c].width;
						mesh.position.z = 500;
						scene.add(mesh);
					}
				}
			}
			
			var imagenamesarr = [
				{ name: image_boozembly.src, width: image_boozembly.width, height: image_boozembly.height },
				{ name: image_dunkku_grillilla.src, width: image_dunkku_grillilla.width, height: image_dunkku_grillilla.height },
				{ name: image_dunkku_warrella.src, width: image_dunkku_warrella.width, height: image_dunkku_warrella.height }
			];

			obj.objects['images'] = [];
			
			for (var i =0; i<imagenamesarr.length; i++) {
				var geometry = new THREE.PlaneGeometry(imagenamesarr[i].width, imagenamesarr[i].height, 1, 1);
				var material = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture(imagenamesarr[i].name), transparent: false} );
				var mesh = new THREE.Mesh(geometry, material);
				mesh.position.x = 0;
				mesh.position.y = 0;
				mesh.position.z = -600;
				obj.objects['images'].push(mesh);
			}
			
			var mesh = obj.objects['images'][1];
			
			scene.add(mesh);
								
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
			//this.objects['images'][1].position.z = -600 + Math.sin(tick/200) * 10;
			//this.objects['images'][1].rotation.z =  Math.sin(tick/11200) * Math.cos(tick/9000);
			
			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


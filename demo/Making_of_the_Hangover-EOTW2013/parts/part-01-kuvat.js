{
	data: (function() {
		var ro = {};
		ro.partname = 'start';
		ro.partlength = 13200;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'perspective2': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['photoscene'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var images = [
				image_start_00, image_start_01, image_start_02, image_start_03, image_start_04, 
				image_start_05, image_start_06, image_start_07, image_start_08, image_start_09, 
				image_start_10, image_start_11, image_start_12, image_start_13, image_start_14, 
				image_start_15, image_start_16, image_start_17, image_start_18, image_start_19, 
				image_start_20, image_start_21, image_start_22, image_start_23, image_start_24, 
				image_start_25, image_start_26,	image_start_27, image_start_28, image_start_29, 
				image_start_30, image_start_31, image_start_32, image_start_33, image_start_34, 
				image_start_35, image_start_36, image_start_37, image_start_38, image_start_39, 
				image_start_40, image_start_41, image_start_42, image_start_43, image_start_44, 
				image_start_45, image_start_46, image_start_47, image_start_48, image_start_49, 
				image_start_50, image_start_51, image_start_52, image_start_53, image_start_54, 
				image_start_55, image_start_56, image_start_57, image_start_58,	image_start_59,
				image_start_60, image_start_61, image_start_62,	image_start_63,	image_start_64, 
				image_start_65, image_start_66, image_start_67, image_start_68, image_start_69,
				image_start_70, image_start_71,	image_start_72, image_start_73, image_start_74, 
				image_start_75,	image_start_76, image_start_77, image_start_78, image_start_79, 
				image_start_80, image_start_81, image_start_82
			]
			
			obj.objects['photos'] = [];

			for (var i=0; i<images.length; i++) {
				var geometry = new THREE.PlaneGeometry(400, 400, 10, 10);
				var material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( images[i].src ) } );
				var mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
				mesh.position.x = 0;
				mesh.position.y = 0;
				mesh.position.z = 0;
				mesh.visible = false;
				obj.objects['photos'].push(mesh);
			}
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 300);
			scene.add(light);
			obj.lights['spot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 300);
			scene.add(light);
			obj.lights['spot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 30);
			scene.add(light);
			obj.lights['spotstill'] = light;

			obj.cameras['perspective'].position.z = 500;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
		
		ro.scenes['textscene'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var texts = [
				'Damones',
				'making of',
				'the hangover'
			];
			
			obj.objects['textobjects'] = [];
			
			for (var i=0; i<texts.length; i++) {
				var geometry = new THREE.TextGeometry(texts[i], {
					size: 60,
					height: 20,
					curveSegments: 8,
					font: 'rustler',
					weight: 'normal',
					style: 'normal',
					bevelThickness: 5,
					bevelSize: 5,
					bevelSegments: 16, 
					bevelEnabled: true,
					bend: false
				});
				
				var material = new THREE.MeshLambertMaterial({ transparent: true, color: 0xFF90FF, shininess: 1000, ambient: 0x505050});
				var mesh = new THREE.Mesh(geometry, material);
				geometry.computeBoundingBox();
				mesh.position.x = mesh.start_x_pos = (geometry.boundingBox.min.x - geometry.boundingBox.max.x) / 2;
				mesh.position.y =( (geometry.boundingBox.min.y - geometry.boundingBox.max.y) / 2 ) * i * 2 - 5 * i + 40;
				mesh.position.z = 100;
				scene.add(mesh);
				obj.objects['textobjects'].push(mesh);
			}
				
			var geometry = new THREE.PlaneGeometry(1000, 1000/global_engine.getAspectRatio(), 10, 10);
			var material = new THREE.MeshBasicMaterial({ map: global_engine.rendertargets['secondary'].target });
			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
			obj.objects['photoplane'] = mesh;
			
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200,200,400);
			scene.add(light);
			obj.lights['textscene-spot'] = light;
			

			scene.add(obj.cameras['perspective2']);
			
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {

/* Photoscene */		
			for (var i=0; i<this.objects['photos'].length; i++) {
				this.objects['photos'][i].visible = false;
				this.objects['photos'][i].position.z = 0;
			}
			
			if (tick > 2800) {
				var t = tick-2800;
				var idx = Math.floor(t/730);
				var rem = t % 730;

				this.objects['photos'][idx].visible = true;
				this.objects['photos'][idx].position.z = rem/1.9;
			}

			this.cameras['perspective'].lookAt(this.scenes['photoscene'].position);
			global_engine.renderers['main'].render(this.scenes['photoscene'], this.cameras['perspective'], global_engine.rendertargets['secondary'].target, false);

/* Main */
			this.objects['photoplane'].material.needsUpdate = true;
			
			for (var i=0; i<this.objects['textobjects'].length; i++) {
				this.objects['textobjects'][i].visible = false;
				this.objects['textobjects'][i].position.x = this.objects['textobjects'][i].start_x_pos + 50 * Math.sin((tick + i*300)/1000);
			}
			
			if (tick > 8900 && tick < 9700) { 
				this.objects['textobjects'][0].visible = true; 
				this.objects['textobjects'][0].position.z = Math.sin(tick/100) * 60 + 60;
			}
			
			if (tick > 10200 && tick < 11000) {
				this.objects['textobjects'][0].visible = false;
				this.objects['textobjects'][1].visible = true;
				this.objects['textobjects'][1].position.z = Math.sin(tick/100) * 60 + 60;
			}
			
			if (tick > 11700 && tick < 12400) {
				this.objects['textobjects'][0].visible = false;
				this.objects['textobjects'][1].visible = false;
				this.objects['textobjects'][2].visible = true;
				this.objects['textobjects'][2].position.z = Math.sin(tick/100) * 60 + 60;
			}

			this.lights['textscene-spot'].position.x = 300 * Math.sin(tick/940*3);
			this.lights['textscene-spot'].position.y = 300 * Math.cos(tick/(940*6));
			
			global_engine.renderers['main'].render(this.scenes['textscene'], this.cameras['perspective']);
		}
	
		return ro;
	}())
}


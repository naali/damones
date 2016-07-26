{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - credits';
		ro.prewarm = true;
		ro.partlength =  100000;
		ro.cameras = {
			'sausagecam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000),
			'writercam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.effects = {};
		ro.composers = {};
		ro.passes = {};
		ro.rendertargets = {};
		ro.renderpasses = {};
		ro.texts = [
			{
				text: [
					" ",
					" "
				]
			},
			{
				text: [
					"Code:",
					"Kakka",
					"Croaker"
				]
			},
			{
				text: [
					"Music:",
					"Croaker"
				]
			},
			{
				text: [
					"Graphics:",
					"Croaker",
					"Roskis",
					"H7"
				]
			},
			{
				text: [
					"Photos:",
					"MrBeanGM",
					"Norppa"
				]
			},
			{
				text: [
					" "
				]
			},
			{
				text: [
					" "
				]
			},
			{
				text: [
					" "
				]
			}
		];

		ro.scenes['makkarat'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();

			var makkara_texture_images = [
				{map: image_makkaratexture2.src},
				{map: image_makkaratexture.src, bump: image_makkarabump.src},
				{map: image_makkaratexture4.src, bump: image_makkarabump4.src},
				{map: image_makkaratexture3.src, bump: image_makkarabump3.src}
			];
			
			var materials = [];
			
			for (var i=0; i<makkara_texture_images.length; i++) {
				var material;
				var map = THREE.ImageUtils.loadTexture( makkara_texture_images[i].map );
				map.flipY = false;
				
				if (makkara_texture_images[i].bump !== undefined) {
					var bump = THREE.ImageUtils.loadTexture( makkara_texture_images[i].bump );
					bump.flipY = false;
			
					material = new THREE.MeshPhongMaterial({
							map: map,
							bumpMap: bump,
							bumpScale: 1,
							transparent: false
					});
				} else {
					material = new THREE.MeshPhongMaterial({
							map: map,
							bumpMap: bump,
							bumpScale: 1,
							transparent: false
					});
				}
				
				materials.push(material);
			}

			var inner_size = 5;
			var max_sausages = 10000;
			var sausage_rad = Math.PI * 2 / 2.4;
			var sausage_angle_counter = 0;
			
			var min_z = 0;
			obj.objects['sausages'] = []; 
			
			for (var i=0; i<max_sausages; i++) {
				var prob = Math.random() * Math.min(i * 400 / max_sausages, 3);
				
				var mesh = new THREE.Mesh(geometry, materials[Math.floor(prob)]);
				var x_angle = Math.sin(sausage_angle_counter);
				var y_angle = Math.cos(sausage_angle_counter);

				var x_pos = x_angle * 40;
				var y_pos = y_angle * 40;
				var z_pos = -Math.floor(sausage_angle_counter / (Math.PI * 2)) * 30;
				mesh.rotation.set(Math.PI / 2, - Math.atan2(x_angle, y_angle) + Math.PI, 0.8);
				mesh.position.set(x_pos, y_pos, z_pos);
				mesh.orig_x = x_pos;
				mesh.orig_y = y_pos;
				mesh.orig_z = z_pos;
				scene.add(mesh);

				sausage_angle_counter += sausage_rad;
				obj.objects['sausages'].push(mesh);
			}
			
			var spotlight = new THREE.SpotLight(0xffffff, 1);
			spotlight.position.set(0, 0, 0);
			spotlight.target.position.set(0, 0, -100);
			spotlight.distance = 500;
			scene.add(spotlight.target);
			scene.add(spotlight);
			
			obj.lights['sausagespot'] = spotlight;
			
			scene.add(obj.cameras['sausagecam']);
			obj.cameras['sausagecam'].position.z = 0;
			
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['sausagecam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);
			
			var writershader = new THREE.ShaderPass( THREE.Perseily );
			writershader.uniforms['tDiffuse'].value = composer.renderTarget1;
			writershader.renderToScreen = false;
			obj.effects['perseily'] = writershader;
			composer.addPass(writershader);

			obj.composers['makkarat'] = composer;
			obj.rendertargets['makkarat'] = rendertarget;
			
			return scene;
		}(ro));
		
		ro.scenes['writer'] = (function(obj) {
			var scene = new THREE.Scene();

			var textarr = [];
			
			for (var i=0; i<obj['texts'].length; i++) {
				textarr.push(obj['texts'][i]['text']);
			}
			
			var font = new THREE.Font(jsonfont_piximisa);
			
			var fontparams = {
				size: 60,
				height: 0,
				curveSegments: 8,
				font: font,
				weight: 'normal',
				style: 'normal',
				bevelThickness: 2.5,
				bevelSize: 0.5,
				bevelSegments: 6, 
				bevelEnabled: false,
				bend: false
			}
			
			var glyphgeometries = {};
			obj.objects['writertextmeshes'] = [];
			
			for (var i=0; i<textarr.length; i++) {
				for (var j=0; j<textarr[i].length; j++) {
					for (var k=0; k<textarr[i][j].length; k++) {
						var chr = textarr[i][j].charAt(k);
						if (glyphgeometries[chr] === undefined) {
							var geometry = new THREE.TextGeometry("" + chr, fontparams);
							geometry.computeBoundingBox();
							var buffergeometry = new THREE.BufferGeometry().fromGeometry(geometry);
							glyphgeometries[chr] = geometry;
							if (chr == " ") {
								glyphgeometries[chr].width = 20;
							} else {
								glyphgeometries[chr].width = Math.abs(geometry.boundingBox.min.x - geometry.boundingBox.max.x - 5);
							}
						}
					}
				}
			}
			
			function lineLength(str, glyphs) {
				var length = 0;
				
				for (var i=0; i<str.length; i++) {
					var chr = str.charAt(i);
					length += glyphs[chr].width;
				}
				
				return length;
			}
			
			var textmaterials = {};

			for (var i=0; i<textarr.length; i++) {
				var page = textarr[i];
				
				var xpos = 0;
				var ypos = 0;
				
				var top_container = new THREE.Object3D();
				var bottom_container = new THREE.Object3D();
				
				for (var j=0; j<page.length; j++) {
					var line = page[j];
					
					if (j == 0) {
						xpos = -420;
					} else {
						xpos = 420 - lineLength(line, glyphgeometries);
					}
				
					for (var k=0; k<line.length; k++) {
						var color = 0xFFFFFF;
						var chr = line.charAt(k);
						
						if (chr == ' ') {
							xpos += glyphgeometries[chr].width;
							continue;
						}
						
						if (textmaterials['page:' + i + ':' + color] === undefined) {
							textmaterials['page:' + i + ':' + color] = new THREE.MeshPhongMaterial({ transparent: true, color: color });
						}
						
						var material = textmaterials['page:' + i + ':' + color];
						var mesh = new THREE.Mesh(glyphgeometries[chr], material);
						
						mesh.position.x = xpos;
						mesh.target_x = xpos;
						
						if (j == 0) { // first line upper left corner
							mesh.position.y = 175;
						} else { // other lines bottom right corner
							mesh.position.y = - (j + 1) * 60 + (page.length * 60) - 225;
						}
						
						mesh.position.z = 0;

						xpos += glyphgeometries[chr].width;
						mesh.material.visible = true;
						mesh.material.opacity = 1;

						if (j == 0) {
							top_container.add(mesh);
						} else {
							bottom_container.add(mesh);
						}
					}
				}
				
				scene.add(top_container);
				scene.add(bottom_container);
				obj['objects']['writertextmeshes'].push({ top: top_container, bottom: bottom_container });
			}

			var light = new THREE.DirectionalLight(0xffffff, 1);
			light.position.set(0, 0, 1);
			scene.add(light);
			
			scene.add(obj.cameras['writercam']);
			obj.cameras['writercam'].position.z = 600;
			
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['writercam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			composer.clear = false;
			obj.composers['writer'] = composer;
			obj.rendertargets['writer'] = rendertarget;			
			
			return scene;
 		}(ro));
		
		ro.scenes['composer'] = (function(obj) {		
			var scene = new THREE.Scene();

			var rendertarget = new THREE.WebGLRenderTarget(global_engine.getWidth(), global_engine.getHeight(), 
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false }
			);
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['makkarat'].renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['writer'].renderTarget2.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;

			return scene;
		}(ro));

		ro.functions = {
			updateSausages: function(pd, pt, gt) {
				var camera = pd.data.cameras['sausagecam'];
				var sausages = pd.data.objects['sausages'];
				var effect = pd.data.effects['perseily'].uniforms;

				effect.time.value =  pt / 1000;
				effect.scale.value = 1.95 + (Math.sin(pt / 1787) * 0.3);
				effect.speed.value = 0.5;
				effect.x.value = 0;
				effect.y.value = 0;

				var spotlight = pd.data.lights['sausagespot'];
				
				camera.rotation.z = -pt / 300 + (Math.sin(pt / 1499) + 0.5);
				var pos_z = pt / 30;

				for (var i=0; i<sausages.length; i++) {
					var s = sausages[i];
					var foo = Math.sin((pt + i) / 2003 * Math.PI * 2) * Math.max((s.position.distanceTo(camera.position) / 4) - 20, 0);
					
					s.position.set(s.orig_x + foo, s.orig_y, s.orig_z + pos_z - 500);
				}
			},
			updateWriter: function(pd, pt, gt) {
				var textobjects = pd.data.objects['writertextmeshes'];
				
				var pagemaxtime = 6956;
				var page = Math.floor((pt) / pagemaxtime);
				var pagetime = (pt) - page * pagemaxtime;
				var in_transitiontime = 500;
				var out_transitiontime = 500;
				
				page = page % textobjects.length;

				for (var i=0; i<textobjects.length; i++) {
					var textobject = textobjects[i].top;
					
					for (var j=0; j<textobject.children.length; j++) {
						var textmesh = textobject.children[j];
						
						if (i == page) {
							textmesh.material.visible = true;

							if (pagetime < in_transitiontime) {
								textmesh.material.opacity = pagetime / in_transitiontime;
								textmesh.position.x = textmesh.target_x + (Math.cos(pagetime / in_transitiontime * Math.PI) + 1) / 2 * 400;
							} else if (pagetime > (pagemaxtime - out_transitiontime)) {
								textmesh.material.opacity = (pagemaxtime - pagetime) / out_transitiontime;
								textmesh.position.x = textmesh.target_x - (Math.cos((pagemaxtime - pagetime) / out_transitiontime * Math.PI) + 1) / 2 * 800;
							} else {
								textmesh.position.x = textmesh.target_x;
								textmesh.material.opacity = 1;
							}
													
						} else {
							textmesh.material.visible = false;
							textmesh.material.opacity = 0;
						}
					}

					textobject = textobjects[i].bottom;
					
					for (var j=0; j<textobject.children.length; j++) {
						var textmesh = textobject.children[j];
						
						if (i == page) {
							textmesh.material.visible = true;

							if (pagetime < in_transitiontime) {
								textmesh.material.opacity = pagetime / in_transitiontime;
								textmesh.position.x = textmesh.target_x - (Math.cos(pagetime / in_transitiontime * Math.PI) + 1) / 2 * 400;
							} else if (pagetime > (pagemaxtime - out_transitiontime)) {
								textmesh.material.opacity = (pagemaxtime - pagetime) / out_transitiontime;
								textmesh.position.x = textmesh.target_x + (Math.cos((pagemaxtime - pagetime) / out_transitiontime * Math.PI) + 1) / 2 * 800;
							} else {
								textmesh.position.x = textmesh.target_x;
								textmesh.material.opacity = 1;
							}
													
						} else {
							textmesh.material.visible = false;
							textmesh.material.opacity = 0;
						}
					}
				}
			}
		}


		ro.player = function(partdata, parttick, tick) {
			this.functions.updateSausages(partdata, parttick, tick);
			this.functions.updateWriter(partdata, parttick, tick);

			var dt = global_engine.clock.getDelta();
			this.composers['makkarat'].render(dt);
			this.composers['writer'].render(dt);
			this.composers['composer'].render(dt);

		}
	
		return ro;
	}())
}


{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - Kuvat';
		ro.prewarm = true;
		ro.partlength = 83496;
		ro.cameras = {
			'photocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000),
			'writercam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000),
			'makkaracam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 8000)
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
					"Boozembly 2016",
					"features include"
				]
			},
			{ 
				text: [
					"Appropriate weather",
					"for summer activities"
				]
			},
			{ 
				text: [
					"Meet & greet old friends",
					"and new acquaintances"
				]
			},
			{ 
				text: [
					"Ice cold",
					"beer pool"
				]
			},
			{ 
				text: [
					"Around the clock",
					"hot barbeque"
				]
			},
			{ 
				text: [
					"Unique clothing",
					"opportunities"
				]
			},
			{ 
				text: [
					"Testiteksti 6",
					"tilulilulii"
				]
			},
			{ 
				text: [
					"If you want to help us,",
					"contact the disorganizers"
				]
			},
			{ 
				text: [
					"Greetings fly to",
					"Byterapers - Komplex"
				]
			},
			{ 
				text: [
					"Fairlight - CNCD - Extend",
					"TRSI - Scoopex - Mercury"
				]
			},
			{ 
				text: [
					"Kooma - Pyrotech - Wide Load",
					"The Boys - Accession - Kewlers"
				]
			},
			{ 
				text: [
					"Kudos to our beloved",
					"sponsors for last year"
				]
			},
			{ 
				text: [
					" ",
					" "
				]
			},
		];

		ro.scenes['photos'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var textures = {
				'landscape': [
					image_landscape0.src,
					image_landscape1.src,
					image_landscape2.src,
					image_landscape3.src,
					image_landscape4.src,
					image_landscape5.src,
					image_landscape6.src,
					image_landscape7.src,
					image_landscape8.src,
					image_landscape9.src,
					image_landscape10.src,
					image_landscape11.src,
					image_landscape12.src
				],
				
				'portrait': [
					image_portrait0.src,
					image_portrait1.src,
					image_portrait2.src,
					image_portrait3.src,
					image_portrait4.src,
					image_portrait5.src,
					image_portrait6.src
				]
			};
			
			var materials = { 'landscape': [], 'portrait': [] };
			
			for (var i=0; i<textures['landscape'].length; i++) {
				materials['landscape'].push( new THREE.MeshPhongMaterial(
						{ map: THREE.ImageUtils.loadTexture(textures['landscape'][i]), color: 0xffffff, transparent: true }
					)
				);
			}

			for (var i=0; i<textures['portrait'].length; i++) {
				materials['portrait'].push( new THREE.MeshPhongMaterial(
						{ map: THREE.ImageUtils.loadTexture(textures['portrait'][i]), color: 0xffffff, transparent: true }
					)
				);
			}
			
			var uv_landscape = [];
			var uv_portrait = [];
			
			for (var i=0; i<4; i++) {
				for (var j=0; j<2; j++) {
					var portrait_uv = [
						new THREE.Vector2(i/4, j/2 + 0.5),
						new THREE.Vector2(i/4, j/2),
						new THREE.Vector2(i/4 + 0.25, j/2),
						new THREE.Vector2(i/4 + 0.25, j/2 + 0.5)
					];
					
					uv_portrait.push(portrait_uv);
				}
			}
			
			for (var i=0; i<2; i++) {
				for (var j=0; j<4; j++) {
					var landscape_uv = [
						new THREE.Vector2(i/2, j/4 + 0.25),
						new THREE.Vector2(i/2, j/4),
						new THREE.Vector2(i/2 + 0.5, j/4),
						new THREE.Vector2(i/2 + 0.5, j/4 + 0.25)
					];
					
					uv_landscape.push(landscape_uv);
				}
			}
			
			var geometries = [];
			
			for (var j=0; j<uv_landscape.length; j++) {
				var geometry = new THREE.PlaneGeometry(128, 256, 1, 1); // Portrait
				geometry.faceVertexUvs = [];
				geometry.faceVertexUvs[0] = [];
				geometry.faceVertexUvs[0][0] = [uv_portrait[j][0], uv_portrait[j][1], uv_portrait[j][3]];
				geometry.faceVertexUvs[0][1] = [uv_portrait[j][1], uv_portrait[j][2], uv_portrait[j][3]];
				geometry.uvsNeedUpdate = true;
				var buffergeometry = new THREE.BufferGeometry().fromGeometry(geometry);
				buffergeometry.imagetype = 'portrait';
				geometries.push(buffergeometry);
			
				geometry = new THREE.PlaneGeometry(256, 128, 1, 1); // Landscape
				geometry.faceVertexUvs = [];
				geometry.faceVertexUvs[0] = [];
				geometry.faceVertexUvs[0][0] = [uv_landscape[j][0], uv_landscape[j][1], uv_landscape[j][3]];
				geometry.faceVertexUvs[0][1] = [uv_landscape[j][1], uv_landscape[j][2], uv_landscape[j][3]];
				geometry.uvsNeedUpdate = true;
				var buffergeometry = new THREE.BufferGeometry().fromGeometry(geometry);
				buffergeometry.imagetype = 'landscape';
				geometries.push(buffergeometry);
			}
				
			imgareawidth = 31;
			imgareaheight = 317;
			
			var imgarea = [imgareawidth * imgareaheight];
			
			for (var i=0; i<imgareawidth * imgareaheight; i++) { imgarea[i] = 0; }

			function getEmptyCoordinates(size, type, idx) {
				var coords = { x: 0, y: 0 };
				
				var width = type == 'landscape' ? 2:1;
				var height = type == 'portrait' ? 2:1;
				
				width *= size;
				height *= size;

				var found = false;

				for (var j=0; j<imgareaheight - height && !found; j++) {
					for (var i=0; i<imgareawidth - width && !found; i++) {

						found = true;
						
						for (var k=0; k<width && found; k++) {
							for (var l=0; l<height && found; l++) {
								if (imgarea[(j+l) * imgareawidth + (i + k)] != 0) {
									found = false;
								}
							}
						}
						
						if (found) {
							for (var k=0; k<width && found; k++) {
								for (var l=0; l<height && found; l++) {
									imgarea[(j+l) * imgareawidth + (i + k)] = "_" + idx;
								}
							}
							
							coords.x = i;
							coords.y = j;
						}
					}
				}
				
				if (found) {
					coords['size'] = size;
					coords['type'] = type;
					return coords;
				} else {
					return false;
				}
			}
			
			var imgscale = 2;
			
			var geomptr = 0;
			var matptr = 0;
			
			var geometries = shuffle(geometries);
			
			obj.objects['photos'] = [];
			
			var cubematerial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, transparent: false });
			
			for (var i=0; i<2000 && imgscale >= 1; i++) {
				var geometry = geometries[geomptr++ % geometries.length];
				
				var material = materials[geometry.imagetype][matptr++ % materials[geometry.imagetype].length];
				var mesh = new THREE.Mesh(geometry, material);
				mesh.scale.set(imgscale, imgscale, imgscale);
				
				var coords = getEmptyCoordinates(imgscale, geometry.imagetype, i);

				if (!coords) {
					imgscale /= 2;
				} else {
					var width = (geometry.imagetype == 'landscape' ? 2 : 1) * imgscale;
					var height = (geometry.imagetype == 'portrait' ? 2 : 1) * imgscale;
					
					width *= 128;
					height *= 128;
					
					var zpos = Math.random() * 300;
					var cubegeometry = new THREE.BoxBufferGeometry(width, height, zpos - 10);
					var cubemesh = new THREE.Mesh(cubegeometry, cubematerial);
				
					mesh.position.set(coords.x * 128 + width/2 - 1500, coords.y * 128 + height/2, zpos);
					cubemesh.position.set(coords.x * 128 + width/2 - 1500, coords.y * 128 + height/2, zpos / 2);
					
					mesh.material.visible = false;
					mesh.material.opacity = 0;
					scene.add(mesh);
					obj.objects['photos'].push(mesh);
//					scene.add(cubemesh);
				}

			}

			var directionallight = new THREE.DirectionalLight(0xffffff, 1);
			directionallight.position.set( 0, 0, 1 );
			scene.add( directionallight );
			obj.lights['photodirectional'] = directionallight;
			
			var spotlight = new THREE.SpotLight(0xffffff, 1);
			spotlight.position.set(200, 200, 100);
			scene.add(spotlight);
			
			scene.add(obj.cameras['photocam']);
			obj.cameras['photocam'].position.z = 900;

			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['photocam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);
			
			var shaderpass = new THREE.ShaderPass( THREE.RGBShiftShader );
			shaderpass.uniforms['tDiffuse'].value = composer.renderTarget1;
			shaderpass.renderToScreen = false;
			obj.passes['makkarargb'] = shaderpass;
			composer.addPass(shaderpass);

			obj.composers['photos'] = composer;
			obj.rendertargets['photos'] = rendertarget;

			return scene;
		}(ro));
		
		ro.scenes['makkarat'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var leftsausages = [];
			var rightsausages = [];

			var makkarageometry = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);
			var makkaramap = THREE.ImageUtils.loadTexture( image_makkaratexture.src );
			makkaramap.flipY = false;

			var makkarabump = THREE.ImageUtils.loadTexture( image_makkarabump.src );
			makkarabump.flipY = false;
		
			var makkaramaterial = new THREE.MeshPhongMaterial({
				map: makkaramap,
				bumpMap: makkarabump,
				bumpScale: 2,
				transparent: false
			});
			
			for (var i=0; i<15; i++) {
				var makkaraleft = new THREE.Mesh(makkarageometry, makkaramaterial);
				var makkaraSize = Math.random() * 3 + 5 ;
				makkaraleft.scale.set(makkaraSize, makkaraSize, makkaraSize);
				var makkaraZPos = Math.random() * 30 + 170;
				makkaraleft.position.set(-450, i * 700 , makkaraZPos);
				scene.add(makkaraleft);
				leftsausages.push(makkaraleft);

				var makkararight = new THREE.Mesh(makkarageometry, makkaramaterial);
				makkaraSize = Math.random() * 3 + 5;
				makkararight.scale.set(makkaraSize, makkaraSize, makkaraSize);
				makkaraZPos = Math.random() * 30 + 170;
				makkararight.position.set(450, i * 700 - 350, makkaraZPos);
				scene.add(makkararight);
				rightsausages.push(makkararight);
			}
			
			obj.objects['leftsausages'] = leftsausages;
			obj.objects['rightsausages'] = rightsausages;

			var directionallight = new THREE.DirectionalLight(0xffffff, 1);
			directionallight.position.set( 0, 0, 1 );
			scene.add( directionallight );
			obj.lights['makkaradirectional'] = directionallight;
			
			/* Fade to white -mesh */

			var whitegeometry = new THREE.PlaneBufferGeometry(1920 * 2, 1080 * 2, 1, 1);
			var whitematerial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
			var whitemesh = new THREE.Mesh(whitegeometry, whitematerial);
			whitemesh.position.set(0, 0, 800);
			whitemesh.material.opacity = 0.0;
			scene.add(whitemesh);
			obj.objects['whitemesh'] = whitemesh;
			
			/**/
			
			
			scene.add(obj.cameras['makkaracam']);
			obj.cameras['makkaracam'].position.z = 900;
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['makkaracam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			obj.composers['makkarat'] = composer;
			obj.rendertargets['makkarat'] = rendertarget;
			
			return scene;
		}(ro));
		
		ro.scenes['writer'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1000, 100, 1, 1);
			var material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, -150 - 12.5, 0);
			scene.add(mesh);
			
			var textarr = [];
			
			for (var i=0; i<obj['texts'].length; i++) {
				textarr.push(obj['texts'][i]['text']);
			}
			
			var font = new THREE.Font(jsonfont_piximisa);
			
			var fontparams = {
				size: 35,
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
								glyphgeometries[chr].width = 10;
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
				
				var container = new THREE.Object3D();
				
				for (var j=0; j<page.length; j++) {
					var line = page[j];
					
					xpos = -lineLength(line, glyphgeometries) / 2;
				
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
						mesh.position.y = -200 + page.length * 40 - (j + 1) * 40;
						mesh.position.z = 0;

						xpos += glyphgeometries[chr].width;
						mesh.material.visible = true;
						mesh.material.opacity = 1;
						
						container.add(mesh);
					}
				}
				
				scene.add(container);
				obj['objects']['writertextmeshes'].push(container);
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
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['photos'].renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['writer'].renderTarget2.texture;
			combinerpass.renderToScreen = false;
			composer.addPass(combinerpass);

			combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = composer.renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['makkarat'].renderTarget2.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;

			return scene;
		}(ro));

		ro.functions = {
			updatePhotos: function(pd, pt, gt) {
				var lights = pd.data.lights;
				var camera = pd.data.cameras['photocam'];
				
				var y_wobble = Math.sin(pt / 593);
				var x_wobble = Math.sin(pt / 1631);
				
				camera.position.y = (y_wobble * 2 + pt / 1000) * 100 + 1000;
				camera.position.x = x_wobble * 1300 + 400;
				camera.position.z = (Math.sin(pt / 773) * 100 + 100 + 900);
				camera.rotation.z = Math.sin(pt / 499) / 10;
				
				var dist = 1.5 - Math.sqrt(y_wobble * y_wobble + x_wobble * x_wobble);

				pd.data.passes['makkarargb'].uniforms['amount'].value = 0.008 * dist;
				pd.data.passes['makkarargb'].uniforms['angle'].value = camera.rotation.z;

				var photos = pd.data.objects['photos'];

				var showcount = Math.floor(pt / 1000);
				
				for (var i=0; i<showcount && i<photos.length; i++) {
					photos[i].material.visible = true;
					photos[i].material.opacity = 1;
				}
			},
			
			updateSausages: function(pd, pt, gt) {
				var camera = pd.data.cameras['makkaracam'];
				var whitemesh = pd.data.objects['whitemesh'];

				var y_wobble = Math.sin(pt / 593);
				camera.position.y = (y_wobble * 2 + pt / 1000) / 2 * 100 + 1000;

				var leftsausages = pd.data.objects['leftsausages'];
				var rightsausages = pd.data.objects['rightsausages'];

				for (var i=0; i<leftsausages.length; i++) {
					leftsausages[i].rotation.set(0, Math.sin(pt / 659 + i * 50) * Math.PI * 2, Math.PI / 2);
					rightsausages[i].rotation.set(0, -Math.sin(pt / 607 + i * 50) * Math.PI * 2, Math.PI / 2);
				}
				
				if (pt < 4000) {
					var fadeout = 1 - pt / 4000;
					whitemesh.position.y = camera.position.y;
					whitemesh.material.color.setHex(0xFFFFFF);
					whitemesh.material.opacity = fadeout;
				} else if (pt + 3000 > (pd.data.partlength - 1000)) {
					var fadeout = 1 - (pd.data.partlength - pt - 1000) / 3000;
					whitemesh.material.opacity = fadeout;
					whitemesh.material.color.setHex(0x000000);
					whitemesh.position.y = camera.position.y;
				} else if (pt + 1000 > pd.data.partlength) {
					whitemesh.material.opacity = 0;
					whitemesh.material.color.setHex(0x000000);
					whitemesh.position.y = camera.position.y;
				} else {
					whitemesh.position.y = camera.position.y;
					whitemesh.material.opacity = 0;
				}
			},
			
			updateWriter: function(pd, pt, gt) {
				var textobjects = pd.data.objects['writertextmeshes'];
				
				var pagemaxtime = 6956;
				var page = Math.floor((pt) / pagemaxtime);
				var pagetime = (pt) - page * pagemaxtime;
				
				page = page % textobjects.length;

				for (var i=0; i<textobjects.length; i++) {
					var textobject = textobjects[i];
					for (var j=0; j<textobject.children.length; j++) {
						var textmesh = textobject.children[j];
						
						if (i == page) {
							textmesh.material.visible = true;

							if (pagetime < 500) {
								textmesh.material.opacity = pagetime / 500;
								textmesh.position.x = textmesh.target_x + (Math.cos(pagetime / 500 * Math.PI) + 1) / 2 * 400;
							} else if (pagetime > (pagemaxtime - 500)) {
								textmesh.material.opacity = (pagemaxtime - pagetime) / 500;
								textmesh.position.x = textmesh.target_x - (Math.cos((pagemaxtime - pagetime) / 500 * Math.PI) + 1) / 2 * 400;
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
			this.functions.updatePhotos(partdata, parttick, tick);
			this.functions.updateWriter(partdata, parttick+150, tick);
			this.functions.updateSausages(partdata, parttick, tick);

			var dt = global_engine.clock.getDelta();
			this.composers['makkarat'].render(dt);
			this.composers['photos'].render(dt);
			this.composers['writer'].render(dt);
			this.composers['composer'].render(dt);
		}
	
		return ro;
	}())
}


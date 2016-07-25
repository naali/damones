{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - sykkivää makkaraa';
		ro.prewarm = true;
		ro.partlength = 69496;
		ro.cameras = {
			'isomakkaracam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'particlecam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'gridcam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'writercam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.effects = {};
		ro.composers = {};
		ro.passes = {};
		ro.rendertargets = {};
		ro.renderpasses = {};
		ro.contentarr = [
			{	
				texts: [
					"Boozembly 2016",
					"Page 0"
				], 
				align: "left"
			},
			{	
				texts: [
					"Boozembly 2016",
					"Testing 1234",
					"Page 1"
				], 
				align: "right"
			},
			{	
				texts: [
					"Boozembly 2016",
					"Testing 1234",
					"Testing 1234",
					"Testing 1234",
					"Page 2"
				], 
				align: "center"
			}
		];
				
		ro.scenes['isomakkara'] = (function(obj) { 
			var scene = new THREE.Scene();
			
			var map = THREE.ImageUtils.loadTexture( image_makkaratexture3.src );
			map.flipY = false;

			var bump = THREE.ImageUtils.loadTexture( image_makkarabump3.src );
			bump.flipY = false;
			
			var material = new THREE.MeshPhongMaterial({
				map: map,
				bumpMap: bump,
				bumpScale: -1,
				transparent: false
			});
			
			var geom = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);
			var mesh = new THREE.Mesh(geom, material);
			mesh.position.set(0, 0, 0);
			scene.add(mesh);
			
			obj.objects['isomakkara'] = mesh;
			obj.objects['isomakkaramaterial']= material;
			
			var light = new THREE.DirectionalLight(0xffffff, 1);
			light.position.set(0, 0, 1);
			scene.add(light);
			obj.lights['isomakkaradirectional'] = light;
			
			scene.add(obj.cameras['isomakkaracam']);
			obj.cameras['isomakkaracam'].position.z = 120;
			
			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['isomakkaracam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			composer.clear = false;
			obj.composers['isomakkara'] = composer;
			obj.rendertargets['isomakkara'] = rendertarget;
		
			return scene;
		}(ro));
		
		ro.scenes['particles'] = (function(obj) {
			function extractGeometries(geom) {
				var geometries = [];
				for (var i=1; i<geom.length; i++) {
					geometries.push(geom[i].geometry);
				}
				
				return geometries;
			}
			
			var scene = new THREE.Scene();
			scene.name = "particles";
			
			var particlecount = 20000;
			var static_particlecount = 10000;
			
			var sponsors = [
				{
					geometry: extractGeometries(object_logo_aivokakki.children),
					depth: 10,
					scale: 700,
					name: "Mindfield",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: [object_logo_aivokakki.children[1].geometry],
					depth: 10,
					scale: 500,
					name: "Mindfield",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: [object_logo_baltest.children[2].geometry],
					depth: 2,
					scale: 500,
					name: "Baltest",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_cru.children),
					depth: 10,
					scale: 600,
					name: "Grand Cru",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry:[object_logo_dottr.children[2].geometry],
					depth: 10,
					scale: 500,
					name: "Dottr",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_housemorgue.children),
					depth: 10,
					scale: 400,
					name: "Housemarque",
					position: {x: 0.0, y: 0, z: 0}
				},
				{
					geometry: [object_logo_joensuu.children[1].geometry],
					depth: 10,
					scale: 500,
					name: "Joensuu",
					position: {x: 0.07, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_kuubi.children),
					depth: 10,
					scale: 600,
					name: "kuubi",
					position: {x: 0, y: 0, z: 0}
				},
				
				{
					geometry: [object_logo_novomok.children[1].geometry],
					depth: 10,
					scale: 400,
					name: "Nomovok",
					position: {x: 0, y: 0, z: 0}
				},
				
				{
					geometry: [object_logo_sc5.children[1].geometry],
					depth: 10,
					scale: 600,
					name: "SC5",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: [object_logo_treemenapes.children[1].geometry],
					depth: 10,
					scale: 700,
					name: "Tree Men Games",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_umbra.children),
					depth: 10,
					scale: 500,
					name: "Umbra",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_solinor.children),
					depth: 10,
					scale: 700,
					name: "Solinor",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_unity.children),
					depth: 10,
					scale: 600,
					name: "Unity",
					position: {x: 0, y: 0, z: 0}
				}
			];
			
			for (var i=0; i<sponsors.length; i++) {
				var rndpoints = [];
				
				if (sponsors[i]['geometry'].length == 1) {
					var geometry = sponsors[i]['geometry'][0];
					rndpoints = THREE.GeometryUtils.randomPointsInGeometry(geometry, particlecount);
				} else {
					var geometries = sponsors[i]['geometry'];
					
					for (var j=0; j<geometries.length; j++) {
						rndpoints = rndpoints.concat(THREE.GeometryUtils.randomPointsInGeometry(geometries[j], particlecount / geometries.length));
					}
				}
				
				sponsors[i]["vertexbuffer"] = new Float32Array(particlecount * 3 + static_particlecount * 3);
				
				var depth = sponsors[i].depth;
				var scale = sponsors[i].scale;
				var pos = sponsors[i].position;
				
				for (var j=0; j<particlecount; j++) {
					sponsors[i]["vertexbuffer"][j * 3] = (rndpoints[j].x + pos.x) * scale;
					sponsors[i]["vertexbuffer"][j * 3 + 1] = -(rndpoints[j].z + pos.z) * scale;
					sponsors[i]["vertexbuffer"][j * 3 + 2] = (rndpoints[j].y + pos.y) * scale + Math.random() * depth - depth/2;
				}
			}

			var particle_geometry = new THREE.BufferGeometry();
			particle_geometry.name = "Particle Geometry";
			
			var rndpos = new Float32Array(particlecount * 3 + static_particlecount * 3);			
			var colors = new Float32Array(particlecount * 3);
			var sizes = new Float32Array(particlecount);
			
			var tmp_x, tmp_y, tmp_z;
			
			for (var i=0; i<particlecount + static_particlecount; i++) {
				do {
					tmp_x = Math.random() * 1000 - 500;
					tmp_y = Math.random() * 1000 - 500;
					tmp_z = Math.random() * 1000 - 500;
				
				} while (Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y + tmp_z * tmp_z) > 800);
				
				rndpos[i * 3] = tmp_x;
				rndpos[i * 3 + 1] = tmp_y;
				rndpos[i * 3 + 2] = tmp_z;

				colors[i * 3] = 1.0;
				colors[i * 3 + 1] = 1.0;
				colors[i * 3 + 2] = Math.random();
				
				sizes[i] = 100.0;
			}
			
			for (i=0; i<static_particlecount; i++) {
				for (j=0; j<sponsors.length; j++) {
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3] = rndpos[particlecount * 3 + i * 3];
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3 + 1] = rndpos[particlecount * 3 + i * 3 + 1];
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3 + 2] = rndpos[particlecount * 3 + i * 3 + 2];
				}
			}
			
			particle_geometry.addAttribute('position', new THREE.BufferAttribute(rndpos, 3));
			particle_geometry.addAttribute('positionbuffer1', new THREE.BufferAttribute(sponsors[0]["vertexbuffer"], 3));
			particle_geometry.addAttribute('positionbuffer2', new THREE.BufferAttribute(sponsors[1]["vertexbuffer"], 3));

			particle_geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
			particle_geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
			particle_geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
			
			var particle_texture = THREE.ImageUtils.loadTexture(image_nulers_sheet2.src);
			particle_texture.magFilter = THREE.NearestFilter;
			particle_texture.minFilter = THREE.NearestFilter;
			particle_texture.wrapS = THREE.RepeatWrapping;
			particle_texture.wrapT = THREE.RepeatWrapping;
			
			var particle_uniforms =  {
					amplitude:	{ type: "f", value: 1.0 },
					bufferindex: { type: "f", value: 1.0 },
					color:		{ type: "c", value: new THREE.Color( 0xffffff ) },
					texture:	{ type: "t", value: particle_texture },
					time:		{ type: "f", value: 1.0 },
					direction:	{ type: "f", value: 0.0 },
			};

			var shaderMaterial = new THREE.ShaderMaterial( {
				uniforms: particle_uniforms,
				vertexShader: $('#vertex_particles' ).text(),
				fragmentShader: $('#fragment_particles' ).text(),
				blending: THREE.AdditiveBlending,
				depthTest: true,
				transparent: true,
				side: THREE.DoubleSide
			});

			particle_geometry.computeBoundingSphere();
			
			var particlesystem = new THREE.Points(particle_geometry, shaderMaterial);
			particlesystem.name = "Particle System";

			obj.objects['sponsors'] = sponsors;
			obj.objects['sponsor_indices'] = [0, 1];
			obj.objects['sponsor_forward'] = true;
			obj.objects['particles'] = particlesystem;
			obj.objects['particle_uniforms'] = particle_uniforms;
			
			scene.add( particlesystem );

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['particlespot'] = light;

			scene.add(obj.cameras['particlecam']);
			obj.cameras['particlecam'].position.z = 300;
		
			return scene;
		}(ro));
		
		ro.scenes['writer'] = (function(obj) {
			var scene = new THREE.Scene();
			var textarr = [];
			
			for (var i=0; i<obj['contentarr'].length; i++) {
				textarr.push(obj['contentarr'][i]['texts']);
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
			
			for (var i=0; i<obj['contentarr'].length; i++) {
				var page = obj['contentarr'][i]['texts'];
				var alignment = obj['contentarr'][i].align;
				
				var xpos = 0;
				var ypos = 0;
				
				var container = new THREE.Object3D();
				
				for (var j=0; j<page.length; j++) {
					var line = page[j];

					switch (alignment) {
						case 'center':
							xpos = -lineLength(line, glyphgeometries) / 2;
							break;
						case 'right':
							xpos = -400;
							break;
						case 'left':
						default:
							xpos = 400 - lineLength(line, glyphgeometries);
							break;
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
						mesh.position.y = -200 + page.length * 40 - (j + 1) * 40;
						mesh.position.z = 0;

						xpos += glyphgeometries[chr].width;
						mesh.material.visible = false;
						mesh.material.opacity = 0;
						
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

			var writershader = new THREE.ShaderPass( THREE.Perseily );
			writershader.uniforms['tDiffuse'].value = composer.renderTarget1;
			writershader.renderToScreen = false;
			obj.effects['perseily'] = writershader;
			composer.addPass(writershader);

			composer.clear = false;
			obj.composers['writer'] = composer;
			obj.rendertargets['writer'] = rendertarget;			
			
			return scene;
		}(ro));
		
		ro.scenes['grid'] = (function(obj) {
		
			var scene = new THREE.Scene();

			var x_segments = 8 * 25;
			var y_coords = [];
			
			for (var i=0; i<11; i++) {
				var y = i * 80 - 250;
				y_coords.push(y);
			}

			var grid_textures = [ image_paneltexture0.src, image_paneltexture1.src, image_paneltexture2.src, image_paneltexture3.src, image_paneltexture4.src, 
								image_paneltexture5.src, image_paneltexture6.src, image_paneltexture7.src, image_paneltexture8.src, image_paneltexture9.src ];

			var grid_materials = [];
			
			for (var i=0; i<grid_textures.length; i++) {
				var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture( grid_textures[i] ), bumpMap: THREE.ImageUtils.loadTexture( image_panelbump.src ),  transparent: false });
				grid_materials.push(material);
			}
			
			var grid_group = new THREE.Object3D();
			var balls = [];

			for (var i=0; i<x_segments; i++) {
			
				for (var j=0; j<y_coords.length; j++) {
					var x1 = Math.sin(2 * Math.PI * i/x_segments) * 2000;
					var y1 = y_coords[j];
					var z1 = Math.cos(2 * Math.PI * i/x_segments) * 2000;
					
					var x2 = Math.sin(2 * Math.PI * (i+1)/x_segments) * 2000;
					var y2 = y1;
					var z2 = Math.cos(2 * Math.PI * (i+1)/x_segments) * 2000;
					
					var x3 = x1;
					var y3 = y_coords[j+1];
					var z3 = z1;
					
					var x4 = x2;
					var y4 = y3;
					var z4 = z2;
					
					var geom = new THREE.Geometry();
					var v1 = new THREE.Vector3(x1, y1, z1);
					var v2 = new THREE.Vector3(x2, y2, z2);
					var v3 = new THREE.Vector3(x3, y3, z3);
					var v4 = new THREE.Vector3(x4, y4, z4);
					
					geom.vertices.push(v1);
					geom.vertices.push(v2);
					geom.vertices.push(v3);
					geom.vertices.push(v4);
					geom.faces.push(new THREE.Face3(2, 1, 0));
					geom.faces.push(new THREE.Face3(2, 3, 1));
					geom.computeFaceNormals();
					geom.computeVertexNormals();
					
					assignUVs(geom);
					var bufgeom = new THREE.BufferGeometry().fromGeometry(geom);
					
					var mesh = new THREE.Mesh(bufgeom, grid_materials[j]);
					grid_group.add(mesh);
				}
			}
			
			for (var i=0; i<x_segments; i++) {
				for (var j=1; j<y_coords.length - 2; j++) {
					var sphere_geom_small = new THREE.SphereGeometry(1, 8, 8);
					var sphere_geom = new THREE.SphereGeometry(100, 8, 8);
			        sphere_geom.morphTargets[0] = {name: 't1', vertices: sphere_geom_small.vertices};
			        sphere_geom.computeMorphNormals();
			        
					var sphere_material = new THREE.MeshStandardMaterial({ color: 0x2194ce, emissive: 0x000000, shading: THREE.FlatShading, morphTargets: true});
			
					var mesh = new THREE.Mesh(sphere_geom, sphere_material);
					mesh.scale.set(1, 1, 1);
				
					var x = Math.sin(0.016 + 2 * Math.PI * i/x_segments) * 2000;
					var y = y_coords[j] + 40;
					var z = Math.cos(0.016 + 2 * Math.PI * i/x_segments) * 2000;
					
					mesh.position.set(x, y, z);
					balls.push(mesh);
					grid_group.add(mesh);
				}
			}
			
			scene.add(grid_group);
			obj.objects['grid'] = grid_group;
			obj.objects['balls'] = balls;
		
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1000);
			light.target = new THREE.Object3D(0, 0 ,0);
			scene.add(light);
			obj.lights['gridspot1'] = light;

			scene.add(obj.cameras['gridcam']);
			obj.cameras['gridcam'].position.z = 1000;
			
			var scrolltext = "                    Boozembly 2016 --- 4th - 7th of August 2016 --- You know where --- Greetings to Byterapers - Fairlight - CNCD - Scoopex - Komplex - Pyrotech - TRSI - Extend - Mercury - Wide Load - Darklite - Accession - Kooma - Flo - Kewlers -             ";
			
			var tmpscrolltext = scrolltext.split("").reverse().join("");
			obj.objects['scrollmaterials'] = [];
			obj.objects['scrollmaterials'].push(new THREE.MeshStandardMaterial({ color: 0x9421ce, emissive: 0x000000, shading: THREE.FlatShading, morphTargets: true}));
			
			obj.objects['scrolltext'] = [];
			
			for (var i=0; i<tmpscrolltext.length; i++) {
				obj.objects['scrolltext'].push({
					materialidx: 0,
					prevmatidx: 0,
					chrcode: tmpscrolltext.charAt(i).charCodeAt(0)
				});
			}
			
		    var tmpcanvas = document.createElement('canvas');
		    var fontimg = document.createElement('img');

		    fontimg.src = image_scrollfont.src;
			tmpcanvas.width = image_scrollfont.width;
			tmpcanvas.height = image_scrollfont.height;

			var context = tmpcanvas.getContext('2d');
			context.drawImage( fontimg, 0, 0 );

			var imgdata = context.getImageData( 0, 0, image_scrollfont.width, image_scrollfont.height );
		
			var fdbuffer = new ArrayBuffer(8 * 8 * 256);
			var fontdata = new Uint8Array(fdbuffer);
			
			var d = imgdata.data;
		
			for (var i=0; i<256; i++) {
				
				var startpos_x = ( i % 64 ) * 8 * 4;
				var startpos_y = Math.floor(i / 64) * 512 * 8 * 4;
				var startpos = startpos_x + startpos_y;
			
				for (j=0; j<8; j++) {
					for (k=0; k<8; k++) {
						var pos = startpos + j * 512  * 4 + k * 4;
						var gray = (d[pos] + d[pos + 1] + d[pos + 2]) / 3;
						fontdata[i * 8 * 8 + j * 8 + k] = gray;
					}
				}
			}

			for (var i=0; i<256; i++) {
				var chr = "" + i + ":\n";
				for (var j=0; j<8; j++) {
					var line = "";
					for (var k=0; k<8; k++) {
						line += fontdata[i * 8 * 8 + j * 8 + k] == 0?"_":"X";
					}
					chr += line + "\n";
				}
			}
			
			obj.objects['fontdata'] = fontdata;

			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: true });
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['gridcam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			var pass = new THREE.BokehPass(scene, obj.cameras['gridcam'], { focus: 0.6 });
			pass.renderToScreen = false;
			composer.addPass(pass);

			composer.clear = false;
			obj.passes['gridbokeh'] = pass;
			obj.composers['grid'] = composer;
			obj.rendertargets['grid'] = rendertarget;
			
			return scene;
			
		}(ro));
		
		ro.scenes['composer'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var rendertarget = new THREE.WebGLRenderTarget(global_engine.getWidth(), global_engine.getHeight(), 
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: true }
			);
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['grid'].renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['isomakkara'].renderTarget2.texture;
			combinerpass.renderToScreen = false;
			composer.addPass(combinerpass);

			combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = composer.renderTarget1.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['writer'].renderTarget1.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;

 			return scene;
		}(ro));
		
		ro.functions = {
			updateScrollText: function(partdata, parttick, tick) {
				var obj = partdata.data.objects;
				var scrolltext = obj.scrolltext;
				var fontdata = obj.fontdata;
				var scrollspeed = 631;
				
				var scrollstart = scrolltext.length - Math.floor(parttick / scrollspeed) % scrolltext.length;
				var fontscroll = Math.floor(parttick / (scrollspeed / 8)) % 8;
				
				var balls = obj['balls'];
				
				var zoomer = Math.sin(parttick / 321) / 6;
				
				for (var i=0; i<20; i++) {
					var chr = scrolltext[(scrollstart + i) % scrolltext.length].chrcode
					
					for (var j=0; j<8; j++) {
						for (var k=0; k<8; k++) {
							var charbyte = fontdata[(chr + 1) * 8 * 8 - (8 + k * 8) + 8 - j - 1];

							if (charbyte == 0) {
								balls[i * 8 * 8 + ((j + fontscroll) * 8) + k].morphTargetInfluences[0] = 1;
							} else {
								balls[i * 8 * 8 + ((j + fontscroll) * 8) + k].morphTargetInfluences[0] = 0.5; //  + zoomer; // + (Math.random() * 0.5);
							}
							
						}
					}
				}
			},
			updateWriter: function(pd, pt, gt) {
				var textobjects = pd.data.objects['writertextmeshes'];
				var effect = pd.data.effects['perseily'].uniforms;
				
				var pagemaxtime = 6956;
				var page = Math.floor((pt) / pagemaxtime);
				var pagetime = (pt) - page * pagemaxtime;
				
				page = page % textobjects.length;

				effect.time.value =  pt / 1000 + page;
				effect.scale.value = 1.95;
				effect.speed.value = 0.5;
				effect.x.value = 0;
				effect.y.value = 0;
				
				var intensitymultiplier = 0.015;

				for (var i=0; i<textobjects.length; i++) {
					var textobject = textobjects[i];
					for (var j=0; j<textobject.children.length; j++) {
						var textmesh = textobject.children[j];
						
						if (i == page) {
							textmesh.material.visible = true;

							if (pagetime < 500) {
								effect.intensity.value = intensitymultiplier - (pagetime / 500) * intensitymultiplier + 0.006;
								textmesh.material.opacity = pagetime / 500;
							} else if (pagetime > (pagemaxtime - 500)) {
								effect.intensity.value = intensitymultiplier - ((pagemaxtime - pagetime) / 500) * intensitymultiplier + 0.006;
								textmesh.material.opacity = (pagemaxtime - pagetime) / 500;
							} else {
								effect.intensity.value = 0.006;
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
			this.functions.updateScrollText(partdata, parttick, tick);
			this.functions.updateWriter(partdata, parttick + 300, tick);

			this.cameras['gridcam'].position.z = Math.sin(-parttick / 1000) * 400;
			this.cameras['gridcam'].rotation.z = Math.sin(parttick/5000) / 2.5;
			
			this.objects['grid'].rotation.y = Math.sin(parttick/4841);
			
			this.lights['gridspot1'].position.set(Math.sin(parttick / 789) * 1000, Math.cos(parttick / 321) * 1000, 1000);

			this.objects['isomakkara'].position.y = 35;
			this.objects['isomakkara'].position.x = Math.sin(parttick/10000) * 50;
			this.objects['isomakkara'].rotation.x = -Math.PI / 2 + Math.sin(parttick/ 1000) * Math.PI * 2 / 16 + Math.PI / 16;
			this.objects['isomakkara'].rotation.z = Math.sin(parttick / 768 + Math.cos( parttick / 123));
			
			this.objects['isomakkaramaterial'].needsUpdate = true;
			this.objects['isomakkaramaterial'].bumpScale = (Math.sin(parttick / 1000) + Math.cos(parttick / 1000 / 4) * Math.sin(parttick / 1000) - Math.cos(parttick / 1000 / 2)) / 1.5;
			
			this.passes['gridbokeh'].uniforms['focus'].value = 1 - (((Math.sin(-parttick / 1000) + 1) / 6) + 1/6);

			global_engine.renderers['main'].clear(true, true, true);

			var dt = global_engine.clock.getDelta();
			this.composers['grid'].render(dt);
			this.composers['writer'].render(dt);
			this.composers['isomakkara'].render(dt);
			this.composers['composer'].render(dt);


//			global_engine.renderers['main'].render(this.scenes['writer'], this.cameras['writercam']);
		}
	
		return ro;
	}())
}







{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2016 - Kuvat';
		ro.prewarm = false;
		ro.partlength =  14 * 6956;
		ro.cameras = {
			'particlecam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
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
					"Loving us 2015"
				]
			},
			{ 
				text: [
					"Grand Cru"
				]
			},
			{ 
				text: [
					"Housemarque"
				]
			},
			{ 
				text: [
					"Kuubi"
				]
			},
			{ 
				text: [
					"Nomovok"
				]
			},
			{ 
				text: [
					"BalTest"
				]
			},
			{ 
				text: [
					"Umbra"
				]
			},
			{ 
				text: [
					"Unity"
				]
			},
			{ 
				text: [
					"Solinor"
				]
			},
			{ 
				text: [
					"SC5"
				]
			},
			{ 
				text: [
					"Dottir"
				]
			},
			{
				text: [
					"OMD Finland"
				]
			},
			{ 
				text: [
					"Tree Men Games"
				]
			},
			{ 
				text: [
					"Mindfield"
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
		];

		ro.scenes['particles'] = (function(obj) {
			function extractGeometries(geom) {
				var geometries = [];
				for (var i=1; i<geom.length; i++) {
					geometries.push(geom[i].geometry);
				}
				
				return geometries;
			}
			
			var font = new THREE.Font(jsonfont_ap_hearts);
			
			var fontparams = {
				size: 150,
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
			
			var heart_geometry = new THREE.TextGeometry("c", fontparams);
			heart_geometry.computeBoundingBox();
			heart_geometry.width = Math.abs(heart_geometry.boundingBox.min.x - heart_geometry.boundingBox.max.x);

			heart_geometry.rotateX(-Math.PI/2, 0, 0);
			heart_geometry.verticesNeedUpdate = true;

			var scene = new THREE.Scene();
			scene.name = "particles";
			
			var particlecount = 20000;
			var static_particlecount = 10000;
			
			var sponsors = [
				{
					geometry: [heart_geometry],
					depth: 10,
					scale: 1,
					name: "Heart",
					position: {x: -150, y: 0, z: 50},
					xyz_not_ok: true
				},
				{
					geometry: [heart_geometry],
					depth: 10,
					scale: 1,
					name: "Heart",
					position: {x: -150, y: 0, z: 50}
				},
				{
					geometry: extractGeometries(object_logo_cru.children),
					depth: 10,
					scale: 600,
					name: "Grand Cru",
					position: {x: 0, y: 0, z: 0.0010}
				},
				{
					geometry: extractGeometries(object_logo_housemorgue.children),
					depth: 10,
					scale: 450,
					name: "Housemarque",
					position: {x: 0.05, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_kuubi.children),
					depth: 10,
					scale: 600,
					name: "Kuubi",
					position: {x: 0, y: 0, z: -0.0088}
				},
				{
					geometry: [object_logo_novomok.children[1].geometry],
					depth: 10,
					scale: 400,
					name: "Nomovok",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: [object_logo_baltest.children[2].geometry],
					depth: 2,
					scale: 400,
					name: "Baltest",
					position: {x: -0.025, y: 0, z: -0.055}
				},
				{
					geometry: extractGeometries(object_logo_umbra.children),
					depth: 10,
					scale: 500,
					name: "Umbra",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_unity.children),
					depth: 10,
					scale: 600,
					name: "Unity",
					position: {x: 0.025, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_solinor.children),
					depth: 10,
					scale: 700,
					name: "Solinor",
					position: {x: -0.045, y: 0, z: 0}
				},
				{
					geometry: [object_logo_sc5.children[1].geometry],
					depth: 10,
					scale: 600,
					name: "SC5",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry:[object_logo_dottr.children[2].geometry],
					depth: 10,
					scale: 500,
					name: "Dottir",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry:[object_logo_omd.children[1].geometry],
					depth: 10,
					scale: 500,
					name: "OMD",
					position: {x: 0, y: 0, z: -0.025}
				},
				{
					geometry: [object_logo_treemenapes.children[1].geometry],
					depth: 10,
					scale: 700,
					name: "Tree Men Games",
					position: {x: 0, y: 0, z: 0}
				},
				{
					geometry: extractGeometries(object_logo_aivokakki.children),
					depth: 10,
					scale: 700,
					name: "Mindfield",
					position: {x: 0, y: 0, z: 0}
				},
				{
					name: "random",
					position: {x: 0, y: 0, z: 0},
					depth: 10,
					scale: 700,
				}
			];
			
			for (var i=0; i<sponsors.length - 1; i++) {
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
				
				if (sponsors[i].xyz_not_ok) {
					for (var j=0; j<particlecount; j++) {
						sponsors[i]["vertexbuffer"][j * 3] = (rndpoints[j].x + pos.x) * scale;
						sponsors[i]["vertexbuffer"][j * 3 + 1] = -(rndpoints[j].y + pos.y) * scale;
						sponsors[i]["vertexbuffer"][j * 3 + 2] = (rndpoints[j].z + pos.z) * scale + Math.random() * depth - depth/2;
					}
				} else {
					for (var j=0; j<particlecount; j++) {
						sponsors[i]["vertexbuffer"][j * 3] = (rndpoints[j].x + pos.x) * scale;
						sponsors[i]["vertexbuffer"][j * 3 + 1] = -(rndpoints[j].z + pos.z) * scale;
						sponsors[i]["vertexbuffer"][j * 3 + 2] = (rndpoints[j].y + pos.y) * scale + Math.random() * depth - depth/2;
					}
				}
			}
			
			sponsors[sponsors.length - 1]["vertexbuffer"] = new Float32Array(particlecount * 3 + static_particlecount * 3);

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
				for (j=0; j<sponsors.length - 1; j++) {
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3] = Math.random() * 1000 - 500;
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3 + 1] = Math.random() * 1000 - 500;
					sponsors[j]['vertexbuffer'][particlecount * 3 + i * 3 + 2] = Math.random() * 1000 - 500;
				}
			}

			for (var i=0; i<rndpos.particlecount + static_particlecount; i++) {
				sponsors[sponsors.length - 1]['vertexbuffer'][particlecount * 3 + i * 3] = rndpos[particlecount * 3 + i * 3];
				sponsors[sponsors.length - 1]['vertexbuffer'][particlecount * 3 + i * 3 + 1] = rndpos[particlecount * 3 + i * 3 + 1];
				sponsors[sponsors.length - 1]['vertexbuffer'][particlecount * 3 + i * 3 + 2] = rndpos[particlecount * 3 + i * 3 + 2];
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
					texture:	{ type: "t", value: particle_texture },
					time:		{ type: "f", value: 1.0 },
					direction:	{ type: "f", value: 0.0 },
					cameraPosition: { type: "v3", value: new THREE.Vector3(0, 0, 300)}
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

			var rendertarget = new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true});
			
			var composer = new THREE.EffectComposer(global_engine.renderers['main'], rendertarget);
			var renderpass = new THREE.RenderPass(scene, obj.cameras['particlecam']);
			renderpass.renderToScreen = false;
			composer.addPass(renderpass);

			composer.clear = false;
			obj.composers['particles'] = composer;
			obj.rendertargets['particles'] = rendertarget;			

			return scene;
		}(ro));
		
		ro.scenes['writer'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1000, 100, 1, 1);
			var material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, -150 - 12.5 - 15, 0);
			obj.objects['backgroundbar'] = mesh;
			scene.add(mesh);
			
			var textarr = [];
			
			for (var i=0; i<obj['texts'].length; i++) {
				textarr.push(obj['texts'][i]['text']);
			}
			
			var font = new THREE.Font(jsonfont_piximisa);
			
			var fontparams = {
				size: 50,
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
			
			/* Fade to white -mesh */

			var whitegeometry = new THREE.PlaneBufferGeometry(1920 * 2, 1080 * 2, 1, 1);
			var whitematerial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
			var whitemesh = new THREE.Mesh(whitegeometry, whitematerial);
			whitemesh.position.set(0, 0, 500);
			whitemesh.material.opacity = 0.0;
			scene.add(whitemesh);
			obj.objects['whitemesh'] = whitemesh;
			
			/**/
			
			
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
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['particles'].renderTarget2.texture;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['writer'].renderTarget2.texture;
			combinerpass.renderToScreen = true;
			composer.addPass(combinerpass);

			obj.rendertargets['maintarget'] = rendertarget;
			obj.composers['composer'] = composer;
			
			return scene;
		}(ro));

		ro.functions = {
			updateSponsorLogo: function(pd, pt, gt) {
				var logotime = 6956;
				
				var obj = pd.data.objects;
				var sponsors = obj['sponsors'];
				var particle_uniforms = obj['particle_uniforms'];
				var particles = obj['particles'];
				var sponsor_indices = obj['sponsor_indices'];
				var sponsor_forward = obj['sponsor_forward'];
				
				var sponsor_idx = Math.floor((pt) / logotime) % sponsors.length;
				var next_sponsor_idx = (Math.floor((pt + logotime / 4) / logotime) + 1) % sponsors.length;
				
				particle_uniforms.time.value = pt / 1000;
				var direction = Math.min((Math.sin((pt / logotime) % 1 * Math.PI * 2.3) + 1), 0.8 ) * 1.25;
				particle_uniforms.direction.value = direction;

				var bufferindex = sponsor_idx % 2;
				
				if (sponsor_indices[bufferindex] != next_sponsor_idx) {
					sponsor_indices[bufferindex] = next_sponsor_idx;
					
					if (bufferindex == 0) {
						for (var i=0; i<sponsors[next_sponsor_idx]["vertexbuffer"].length; i++) {
							particles.geometry.attributes.positionbuffer1.array[i] = sponsors[next_sponsor_idx]["vertexbuffer"][i];
							particles.geometry.attributes.positionbuffer1.needsUpdate = true;
						}
						
						pd.data.objects['sponsor_forward'] = true;
					} else {
						for (var i=0; i<sponsors[next_sponsor_idx]["vertexbuffer"].length; i++) {
							particles.geometry.attributes.positionbuffer2.array[i] = sponsors[next_sponsor_idx]["vertexbuffer"][i];
							particles.geometry.attributes.positionbuffer2.needsUpdate = true;
						}
						
						pd.data.objects['sponsor_forward'] = false;
					}
				}
				
				if (pd.data.objects['sponsor_forward'] == true) {
					particle_uniforms.bufferindex.value = 0;
				} else {
					particle_uniforms.bufferindex.value = 1;
				}
				
				particles.rotation.y = (Math.max(pt/logotime - Math.floor(pt/logotime),0.5) - 0.5) * 2 * 2 * Math.PI * 2;
				particles.rotation.x = Math.sin((Math.max(pt/logotime - Math.floor(pt/logotime),0.5) - 0.5) * 2 * Math.PI * 2) / 2;
			},
			
			updateWriter: function(pd, pt, gt) {
				var textobjects = pd.data.objects['writertextmeshes'];
				var whitemesh = pd.data.objects['whitemesh'];
				var backgroundbar = pd.data.objects['backgroundbar'];
				
				var pagemaxtime = 6956;
				var page = Math.floor((pt) / pagemaxtime);
				var pagetime = (pt) - page * pagemaxtime;
				var in_transitiontime = 500;
				var out_transitiontime = 3000;
				
				page = page % textobjects.length;

				for (var i=0; i<textobjects.length; i++) {
					var textobject = textobjects[i];
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
				}
				
				if (pt < 1000) {
					var fade = 1 - (pt / 1000);
					whitemesh.material.opacity = fade;
					whitemesh.material.color.setHex(0xffffff);
				} else {
					whitemesh.material.opacity = 0;
					whitemesh.material.color.setHex(0xffffff);
				}

				if (pt + 500 > pd.data.partlength) {
					var fade = 1 - (pd.data.partlength - pt) / 500;
					whitemesh.material.opacity = fade;
					whitemesh.material.color.setHex(0x000000);
				}
			}
		}

		ro.player = function(partdata, parttick, tick) {
			this.functions.updateSponsorLogo(partdata, parttick, tick);
			this.functions.updateWriter(partdata, parttick + 500, tick);

			var dt = global_engine.clock.getDelta();
			this.composers['particles'].render(dt);
			this.composers['writer'].render(dt);
			this.composers['composer'].render(dt);
		}
	
		return ro;
	}())
}


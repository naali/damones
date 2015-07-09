{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2015';
		ro.partlength = 1000 * 313;
		ro.cameras = {
			'kaljacam':  new THREE.OrthographicCamera( global_engine.getWidth() / - 2, global_engine.getWidth() / 2, global_engine.getHeight() / 2, global_engine.getHeight() / - 2, 1, 10000 ), //new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'photocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 100000),
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
		ro.materials = {};
		
		ro.functions = {
			CMR: function(p0, p1, p2, p3, t) {
				return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t*t + (-p0 + 3*p1 - 3*p2 + p3) * t*t*t);
			},
			FYSuffle: function(arr) {
				var c = arr.length;
				
				while (c) {
					var idx = Math.floor(Math.random() * c--) | 0;
					var tmp = arr[idx];
					arr[c] = arr[idx];
					arr[idx] = tmp;
				}
			
				return arr;
			}
		}
		
		ro.scenes['kaljat'] = (function(obj){
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(2048, 2048, 1, 1);
			var kaljatexture = THREE.ImageUtils.loadTexture( image_kaljat.src );
			kaljatexture.wrapS = kaljatexture.wrapT = THREE.RepeatWrapping;
			
			var material = new THREE.ShaderMaterial({
				uniforms: {
					opacity: 	{ type: "f", value: 1.0 },
					x: 			{ type: "f", value: 0.0 },
					y: 			{ type: "f", value: 0.0 },
					angle: 		{ type: "f", value: 30.0 },
					zoom:		{ type: "f", value: 2 },
					tDiffuse:	{ type: "t", value: kaljatexture }
				},
				
				vertexShader: $('#vertex_plain').text(),
				fragmentShader: $('#fragment_translaterotate').text()
			});
			obj.materials['beermaterial'] = material;
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			scene.add(mesh);
			obj.objects['kaljat'] = mesh;

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 0, 1 );
			scene.add( directionallight );
			obj.lights['kaljadirectional'] = directionallight;
			
			scene.add(obj.cameras['kaljacam']);
			obj.cameras['kaljacam'].position.z = 1000;
			
			var beercomposer = new THREE.EffectComposer(global_engine.renderers['main'],
				new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true }
			));

			var beerpass = new THREE.RenderPass(scene, obj.cameras['kaljacam']);
			beercomposer.addPass(beerpass);
			beercomposer.clear = false;

			obj.composers['beercomposer'] = beercomposer;

			return scene;
			
		}(ro));
		
		ro.scenes['photos'] = (function(obj) {
			obj.objects['photomaterials'] = [];
			obj.objects['photogeometries'] = {};
			
			var photoconf = [
				{name: '_picb_landscape', amount: 39, wmul: 1, hmul: 720 / 512},
				{name: '_pic_landscape', amount: 9, wmul: 1, hmul: 1.33333},
				{name: '_pic_portrait', amount: 10, wmul: 1.3333, hmul: 1}
			];
			
			var photobumptexture = THREE.ImageUtils.loadTexture(image_concretebump.src);
			photobumptexture.wrapS = photobumptexture.wrapS = THREE.RepeatWrapping;
			
			for (var j=0; j<photoconf.length; j++) {
				for (var i=1; i<=photoconf[j].amount; i++) {
					var name = eval('image' + photoconf[j].name + '_' + i + '.src');
					var width = eval('image' + photoconf[j].name + '_' + i + '.width');
					var height = eval('image' + photoconf[j].name + '_' + i + '.height');
			
					var material = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture(name), bumpMap: photobumptexture, transparent: false, color: 0xFFFFFF, specular: 0x030303 } );
					material.pixelwidth = width * photoconf[j].wmul;
					material.pixelheight = height * photoconf[j].hmul;
					material.side = THREE.DoubleSide;
				
					obj.objects['photomaterials'].push(material);
					
					if (!obj.objects['photogeometries'].hasOwnProperty('' + material.pixelwidth + "x" + material.pixelheight)) {
						var geometry = new THREE.PlaneBufferGeometry(material.pixelwidth, material.pixelheight, 1, 1);
						geometry.computeBoundingBox();
						obj.objects['photogeometries']['' + material.pixelwidth + "x" + material.pixelheight] = geometry;
					}
				}
			}
			
			var scene = new THREE.Scene();
			var inter = 0;
			
			var intersectiontest = function(testarray, mesh) {
				return false; // ASDQWE
				
				var index;
				var position;
				
				if (mesh.geometry.hasOwnProperty('faces')) {
					index = [];
					for (var i=0; i<mesh.geometry.faces.length; i++) {
						index.push(mesh.geometry.faces[i].a);
						index.push(mesh.geometry.faces[i].b);
						index.push(mesh.geometry.faces[i].c);
					}
					
					position = mesh.geometry.vertices;
				} else {
					index = mesh.geometry.attributes.index.array;
					position = mesh.geometry.attributes.position.array;
				}
				

				var gpos = [];

				for (var j=0; j<index.length; j++) {
					gpos.push(
						mesh.localToWorld(
							new THREE.Vector3(
								position[index[j] * 3], 
								position[index[j] * 3 + 1], 
								position[index[j] * 3 + 2]
							)
						)
					);
				}
				
				var intersects = false;

				for (var k=0; k<2 && !intersects; k++) {
					for (var j=0; j<3 && !intersects; j++) {
						var origin = gpos[index[(k * 3 + j)]].clone();
						var direction = gpos[index[(k * 3 + ((j+1) % 3))]].clone();

						direction.sub(gpos[index[(k * 3 + j)]].clone());
						direction.normalize();

						var ray = new THREE.Raycaster(origin, direction);
						
						if (ray.intersectObjects(testarray, true).length > 0) {
							inter++;
							intersects = true;
							break;
						}
						
						// other direction
						
						origin = gpos[index[(k * 3 + ((j+1) % 3))]].clone();
						direction.negate();

						ray = new THREE.Raycaster(origin, direction);
						
						if (ray.intersectObjects(testarray, true).length > 0) {
							inter++;
							intersects = true;
							break;
						}
					}
				}
				
				return intersects;
			}
			
			obj.objects['photopositions'] = [];
						
			var cameraviewports = [];
			var bbcheckarr = [];

			var photoboxgeom = new THREE.BoxGeometry(1500,1500,3500);
			photoboxgeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 950));
			var photoboxmaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
			photoboxmaterial.side = THREE.DoubleSide;

			for (var i=0; i<obj.objects['photomaterials'].length; i++) {
				do {
					var material = obj.objects['photomaterials'][i];
					var geometry = obj.objects['photogeometries']['' + material.pixelwidth + "x" + material.pixelheight] ;
					var mesh = new THREE.Mesh(geometry, material);

					var mesh_x_pos = Math.random() * 10000 - 5000;
					var mesh_y_pos = Math.random() * 10000 - 5000;
					var mesh_z_pos = Math.random() * 10000 - 5000;
				
					var mesh_rot_y = Math.random() * Math.PI * 4 - Math.PI * 2;
					var mesh_rot_x = Math.random() * Math.PI * 4 - Math.PI * 2;
					var mesh_rot_z = Math.random() * Math.PI * 4 - Math.PI * 2;

					mesh.position.set(mesh_x_pos, mesh_y_pos, mesh_z_pos);
					mesh.rotation.set(mesh_rot_y, mesh_rot_x, mesh_rot_z);
					mesh.updateMatrixWorld();

					var quaternion = mesh.quaternion;
					var photoposition = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
			
					var cameraposition = new THREE.Vector3(0,0,-1);
					var cameraposition2 = new THREE.Vector3(0,0,-1);
			
					cameraposition.applyQuaternion(mesh.quaternion);
					cameraposition2.applyQuaternion(mesh.quaternion);

					cameraposition.multiplyScalar(2500);
					cameraposition2.multiplyScalar(700);
			
					cameraposition.negate();
					cameraposition2.negate();

					cameraposition.add(new THREE.Vector3(mesh_x_pos, mesh_y_pos, mesh_z_pos));
					cameraposition2.add(new THREE.Vector3(mesh_x_pos, mesh_y_pos, mesh_z_pos));
					
					photoboxmesh = new THREE.Mesh(photoboxgeom, photoboxmaterial);
					photoboxmesh.position.set(mesh_x_pos, mesh_y_pos, mesh_z_pos);
					photoboxmesh.rotation.set(mesh_rot_y, mesh_rot_x, mesh_rot_z);
					photoboxmesh.updateMatrixWorld();

				} while (intersectiontest(bbcheckarr, photoboxmesh));
				
				scene.add(mesh);
				bbcheckarr.push(mesh);
				bbcheckarr.push(photoboxmesh);
			
				var photoobj = {photoposition: photoposition, cameraposition: cameraposition, camerarotation: quaternion};
				var photoobj2 = {photoposition: photoposition, cameraposition: cameraposition2, camerarotation: quaternion};
				obj.objects['photopositions'].push(photoobj);
				obj.objects['photopositions'].push(photoobj2);
			}
/*
			for (var i=0; i<500; i++) {
				do {
					var material = obj.objects['photomaterials'][i  % obj.objects['photomaterials'].length];
					var geometry = obj.objects['photogeometries']['' + material.pixelwidth + "x" + material.pixelheight] ;
				
					var mesh = new THREE.Mesh(geometry, material);
					var mesh_x_pos = Math.random() * 10000 - 5000;
					var mesh_y_pos = Math.random() * 10000 - 5000;
					var mesh_z_pos = Math.random() * 10000 - 5000;
				
					var mesh_rot_y = Math.random() * Math.PI * 4 - Math.PI * 2;
					var mesh_rot_x = Math.random() * Math.PI * 4 - Math.PI * 2;
					var mesh_rot_z = Math.random() * Math.PI * 4 - Math.PI * 2;

					mesh.position.set(mesh_x_pos, mesh_y_pos, mesh_z_pos);
					mesh.rotation.set(mesh_rot_y, mesh_rot_x, mesh_rot_z);
					mesh.updateMatrixWorld();

					if (inter % 100 == 0) {
						$('#setup').text("inter: " + inter);
						log("inter: " + inter);
					}

				} while (intersectiontest(bbcheckarr, mesh));
				
				scene.add(mesh);
				bbcheckarr.push(mesh);
			}
*/			
			var light1 = new THREE.SpotLight(0xFFCCCC, 1, 8000, Math.PI/3);
			var light2 = new THREE.SpotLight(0xCCFFCC, 1, 8000, Math.PI/3);
			var light3 = new THREE.SpotLight(0xCCCCFF, 1, 8000, Math.PI/3);
			
			obj.cameras['photocam'].add(light1);
			obj.cameras['photocam'].add(light2);
			obj.cameras['photocam'].add(light3);

			light1.position.set(-1,0,1);
			light2.position.set(1,0,1);
			light3.position.set(0,0,1);
			
			light1.target = obj.cameras['photocam'];
			light2.target = obj.cameras['photocam'];
			light3.target = obj.cameras['photocam'];

			obj.lights['photospot1'] = light1;
			obj.lights['photospot2'] = light2;
			obj.lights['photospot3'] = light3;

			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 0, 1 );
			obj.cameras['photocam'].add(directionallight);
			scene.add( directionallight );
			obj.lights['photodirectional'] = directionallight;
			
			scene.add(obj.cameras['photocam']);

			var photocomposer = new THREE.EffectComposer(global_engine.renderers['main'], 
				new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),  
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true}
			));

			var photopass = new THREE.RenderPass(scene, obj.cameras['photocam']);
			photocomposer.addPass(photopass);

			var glitchpass = new THREE.GlitchPass();
			
			photocomposer.addPass(glitchpass);

			obj.composers['photocomposer'] = photocomposer;

			return scene;
		}(ro));

		ro.scenes['writer'] = (function(obj) {
		
			var scene = new THREE.Scene();			

			var textarr = [
				[
					"°0it's °1time",
					"to °5announce"
				],
				[
					"°1boozembly °02014",
					"°2jubileum",
					"°3jul 31 - aug 3",
				],
				[
					"°4damones °7with",
					"°1boozembly",
					"disorganizing"
				],
				[
					"°3invites you to",
					"°1the scene event",
					"°3of the year",
					"°02014"
				],
				[
					"°3celebrating",
					"our °520th time",
					"°3lost in the hills"
				],
				[
					"°1boozembly °02014",
					"features",
				],
				[
					"°0nice °1people",
					"°2hot °3barbeque",
					"°4perfect °5weather",
					"°6great °7atmosphere"
				],
				[
					"°3location will",
					"be the same",
					"as last year"
				],
				[
					"°3if you don't know",
					"where to come,",
					"ask the nearest",
					"°5pullomummo"
				],
				[
					"°3if you have",
					"°6extra °3beer",
					"°3too °6many °3sausages",
					"°3stiff °6blunts"
				],
				[
					"°3feel free",
					"to",
					"°4share!"
				],
				[
					"°3add",
					"°6jul 31 - aug 3",
					"°3to your",
					"°3calendars",
					"°3now"
				],
				[
					"°3greetings fly to",
					"°0komplex °1pyrotech",
					"°2byterapers °4darklite",
					"°5accession °6kooma",
					"°7kewlers °0scoopex °1flo",
					"°2fairlight °4extend"
				],
				[
					"°1boozembly °02014",
					"°0.°1.°2.°3.°4.°5.°6.°7.°0.°1.°2.°3.°4.°5.°6.°7.",
					"°3bring your",
					"°3family"
				],
				[
					"credits for",
					"this",
					"invitation"
				],
				[
					"°7photos",
					"°6h7 & norppa",
					" ",
					"°7graphics",
					"°6h7"
				],
				[
					"°7music",
					"°6tempest",
					"    ",
					"°7code",
					"°6jawbreaker",
					"°6kakka"
				],
				[
					"°3released",
					"°3at",
					"°1graffathon",
					"°02014"
				],
				[
					"see you all",
					"in",
					"°1boozembly!"
				],
				[
					"dunkku",
					"koita",
					"keskittyä"
				]
			];
			
			obj.objects['textarr'] = textarr;
			obj.objects['chargeoms'] = [];
			obj.objects['textcolors'] = {
				'0': 0xe0ab1d,
				'1': 0xe01db4,
				'2': 0x7d1de0,
				'3': 0x1d66e0,
				'4': 0x1de0b4,
				'5': 0x1de02f,
				'6': 0xe0271d,
				'7': 0xffffff,
			}
			
			for (var i=0; i<textarr.length; i++) {
				for (var j=0; j<textarr[i].length; j++) {
					for (var k=0; k<textarr[i][j].length; k++) {
						var c = textarr[i][j].charAt(k);
						
						if (c == '°') {
							k += 1;
							continue;
						}

						if (!obj.objects['chargeoms'][c]) {
							var geometry = null;
							if (c != ' ') {
									geometry = new THREE.TextGeometry(c, {
									size: 40,
									height: 20,
									curveSegments: 8,
									font: 'magnum',
									weight: 'normal',
									style: 'normal',
									bevelThickness: 1.5,
									bevelSize: 0.5,
									bevelSegments: 6, 
									bevelEnabled: false,
									bend: false
								});
							
								geometry.computeBoundingBox();
								geometry.width = geometry.boundingBox.min.x - geometry.boundingBox.max.x - 5;
							} else {
								geometry = new THREE.Geometry();
								geometry.width = -20;
							}
							
							obj.objects['chargeoms'][c] = geometry;
						}
					}
				}
			}
			
			function calculateLineLength(line) {
				var len = 0;

				for (var i=0; i<line.length; i++) {
					var c = line.charAt(i);
					if (c == '°') {
						i += 1;
						continue;
					} 

					len += obj.objects['chargeoms'][c].width;
				}
			
				return len;
			}
			
			obj.objects['pagemesharr'] = [];
			var pagetextmaterials = {};

			for (var i=0; i<textarr.length; i++) {
				obj.objects['pagemesharr'][i] = [];

				for (var j=0; j<textarr[i].length; j++) {
					var xpos = -calculateLineLength(textarr[i][j]) / 2;
					var color = obj.objects['textcolors']['3'];
						
					for (var k=0; k<textarr[i][j].length; k++) {
						var c = textarr[i][j].charAt(k);
						
						if (c == '°') {
							color = obj.objects['textcolors'][textarr[i][j].charAt(k+1)];
							k += 2;
							c = textarr[i][j].charAt(k);
						}
						
						if (!pagetextmaterials.hasOwnProperty(i + ':' + color)) {
							pagetextmaterials[i + ':' + color] = new THREE.MeshLambertMaterial({ transparent: true, color: color });
						}
						
						var material = pagetextmaterials[i + ':' + color];
						var mesh = new THREE.Mesh(obj.objects['chargeoms'][c], material);
						mesh.position.x = -xpos;
						mesh.position.y = (textarr[i].length / 2) * 50 - j * 50 - 50;
						xpos += obj.objects['chargeoms'][c].width;

						mesh.position.z = 500;
						scene.add(mesh);
						obj.objects['pagemesharr'][i].push(mesh);
					}
				}
			}
								
			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(200, 200, 1500);
			scene.add(light);
			obj.lights['writerspot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['writerspot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['writerspot3'] = light;
			
			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['writerdirectional'] = directionallight;
			
			scene.add(obj.cameras['writercam']);
			obj.cameras['writercam'].position.z = 1000;

			var writercomposer = new THREE.EffectComposer(global_engine.renderers['main'],
				new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false }
			));

			var writerpass = new THREE.RenderPass(scene, obj.cameras['writercam']);
			writercomposer.addPass(writerpass);
			writercomposer.clear = false;
//			writercomposer.needsSwap = true;
//			writercomposer.clearAlpha = 0;

			var writershader = new THREE.ShaderPass( THREE.PerseilyFade );
			writershader.needsSwap = true;
			writercomposer.addPass(writershader);
			
			obj.renderpasses['writerpass'] = writerpass;
			obj.composers['writercomposer'] = writercomposer;
			
			return scene;
		}(ro));
		
		ro.scenes['composer'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var composerrt = new THREE.WebGLRenderTarget(
				global_engine.getWidth(), 
				global_engine.getHeight(), 
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: true, alpha: true }
			);
			
			var maincomposer = new THREE.EffectComposer(global_engine.renderers['main'], composerrt);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['beercomposer'].renderTarget2;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['photocomposer'].renderTarget1;
			
//			combinerpass.uniforms['tDiffuse2'].value = obj.composers['writercomposer'].renderTarget1;
			combinerpass.renderToScreen = false;
			maincomposer.addPass(combinerpass);
			
			var combinerpass2 = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass2.uniforms['tDiffuse1'].value = maincomposer.renderTarget1;
			combinerpass2.uniforms['tDiffuse2'].value = obj.composers['writercomposer'].renderTarget1;
			combinerpass2.renderToScreen = true;
			maincomposer.addPass(combinerpass2);

			obj.composers['maincomposer'] = maincomposer;
			
 			return scene;
		}(ro));

		ro.player = function(partdata, parttick, t) {
			var pagemaxtime = 4000;
			var page = Math.floor(parttick / pagemaxtime);
			var pagetime = parttick - page * pagemaxtime;
			
			for (var i=0; i<this.objects['pagemesharr'].length; i++) {
				for (var j=0; j<this.objects['pagemesharr'][i].length; j++) {
					if (i == page) {
						this.objects['pagemesharr'][i][j].position.z = Math.sin(t/200 + j/20) * 500;
						
						if (pagetime < 1000) {
							this.objects['pagemesharr'][i][j].material.opacity = pagetime/1000;
						} else if (pagetime > (pagemaxtime-1000)) {
							this.objects['pagemesharr'][i][j].material.opacity = (pagemaxtime - pagetime) / 1000;
						} else {
							this.objects['pagemesharr'][i][j].material.opacity = 1;
						}
					} else {
						this.objects['pagemesharr'][i][j].material.opacity = 0;
					}
				}
			}

			var fftdata = global_engine.getByteFFTData(0);

			phototimer = parttick / 2000;
				var idx = Math.floor(phototimer);
				var intrat = (phototimer) % 1;

				var fft = 0.1 + ((fftdata[0] / 256) * 0.2);
				var specular_color = new THREE.Color(fft, fft, fft);
				var rnd_color = new THREE.Color(Math.random(), Math.random(), Math.random());

			if (idx > 4) {
				this.objects['photomaterials'][Math.floor(idx/2) - 1].specular = 0.1;
				this.objects['photomaterials'][Math.floor(idx/2) + 0].specular = specular_color;
				this.objects['photomaterials'][Math.floor(idx/2) + 1].specular = specular_color;
			}

			var v0 = this.objects['photopositions'][idx].cameraposition;
			var v1 = this.objects['photopositions'][idx + 1].cameraposition;
			var v2 = this.objects['photopositions'][idx + 2].cameraposition;
			var v3 = this.objects['photopositions'][idx + 3].cameraposition;
			var cpos_x = this.functions.CMR(v0.x, v1.x, v2.x, v3.x, intrat);
			var cpos_y = this.functions.CMR(v0.y, v1.y, v2.y, v3.y, intrat);
			var cpos_z = this.functions.CMR(v0.z, v1.z, v2.z, v3.z, intrat);
			
			var r0 = this.objects['photopositions'][idx].camerarotation;
			var r1 = this.objects['photopositions'][idx+1].camerarotation;
			var r2 = this.objects['photopositions'][idx+2].camerarotation;
			var r3 = this.objects['photopositions'][idx+3].camerarotation;
			var crot_x = this.functions.CMR(r0.x, r1.x, r2.x, r3.x, intrat);
			var crot_y = this.functions.CMR(r0.y, r1.y, r2.y, r3.y, intrat);
			var crot_z = this.functions.CMR(r0.z, r1.z, r2.z, r3.z, intrat);
			var crot_w = this.functions.CMR(r0.w, r1.w, r2.w, r3.w, intrat);
			var q = new THREE.Quaternion(crot_x, crot_y, crot_z, crot_w);
			q.normalize();
			
			var p0 = this.objects['photopositions'][idx].photoposition;
			var p1 = this.objects['photopositions'][idx+1].photoposition;
			var p2 = this.objects['photopositions'][idx+2].photoposition;
			var p3 = this.objects['photopositions'][idx+3].photoposition;
			
			var ppos_x = this.functions.CMR(p0.x, p1.x, p2.x, p3.x, intrat);
			var ppos_y = this.functions.CMR(p0.y, p1.y, p2.y, p3.y, intrat);
			var ppos_z = this.functions.CMR(p0.z, p1.z, p2.z, p3.z, intrat);
			
			this.cameras['photocam'].position.set(cpos_x, cpos_y, cpos_z);
			this.cameras['photocam'].setRotationFromQuaternion(q);
			
//			var fftdata = global_engine.getFloatFFTData(0);
			
//			log(fftdata[0]);
/*			
			this.effects['RGBShiftShader'].uniforms['amount'].value = 0; //fftdata[0] / 256 / 10; //Math.sin(parttick / 1000) / 1000 * 5;
			this.effects['RGBShiftShader'].uniforms['angle'].value = 0; //Math.sin(parttick / 487) * Math.PI * 2;
*/

			global_engine.renderers['main'].clear();
			
			var dt = global_engine.clock.getDelta();
			
			var origin = new THREE.Vector3(0, 0, 0);
			var camera_distance_from_origin = origin.distanceTo(this.cameras['photocam'].position);
			var beerzoom = 2-camera_distance_from_origin / 9000;
//			this.materials['beermaterial'].uniforms.angle.value = Math.sin(t / 1000);
			this.materials['beermaterial'].uniforms.zoom.value = beerzoom;
			this.materials['beermaterial'].uniforms.x.value = cpos_x / 10000;
			this.materials['beermaterial'].uniforms.y.value = -cpos_y / 10000;
			
			this.composers['beercomposer'].render(dt);
			this.composers['photocomposer'].render(dt);
			this.composers['writercomposer'].render(dt);
			this.composers['maincomposer'].render(dt);

/*
			global_engine.renderers['main'].render(this.scenes['kaljat'], this.cameras['kaljacam']);
*/			
		}
	
		return ro;
	}())
}


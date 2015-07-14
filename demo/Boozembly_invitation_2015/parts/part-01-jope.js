{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2015';
		ro.prewarm = true;
		ro.partlength = 1000 * 312;
		ro.cameras = {
			'kaljacam':  new THREE.OrthographicCamera( global_engine.getWidth() / - 2, global_engine.getWidth() / 2, 
						global_engine.getHeight() / 2, global_engine.getHeight() / - 2, 1, 10000 ),
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
		ro.contentarr = [
				{ 
					photos: [
						"image_pic_placeholder_1",	// tyhjä
						"image_pic_placeholder_1" 	// tyhjä
					],
					texts: [
						"",
					]
				},
				{ 
					photos: [
						"image_pic_placeholder_1",	// tyhjä
						"image_picb_landscape_36" 	// sasku pyllistää
					],
					texts: [
						"°0Damones",
						"°1with",
						"°2Boozembly",
						"°3disorganizing"
					]
				},
				{ 
					photos: [
						"image_pic_landscape_5", 		// Lennu tuolissa
						"image_picb_landscape_3"		// damones
					],
					texts: [
						"°0Invites",
						"°1you to the",
						"°221st annual",
						"°3summer camp"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_7",		// Pablo ja muita
						"image_picb_landscape_12"		// Adam ja muita
					],
					texts: [
						""
					]
				},
				{ 
					photos: [
						"image_picb_landscape_13",	// Kurkku
						"image_picb_landscape_22"		// Ade ja jotain
					],
					texts: [
						"°0Boozembly 2015",
						"°0-°1-°2-°3-°4-°5-°6-°7-°0-°1-°2-°3-°4-°5-°6-",
						"°030th Jul - 2nd Aug"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_27",	// Hao
						"image_picb_landscape_40"		// Hassu hattu
					],
					texts: [
						"°0Boozembly",
						"°1features"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_9", 		// Zados
						"image_picb_landscape_17"		// Adam ja jotain
					],
					texts: [
						"°1Perfect",
						"°2weather"
					]
				},
				{ 
					photos: [
						"image_picb_portrait_13", 	// Evästys
						"image_picb_landscape_15" 	// Grillausta
					],
					texts: [
						"°2Mouthwatering",
						"°3barbeque",
						"°4experience"
					]
				},
				{ 
					photos: [
						"image_pic_kakka_2",			// kalja-allas täynnä
						"image_picb_landscape_50"		// kalja-allas lähikuva
					],
					texts: [
						"°3Ice cold",
						"°4beer pool"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_10", 		// kisu + dogo
						"image_pic_landscape_9"		// Ade ja joku
					],
					texts: [
						"°4Happy",
						"°5reunions"
					]
				},
				{ 
					photos: [
						"image_pic_kakka_1", 			// paitalootat
						"image_picb_portrait_15" 		// uncle-x
					],
					texts: [
						"°5Official",
						"°6Boozembly",
						"°7t-shirts"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_3",		// Hevospää
						"image_picb_landscape_33"		// irwin
					],
					texts: [
						"°6People",
						"°7Horsing",
						"°0around"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_26", 	// brite
						"image_picb_landscape_1"		// kraku + vaimo
					],
					texts: [
						"°7Demoscene",
						"°0legends",
						"°1in Bright Light"
					]
				},
				{ 
					photos: [
						"image_picb_portrait_7",		// Jugi
						"image_picb_landscape_37" 	// Virne + Apatia
					],
					texts: [
						"°0Veteran",
						"°1multimedia",
						"°2innovators"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_45",	// Rotsi
						"image_picb_portrait_2"		// random1
					],
					texts: [
						"°1Boozembly 2015",
						"°2is all this",
						"°3and even more!"
					]
				},
				{ 
					photos: [
						"image_picb_portrait_4", 		// lucas
						"image_picb_portrait_16"		// dustie
					],
					texts: [
						"°2Make room",
						"°3in your",
						"°4calendar",
						"°5now"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_8",		// Truck
						"image_picb_landscape_29"		// Biini valotikkupää
					],
					texts: [
						"°3the longest night",
						"°4of the year",
						"°5is coming!"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_31",	// Dunc + reed
						"image_picb_landscape_30"		// Murkku
					],
					texts: [
						"°430th of July",
						"°0-°1-°2-°3-°4-°5-°6-°7-°0-°1-°2-°3-°4-°5-°6-",
						"°52nd of August"
					]
				},
				{ 
					photos: [
						"image_picb_portrait_6", 		// Vattu
						"image_picb_landscape_10"		// Jope + Riku
					],
					texts: [
						"°6Boozembly 2015",
					]
				},
				{ 
					photos: [
						"image_picb_landscape_48",
						"image_picb_landscape_49"
					],
					texts: [
						"°7The outdoor",
						"°0adventure you",
						"°1won't forget!",
					]
				},
				{ 
					photos: [
						"image_picb_landscape_6", 	// Tazzen sisko
						"image_picb_landscape_14"
					],
					texts: [
						"",
					]
				},
				{ 
					photos: [
						"image_pic_portrait_7", 		// Hevospää
						"image_picb_landscape_18" 	// lennu keskari
					],
					texts: [
						"°0Greetings",
						"°1fly",
						"°2to"
					]
				},
				{ 
					photos: [
						"image_picb_portrait_10", 	// Tikkis
						"image_picb_portrait_14"		// Suckho
					],
					texts: [
						"°1Byterapers",
						"°2Fairlight",
						"°3Komplex",
						"°4cncd",
						"°5TRSI"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_4",		// Urs thumbs up
						"image_picb_landscape_8"		// Argon
					],
					texts: [
						"°2Extend",
						"°3Scoopex",
						"°4Mercury",
						"°5Pyrotech",
						"°6Wide Load"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_41", 	// ana + reed
						"image_picb_portrait_17"		// Karva + tupi
					],
					texts: [
						"°3Darklite",
						"°4Accession",
						"°5Kewlers",
						"°6Kooma",
						"°7Flo"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_16", 	// xmunkki
						"image_picb_landscape_19" 	// 216
					],
					texts: [
						""
					]
				},
				{ 
					photos: [
						"image_picb_portrait_12", 	// Aksu grillaa
						"image_pic_portrait_6"		// Mukle
					],
					texts: [
						"°4If you have",
						"°5extra beer or",
						"°6sausages to",
						"°7donate"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_46",	// Lennu
						"image_pic_landscape_7"		// Kakka
					],
					texts: [
						"°5Please contact",
						"°6your nearest",
						"°7Boozembly",
						"°0disorganizer"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_25",	// yleiskuva
						"image_picb_landscape_20"		//
					],
					texts: [
						""
					]
				},
				{ 
					photos: [
						"image_pic_portrait_1", 		//
						"image_picb_landscape_35"		// Piraattiteltta
					],
					texts: [
						"°6Credits",
						"°7for this",
						"°0invitation"
					]
				},
				{ 
					photos: [
						"image_pic_landscape_1",		// Kakka + niki laatikossa
						"image_pic_portrait_2"		// Kakka
						
					],
					texts: [
						"°3Code:",
						"°0Kakka"
					]
				},
				{ 
					photos: [
						"image_pic_kikka_square_1",	// Kikka
						"image_pic_kikka_square_2"	// Wal
					],
					texts: [
						"°3Music:",
						"°0Kikka",
						"°1cover by",
						"°0Wal"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_52",	// Kani + jope (bzm 2013)
						"image_picb_landscape_34"		// Mazor + destop
					],
					texts: [
						"°3Graphics:",
						"°0H7",
						"°0Mazor"
					]
				},
				{ 
					photos: [
						"image_pic_portrait_5",		// Biini
						"image_picb_landscape_51"		// Norppa
					],
					texts: [
						"°3Photos:",
						"°0Biini",
						"°0Norppa"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_28", 	//
						"image_picb_landscape_43" 	//
					],
					texts: [
						"",
						""
					]
				},
				{ 
					photos: [
						"image_pic_landscape_2", 		// Tazza + sisko
						"image_pic_landscape_8" 		// Kisu + bracket
					],
					texts: [
						"°0See you all",
						"°1at",
						"°2the Boozembly!"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_38",	// speedu + vessu
						"image_picb_portrait_8"		//
					],
					texts: [
						"°1This invitation",
						"°2will",
						"°3now",
						"°4repeat"
					]
				},
				{ 
					photos: [
						"image_picb_landscape_39", 	// Psyko
						"image_picb_landscape_4" 		// Slobber
					],
					texts: [
						"°3Press",
						"°3[°2esc°3]",
						"°3to",
						"°3exit"
					]
				},
				{ 
					photos: [
						"image_pic_placeholder_1",	// tyhjä
						"image_pic_placeholder_1"		// tyhjä
					],
					texts: [
						""
					]
				},
				{ 
					photos: [
						"image_pic_placeholder_1",	// tyhjä
						"image_pic_placeholder_1"		// tyhjä
					],
					texts: [
						""
					]
				},
				{ 
					photos: [
						"image_pic_placeholder_1",	// tyhjä
						"image_pic_placeholder_1"		// tyhjä
					],
					texts: [
						""
					]
				}
			];		
		
		ro.functions = {
			CMR: function(p0, p1, p2, p3, t) {
				return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t*t + (-p0 + 3*p1 - 3*p2 + p3) * t*t*t);
			}
		}
		
		ro.scenes['kaljat'] = (function(obj){
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(2048, 2048, 1, 1);
			var kaljatexture = THREE.ImageUtils.loadTexture( image_kaljat.src );
			kaljatexture.wrapS = kaljatexture.wrapT = THREE.RepeatWrapping;
			
			var beerscale = 1024 / global_engine.getWidth();
			
			var material = new THREE.ShaderMaterial({
				uniforms: {
					opacity: 	{ type: "f", value: 1.0 },
					viewportsize: { type: "v2", value: new THREE.Vector2(beerscale, beerscale)},
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
			
			var settingsarray = [
				{ re: new RegExp("^image_pic_placeholder"), conf: { amount: 2, wmul:1, hmul: 1, transparent: true } },
				{ re: new RegExp("^image_pic_kakka"), conf: { amount: 4, wmul: 1280/1024, hmul: 720/512, transparent: false } },
				{ re: new RegExp("^image_pic_kikka_square"), conf: { amount: 2, wmul: 1, hmul: 1, transparent: false } },
				{ re: new RegExp("^image_picb_landscape"), conf: { amount: 49, wmul: 1080/1024, hmul: 720 / 512, transparent: false } },
				{ re: new RegExp("^image_picb_portrait"), conf: { amount: 17, wmul: 720 / 512, hmul: 1080/1024, transparent: false } },
				{ re: new RegExp("^image_pic_landscape"), conf: { amount: 9, wmul: 1, hmul: 1.33333, transparent: false } },
				{ re: new RegExp("^image_pic_portrait"), conf: { amount: 10, wmul: 1.3333, hmul: 1, transparent: false } },
			];
			
			var photoarray = [];
			
			for (var i=0; i<obj.contentarr.length; i++) {
				for (var j=0; j<2; j++) {
					var photo = {};
					photo['name'] = obj.contentarr[i]['photos'][j];
					
					for (var k=0; k<settingsarray.length; k++) {
						if (settingsarray[k].re.test(photo['name'])) {
							photo['wmul'] = settingsarray[k]['conf']['wmul'];
							photo['hmul'] = settingsarray[k]['conf']['hmul'];
							photo['transparent'] = settingsarray[k]['conf']['transparent'];
						}
					}
					
					photoarray.push(photo);
				}
			}
			
			log(photoarray);

			var photobumptexture = THREE.ImageUtils.loadTexture(image_concretebump.src);
			photobumptexture.wrapS = photobumptexture.wrapS = THREE.RepeatWrapping;
			
			for (var i=0; i<photoarray.length; i++) {
				var name = eval(photoarray[i].name + '.src');
				var width = eval(photoarray[i].name + '.width');
				var height = eval(photoarray[i].name + '.height');
				var material;
				
				if (photoarray[i]['transparent'] == true) {
					material = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture(name), bumpMap: photobumptexture, transparent: true, color: 0xFFFFFF, specular: new THREE.Color(0.2, 0.2, 0.2) } );
				} else {
					var material = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture(name), bumpMap: photobumptexture, transparent: false, color: 0xFFFFFF, specular: new THREE.Color(0.2, 0.2, 0.2) } );
				}
				
				material.pixelwidth = width * photoarray[i].wmul;
				material.pixelheight = height * photoarray[i].hmul;
				material.side = THREE.DoubleSide;
				material.name = name;
				
				if (i == 0) {
					obj.objects['photomaterials'].push(material); // Annoying off-by-one...
				}

				obj.objects['photomaterials'].push(material);
				
				if (!obj.objects['photogeometries'].hasOwnProperty('' + material.pixelwidth + "x" + material.pixelheight)) {
					var geometry = new THREE.PlaneBufferGeometry(material.pixelwidth, material.pixelheight, 1, 1);
					geometry.computeBoundingBox();
					obj.objects['photogeometries']['' + material.pixelwidth + "x" + material.pixelheight] = geometry;
				}
			}
			
			var scene = new THREE.Scene();
			var testmaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
			var testgeometry = new THREE.BoxGeometry(100,100,100);
			
			var intersectiontest = function(testarray, mesh) {
//				return false; // ASDQWE
				
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
				
				for (var k=0; k<gpos.length/3 && !intersects; k++) {
					for (var j=0; j<3 && !intersects; j++) {
						var origin = gpos[(k * 3 + j)].clone();
						var direction = gpos[(k * 3 + ((j+1) % 3))].clone();

						direction.sub(gpos[(k * 3 + j)].clone());
						direction.normalize();

						var ray = new THREE.Raycaster(origin, direction);
						
						if (ray.intersectObjects(testarray, true).length > 0) {
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

			var photoboxgeom = new THREE.BoxGeometry(1200,1200,3000);
			photoboxgeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 950));
			var photoboxmaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
			photoboxmaterial.side = THREE.DoubleSide;
			
			for (var i=0; i<obj.objects['photomaterials'].length; i++) {
				var iter = 0;
			
				do {
					var material = obj.objects['photomaterials'][i];
					var geometry = obj.objects['photogeometries']['' + material.pixelwidth + "x" + material.pixelheight] ;
					var mesh = new THREE.Mesh(geometry, material);

					var mesh_x_pos = (Math.random() - 0.5) * (10000 + (iter < 1000 ? iter : 200));
					var mesh_y_pos = (Math.random() - 0.5) * (10000 + (iter < 1000 ? iter : 200));
					var mesh_z_pos = (Math.random() - 0.5) * 10000;
				
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
					
					iter++;

				} while (intersectiontest(bbcheckarr, mesh));
				
				log(iter);
				
				scene.add(mesh);
				bbcheckarr.push(mesh);
				bbcheckarr.push(photoboxmesh);
			
				var photoobj = {photoposition: photoposition, cameraposition: cameraposition, camerarotation: quaternion};
				var photoobj2 = {photoposition: photoposition, cameraposition: cameraposition2, camerarotation: quaternion};
				obj.objects['photopositions'].push(photoobj);
				obj.objects['photopositions'].push(photoobj2);
			}
			
			obj.objects['photopositions'].push(obj.objects['photopositions'][0]);
			obj.objects['photopositions'].push(obj.objects['photopositions'][1]);
			obj.objects['photopositions'].push(obj.objects['photopositions'][2]);
			obj.objects['photopositions'].push(obj.objects['photopositions'][3]);
			obj.objects['photopositions'].push(obj.objects['photopositions'][4]);
			obj.objects['photopositions'].push(obj.objects['photopositions'][5]);

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

			var textarr = [];

			for (var i=0; i<obj['contentarr'].length; i++) {
				textarr.push(obj['contentarr'][i]['texts']);
			}
			
			obj.objects['chargeoms'] = [];
			obj.objects['textcolors'] = {
				'0': 0xe0ab1d,
				'1': 0xe01db4,
				'2': 0x7d1de0,
				'3': 0x1d66e0,
				'4': 0x1de0b4,
				'5': 0x1de02f,
				'6': 0xe0271d,
				'7': 0xee741a,
				'8': 0xffffff
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
									height: 10,
									curveSegments: 8,
									font: 'magnum',
									weight: 'normal',
									style: 'normal',
									bevelThickness: 2.5,
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
							pagetextmaterials[i + ':' + color] = new THREE.MeshPhongMaterial({ transparent: true, color: color });
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

			scene.add(obj.cameras['writercam']);
			obj.cameras['writercam'].position.z = 1000;
			
			var writercomposer = new THREE.EffectComposer(global_engine.renderers['main'],
				new THREE.WebGLRenderTarget( global_engine.getWidth(), global_engine.getHeight(),
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: false }
			));
			
			var writerpass = new THREE.RenderPass(scene, obj.cameras['writercam']);
			
			writercomposer.addPass(writerpass);
			var writershader = new THREE.ShaderPass( THREE.Perseily );
			writershader.uniforms['tDiffuse'].value = writercomposer.renderTarget1;
			writershader.renderToScreen = false;
			obj.effects['perseily'] = writershader;
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
				{ minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, alpha: true, autoClear: true }
			);
			
			var maincomposer = new THREE.EffectComposer(global_engine.renderers['main'], composerrt);

			var combinerpass = new THREE.ShaderPass(THREE.CopyAlphaTexture);
			combinerpass.uniforms['tDiffuse1'].value = obj.composers['beercomposer'].renderTarget2;
			combinerpass.uniforms['tDiffuse2'].value = obj.composers['photocomposer'].renderTarget1;
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
			var pagemaxtime = 8000;
			var page = Math.floor((parttick) / pagemaxtime);
			var pagetime = (parttick) - page * pagemaxtime;
			
			for (var i=0; i<this.objects['pagemesharr'].length; i++) {
				for (var j=0; j<this.objects['pagemesharr'][i].length; j++) {
					if (i == page) {
						this.objects['pagemesharr'][i][j].position.z = 600; // Math.sin(t/200 + j/20) * 500 + 300;
						this.objects['pagemesharr'][i][j].rotation.x = Math.sin((parttick + j*300)/500) //600; // Math.sin(t/200 + j/20) * 500 + 300;
						
						if (pagetime < 500) {
							this.objects['pagemesharr'][i][j].material.opacity = pagetime/500;
						this.objects['pagemesharr'][i][j].material.visible = true;
						} else if (pagetime > (pagemaxtime-500)) {
							this.objects['pagemesharr'][i][j].material.opacity = (pagemaxtime - pagetime) / 500;
						this.objects['pagemesharr'][i][j].material.visible = true;
						} else {
							this.objects['pagemesharr'][i][j].material.opacity = 1;
						this.objects['pagemesharr'][i][j].material.visible = true;
						}
					} else {
						this.objects['pagemesharr'][i][j].material.opacity = 0;
						this.objects['pagemesharr'][i][j].material.visible = false;
					}
				}
			}
			
			var fft;
			
			if (global_engine.fftsupport) {
				var fftdata = global_engine.getByteFFTData(0);
				fft = 0.1 + ((fftdata[0] / 256) * 0.2);
			} else {
				fft = 0.1 + ((128/ 256) * 0.2);
			}
			
			phototimer = parttick / 2000;
			var idx = Math.floor(phototimer);
			var intrat = (phototimer) % 1;
//			log("" + page + ", " + idx);
			var specular_color = new THREE.Color(fft, fft, fft);
			var default_specular = new THREE.Color(0.2, 0.2, 0.2);
			
//				var rnd_color = new THREE.Color(Math.random(), Math.random(), Math.random());

			if (idx > 4) {
				this.objects['photomaterials'][Math.floor(idx/2) - 1].specular = default_specular;
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

			global_engine.renderers['main'].clear(true, true, true);
			
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
			this.effects['perseily'].uniforms.time.value =  t / 1000;
			this.effects['perseily'].uniforms.intensity.value =  0.006;
			this.effects['perseily'].uniforms.scale.value = 1.95;
			this.effects['perseily'].uniforms.speed.value = 0.5;
			this.effects['perseily'].uniforms.x.value = Math.sin(t / 1000) / 10.0 + 0.06;
			this.effects['perseily'].uniforms.y.value = Math.cos(t / 345) / 10.0;

			this.composers['writercomposer'].render(dt);
			this.composers['maincomposer'].render(dt);
			
/*
			global_engine.renderers['main'].render(this.scenes['writer'], this.cameras['writercam']);
*/
		}
	
		return ro;
	}())
}


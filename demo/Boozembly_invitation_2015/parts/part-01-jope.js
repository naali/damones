{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2015';
		ro.partlength = 1000 * 168;
		ro.cameras = {
			'photocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 100000),
			'writercam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};
		ro.effects = {};
		ro.composers = {};
		ro.rendertargets = {};
		ro.renderpasses = {};
		
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
		
		ro.scenes['photos'] = (function(obj) {
			global_engine.renderers['logarithmic'] = new THREE.WebGLRenderer({logarithmicDepthBuffer: true});
			obj.objects['photomaterials'] = [];
			
			var photoconf = [
				{name: 'landscape', amount: 9, wmul: 1, hmul: 1.33333},
				{name: 'portrait', amount: 10, wmul: 1.3333, hmul: 1}
			];
			
			for (var j=0; j<photoconf.length; j++) {
				for (var i=1; i<=photoconf[j].amount; i++) {
					var name = eval('image_pic_' + photoconf[j].name + '_' + i + '.src');
					var width = eval('image_pic_' + photoconf[j].name + '_' + i + '.width');
					var height = eval('image_pic_' + photoconf[j].name + '_' + i + '.height');
			
					var material = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture(name), transparent: false} );
					material.pixelwidth = width * photoconf[j].wmul;
					material.pixelheight = height * photoconf[j].hmul;
				
					obj.objects['photomaterials'].push(material);
				}
			}
			
			var scene = new THREE.Scene();
			
			var zi = 1;

			for (var i=0; i<5000; i++) {
				var material = obj.objects['photomaterials'][i  % obj.objects['photomaterials'].length];
				var geometry = new THREE.PlaneGeometry(material.pixelwidth,material.pixelheight, 1, 1);
				
				var mesh = new THREE.Mesh(geometry, material);
				var mesh_scale = Math.random() + 0.8
				mesh.scale.set(mesh_scale, mesh_scale, 1);
				var mesh_x_pos = Math.random() * 40000 - 20000;
				var mesh_y_pos = Math.random() * 40000 - 20000;
				var mesh_z_pos = Math.random() * 20000 - 10000;
				var mesh_rot_y = Math.random() * Math.PI * 4 - Math.PI * 2;
				var mesh_rot_x = Math.random() * Math.PI * 4 - Math.PI * 2;
				var mesh_rot_z = Math.random() * Math.PI * 4 - Math.PI * 2;

				mesh.position.set(mesh_x_pos, mesh_y_pos, mesh_z_pos);
				mesh.rotation.set(mesh_rot_y, mesh_rot_x, mesh_rot_z);
				scene.add(mesh);
			}

			var temparr = [new THREE.Vector4(0,0,0,0)];
			
			for (var i=0; i<obj.objects['photomaterials'].length; i++) {
				var stride = 8;
				var material = obj.objects['photomaterials'][i];
				var geometry = new THREE.PlaneBufferGeometry(material.pixelwidth,material.pixelheight, 1, 1);
				var testmaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
				var mesh = new THREE.Mesh(geometry, testmaterial);

				var mesh_x_pos = (i % stride) * 2000 - (stride * 2000 / 2);
				var mesh_y_pos = Math.floor(i/stride) * 2000 - (stride * 2000 / 2);
				var mesh_z_pos = 1100;
				var mesh_rot_y = Math.random() * Math.PI * 4 - Math.PI * 2;
				var mesh_rot_x = Math.random() * Math.PI * 4 - Math.PI * 2;
				var mesh_rot_z = Math.random() * Math.PI * 4 - Math.PI * 2;
				
				var photoposition = new THREE.Vector4(mesh_x_pos, mesh_y_pos, 1100, mesh_rot_z);
				temparr.push(photoposition);
				
				mesh.position.set(mesh_x_pos, mesh_y_pos, 1100);
				mesh.rotation.set(mesh_rot_y, mesh_rot_x, mesh_rot_z);
				scene.add(mesh);
			}

			obj.objects['photopositions'] = obj.functions.FYSuffle(temparr);

			scene.add(obj.cameras['photocam']);

			var light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-20, -15, 1);
			light.target = obj.cameras['photocam'];
			scene.add(light);
			obj.lights['photospot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(20, -15 , 1);
			light.target = obj.cameras['photocam'];
			scene.add(light);
			obj.lights['photospot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(0, 15, 1);
			light.target = obj.cameras['photocam'];
			scene.add(light);
			obj.lights['photospot3'] = light;

			var photopass = new THREE.RenderPass(scene, obj.cameras['photocam']);
			photopass.renderToScreen = false;
			obj.renderpasses['photopass'] = photopass;
			
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
						
						var material = new THREE.MeshLambertMaterial({ transparent: true, color: color });
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

			var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
			effect.uniforms[ 'amount' ].value = 0.005;
			effect.renderToScreen = true;
			obj.effects['RGBShiftShader'] = effect;
			
			
			var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: false };
			var renderTarget = new THREE.WebGLRenderTarget(global_engine.getWidth(), global_engine.getHeight(), parameters);
			var writercomposer = new THREE.EffectComposer(global_engine.renderers['main'], renderTarget);
			
			writercomposer.addPass(obj.renderpasses['photopass']);
			var writerpass = new THREE.RenderPass(scene, obj.cameras['writercam'])
			writerpass.clearAlpha = false;
			writerpass.clear = false;
			writercomposer.addPass(writerpass);
			writercomposer.addPass(effect);
			
			obj.composers['writercomposer'] = writercomposer;

			return scene;
		}(ro));

		ro.player = function(partdata, parttick, t) {

			var pagemaxtime = 8660;
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

			phototimer = parttick / 4000;
			var idx = Math.floor(phototimer);
			var intrat = (phototimer) % 1;
			
			var v0 = this.objects['photopositions'][idx];
			var v1 = this.objects['photopositions'][idx + 1];
			var v2 = this.objects['photopositions'][idx + 2];
			var v3 = this.objects['photopositions'][idx + 3];
			
			var cpos_x = this.functions.CMR(v0.x, v1.x, v2.x, v3.x, intrat);
			var cpos_y = this.functions.CMR(v0.y, v1.y, v2.y, v3.y, intrat);
			var cpos_z_sin = Math.sin((Math.PI * 2) * (1-intrat)) * 1500;
			var cpos_z = this.functions.CMR(v0.z, v1.z, v2.z, v3.z, intrat) + (cpos_z_sin + 1500) + 1000;

			this.cameras['photocam'].position.x = cpos_x;
			this.cameras['photocam'].position.y = cpos_y;
			this.cameras['photocam'].position.z = cpos_z;
			this.cameras['photocam'].rotation.z = this.functions.CMR(v0.w, v1.w, v2.w, v3.w, intrat);
			
			this.lights['photospot1'].position.set(cpos_x, cpos_y, cpos_z+10);
			
			this.effects['RGBShiftShader'].uniforms['amount'].value = Math.sin(parttick / 1000) / 1000 * 5;
			this.effects['RGBShiftShader'].uniforms['angle'].value = Math.sin(parttick / 487) * Math.PI * 2;
			
			global_engine.renderers['main'].clear(false, true, false);
			this.composers['writercomposer'].render();
		}
	
		return ro;
	}())
}


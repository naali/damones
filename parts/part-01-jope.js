{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2014 - writer';
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
					"°4extra °3beer",
					"°3too °4many °3sausages",
					"°3stiff °4blunts"
				],
				[
					"°3feel free",
					"to",
					"°4share!"
				],
				[
					"°3add",
					"°4jul 31 - aug 3",
					"°3to your",
					"calendars",
					"now"
				],
				[
					"°3greetings fly to",
					"°0komplex °1pyrotech",
					"°2byterapers °4hirmu",
					"°5accession °6kooma",
					"°7kewlers °0scoopex °1flo",
					"°2fairlight °4extend"
				],
				[
					"°1boozembly °02014",
					"..............",
					"bring your",
					"family"
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
					"koitas",
					"keskittyä"
				]
			];
			
			
			var imagenamesarr = [];
		
			for(var i=1; i<30; i++){
				var name = eval('image_pic_' + i + '.src');
				var width = eval('image_pic_' + i + '.width');
				var height = eval('image_pic_' + i + '.height');
				imagenamesarr.push({name: name, width: width, height: height });	
			}
			
			obj.objects['images'] = [];
			
			for (var i =0; i<imagenamesarr.length; i++) {
				var geometry = new THREE.PlaneGeometry(imagenamesarr[i].width, imagenamesarr[i].height, 1, 1);
				var material = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture(imagenamesarr[i].name), transparent: true} );
				var mesh = new THREE.Mesh(geometry, material);
				i == 0 ? mesh.start_x = -(imagenamesarr[i].width) : mesh.start_x = -(imagenamesarr[i-1].width + imagenamesarr[i].width);
				mesh.start_y =  Math.random() * 500 - 250;
				mesh.start_z = -600;
				mesh.speed_x_multiplier = 5 + Math.random()*5;
				mesh.start_x = Math.random() * 5000 - 2500;
				mesh.position.x = mesh.start_x;
				mesh.sin_z_start = Math.random();
				mesh.position.y = mesh.start_y;
				mesh.position.z = mesh.start_z;
				obj.objects['images'].push(mesh);
			}
			
			var scene = new THREE.Scene();		
			for (var i=0; i<obj.objects['images'].length; i++) {
			 var mesh = obj.objects['images'][i];
			
				scene.add(mesh);
			}

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
			obj.lights['logospot1'] = light;
			
			light = new THREE.SpotLight(0xFFFFFF);
			light.position.set(-200, -200, 1500);
			scene.add(light);
			obj.lights['logospot2'] = light;

			light = new THREE.SpotLight(0xFFFFFF);
			light.intensity = 1.2;
			light.position.set(10, 10, 1500);
			scene.add(light);
			obj.lights['logospot3'] = light;
			
			var directionallight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionallight.position.set( 0, 1, 0 );
			scene.add( directionallight );
			obj.lights['logodirectional'] = directionallight;
			
			scene.add(obj.cameras['logocam']);
			obj.cameras['logocam'].position.z = 1000;
			
			return scene;
		}(ro));

		ro.player = function(partdata, parttick, t) {
			for (var i=0; i<this.objects['images'].length; i++) {
				this.objects['images'][i].position.x = this.objects['images'][i].start_x + (parttick/this.objects['images'][i].speed_x_multiplier) ;
				
				if (this.objects['images'][i].position.x > 2000) {
					this.objects['images'][i].start_x -= 5000;
				}
				
				this.objects['images'][i].rotation.z = Math.sin(t/100 + this.objects['images'][i].sin_z_start) / 10;
			}

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
			
			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


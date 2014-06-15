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
					"°1Boozembly 2014",
					"°2Jubileum",
					"°3Jul 31 - Aug 3",
				],
				[
					"°4Damones °7with",
					"°1Boozembly",
					"Disorganizing"
				],
				[
					"invites you to",
					"the scene event",
					"of the year",
					"2014"
				],
				[
					"celebrating",
					"our 20th time",
					"lost in the hills"
				],
				[
					"Boozembly 2014",
					"features",
				],
				[
					"Nice people",
					"Hot barbeque",
					"Perfect weather",
					"Great atmosphere"
				],
				[
					"Location will",
					"be the same",
					"as last year"
				],
				[
					"if you don't know",
					"where to come,",
					"ask the nearest",
					"pullomummo"
				],
				[
					"if you have",
					"extra beer",
					"too many sausages",
					"stiff blunts"
				],
				[
					"feel free",
					"to",
					"share!"
				],
				[
					"Add",
					"Jul 31 - Aug 3",
					"to your",
					"calendars",
					"now"
				],
				[
					"greetings fly to",
					"komplex pyrotech",
					"byterapers hirmu",
					"accession kooma",
					"kewlers scoopex flo",
					"fairlight extend"
				],
				[
					"Boozembly 2014",
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
					"photos",
					"h7 & norppa",
					" ",
					"graphics",
					"h7"
				],
				[
					"music",
					"tempest",
					" ",
					"code",
					"jawbreaker",
					"kakka"
				],
				[
					"released",
					"at",
					"graffathon",
					"2014"
				],
				[
					"see you all",
					"in",
					"boozembly!"
				],
				[
					"dunkku",
					"koitas",
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
							k += 2;
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
						i += 2;
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

		ro.player = function(partdata, parttime, t) {
			//this.objects['images'][1].position.z = -600 + Math.sin(tick/200) * 10;
			//this.objects['images'][1].rotation.z =  Math.sin(tick/11200) * Math.cos(tick/9000);
			
			var pagemaxtime = 8660;
			var page = Math.floor(parttime / pagemaxtime);
			var pagetime = parttime - page * pagemaxtime;
			
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


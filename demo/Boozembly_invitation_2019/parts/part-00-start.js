{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2019 - intro';
		ro.prewarm = true;
		ro.partlength =  1000000;
		ro.cameras = {
			'main': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
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
			{ year: "1995", dates: "10th - 13th August" },
			{ year: "1996", dates: "16th - 18th August" },
			{ year: "1997", dates: "8th - 10th August" },
			{ year: "1998", dates: "7th - 9th August" },
			{ year: "1999", dates: "6th - 8th August" },
			{ year: "2000", dates: "3th - 6th August" },
			{ year: "2001", dates: "2nd - 5th August" },
			{ year: "2002", dates: "1st - 4th August" },
			{ year: "2003", dates: "7th - 10th August" },
			{ year: "2004", dates: "5th - 8th August" },
			{ year: "2005", dates: "28th - 31st July" },
			{ year: "2006", dates: "3rd - 6th August" },
			{ year: "2007", dates: "2nd - 5th August" },
			{ year: "2008", dates: "31st July - 3rd August" },
			{ year: "2009", dates: "6th - 9th August" },
			{ year: "2010", dates: "5th - 8th August" },
			{ year: "2011", dates: "4th - 7th August" },
			{ year: "2012", dates: "2nd - 5th August" },
			{ year: "2013", dates: "1st - 4th August" },
			{ year: "2014", dates: "31st July - 3rd August" },
			{ year: "2015", dates: "30th July - 2nd August" },
			{ year: "2016", dates: "4th - 7th August" },
			{ year: "2017", dates: "3rd - 6th August" },
			{ year: "2018", dates: "2nd - 5th August" },
			{ year: "2019", dates: "1st - 4th August" },
			{ year: "25th", dates: "anniversary" },
			{ year: "25th", dates: "anniversary" },
			{ year: "25th", dates: "anniversary" },
			{ year: "25th", dates: "anniversary" },
			{ year: "25th", dates: "anniversary" },
			{ year: "25th", dates: "anniversary" }
		]

		ro.scenes['test'] = (function(){
			var scene = new THREE.Scene();
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		    var material = new THREE.MeshPhongMaterial({ color: 0x8844aa });
			var cube = new THREE.Mesh( geometry, material );
			ro.objects['cube'] = cube;
//			scene.add( cube );

			var makkara_geometry = new THREE.BufferGeometry().fromGeometry(object_makkara2.children[1].geometry);

			var makkara_map = new THREE.TextureLoader().load( image_makkaratexture.src );
			var makkara_bump = new THREE.TextureLoader().load( image_makkarabump.src );

			var makkara_material = new THREE.MeshPhongMaterial({ 
				map: makkara_map,
				bumpMap: makkara_bump,
				bumpScale: 2,
				transparent: false
			});

			var makkara_mesh = new THREE.Mesh(makkara_geometry, makkara_material);
			makkara_mesh.position.set(0, 0, -200);
			makkara_mesh.scale.x = 1;
			makkara_mesh.scale.y = 1;
			makkara_mesh.scale.z = 1;

			ro.objects['makkara'] = makkara_mesh;
			scene.add( makkara_mesh );

		    var light = new THREE.DirectionalLight(0xFFFFFF, 2);
		    light.position.set(-1, 2, 4);
		    scene.add(light);
		    ro.lights['testlight'] = light;

			scene.add(ro.cameras['main']);

			ro.cameras['main'].position.z = 5;
/*
			var composer = new THREE.EffectComposer(global_engine.renderers['main']);
			composer.addPass(new THREE.RenderPass(scene, ro.cameras['main']));

			var bloomPass = new THREE.BloomPass(
			    1,    // strength
			    25,   // kernel size
			    4,    // sigma ?
			    256,  // blur render target resolution
			);

			composer.addPass(bloomPass);

			const filmPass = new THREE.FilmPass(
			    0.35,   // noise intensity
			    0.025,  // scanline intensity
			    648,    // scanline count
			    false,  // grayscale
			);

			filmPass.renderToScreen = true;
			composer.addPass(filmPass);
			
			ro.composers['composer'] = composer;
*/
			return scene;
		}(ro));

		ro.scenes['writer'] = (function(obj) {
			var scene = new THREE.Scene();
			var textarr = [];

			for (var i = 0; i < obj['contentarr'].length; i++) {
				textarr.push(obj['contentarr'][i]['year']);
			}
			
			var yearTextFontParams = {
				size: 300,
				height: 0,
				curveSegments: 8,
				font: new THREE.Font(jsonfont_gobold_regular),
				weight: 'normal',
				style: 'normal',
				bevelThickness: 2.5,
				bevelSize: 0.5,
				bevelSegments: 6, 
				bevelEnabled: false,
				bend: false
			}

			var yearTextGlyphGeometries = getGlyphGeometries(textarr, yearTextFontParams, 15);
			obj.objects['writertextmeshes'] = [];
			obj.objects['writerdatetextmeshes'] = [];

			textarr = [];

			for (var i = 0; i < obj['contentarr'].length; i++) {
				textarr.push(obj['contentarr'][i]['dates']);
			}

			var dateTextFontParams = {
				size: 50,
				height: 0,
				curveSegments: 8,
				font: new THREE.Font(jsonfont_gobold_regular),
				weight: 'normal',
				style: 'normal',
				bevelThickness: 2.5,
				bevelSize: 0.5,
				bevelSegments: 6, 
				bevelEnabled: false,
				bend: false
			}

			var dateTextGlyphGeometries = getGlyphGeometries(textarr, dateTextFontParams, 5);
			
			function getGlyphGeometries(strArr, fontParams, spacing) {
				var glyphgeometries = {};
				
				for (var i=0; i<textarr.length; i++) {
					for (var j=0; j<textarr[i].length; j++) {
						for (var k=0; k<textarr[i][j].length; k++) {
							var chr = textarr[i][j].charAt(k);
							if (glyphgeometries[chr] === undefined) {
								var geometry = new THREE.TextGeometry("" + chr, fontParams);
								geometry.computeBoundingBox();
								var buffergeometry = new THREE.BufferGeometry().fromGeometry(geometry);
								glyphgeometries[chr] = geometry;
								if (chr == " ") {
									glyphgeometries[chr].width = spacing * 5;
								} else {
									glyphgeometries[chr].width = Math.abs(geometry.boundingBox.min.x - geometry.boundingBox.max.x) + spacing
								}
							}
						}
					}
				}

				return glyphgeometries;
			}
			
			function lineLength(str, glyphs) {
				var length = 0;
				
				for (var i = 0; i < str.length; i++) {
					var chr = str.charAt(i);
					length += glyphs[chr].width;
				}
				
				return length;
			}
			
			var textmaterials = {};
			
			for (var i = 0; i < obj['contentarr'].length; i++) {

				var year = obj['contentarr'][i]['year'];

				var xpos = 0;
				var ypos = 0;
				
				var yearcontainer = new THREE.Object3D();

				xpos = -lineLength("0000", yearTextGlyphGeometries) / 2;
				
				for (var j = 0; j < year.length; j++) {
					var color = 0xFFFFFF;
					var chr = year.charAt(j);
					
					if (chr == ' ') {
						xpos += yearTextGlyphGeometries[chr].width;
						continue;
					}
					
					if (textmaterials['year:' + i + ':' + color] === undefined) {
						textmaterials['year:' + i + ':' + color] = new THREE.MeshPhongMaterial({ transparent: true, color: color });
					}
					
					var material = textmaterials['year:' + i + ':' + color];
					var mesh = new THREE.Mesh(yearTextGlyphGeometries[chr], material);
					
					mesh.position.x = xpos;
					mesh.position.y = -140;
					mesh.position.z = 0;

					xpos += yearTextGlyphGeometries[chr].width;
					mesh.material.visible = false;
					mesh.material.opacity = 1;
					yearcontainer.add(mesh);
				}
				
				scene.add(yearcontainer);
				obj['objects']['writertextmeshes'].push(yearcontainer);

				var dates = obj['contentarr'][i]['dates'];
				var xpos = 0;
				var ypos = 0;
				
				var datecontainer = new THREE.Object3D();

				xpos = -lineLength(dates, dateTextGlyphGeometries) / 2;
				
				for (var j = 0; j < dates.length; j++) {
					var color = 0xFFFFFF;
					var chr = dates.charAt(j);
					
					if (chr == ' ') {
						xpos += dateTextGlyphGeometries[chr].width;
						continue;
					}
					
					if (textmaterials['dates:' + i + ':' + color] === undefined) {
						textmaterials['dates:' + i + ':' + color] = new THREE.MeshPhongMaterial({ transparent: true, color: color });
					}
					
					var material = textmaterials['dates:' + i + ':' + color];
					var mesh = new THREE.Mesh(dateTextGlyphGeometries[chr], material);
					
					mesh.position.x = xpos;
					mesh.position.y = -220;
					mesh.position.z = 0;

					xpos += dateTextGlyphGeometries[chr].width;
					mesh.material.visible = true;
					mesh.material.opacity = 1;
					datecontainer.add(mesh);
				}
				
				scene.add(datecontainer);
				obj['objects']['writerdatetextmeshes'].push(datecontainer);
			}
			
			var light = new THREE.DirectionalLight(0xffffff, 1);
			light.position.set(0, 0, 1);
			scene.add(light);
			
			scene.add(obj.cameras['writercam']);
			obj.cameras['writercam'].position.z = 600;

			var blackgeometry = new THREE.PlaneBufferGeometry(1920 * 2, 1080 * 2, 1, 1);
			var blackmaterial = new THREE.MeshBasicMaterial({ color: 0x440000, transparent: true });
			var blackmesh = new THREE.Mesh(blackgeometry, blackmaterial);
			blackmesh.position.set(0, 0, -500);
			blackmesh.material.opacity = 1.0;
			scene.add(blackmesh);
			obj.objects['blackmesh'] = blackmesh;

/*			
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
*/			

			var composer = new THREE.EffectComposer(global_engine.renderers['main']);
			composer.addPass(new THREE.RenderPass(scene, ro.cameras['writercam']));

			var bloomPass = new THREE.BloomPass(
			    1.1,    // strength
			    25,   // kernel size
			    10,    // sigma ?
			    256,  // blur render target resolution
			);

			composer.addPass(bloomPass);

			const filmPass = new THREE.FilmPass(
			    0.3,   // noise intensity
			    0.2,  // scanline intensity
			    100,    // scanline count
			    false,  // grayscale
			);

			filmPass.renderToScreen = true;
			composer.addPass(filmPass);
			
			ro.composers['composer'] = composer;

			return scene;
		}(ro));


		ro.functions = {
			test: function(pd, pt, gt) {
				var lights = pd.data.lights;
				var cube = pd.data.objects['cube'];

				cube.rotation.x = pt * 0.001;
				cube.rotation.y = pt * 0.002;

				var makkara = pd.data.objects['makkara'];
				makkara.rotation.x = pt * 0.001;
				makkara.rotation.y = pt * 0.001;

//				global_engine.renderers['main'].render(pd.data.scenes['test'], pd.data.cameras['testcam']);
			},

			yearWriter: function(pd, pt, gt) {
				var textobjects = pd.data.objects['writertextmeshes'];
				var dateobjects = pd.data.objects['writerdatetextmeshes'];

				var pagemaxtime = 2733 / 4;
				var fintime = pagemaxtime / 4;
				var fouttime = pagemaxtime / 2;
				var page = Math.floor((pt) / pagemaxtime);
				var pagetime = (pt) - page * pagemaxtime;
				
				page = page % textobjects.length;

				for (var i = 0; i < textobjects.length; i++) {
					var textobject = textobjects[i];

					for (var j = 0; j < textobject.children.length; j++) {
						var textmesh = textobject.children[j];

						if (i == page) {
							textmesh.material.visible = true;

							if (pagetime < fintime) {
								textmesh.rotation.x = (- Math.PI / 2) + (pagetime / fintime) * Math.PI / 2;
								textmesh.material.opacity = pagetime / fintime;
							} else if (pagetime > (pagemaxtime - fouttime)) {
								textmesh.material.opacity = (pagemaxtime - pagetime) / fouttime;
								textmesh.rotation.x = (1 - ((pagemaxtime - pagetime) / fouttime)) * Math.PI / 2;
							} else {
								textmesh.rotation.x = 0;
//								textmesh.material.opacity = 1;
							}

						} else {
							textmesh.material.visible = false;
							textmesh.material.opacity = 0;
						}
					}
				}

				for (var i = 0; i < dateobjects.length; i++) {
					var textobject = dateobjects[i];

					for (var j = 0; j < textobject.children.length; j++) {
						var textmesh = textobject.children[j];

						if (i == page) {
							textmesh.material.visible = true;
							textmesh.material.opacity = 1;

							if (pagetime < fintime) {
								textobject.position.x = 200 - (200 * (pagetime / fintime));
								textmesh.material.opacity = pagetime / fintime;
							} else if (pagetime > (pagemaxtime - fouttime)) {
								textmesh.material.opacity = (pagemaxtime - pagetime) / fouttime;
								textobject.position.x = -200 + (200 * ((pagemaxtime - pagetime) / fouttime));
							} else {
								textmesh.material.opacity = 1;
								textobject.position.x = 0;
							}
						} else {
							textmesh.material.visible = false;
							textmesh.material.opacity = 0;
						}
					}


				}
/*				
				if ((pt + 1000) > pd.data.partlength) {
					var fadeout = 1 - Math.max((pd.data.partlength - pt) / 1000, 0);
					blackmesh.material.color.setHex(0x000000);
					blackmesh.material.opacity = fadeout;
				} else if (pt < 2500) {
					var fadein =  1 - (pt / 2500);
					blackmesh.material.color.setHex(0xffffff);
					blackmesh.material.opacity = fadein;
				} else {
					blackmesh.material.color.setHex(0x000000);
					blackmesh.material.opacity = 0;
				}
*/
//				global_engine.renderers['main'].render(pd.data.scenes['writer'], pd.data.cameras['writercam']);
			}			
		}

		ro.player = function(partdata, parttick, tick) {
			this.functions.yearWriter(partdata, parttick, tick);

			var dt = global_engine.clock.getDelta();

			this.composers['composer'].render(dt);
//			this.composers['makkarat'].render(dt);
		}
	
		return ro;
	}())
}


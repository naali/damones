{
	data: (function() {
		var ro = {};
		ro.partname = 'Boozembly 2015 - intro';
		ro.partlength = 15000;
		ro.cameras = {
			'logocam': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['logo'] = (function(obj) {
			var scene = new THREE.Scene();
			
			var geometry = new THREE.PlaneBufferGeometry(1920, 1080, 1, 1);
			var material_boozembly = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_boozembly.src ), transparent: true } );
			var mesh_boozembly = new THREE.Mesh(geometry, material_boozembly);
			mesh_boozembly.position.x = 0;
			mesh_boozembly.position.y = 0;
			mesh_boozembly.position.z = 500;
			scene.add(mesh_boozembly);
			obj.objects['mesh_boozembly'] = mesh_boozembly;

			var material_disorganizing = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_disorganizing.src ), transparent: true } );
			var mesh_disorganizing = new THREE.Mesh(geometry, material_disorganizing);
			mesh_disorganizing.position.x = 0;
			mesh_disorganizing.position.y = 0;
			mesh_disorganizing.position.z = 500;
			scene.add(mesh_disorganizing);
			obj.objects['mesh_disorganizing'] = mesh_disorganizing;

			var geometry2 = new THREE.PlaneBufferGeometry(1920, 960, 1, 1);
			var material_damones = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_damones.src ), transparent: true } );
			var mesh_damones = new THREE.Mesh(geometry2, material_damones);
			mesh_damones.position.x = 0;
			mesh_damones.position.y = 0;
			mesh_damones.position.z = 500;
			scene.add(mesh_damones);
			obj.objects['mesh_damones'] = mesh_damones;

			var material_likeavirgin = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( image_likeavirgin.src ), transparent: true } );
			var mesh_likeavirgin = new THREE.Mesh(geometry2, material_likeavirgin);
			mesh_likeavirgin.position.x = 0;
			mesh_likeavirgin.position.y = -40;
			mesh_likeavirgin.position.z = 500;
			scene.add(mesh_likeavirgin);
			obj.objects['mesh_likeavirgin'] = mesh_likeavirgin;

			
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

		ro.player = function(partdata, parttick, tick) {
			if (tick < 6000) {
				this.objects['mesh_boozembly'].position.z = -500 + 500 * smoothstep(0, 10000, tick);
				this.objects['mesh_disorganizing'].position.z = -500 + 300 * smoothstep(0, 10000, tick);
				this.objects['mesh_damones'].material.opacity = 0;
				this.objects['mesh_likeavirgin'].material.opacity = 0;
			} else if (tick >= 6000) {
				this.objects['mesh_boozembly'].material.opacity = 0;
				this.objects['mesh_disorganizing'].material.opacity = 0;
				this.objects['mesh_damones'].position.z = -500 + 500 * smoothstep(6000, 16000, tick);
				this.objects['mesh_likeavirgin'].position.z = -500 + 300 * smoothstep(6000, 16000, tick);
			}
			
			this.lights['logospot1'].position.x = Math.sin(tick / 1000) * 200;
			this.lights['logospot1'].position.y = Math.sin(tick / 1000) * 300;
			
			this.lights['logospot2'].position.x = Math.sin(tick / 1000) * 123;
			this.lights['logospot2'].position.y = Math.sin(tick / 1000) * 654;
			
			this.lights['logospot3'].position.x = Math.sin(tick / 1000) * 453;
			this.lights['logospot3'].position.y = Math.sin(tick / 1000) * 234;

			if (tick < 1000) {
				this.objects['mesh_boozembly'].material.opacity = (tick/1000);

				if (tick > 200 && tick < 800) {
					var blink = tick % 2;
					
					if (blink == 0) {
						this.objects['mesh_boozembly'].material.opacity = (tick/1000);
					} else {
						this.objects['mesh_boozembly'].material.opacity = 0;
					}
				}
				this.objects['mesh_disorganizing'].material.opacity = 0;
			} else if (tick > 2000 && tick < 3000) {
				this.objects['mesh_boozembly'].material.opacity = (Math.sin(tick/40) + 1.0 ) * 0.5;
			} else if (tick >= 3000 && tick < 5000) {
				this.objects['mesh_boozembly'].material.opacity = 1;
			} else if (tick >= 5000) {
				if (tick > 5000 && tick < 6000) {
					var blink = tick % 2;
					if (blink == 0) {
						this.objects['mesh_boozembly'].material.opacity = 1 - (tick-5000)/1000;
					} else {
						this.objects['mesh_boozembly'].material.opacity = 0;
					}
				}
			} else {
				this.objects['mesh_boozembly'].material.opacity = 1;
			}
			
			if (tick > 1000 && tick < 2000) {
				var blink = tick % 2;
				
				if (blink == 0) {
					this.objects['mesh_disorganizing'].material.opacity = ((tick-1000)/1000);
				} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
				}
			} else if (tick >= 2000 && tick < 2500) {
				this.objects['mesh_disorganizing'].material.opacity = 1;
			} else if (tick >= 2500 && tick < 3200) {
				this.objects['mesh_disorganizing'].material.opacity = (Math.sin(tick/40 + Math.PI / 2) + 1.0 ) * 0.5;
			} else if (tick >= 3200 && tick < 4000) {
				this.objects['mesh_disorganizing'].material.opacity = 1;
			} else if (tick >= 4000 && tick < 5000) {
				var blink = tick % 2;
				
				if (blink == 0) {
					this.objects['mesh_disorganizing'].material.opacity = 1 - ((tick-4000)/1000);
				} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
				}
			} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
			}

			if (tick > 8000) {
				var dick = tick - 8000;

				if (dick < 1000) {
					this.objects['mesh_damones'].material.opacity = (dick/1000);

					if (dick > 200 && dick < 800) {
						var blink = dick % 2;
					
						if (blink == 0) {
							this.objects['mesh_damones'].material.opacity = (dick/1000);
						} else {
							this.objects['mesh_damones'].material.opacity = 0;
						}
					}
					this.objects['mesh_likeavirgin'].material.opacity = 0;
				} else if (dick > 2000 && dick < 3000) {
					this.objects['mesh_damones'].material.opacity = (Math.sin(dick/40) + 1.0 ) * 0.5;
				} else if (dick >= 3000 && dick < 5000) {
					this.objects['mesh_damones'].material.opacity = 1;
				} else if (dick >= 5000) {
					if (dick > 5000 && dick < 6000) {
						var blink = dick % 2;
						if (blink == 0) {
							this.objects['mesh_damones'].material.opacity = 1 - (dick-5000)/1000;
						} else {
							this.objects['mesh_damones'].material.opacity = 0;
						}
					}
				} else {
					this.objects['mesh_damones'].material.opacity = 1;
				}
			
				if (dick > 1000 && dick < 2000) {
					var blink = dick % 2;
				
					if (blink == 0) {
						this.objects['mesh_likeavirgin'].material.opacity = ((dick-1000)/1000);
					} else {
						this.objects['mesh_likeavirgin'].material.opacity = 0;
					}
				} else if (dick >= 2000 && dick < 2500) {
					this.objects['mesh_likeavirgin'].material.opacity = 1;
				} else if (dick >= 2500 && dick < 3200) {
					this.objects['mesh_likeavirgin'].material.opacity = (Math.sin(dick/40 + Math.PI / 2) + 1.0 ) * 0.5;
				} else if (dick >= 3200 && dick < 4000) {
					this.objects['mesh_likeavirgin'].material.opacity = 1;
				} else if (dick >= 4000 && dick < 5000) {
					var blink = dick % 2;
				
					if (blink == 0) {
						this.objects['mesh_likeavirgin'].material.opacity = 1 - ((dick-4000)/1000);
					} else {
						this.objects['mesh_likeavirgin'].material.opacity = 0;
					}
				} else {
						this.objects['mesh_likeavirgin'].material.opacity = 0;
				}
			}

			global_engine.renderers['main'].render(this.scenes['logo'], this.cameras['logocam']);
		}
	
		return ro;
	}())
}


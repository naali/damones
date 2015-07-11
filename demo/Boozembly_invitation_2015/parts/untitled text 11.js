
			var dick = tick - 7000;

			if (dick < 1000) {
				this.objects['mesh_boozembly'].material.opacity = (dick/1000);

				if (dick > 200 && dick < 800) {
					var blink = dick % 2;
					
					if (blink == 0) {
						this.objects['mesh_boozembly'].material.opacity = (dick/1000);
					} else {
						this.objects['mesh_boozembly'].material.opacity = 0;
					}
				}
				this.objects['mesh_disorganizing'].material.opacity = 0;
			} else if (dick > 2000 && dick < 3000) {
				this.objects['mesh_boozembly'].material.opacity = (Math.sin(dick/40) + 1.0 ) * 0.5;
			} else if (dick >= 3000 && dick < 5000) {
				this.objects['mesh_boozembly'].material.opacity = 1;
			} else if (dick >= 5000) {
				if (dick > 5000 && dick < 6000) {
					var blink = dick % 2;
					if (blink == 0) {
						this.objects['mesh_boozembly'].material.opacity = 1 - (dick-5000)/1000;
					} else {
						this.objects['mesh_boozembly'].material.opacity = 0;
					}
				}
			} else {
				this.objects['mesh_boozembly'].material.opacity = 1;
			}
			
			if (dick > 1000 && dick < 2000) {
				var blink = dick % 2;
				
				if (blink == 0) {
					this.objects['mesh_disorganizing'].material.opacity = ((dick-1000)/1000);
				} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
				}
			} else if (dick >= 2000 && dick < 2500) {
				this.objects['mesh_disorganizing'].material.opacity = 1;
			} else if (dick >= 2500 && dick < 3200) {
				this.objects['mesh_disorganizing'].material.opacity = (Math.sin(dick/40 + Math.PI / 2) + 1.0 ) * 0.5;
			} else if (dick >= 3200 && dick < 4000) {
				this.objects['mesh_disorganizing'].material.opacity = 1;
			} else if (dick >= 4000 && dick < 5000) {
				var blink = dick % 2;
				
				if (blink == 0) {
					this.objects['mesh_disorganizing'].material.opacity = 1 - ((dick-4000)/1000);
				} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
				}
			} else {
					this.objects['mesh_disorganizing'].material.opacity = 0;
			}

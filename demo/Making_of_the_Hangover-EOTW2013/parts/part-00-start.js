{
	data: (function() {
		var ro = {};
		ro.partname = 'start';
		ro.partlength = 2800;
		ro.cameras = {
			'perspective': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000),
			'perspective2': new THREE.PerspectiveCamera(45, global_engine.getAspectRatio(), 0.1, 10000)
		};
		ro.scenes = {};
		ro.lights = {};
		ro.objects = {};

		ro.scenes['photoscene'] = (function(obj) {
			var scene = new THREE.Scene();
			
			obj.cameras['perspective'].position.z = 500;
			scene.add(obj.cameras['perspective']);
		
			return scene;
		}(ro));
		
		ro.scenes['textscene'] = (function(obj) {
			var scene = new THREE.Scene();

			scene.add(obj.cameras['perspective2']);
			
			return scene;
		}(ro));
	
		ro.player = function(partdata, parttick, tick) {

			
			global_engine.renderers['main'].render(this.scenes['textscene'], this.cameras['perspective']);
		}
	
		return ro;
	}())
}


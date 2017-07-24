function DemoEngine(selector, width, height) {

	// hack for safari
	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	this.partdata = [];
	this.assets = { urls: {} };
	this.renderers = {};
	this.rendertargets = {};
	this.audio = null;
	this.analyzer = null;
	this.audiocontext = null;
	this.audiosource = null;
	this.frequencyByteData = null;
	this.frequencyFloatData = null;
	this.frequencyBinCount = 0;
	this.selectorstr = selector;
	this.fftsupport = true;
	this.debuggerpending = false;
	this.loop = false;
	this.loopBegin = 0;
	this.loopEnd = 0;
	
	function onWindowResize(e) {
		width = window.innerWidth;
		height = window.innerHeight;
		aspect = width/height;
		
		var w=0;
		var h=0;
	
		if (width/height < demo_aspectratio) {
			w = width;
			h = Math.floor(width / (demo_aspectratio));
		} else {
			w = Math.floor(height * (demo_aspectratio));
			h = height;
		}
				
		var rendererkeys = Object.keys(global_engine.renderers);
		
		for (var i=0; i<rendererkeys.length; i++) {
			var renderer = global_engine.renderers[rendererkeys[i]];
			renderer.setSize(w, h);
		}

		for (var i=0; i<global_engine.partdata.length; i++) {
			if (global_engine.partdata[i]['data'].hasOwnProperty('cameras')) {
				var partcameras = global_engine.partdata[i]['data']['cameras'];
				var camerakeys = Object.keys(partcameras);
				
				for (var j=0; j<camerakeys.length; j++) {
					var camera = partcameras[camerakeys[j]];
					camera.aspect = w/h;
					camera.updateProjectionMatrix();
				}
			}
/*			
			if (global_engine.partdata[i]['data'].hasOwnProperty('rendertargets')) {
				var rendertargets = global_engine.partdata[i]['data']['rendertargets'];
				var rendertargetkeys = Object.keys(rendertargets);
				
				for (var j=0; j<rendertargetkeys.length; j++) {
					var rendertarget = rendertargets[rendertargetkeys[j]];
					rendertarget.setSize(w,h);
				} 
			}
*/			
		}
		
		if (h < height) {
			$("#demo").css({ 'margin-top': Math.floor((height-h)/2) + 'px' });
		}
	}
	
	window.addEventListener( 'resize', onWindowResize, false );

	function Clock() {
		this._clock = new THREE.Clock(false);
	}
	
	Clock.prototype.start = function() {
		this._clock.start();
	}
	
	Clock.prototype.stop = function() {
		this._clock.stop();
	}
	
	Clock.prototype.getDelta = function() {
		if (framegrabber) {
			return 1/60.0;
		} else {
			return this._clock.getDelta();
		}
	}
	
	this.clock = new Clock();

	var tmpelement = $(selector);
	if (tmpelement.length != 1) {
		console.log('Selector "' + selector + '" returned more than one element. ');
		return null;
	}
	this.element = tmpelement[0];
	
	if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1 ||
		!!navigator.userAgent.match(/Trident.*[ :]*11\./)) {
		this.fftsupport = false;
	}
	
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	
	if (width && height) {
		this.width = width;
		this.height = height;
	}
	
	this.setAudioLooping = function(loop) {
		this.audio.loop = loop;
	}
	
	this.setLooping = function(begin, end) {
		this.loop = true;
		this.loopBegin = begin;
		this.loopEnd = end;
	}
	
	this.startDebugger = function() {
		this.debuggerpending = true;
	}
	
	this.stopDebugger = function() {
		this.debuggerpending = false;
	}
	
	this.supportsFFT = function() {
		return this.fftsupport;
	}
	
	this.setAudio = function(a) {
		this.audiocontext = new AudioContext();
		this.audio = a;
		$(this.selectorstr).append(this.audio);
		
		if (this.fftsupport) {
			this.audiosource = this.audiocontext.createMediaElementSource(this.audio);
			this.analyzer = this.audiocontext.createAnalyser();
			this.analyzer.fftSize = Math.pow(2,9);
			this.analyzer.minDecibels = -50;
			this.analyzer.maxDecibels = -30;
			this.audiosource.connect(this.analyzer);
			this.analyzer.connect(this.audiocontext.destination);
			this.frequencyBinCount = this.analyzer.frequencyBinCount;
			this.frequencyByteData = new Uint8Array(this.frequencyBinCount);
			this.frequencyFloatData = new Float32Array(this.frequencyBinCount);
		} else {
			log("Using Firefox on windows, no FFT support");
		}
	}
	
	this.getFrequencyBinCount = function() {
		return this.frequencyBinCount;
	}
	
	this.getByteFFTData = function(smoothing) {
		this.analyzer.smoothingTimeConstant = smoothing || 0.5;
		this.analyzer.getByteFrequencyData(this.frequencyByteData);
		
		return this.frequencyByteData;
	}
	
	this.getFloatFFTData = function(smoothing) {
		this.analyzer.smoothingTimeConstant = smoothing || 0.5;
		this.analyzer.getFloatFrequencyData(this.frequencyFloatData);
		
		return this.frequencyFloatData;
	}
	
	this.stop = function() {
		this.clock.stop();
		this.audio.pause();
		this.audio.currentTime = 0;
	}
	
 	this.play = function() {
		this.audio.play();
		this.clock.start();
		this.audio.controls = true;
	}
	
	this.showControls = function(show) {
		this.audio.controls = show;
	}
	
	this.getTick = function() {
		return Math.floor(this.audio.currentTime * 1000);
	}
	
	this.getAspectRatio = function() {
		return this.width/this.height;
	}
	
	this.getWidth = function() {
		return this.width;
	}
	
	this.getHeight = function() {
		return this.height;
	}
	
	this.addPart = function(data) {
		this.partdata[this.partdata.length] = data;
	}
	
	this.prewarm = function() {
		this.renderers['main'].domElement.opacity = 0;

		var parttick = 0;
		var globaltick = 0;

		for (var i=0; i<this.partdata.length; i++) {
			var partdata = this.partdata[i].data;
			
			if (partdata.hasOwnProperty('prewarm') && partdata['prewarm'] == true) {
				log("Prewarming scene: " + partdata.partname + " (" + (i+1) + "/" + this.partdata.length + ")");
			
				parttick = 0;
			
				for (var j=0; j<10; j++) {
					parttick += partdata.partlength / 10 * j;
					try {				
						partdata.player(this.partdata[i], parttick, globaltick + parttick);
					} catch (e) {
						log("Oopsie (" + e.message + ") while prewarming, maybe too long song?");
						break;
					}				
				}
			} else {
				log("Prewarm not supported for scene: " + partdata.partname + " (" + (i+1) + "/" + this.partdata.length + ")");
			}
			
			globaltick += partdata.partlength;
		}

		this.renderers['main'].clear(true, true, true);
		this.renderers['main'].domElement.opacity = 1;
	}
	
	this.draw = function(tick) {
		var parttick = tick;
		var prevpartlengths = 0;
		for (var i=0; i<this.partdata.length; i++) {
			
			if (i>0) { 
				parttick -= this.partdata[i-1].data.partlength;
				prevpartlengths += this.partdata[i-1].data.partlength;
			}

			if (tick<this.partdata[i].data.partlength + prevpartlengths) {
				if (this.debuggerpending) {
					debugger;
				}
				this.partdata[i].data.player(this.partdata[i], parttick, tick);
				break;
			}
		}
		
		if (this.loop && tick >= this.loopEnd) {
			this.audio.currentTime = this.loopBegin / 1000; // logically it needs to have the time in seconds...
			log("Looping...");
		}
	}
	
	this.addRenderTarget = function(name, width, height) {
		var w = width || this.getWidth();
		var h = height || this.getHeight();
		
		this.rendertargets[name] = {};
		this.rendertargets[name].target = new THREE.WebGLRenderTarget( Math.floor(width), Math.floor(height), { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, alpha: true, autoClear: true } );
		this.rendertargets[name].width = Math.floor(width);
		this.rendertargets[name].height = Math.floor(height);
		
		this.rendertargets[name].getAspectRatio = function(){
			return this.width/this.height;
		}
		
		return this.rendertargets[name].target;
	}
	
	this.swapRenderTargets = function(name1, name2) {
		var tmp = this.rendertargets[name1];
		this.rendertargets[name1] = this.rendertargets[name2];
		this.rendertargets[name2] = tmp;
	}
	
	this.addRenderer = function(name, antialias, shadowmap, width, height) {
		this.renderers[name] = new THREE.WebGLRenderer( { antialias: antialias, alpha: true, autoClear: false } );
		this.renderers[name].shadowMap.enabled = shadowmap;
		
		if (width && height) {
			this.renderers[name].setSize(width, height);
		} else {
			this.renderers[name].setSize(this.getWidth(), this.getHeight());
		}

		this.renderers[name].setClearColor(0x000000, 0.0);
		this.renderers[name].autoClear = false;
		this.renderers[name].setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
		this.renderers[name].clear();
	}
	
	this.addRenderer('main', true, true);
	
	$(selector).append(this.renderers['main'].domElement);
	this.renderers['main'].domElement.display = 'block';
}

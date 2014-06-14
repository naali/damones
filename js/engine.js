function DemoEngine(selector, width, height) {
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

	var tmpelement = $(selector);
	if (tmpelement.length != 1) {
		console.log('Selector "' + selector + '" returned more than one element. ');
		return null;
	}
	this.element = tmpelement[0];
	
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	
	if (width && height) {
		this.width = width;
		this.height = height;
	}
	
	this.setAudioLooping = function(loop) {
		this.audio.loop = loop;
	}
	
	this.setAudio = function(a) {
		this.audiocontext = new webkitAudioContext();
		this.audio = a;
		$(this.selectorstr).append(this.audio);
		this.audiosource = this.audiocontext.createMediaElementSource(this.audio);
		this.analyzer = this.audiocontext.createAnalyser();
		this.analyzer.fftSize = Math.pow(2,9);
		this.audiosource.connect(this.analyzer);
		this.analyzer.connect(this.audiocontext.destination);
		this.frequencyByteData = new Uint8Array(this.analyzer.frequencyBinCount);
		this.frequencyFloatData = new Float32Array(this.analyzer.frequencyBinCount);
		this.frequencyBinCount = this.analyzer.frequencyBinCount;
	}
	
	this.getFrequencyBinCount = function() {
		return this.frequencyBinCount;
	}
	
	this.getByteFFTData = function(smoothing) {
		var tmpsmoothing = smoothing;
		if (!smoothing) {
			tmpsmoothing = 0.5;
		}
		
		this.analyzer.smoothingTimeConstant = tmpsmoothing;
		this.analyzer.getByteFrequencyData(this.frequencyByteData);
		
		return this.frequencyByteData;
	}
	
	this.getFloatFFTData = function(smoothing) {
		var tmpsmoothing = smoothing;
		if (!smoothing) {
			tmpsmoothing = 0.5;
		}

		this.analyzer.smoothingTimeConstant = tmpsmoothing;
		this.analyzer.getFloatFrequencyData(this.frequencyFloatData);
		
		return this.frequencyFloatData;
	}
	
 	this.play = function() {
		this.audio.play();
		this.audio.controls = !debug;
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
	
	this.draw = function(tick) {
		var parttick = tick;
		var prevpartlengths = 0;
		for (var i=0; i<this.partdata.length; i++) {
			
			if (i>0) { 
				parttick -= this.partdata[i-1].data.partlength;
				prevpartlengths += this.partdata[i-1].data.partlength;
			}

			if (tick<this.partdata[i].data.partlength + prevpartlengths) {
				this.partdata[i].data.player(this.partdata[i], parttick, tick);
				break;
			}
		}
	}
	
	this.addRenderTarget = function(name, width, height) {
		var w = width || this.getWidth();
		var h = height || this.getHeight();
		
		this.rendertargets[name] = {};
		this.rendertargets[name].target = new THREE.WebGLRenderTarget( Math.floor(width), Math.floor(height), { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
		this.rendertargets[name].width = Math.floor(width);
		this.rendertargets[name].height = Math.floor(height);
		
		this.rendertargets[name].getAspectRatio = function(){
			return this.width/this.height;
		}
	}
	
	this.addRenderer = function(name, antialias, shadowmap, width, height) {
		this.renderers[name] = new THREE.WebGLRenderer( { antialias: antialias } );
		this.renderers[name].shadowMapEnabled = shadowmap;
		
		if (width && height) {
			this.renderers[name].setSize(width, height);
		} else {
			this.renderers[name].setSize(this.getWidth(), this.getHeight());
		}

		this.renderers[name].setClearColor(0x000000, 1.0);
		this.renderers[name].clear();
	}
	
	this.addRenderer('main', true, true);
	
	$(selector).append(this.renderers['main'].domElement);
	this.renderers['main'].domElement.display = 'block';
}

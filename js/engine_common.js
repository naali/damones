function dataUrlToObjectUrl(d, mimestr) {
	var tmparr = window.atob(d);
	var uint8arr = new Uint8Array(tmparr.length);
	
	for (var i=0; i<uint8arr.length; i++) {
		uint8arr[i] = tmparr.charCodeAt(i);
	}
	
	if (mimestr != 'raw') {
		var tmpblob = new Blob([uint8arr], {type: mimestr});
	
		return window.URL.createObjectURL(tmpblob);
	} else {
		return uint8arr;
	}
}

function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}

function log(obj) {
	if (debug) {
		console.log(obj);
	}
}

function l(obj) {
	if (debug) {
		console.log(obj);
	}
}

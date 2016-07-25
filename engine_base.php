<?php
	global $debug;
	global $showcontrols;
	
	$framegrabber = false;
	$frame = 0;
	$fps = 60;

	global $length_in_sec;
	$lastframe = $fps * $length_in_sec;
	$frame_width = 1280;
	$frame_height = 720;
	
	if (isset($_GET)) {
		if (isset($_GET['framegrabber']) && $_GET['framegrabber']==='true') {
			$framegrabber = true;
			$frame = 0;
			$fps = 60;
		}
	}
	
	if (isset($_GET)) {
		if (isset($_GET['showcontrols']) && $_GET['showcontrols']==='true') {
			$showcontrols = true;
		} else {
			$showcontrols = false;
		}
	}	
	
	global $demo_part_order;
	global $demo_name;
	global $demo_song;
	global $demo_description;
	global $demo_aspectratio;
	
	global $setup_background;
	global $setup_background_imagename;
	global $setup_background_css;
	
?><!DOCTYPE html>
<html id="html">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title><?php echo "$demo_name"?></title>
		<meta property="og:title" content="<?php echo "$demo_name"?>" />
		<meta property="og:title" content="<?php echo "$demo_description"?>" />
		<script>

<?php
	echo file_get_contents('../../lib/jquery-1.8.2.min.js');

	if ($debug) {
		echo file_get_contents('../../lib/three.js');
		echo file_get_contents('../../lib/dat.gui.js');
	} else {
		echo file_get_contents('../../lib/three.min.js');
	}
	
	echo file_get_contents('../../lib/OBJLoader.js');
	echo file_get_contents('../../lib/GeometryUtils.js');
?>

			
			var debug = <?php echo (($debug == true)?'true':'false')?>;
			var demo_aspectratio = <?php echo (isset($demo_aspectratio)?$demo_aspectratio:16/9) ?>;
<?php if ($framegrabber) { ?> 
			var frame = parseInt(<?php echo $frame ?>);
			var frame_width = parseInt(<?php echo $frame_width ?>);
			var frame_height = parseInt(<?php echo $frame_height ?>);
			var fps = parseFloat(<?php echo $fps ?>);
			var lastframe = parseInt(<?php echo $lastframe ?>);
<?php } ?>
			var tmppartarray = [];
		</script>
<?php
	

	$stylefiles = glob('../../css/*.[cC][sS][sS]');

	for ( $sfptr = 0; $sfptr < count($stylefiles); $sfptr++ ) {
		echo "    <style>\n";

		ob_start();
		include($stylefiles[$sfptr]);
		$style = ob_get_clean();

		echo $style;

		echo "    </style>\n\n";
	}
	
	$effectcomposer = glob('../../lib/THREE.EffectComposer/*.[jJ][sS]');
	$jsfiles = glob('../../js/*.[jJ][sS]');
	$jsfiles = array_merge($jsfiles, $effectcomposer);

	for ($jsfptr=0; $jsfptr<count($jsfiles); $jsfptr++) {
		echo "    <script>\n";
		
		ob_start();
		include($jsfiles[$jsfptr]);
		$jscontent = ob_get_clean();
		
		echo $jscontent;
		
		echo "    </script>\n\n";
	}
	
	if ($setup_background === true) {
		echo "<script>\n";
		$backgroundimagedata = base64_encode(file_get_contents($setup_background_imagename));
		$filename = preg_replace("#.*/#", "", $setup_background_imagename);
		$extension = preg_replace("#.*\.#", "", $filename);
		$mimetype = $extension==='jpg'?'image/jpg':'image/png';
		echo "background_image = new Image();\n";
		echo "background_image.src = dataUrlToObjectUrl('$backgroundimagedata', '$mimetype');\n";
		echo "</script>\n";
	}
	
	$sounds = glob('audio/*.{mp3,ogg}', GLOB_BRACE);
	$images = glob('img/*.{png,jpg}', GLOB_BRACE);
	$objects = glob('objects/*.{obj}', GLOB_BRACE);
	$rawdata = glob('rawdata/*.{raw}', GLOB_BRACE);
	
	$demoassets = array_merge($rawdata, $sounds, $images, $objects);
?>
	</head>
	<body class="body">
		<script>

<?php if ($setup_background === true) {
	if ($setup_background_css !== false && strlen($setup_background_css) > 0) {
		echo "$('body').css({$setup_background_css});\n";
	}
	
	echo "$('body').css({ 'background-image': 'url(' + background_image.src + ')' });\n";
} ?>		
			var debug = true;
			var global_engine = null;
			var global_audioplayer = null;
			var global_tick = 0;
			var framegrabber = <?php echo $framegrabber===true?'true':'false'?>;

			var demo_loop = <?php echo $demo_loop===true?'true':'false'?>;
			var demo_loop_begin = <?php echo $demo_loop===true?"$demo_loop_begin":0 ?>;
			var demo_loop_end = <?php echo $demo_loop===true?"$demo_loop_end":0 ?>;
			var demo_loading = 0;
			var demo_loading_total = <?php echo count($demoassets)?>;
			
			function loadercallback(name) {
				++demo_loading;
				var done = Math.floor((demo_loading/demo_loading_total) * 100);
				$('#loaderbar').css({width: done+'%'});
				$('#' + name).remove();
			}

<?php if (!$framegrabber) { ?>
			function update() {
				window.requestAnimationFrame(update);
				global_engine.draw(global_engine.getTick());
			}
<?php } else { ?>
			function update(frame) {
				var framenumber = parseInt(((frame)?frame:0));
				var frame_to_ms = Math.floor( 1000/fps * frame );

				global_engine.draw(frame_to_ms);
				
				var canvas = $('#demo canvas')[0];
				var framedata = canvas.toDataURL();
				
				var postdata = { action: 'saveframe', framenumber: framenumber, framedata: framedata };
				$('#framecounter').text('Saving frame: ' + framenumber +' ts: ' + frame_to_ms);
				
				$.ajax({
					url: '../../framesaver.php',
					type: 'POST',
					data: postdata,
					success: function(res) {
						if (res && res.status && res.status==='ok') {
							if (framenumber++ < lastframe) {
								update(framenumber);
							} else {
								alert('dumping done!');
							}
						} else {
							$('#framecounter').text('status: ' + res.status + ' error: ' + res.error + " frame: " + framenumber);

							if (res.status == 'fail' && res.error == 'MISSING_ACTION') {
								log("Retrying frame: " + framenumber);
								update(framenumber);
							}
						}
					},
					error: function(a,b,c) {

					}
				})
			}
<?php } ?>
			
			function init() {
				if (framegrabber) {
					global_engine = new DemoEngine('#demo', frame_width, frame_height);
				} else {
					var width = window.innerWidth;
					var height = window.innerHeight;
				
					var w=0;
					var h=0;
				
					if (width/height < demo_aspectratio) {
						w = width;
						h = Math.floor(width / (demo_aspectratio));
					} else {
						w = Math.floor(height * (demo_aspectratio));
						h = height;
					}
				
					if (h < height) {
						$("#demo").css({ 'margin-top': Math.floor((height-h)/2) + 'px' });
					}
				
					log("Creating Damones demo engine");
					global_engine = new DemoEngine('#demo', w, h);

					if (demo_loop) {
						global_engine.setLooping(demo_loop_begin, demo_loop_end);
					}
				}

				$('html').keyup(function(e) {
					if (e.keyCode == 27) {
						// esc
						global_engine.stop();
					} else if (e.keyCode == 68) {
						// d
						global_engine.startDebugger();
					}
				});

				log("Adding render targets");
				global_engine.addRenderTarget('secondary', global_engine.getWidth(), global_engine.getHeight());
				global_engine.addRenderTarget('tertiary', global_engine.getWidth(), global_engine.getHeight());
				
				log("Adding audio");
// FF 47 seems to support .mp3, no need for .ogg anymore :)
//				if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
//					window.setTimeout(global_engine.setAudio(ogg_audio_<?php echo "$demo_song"?>), 10000);
//				} else {
					global_engine.setAudio(mp3_audio_<?php echo "$demo_song"?>);
//				}
				
				global_engine.setAudioLooping(false);
				
				log("Adding demo parts:");
				addParts();
			}

			$(document).ready(function() {
				$('#btn_fullscreen_no').off('click').on('click', function() {
					$('#setup').remove();
					$('#decrunch').show();

					init();

					if (!framegrabber) {
						log("prewarming");
						global_engine.prewarm();
						$('#decrunch').remove();
<?php if ($setup_background === true) { ?>
						$('body').removeAttr('style');
<?php } ?>		
						log("playing");
						
						global_engine.play();
						global_engine.showControls(<?php echo (($showcontrols == true)?'true':'false')?>);
					} else {
						$('#demo').append('<div id="framecounter" class="framecounter"></div>');
					}

					update();
				});
				
				$('#btn_fullscreen_yes').off('click').on('click', function() {
					$('#setup').remove();
					$('#decrunch').show();

					launchFullScreen(document.getElementById('html'));
					
					window.setTimeout(
						function() {
							init();

							if (!framegrabber) {
								log("prewarming");
								global_engine.prewarm();
								$('#decrunch').remove();
<?php if ($setup_background === true) { ?>
						$('body').removeAttr('style');
<?php } ?>		

								log("playing");
								global_engine.play();
								global_engine.showControls(<?php echo (($showcontrols == true)?'true':'false')?>);
							} else {
								$('#demo').append('<div id="framecounter" class="framecounter"></div>');
							}

							update();
						}, 
						1000
					);
				});
				
				$('#btn_fullscreen_maybe').off('click').on('click', function() {
					if (Math.random() > 0.5) {
						$('#btn_fullscreen_yes').click();
					} else {
						$('#btn_fullscreen_no').click();
					}
				});
				
				$('#loading').hide();
				$('#setup').show();
			});
		</script>
		<div id="main" class="main">
			<div id="demo" class="demo"></div>
		</div>
		
		<div id="loading" class="setup" style="display: block;">
			<p>Loading...</p>
			<div id="loaderbarcontainer" class="loaderbarcontainer">
				<div id="loaderbar" class="loaderbar"></div>
				<div class="loaderbartext">Damones demoengine is drinking while loading...</div>
			</div>
		</div>
		
		<div id="setup" class="setup" style="display: none;">
			<div id="start" style="display: block;">
				<label>Run fullscreen?</label>
				<button id="btn_fullscreen_yes" class="yes">Yes</button>
				<button id="btn_fullscreen_no" class="no">No</button>
				<button id="btn_fullscreen_maybe" class="maybe">Maybe</button>
			</div>
		</div>
		
		<div id="decrunch" style="display: none;">
			<p>Decrunching...</p>
		</div>
	</body>

<?php
	$fonts = glob('fonts/*.[jJ][sS]');

	if (count($fonts) > 0) {
		echo "    <script>\n";
		for ($i=0; $i<count($fonts); $i++) {
			echo "//  ".$fonts[$i]."\n";
			ob_start();
			include($fonts[$i]);
			$fontcontent = ob_get_clean();
			
			echo $fontcontent;
			echo "\n\n";
		}
		
		echo "    </script>\n";
	}
	
	$jsonfonts = glob('fonts/*.[jJ][sS][oO][nN]');

	if (count($jsonfonts) > 0) {
		echo "    <script>\n";
		for ($i=0; $i<count($jsonfonts); $i++) {
			echo "//  ".$jsonfonts[$i]."\n";
			ob_start();
			include($jsonfonts[$i]);
			$fontcontent = ob_get_clean();
			
			echo "jsonfont_".substr(substr($jsonfonts[$i], 0, -5), 6)."=".$fontcontent;
			echo "\n\n";
		}

		echo "    </script>\n";
	}
	
	$shaders = array();
	$vertex = glob('shaders/*.vertex');
	$fragment = glob('shaders/*.fragment');

	$files = array_merge($vertex, $fragment);
	
	for ($i=0; $i<count($files); $i++) {
		$filename = preg_replace("#.*/#", "", $files[$i]); // remove path
		$extension = preg_replace("#.*\.#", "", $filename); // get extension
		$filename = preg_replace("/\\.[^.\\s]{6,8}$/", "", $filename); // remove extension
		
		$data = file_get_contents($files[$i]);
		
		$mimetype = '';
		
		switch ($extension) {
			case ('vertex'):
				$mimetype = "x-shader/x-vertex";
				break;
			
			case ('fragment'):
				$mimetype = "x-shader/x-fragment";
				break;
				
			default:
				break;
		
		}
		
		echo "<script id=\"".$extension."_".$filename."\" type=\"$mimetype\">\n";
		echo $data;
		echo "\n</script>\n\n";
	}
	
	$files = array();
	
	$sounds = glob('audio/*.{mp3,ogg}', GLOB_BRACE);
	$images = glob('img/*.{png,jpg}', GLOB_BRACE);
	$objects = glob('objects/*.{obj}', GLOB_BRACE);
	$rawdata = glob('rawdata/*.{raw}', GLOB_BRACE);
	
	$files = array_merge($sounds, $images, $objects, $rawdata);

	echo "    <script>\n";
	echo "    	datatmp = '';\n";
	echo "    	assetname = '';\n";
	echo "    	data_array = [];\n";
	echo "    </script>\n";

	for ($i=0; $i<count($files); $i++) {
		$datasectionid = 'datasection_'.$i;
		
		echo "    <script id='".$datasectionid."'>\n";

		$filename = preg_replace("#.*/#", "", $files[$i]); // remove path
		$extension = preg_replace("#.*\.#", "", $filename); // get extension
		$filename = preg_replace("/\\.[^.\\s]{3,4}$/", "", $filename); // remove extension
		
		$data = base64_encode(file_get_contents($files[$i]));
		
		echo "    data_array[$i] = '$data';";
		echo "    url = '$files[$i]';\n";

		switch ($extension) {
			case ('obj'):
				echo "    var objecturl_$filename = dataUrlToObjectUrl(data_array[$i], 'text/plain');\n";
				echo "    var tmploader_$filename = new THREE.OBJLoader();\n";
				echo "    var object_$filename;\n";
				echo "    tmploader_$filename.load(objecturl_$filename, function(obj) { console.log('Loaded 3D .obj - $filename'); object_$filename = obj; });\n";
				echo "    assetname = 'object_$filename';\n";
				break;
			case ('ogg'):
				echo "    var ogg_audio_$filename = new Audio();\n";
				echo "    ogg_audio_$filename.src = dataUrlToObjectUrl(data_array[$i], 'audio/ogg');\n";
				echo "    assetname = 'ogg_audio_$filename';\n";
				break;
			case ('mp3'):
				echo "    var mp3_audio_$filename = new Audio();\n";
				echo "    mp3_audio_$filename.src = dataUrlToObjectUrl(data_array[$i], 'audio/mp3');\n";
				echo "    assetname = 'mp3_audio_$filename';\n";
				break;
			case ('jpg'):
				echo "    var image_$filename = new Image();\n";
				echo "    image_$filename.src = dataUrlToObjectUrl(data_array[$i], 'image/jpg');\n";
				echo "    assetname = 'image_$filename';\n";
				break;
			case ('png'):
				echo "    var image_$filename = new Image();\n";
				echo "    image_$filename.src = dataUrlToObjectUrl(data_array[$i], 'image/png');\n";
				echo "    assetname = 'image_$filename';\n";
				break;
			case ('raw'):
				echo "    var raw_$filename = dataUrlToObjectUrl(data_array[$i], 'raw');\n";
				echo "    assetname = 'raw_$filename';\n";
				break;
			default:
				break;
		}
		echo "    loadercallback('".$datasectionid."');\n";
		echo "    log('Preloaded ".$files[$i]." as '+assetname);\n";

		echo "    if (!navigator.userAgent.match(/Trident.*[ :]*11\./)) {\n";
		echo "        data_array[$i] = assetname = undefined; // release assets from temporary array\n";
		echo "    }\n";

		echo "    </script>\n";
	}

	echo "    <script>\n";
	
	echo "    function addParts() {\n";
		for ($i=0; $i<count($demo_part_order); $i++) {
			$partfilename = getcwd().$partdir.$demo_part_order[$i];
			$partdata = file_get_contents($partfilename);
			echo "    log(\"$partfilename\");\n";
			echo "    global_engine.addPart($partdata);\n";
		}
	echo "    }\n";
	echo "    </script>\n";
?>
</html>

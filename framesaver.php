<?php
	header('Content-Type: application/json');
	
	$result = array();
	$path = 'frames/';
	$filename = 'frame_';
	
	if (isset($_POST)) {
		if (isset($_POST['action'])) {
			if ($_POST['action']==='saveframe') {
				if (isset($_POST['framenumber']) && isset($_POST['framedata'])) {
					$framenumber = (int)$_POST['framenumber'];

					$framenumber = str_pad("".$framenumber, 6, '0', STR_PAD_LEFT);
					
					$framedata = $_POST['framedata'];
					$framedata = explode(',', $framedata, 2);
					$framedata = base64_decode($framedata[1]);
					
					$res = file_put_contents($path.$filename.$framenumber.'.png', $framedata);

					$result = array( 'status' => 'ok', 'framestatus' => $res, 'framenumber' => $framenumber );
					
				} else {
					$result = array( 'status' => 'fail', 'error' => 'MISSING_SAVEFRAME_PARAMETERS');
				}
			} else {
				$result = array( 'status' => 'fail', 'error' => 'INVALID_ACTION');
			}
		} else {
			$result = array( 'status' => 'fail', 'error' => 'MISSING_ACTION');
		}
	} else {
		$result = array( 'status' => 'fail', 'error' => 'MISSING_PARAMETERS');
	}
	
	echo json_encode($result);
?>
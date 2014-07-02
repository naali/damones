<?php
	header('Content-Type: application/json');
	
	$result = array();
	$path = 'fft_samples/';
	$filename = 'fft_sample';
	
	if (isset($_POST)) {
		if (isset($_POST['action'])) {
			if ($_POST['action']==='savefft') {
				if (isset($_POST['fftdata'])) {
					$fftdata = $_POST['fftdata'];
					$fftbincount = $fftdata['FFT_bincount'];
					$fftsamplecount = $fftdata['FFT_samplecount'];
					$fftsamples = base64_decode($fftdata['FFT_samples']);
					
					$res = file_put_contents($path.$filename.'.fft', $fftsamples);

					$result = array( 'status' => 'ok', 'result' => $res);
					
				} else {
					$result = array( 'status' => 'fail', 'error' => 'MISSING_SAVEFFT_PARAMETERS');
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
<?php
	$debug = true;
	$length_in_sec = 220;
	$demo_song = "eotw2013";
	
	$demo_name = "Making of the Hangover by Damones";
	$demo_description = "Making of the Hangover – Released at End of the World 2014";

	$part_dir = '/parts/';

	$demo_part_order = array(
		$part_dir.'part-00-start.js',
		$part_dir.'part-01-kuvat.js',
		$part_dir.'part-02-scroller.js',
		$part_dir.'part-03-greetings.js',
		$part_dir.'part-04-end.js'
	);

	require_once("../../engine_base.php");
?>
<?php
	$debug = true;
	$showcontrols = true;
	$length_in_sec = 328; // 5min 28sec
	$demo_song = "kikka_tahdon_viihdyttaa_cover_wal";
	$demo_loop = true;
	$demo_loop_begin = 15000;
	$demo_loop_end = 15000 + 1000 * 312;
	
	
	$demo_name = "Boozembly 2015 invitation by Damones";
	$demo_description = "Boozembly 2015 invitation by Damones, Released at Solskogen 2015. 21st Boozembly will be disorganized during 30th of July - 2nd of August 2015 in Helsinki, Finland.";

	$part_dir = '/parts/';

	$demo_part_order = array(
		$part_dir.'boozembly-start.js', 
		$part_dir.'part-01-jope.js'
	);
	
	

	require_once("../../engine_base.php");
?>

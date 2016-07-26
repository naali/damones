<?php
	$debug = true;
	$showcontrols = true;
	$length_in_sec = 5 * 60 + 40;
	$demo_song = "boozembly16_9_extended_9";
	$demo_loop = false;
	$demo_loop_begin = 0;
	$demo_loop_end = 5 * 60 * 1000 + 40000 + 924; // 
	
	$demo_name = "Boozembly 2016 invitation by Damones & Halcyon";
	$demo_description = "Boozembly 2016 invitation by Damones & Halcyon, initially planned to be released at Solskogen 2016. Well, managed to miss the deadline by a week. 22nd Boozembly will be disorganized during 4th - 7th of August 2016 in Helsinki, Finland.";

	$part_dir = '/parts/';

	$demo_part_order = array(
		$part_dir.'part-00-start.js',
		$part_dir.'part-01-makkara.js',
		$part_dir.'part-02-kuvat.js',
		$part_dir.'part-03-particles.js',
		$part_dir.'part-04-credits.js'
	);

	require_once("../../engine_base.php");
?>

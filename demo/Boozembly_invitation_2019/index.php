<?php
	$debug = true;
	$showcontrols = true;
	$length_in_sec = 5 * 60 + 11;
	$demo_song = "reivaajanvalinta1";
	$demo_loop = false;
	$demo_loop_begin = 0;
	$demo_loop_end = 5 * 60 * 1000 + 110000; // 
	
	$demo_name = "Boozembly 2019 invitation by Damones";
	$demo_description = "Boozembly 2019 invitation by Damones. 25th Boozembly will be disorganized during 1th - 4th of August 2019 in Helsinki, Finland.";

	$part_dir = '/parts/';

	$demo_part_order = array(
		$part_dir.'part-00-start.js'
/*                             ,
		$part_dir.'part-01-makkara.js',
		$part_dir.'part-02-kuvat.js',
		$part_dir.'part-03-particles.js',
		$part_dir.'part-04-credits.js',
		$part_dir.'part-05-final.js'
*/
	);

	require_once("../../engine_base.php");
?>

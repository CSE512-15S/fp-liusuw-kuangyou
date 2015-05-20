<?php
	error_reporting(E_ALL);
	ini_set('display_errors',1);
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');

	// example query http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=csv
	if (isset($_GET['file']) && isset($_GET['index']) && isset($_GET['request'])) {
		$file = $_GET['file'];
		$index = $_GET['index'];

		// input santinization, only alphabetical and numbers and "_" allowed
		// 防君子不防鱼尾
		if( preg_match("/^[a-zA-Z0-9_]+$/", $file) == 0) {
			die("nice try");
		}

		if( preg_match("/^[a-zA-Z0-9_]+$/", $index) == 0) {
			die("nice try");
		}		


		$entropies_cmd = "sudo /usr/bin/python calculate_entropy.py ".$file;
		$col_aa_cmd = "sudo /usr/bin/python write_col_aa.py ".$file." ".($index);

		$csv_file = "output/".$file."_entropies.csv";
		$json_file = "output/".$file."-".$index.".json";

		if (!is_file($csv_file)) {
			system($entropies_cmd);	
		}
		if (!is_file($json_file)) {
			system($col_aa_cmd);
		}

		if (strcmp($_GET['request'], "json") == 0) {
			header('Content-Type: application/json');
			$file_content = file($json_file);
		} else if (strcmp($_GET['request'], "csv") == 0) {
			header('Content-Type: text/plain; charset=utf-8');
			$file_content = file($csv_file);
		}
		print_r(implode("", $file_content));

	}
?>

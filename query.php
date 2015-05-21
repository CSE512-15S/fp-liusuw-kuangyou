<?php
	error_reporting(E_ALL);
	ini_set('display_errors',1);
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');

	// someone is uploading stuff
	if (isset($_FILES['upload'])) {
		$fileExtension = pathinfo($_FILES['upload']['name'])['extension'];
		$fileBaseName = pathinfo($_FILES['upload']['name'])['filename'];
		if( preg_match("/^[a-zA-Z0-9_]+$/", $fileExtension) == 0) { die("Invalid input"); }
		if( preg_match("/^[a-zA-Z0-9_]+$/", $fileBaseName) == 0) { die("Invalid input"); }

		// NEED TO SANTICISE INPUT
		if (strcmp($_FILES['upload']['type'], "application/octet-stream") != 0) {
			die("Invalid upload");
		}
		// verify extension name
		if (strcmp($fileExtension, "fasta") != 0) {
			die("Invalid file type upload");
		}

		// File size upper bound 100MB
		if ($_FILES['upload']['size'] >= 100000000) {
			die("File size exceeded");
		}

		$filename = "fasta/".$_FILES['upload']['name'];
		// Copy the file (if it is deemed safe) 
		if (is_uploaded_file($_FILES['upload']['tmp_name'])) { 
			// MIGHT NEED TO DO SOME THING WITH $contents
			$contents = file_get_contents($_FILES['upload']['tmp_name']);
			file_put_contents($filename, $contents);
			header("Location: index.html");
			exit();
		}
		
	}

	// return the existing fasta files.
	// example query 192.241.216.102/512-finalProject/query.php?fasta_query=1
	if (isset($_GET['fasta_query']) && $_GET['fasta_query'] == 1) {
		header('Content-Type: text/plain; charset=utf-8');
		foreach (glob("fasta/*") as $filename) {
			echo basename($filename, ".fasta").PHP_EOL;
		}
	}

	// return and write result
	// example query http://192.241.216.102/512-finalProject/query.php?file=HIV_pt1_AA_align_tp1&index=9&request=csv
	if (isset($_GET['file']) && isset($_GET['index']) && isset($_GET['request'])) {
		$file = $_GET['file'];
		$index = $_GET['index'];

		// input santinization, only alphabetical and numbers and "_" allowed
		// 防君子不防鱼尾
		if( preg_match("/^[a-zA-Z0-9_]+$/", $file) == 0) {
			die("Invalid input");
		}

		if( preg_match("/^[a-zA-Z0-9_]+$/", $index) == 0) {
			die("Invald input");
		}

		if( preg_match("/^[a-zA-Z0-9_]+$/", $_GET['request']) == 0) {
			die("Invald input");
		}

		$entropies_cmd = "sudo /usr/bin/python python/calculate_entropy.py ".$file;
		$col_aa_cmd = "sudo /usr/bin/python python/write_col_aa.py ".$file." ".($index);

		$csv_file = "output/".$file."/".$file."_entropies.csv";
		$json_file = "output/".$file."/".$file."-".$index.".json";

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

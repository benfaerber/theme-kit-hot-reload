<?php

header('Access-Control-Allow-Origin: *');

$fname = 'timestamp.txt';
$handle = fopen($fname, "r") or die('Unable to open file!');
$timestamp = fread($handle, filesize($fname));

echo $timestamp;
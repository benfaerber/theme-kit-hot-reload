<?php

header('Access-Control-Allow-Origin: *');

$date = new DateTime();
$timestamp =  $date->getTimestamp();


$handle = fopen('timestamp.txt', 'w');
fwrite($handle, (string) $timestamp);
fclose($handle);
<?php
	$servername = "localhost";
	$dbusername = "root";
	$password = "";
	$dbname="db_member";
	try {
		$conn=new mysqli($servername, $dbusername, $password, $dbname);	
	}
	catch(Exception $e){
		echo "Connection failed: " . $e->getMessage();
	}
?>
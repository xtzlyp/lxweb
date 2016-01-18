<?php
	include './../../lx/lx.php';
	$ms =middle::load('mysql');
	$ms->loadSql('db1',1);
	print_r($ms);	
	


?>

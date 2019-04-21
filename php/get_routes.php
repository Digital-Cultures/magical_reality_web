<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
//$res_ar = array("foo"=> $_REQUEST['body']);
//echo json_encode($request);

///choose user
$dir = "./users/";

// Sort in ascending order - this is default
$cdir = scandir($dir);

//if this user does not exist
if(!in_array($request->userId.".json",$cdir))
{
	//do nothing
	$arr  = array();
	echo json_encode($arr);

}
else{
	//otherwise get routes for user
	$contents = json_decode(file_get_contents($dir.$request->userId.".json"),true);

	echo json_encode($contents['routes']);
	//echo file_get_contents($dir.$request->userId.".json");
}
//echo json_encode($request);


?>
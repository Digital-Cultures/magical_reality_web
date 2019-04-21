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

//if this user does not existm make a route
if(!in_array($request->userId.".json",$cdir))
{
	touch("./users/".$request->userId.".json");
	//make basic json structure for new empty file
	$arr  = array();//$request->routeName => array());
	$arr["user"]=$request->userId;
	$arr["userId"]=sizeof($cdir)+1;
	$arr["routes"]=array();
	file_put_contents("./users/".$request->userId.".json",  json_encode($arr));
}

	//if this user exists 
	$json = json_decode(file_get_contents("./users/".$request->userId.".json"),true);

	$id = sizeof($json["routes"])+1;


	$routes =array(
		"routeName" => $request->routeName,
		"routeID" => $id,
		"path" => array()
	);
	array_push($json["routes"], $routes);
	file_put_contents("./users/".$request->userId.".json",json_encode($json));
	echo json_encode($json);



?>
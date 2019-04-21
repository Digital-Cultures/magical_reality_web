<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');


///choose user
$dir = "./users/";

// Sort in ascending order - this is default
$cdir = scandir($dir);

if(!in_array($request->userId.".json",$cdir))
{
	///issue a warning or somethings?

}
else{
	$contents = json_decode(file_get_contents("./users/".$request->userId.".json"),true);
	//file_put_contents("./users/test.json", json_encode($contents));
	foreach ($contents['routes'] as $key => $value) {
		# code...routeName
		if($value['routeName']==$request->routeName){
			echo json_encode($value['path']);
		}
	}
	



}



?>
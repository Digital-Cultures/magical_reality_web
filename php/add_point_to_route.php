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

	$resp = array();
	
	for ($i=0; $i <sizeof($contents['routes']) ; $i++) { 
		//array_push($resp, $contents['routes'][$i]['routeName']);
		if($contents['routes'][$i]['routeName']== $request->routeName ){
			array_push($resp,true);
			$new_point = array(
				'pointId' => sizeof($contents['routes'][$i]['path'])+1, 
				'model' => $request->url, 
				'action' => $request->action, 
				'lat' => $request->lat, 
				"lon" => $request->lon
			);
		 	array_push($contents['routes'][$i]['path'], $new_point);	
		}
	}

	file_put_contents("./users/".$request->userId.".json",json_encode($contents));
	echo json_encode($contents);




}



?>
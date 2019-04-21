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

	
	for ($i=0; $i <sizeof($contents['routes']) ; $i++) { 
		//array_push($resp, $contents['routes'][$i]['routeName']);
		if($contents['routes'][$i]['routeName']== $request->routeName ){
			$new_path = array();
			//for each point in the path
			foreach ($contents['routes'][$i]['path'] as $key => $value) {
				//if it's a match for this point, ignore it, otherwise add it to a replacement scandir(directory)
				if($request->lat == $value['lat'] && $request->lon == $value['lon']){

				}
				else{
					
					array_push($new_path, $value);
				}
				# code...
			}
			$contents['routes'][$i]['path'] = $new_path;
		}
	}

	file_put_contents("./users/".$request->userId.".json",json_encode($contents));
	echo json_encode($contents);




}



?>
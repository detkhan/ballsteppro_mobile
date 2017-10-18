<?php
require_once("class/json.php");
$jsoncallback=$_GET['jsoncallback'];
$ip = $_SERVER['REMOTE_ADDR'];
$mdate=strtotime("now");
$user_id=md5($mdate.$ip);
$objjson=new json();
  $json_data[]=array(
  "user_id"=>"$user_id"
   );
$getjson=$objjson->addjson($json_data,$jsoncallback);
echo $getjson;
 ?>

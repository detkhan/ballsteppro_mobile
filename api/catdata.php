<?php
require_once("class/database.php");
require_once("class/competition.php");
require_once("class/json.php");
$jsoncallback=$_GET['jsoncallback'];
$datatype=$_GET['datatype'];
$user_id=$_GET['user_id'];
$teamId=$_GET['teamId'];
$oj_competition=new competition;
switch ($datatype) {
  case 'addcatdata':
  $getcat=$oj_competition->addcatdata($user_id,$teamId);
  echo $getcat;
  break;
  case 'delcatdata':
  $getcat=$oj_competition->delcatdata($user_id,$teamId);
  echo $getcat;
  break;

}


 ?>

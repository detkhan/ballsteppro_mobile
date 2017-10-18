<?php
require_once("class/database.php");
require_once("class/competition.php");
require_once("class/json.php");
$jsoncallback=$_GET['jsoncallback'];
$competitionId=$_GET['competitionId'];
$user_id=$_GET['user_id'];
$oj_competition=new competition;
$data_competition=$oj_competition->getCompetitionData($competitionId);
$objjson=new json();
foreach ($data_competition as  $value) {
  $teamId=$value['teamId'];
  $teamName=$value['teamName'];
  $data_ceck=$oj_competition->getCatData($user_id,$teamId);
    $json_data[]=array(
    "teamId"=>"$teamId",
    "teamName"=>"$teamName",
    "checked"=>"$data_ceck",
     );
}

$getjson=$objjson->addjson($json_data,$jsoncallback);
echo $getjson;


//var_dump($adddata);

 ?>

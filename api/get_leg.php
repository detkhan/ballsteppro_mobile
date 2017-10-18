<?php
require_once("class/database.php");
require_once("class/competition.php");
require_once("class/json.php");
$jsoncallback=$_GET['jsoncallback'];
$oj_competition=new competition;
$data_competition=$oj_competition->getCompetition();
$objjson=new json();
foreach ($data_competition as  $value) {

  $competitionId=$value['competitionId'];
  $competitionName=$value['competitionName'];
    $json_data[]=array(
    "competitionId"=>"$competitionId",
    "competitionName"=>"$competitionName"
     );
}

$getjson=$objjson->addjson($json_data,$jsoncallback);
echo $getjson;


//var_dump($adddata);

 ?>

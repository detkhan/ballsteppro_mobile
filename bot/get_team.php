<?php
require_once("class/database.php");
require_once("class/competition.php");
$oj_competition=new competition;
$data_competition=$oj_competition->getCompetition();
//var_dump($data_competition);
foreach ($data_competition as $key => $value) {
$data_competition_get_team=$oj_competition->curlTeam($data_competition[$key]['competitionId']);
$obj =json_decode($data_competition_get_team);
//var_dump($obj->teams);
$teams=$obj->teams;
$adddata=$oj_competition->addTeam($teams,$data_competition[$key]['competitionId']);
echo "<br>".$key."#############################<br>";
}


//var_dump($adddata);

 ?>

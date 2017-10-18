<?php
require_once("class/database.php");
require_once("class/competition.php");
$oj_competition=new competition;
$data_competition=$oj_competition->getCompetition();
//var_dump($data_competition);
foreach ($data_competition as $key => $value) {
$data_competition_get_season=$oj_competition->curlSeason($data_competition[$key]['competitionId']);
$obj =json_decode($data_competition_get_season);
$seasons=$obj->competition->seasons;
$adddata=$oj_competition->addSeason($seasons,$data_competition[$key]['competitionId']);
echo "<br>".$key."#############################<br>";
}


//var_dump($adddata);

 ?>

<?php
require_once("class/database.php");
require_once("class/competition.php");
$oj_competition=new competition;
$data_competition=$oj_competition->getCompetition();
//var_dump($data_competition);
foreach ($data_competition as $key => $value) {
$data_competition_get_match=$oj_competition->curlMatch($data_competition[$key]['competitionId']);
$obj =json_decode($data_competition_get_match);
//var_dump($obj->matches);
$matchs=$obj->matches;
$adddata=$oj_competition->addmatch($matchs,$data_competition[$key]['competitionId']);
echo "<br>".$key."#############################<br>";
}


//var_dump($adddata);

 ?>

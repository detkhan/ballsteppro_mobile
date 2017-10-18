<?php
require_once("database.php");
require_once("curldata.php");
class competition
{
public function getCompetition()
{
  $clsMyDB = new MyDatabase();
  $sqlCondition = "SELECT * FROM competition" ;
  $objSelect = $clsMyDB->fncSelectRecord($sqlCondition);
  if(!$objSelect)
  {
  $data="false";
}else{
  $data=$objSelect;
}
return $data;
}


public function getCompetitionId($id)
{
  $clsMyDB = new MyDatabase();
  $sqlCondition = "SELECT * FROM competition where competitionId='$id' " ;
  $objSelect = $clsMyDB->fncSelectRecord($sqlCondition);
  if(!$objSelect)
  {
  $data="false";
}else{
  $data=$objSelect;
}
return $data;
}

public function curlSeason($id)
{
$oj_curl=new curldata;
$url="https://api.superscores.com/competitions/$id?contentLang=th";
$data_curl=$oj_curl->datafeed($url);
return $data_curl;
}


public function curlTeam($id)
{
$oj_curl=new curldata;
$url="https://api.superscores.com/competitions/$id/teams?contentLang=th";
$data_curl=$oj_curl->datafeed($url);
return $data_curl;
}

public function curlMatch($id)
{
$oj_curl=new curldata;
$url="https://api.superscores.com/competitions/$id/matches?contentLang=th";
$data_curl=$oj_curl->datafeed($url);
return $data_curl;
}

public function addSeason($datajson,$id)
{
foreach ($datajson as $key =>  $value) {
  $total=6;
  $i=1;
  $keydata="";
  $valuedata="";
foreach ($value as $key2 =>  $value2) {
echo "$key2=>".$value2."<br>";
if ($i !=$total){
$keydata.=$key2.",";
$valuedata.="'".$value2."',";
}else {
$keydata.=$key2.',competitionId';
$valuedata.="'".$value2."','".$id."'";

}
$i++;
} //foreach2
$table="seasons";
$this->adddata($table,$keydata,$valuedata);
}//foreach
}

public function addTeam($datajson,$id)
{
  foreach ($datajson as $key =>  $value) {
    $total=4;
    $i=1;
    $keydata="";
    $valuedata="";
  foreach ($value as $key2 =>  $value2) {
  echo "$key2=>".$value2."<br>";
  if ($i !=$total){
  $keydata.=$key2.",";
  $valuedata.="'".$value2."',";
  }else {
  $keydata.=$key2.',competitionId';
  $valuedata.="'".$value2."','".$id."'";

  }
  $i++;
  } //foreach2
  $table="teams";
  $this->adddata($table,$keydata,$valuedata);
  }//foreach
}

public function addMatch($datajson,$id)
{
  foreach ($datajson as $key =>  $value) {
    $total=27;
    $i=1;
    $keydata="";
    $valuedata="";
  foreach ($value as $key2 =>  $value2) {
if ($key2!="matchMeta") {
  echo "$key2=>".$value2."<br>";
  if ($i !=$total){
  $keydata.=$key2.",";
  $valuedata.="'".$value2."',";
  }else {
  $keydata.=$key2.',competitionId';
  $valuedata.="'".$value2."','".$id."'";

  }

}
  $i++;
}//foreach2
$table="matches";
$this->adddata($table,$keydata,$valuedata);
  }//foreach
}

public function adddata($table,$keydata,$valuedata)
{
  $clsMyDB = new MyDatabase();
  $strinsert ="INSERT INTO  $table($keydata) VALUES ($valuedata)";
  $objInsert = $clsMyDB->fncInsertRecord($strinsert);
  echo $strinsert.";<br>";
}




}//class
  ?>

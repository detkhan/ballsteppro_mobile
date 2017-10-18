<?php
require_once("class/database.php");
$data=file_get_contents("https://api.superscores.com/areas?competition=yes&contentLang=th");
$obj =json_decode($data);

//var_dump($obj);
$datajson=$obj->areas;
//var_dump($datajson);

foreach ($datajson as $key =>  $value) {
  $total2=5;
  $i2=1;
  $keydata="";
  $valuedata="";
foreach ($value as $key2 =>  $value2) {
if ($key2!="competitions") {
//echo "$key2=>".$value2."<br>";
if ($i2 !=$total2){
$keydata.=$key2.",";
$valuedata.="'".$value2."',";
}else {
$keydata.=$key2;
$valuedata.="'".$value2."'";
}
}else {
foreach ($value2 as $key3 =>  $value3) {
$total=7;
$i=1;
$keydata2="";
$valuedata2="";
foreach ($value3 as $key4 =>  $value4) {
//echo "$key4=>".$value4."<br>";
if ($i !=$total){
$keydata2.=$key4.",";
$valuedata2.="'".$value4."',";
}else {
$keydata2.=$key4;
$valuedata2.="'".$value4."'";
}

$i++;
  }
//echo $keydata2."<br>";
//echo $valuedata2."<br>";
$table2="competition";
adddata($table2,$keydata2,$valuedata2);
}


}
$i2++;
}
//echo $keydata."<br>";
//echo $valuedata."<br>";
$table="area";
//adddata($table,$keydata,$valuedata);
}


function adddata($table,$keydata,$valuedata)
{
  $clsMyDB = new MyDatabase();
  $strinsert ="INSERT INTO  $table($keydata) VALUES ($valuedata)";
  $objInsert = $clsMyDB->fncInsertRecord($strinsert);
  echo $strinsert.";<br>";
}



 ?>

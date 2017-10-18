<?php
require_once("database.php");
class competition
{
public function getCompetition()
{
  $clsMyDB = new MyDatabase();
  $sqlCondition = "SELECT * FROM competition where show_game='1'" ;
  $objSelect = $clsMyDB->fncSelectRecord($sqlCondition);
  if(!$objSelect)
  {
  $data="false";
}else{
  $data=$objSelect;
}
return $data;
}


public function getCompetitionData($id)
{
  $clsMyDB = new MyDatabase();
  $sqlCondition = "SELECT * FROM teams where competitionId='$id' " ;
  $objSelect = $clsMyDB->fncSelectRecord($sqlCondition);
  if(!$objSelect)
  {
  $data="false";
}else{
  $data=$objSelect;
}
return $data;
}

public function getCatData($user_id,$teamId)
{
  $clsMyDB = new MyDatabase();
  $sqlCondition = "SELECT * FROM usercat where user_id='$user_id' and  teamId='$teamId'" ;
  $objSelect = $clsMyDB->fncSelectRecord($sqlCondition);
  if(!$objSelect)
  {
  $data="no";
}else{
  $data="checked";
}
return $data;
}


public function addCatData($user_id,$teamId)
{
  $clsMyDB = new MyDatabase();
  $strCondition2 = "SELECT  *  FROM  usercat WHERE  `user_id` ='$user_id' and `teamId` ='$teamId'";

  $objSelect2 = $clsMyDB->fncSelectRecord($strCondition2);

  if(!$objSelect2)
  {
    $strinsert ="INSERT INTO  usercat(user_id,teamId) VALUES ('$user_id','$teamId')";
    $objInsert2 = $clsMyDB->fncInsertRecord($strinsert);
    $objInsert="add data<br>";
  }
  else{
  $objInsert="Record have<br>";

  }
  return $objInsert;
}

function delCatData($user_id,$teamId)
{
  //$strDB = "admin_newsth";
  $clsMyDB = new MyDatabase();
    $strdel ="DELETE  FROM  usercat  WHERE  `user_id`='$user_id'  and  `teamId`='$teamId'";
    $objdel = $clsMyDB->fncDeleteRecord($strdel);
return $strdel;
}
}//class
  ?>

$$("#content").html("");
//<div class="left"><a href="index.html" class="back link icon-only"><i class="icon icon-back"></i></a></div>
start();


$$(document).on("click", "#feed", function() {
 $$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(0%, 0px, 0px)');
$$("#content").html("");
myApp.attachInfiniteScroll($$('.infinite-scroll'));
feednews(0,1,0);
});

$$(document).on("click", "#catalog", function() {
$$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(100%, 0px, 0px)');
$$("#content").html("");
feedcat(user_id,0);
myApp.detachInfiniteScroll($$('.infinite-scroll'));
});
$$(document).on("click", "#newstop", function() {
$$(".floating-button").html("").hide();
$$('.tab-link-highlight').transform('translate3d(200%, 0px, 0px)');
$$("#content").html("");
feednews(0,2,0);
 });
 $$(document).on("click", "#account_circle", function() {
$$("#content").html("");
 $$('.tab-link-highlight').transform('translate3d(300%, 0px, 0px)');
 $$(".floating-button").html("").hide();
 checklogin();
 //myApp.detachInfiniteScroll($$('.infinite-scroll'));
 });
 $$(document).on("click", "#setting", function() {
$$(".floating-button").html("").hide();
$$("#content").html("");
setting();
$$('.tab-link-highlight').transform('translate3d(400%, 0px, 0px)');
 myApp.detachInfiniteScroll($$('.infinite-scroll'));
 });

$$('a.tab-link').click(function(){
    $$('a.tab-link').removeClass("active");
    $$(this).addClass("active");
});

function getuser(){
if(localStorage.user_id)
{
user_id = localStorage.user_id;
}
else
{
var getuser = "http://"+hosturl+"/ballsteppro_mobile/api/get_user.php?jsoncallback=?";
$$.getJSON( getuser, {
    news_id:'news_id',
  format: "json"
},function( data ) {
$$.each(data, function(i, field){
user_id=field.user_id;
localStorage.user_id=field.user_id;
});
});
}
}

function start() {
  if(!localStorage.start)
  {
  getuser();
    $$(".toolbar").css('display', 'none');
    var content='';
    var url = "http://"+hosturl+"/ballsteppro_mobile/api/get_leg.php?jsoncallback=?";
    $$.getJSON(url, function (data) {
    content+='<div class="content-block-title">Select Team</div> \
                    <div class="list-block accordion-list"> \
                      <ul>';
            $$.each(data, function(i, field){
              var competitionId='';
              competitionId=field.competitionId;
                      content+='<li class="accordion-item"><a href="#" class="item-content item-link"> \
                      <div class="item-media">\
                      <i class="facebook-avatar"><img src="" width="34" height="34"></i></div>\
                                              <div class="item-inner"> \
                                                <div class="item-title">\
                                                  <div class="item-title">'+field.competitionName+'</div>\
                                                </div> \
                                              </div></a> \
                                            <div class="accordion-item-content"> \
                                            <div class="list-block">\
                                            <ul id="catdata'+field.competitionId+'">';;
                                            content+=' </ul>\
                                                                  </div>\
                                                                  </div> \
                                                                </li>';
                                            getcatdata(competitionId);
                                            });

                                            content+='</ul>\
                                                            </div>';
var menu='<a id="home" href="#" class="button button-fill color-red">ยืนยัน</a>';
                                            $$('#content').append(content);
                                            $$('#menu_right').append(menu);
                                            });
  }
}//function start

function getcatdata(competitionId) {
  var url = "http://"+hosturl+"/ballsteppro_mobile/api/get_legdata.php?jsoncallback=?";
  $$.getJSON(url,{competitionId:competitionId,user_id:user_id}, function (data1) {
    var  content1='';
    var con_check='';

        $$.each(data1, function(i1, field1){
          var checked=field1.checked;
          if(checked=='checked'){
          var con_check='checked="checked"';
          var con_check2='checked="checked"';
        }else{
          var con_check2='checked="no"';
        }
      //  console.log(checked);
          content1+='<li>\
              <label  class="label-checkbox item-content"  teamId="'+field1.teamId+'" '+con_check2+'>\
            <input   type="checkbox" name="my-checkbox" id="checkbox" teamId="'+field1.teamId+'" '+con_check+'>\
            <div class="item-media">\
              <i class="icon icon-form-checkbox"></i>\
            </div>\
                <div class="item-inner"> \
                  <div  class="item-title">'+field1.teamName+'</div>\
                </div>\
              </label>\
            </li>';
          });
          var addcat='#catdata'+competitionId;
          $$(addcat).append(content1);
        });
}
$$(document).on("click", "#home", function() {
  $$(".toolbar").css('display', 'block');
  $$('#menu_right').html('');
  $$('#content').html('');

});

$$(document).on("click", "#checkbox", function() {
  var isChecked = $$(this).attr('checked');
  var teamId=$$(this).attr("teamId");
  //console.log(isChecked);
  //console.log(teamId);
alert(isChecked);
  if(!isChecked){
  addcatdata(teamId);
  var isCheckedadd = $$(this).attr('checked',"checked");
  //console.log("add");
  }else{
delcatdata(teamId);
  var isCheckedadd = $$(this).attr('checked',"no");
//console.log("del");
  }
});

function addcatdata(teamId){
  var newsdetail = "http://"+hosturl+"/ballsteppro_mobile/api/catdata.php?jsoncallback=?";
  $$.getJSON( newsdetail, {
      datatype:"addcatdata",
      user_id:user_id,
      teamId:teamId,
  });
}//function addcatdata

function delcatdata(teamId){
  var newsdetail = "http://"+hosturl+"/ballsteppro_mobile/api/catdata.php?jsoncallback=?";
  $$.getJSON( newsdetail, {
      datatype:"delcatdata",
      user_id:user_id,
      teamId:teamId,
  });
}//function delcatdata


function checklogin() {
  if(localStorage.user_id2&&localStorage.track)
  {
  user_id2 = localStorage.user_id2;
  track=localStorage.track;
  homevip();
  //localStorage.clear();
  //alert(user_id);
  }
  else
  {
  login();
  }
}
function login() {
  $$("#content").html("");
  var content='<div class="content-block-title">Sign In</div> \
  <div class="list-block">\
    <ul>\
    <li>\
    <div class="item-content">\
      <div class="item-media"><i class="material-icons">account_circle</i></div>\
      <div class="item-inner">\
        <div class="item-title label">Username</div>\
        <div class="item-input">\
          <input id="username" type="text" placeholder="Username">\
        </div>\
      </div>\
    </div>\
  </li>\
  <li>\
  <div class="item-content">\
    <div class="item-media"><i class="material-icons">https</i></div>\
    <div class="item-inner">\
      <div class="item-title label">Password</div>\
      <div class="item-input">\
        <input id="password" type="password" placeholder="Password">\
      </div>\
    </div>\
  </div>\
  </li>\
  </ul>\
  </div>\
  </div>\
  <div class="row">\
    <div class="col-50">\
      <a id="sign_up" href="#" class="button  button-fill">Sign Up</a>\
    </div>\
    <div class="col-50">\
      <a id="sign_in" href="#" class="button  button-fill">Sign In</a>\
    </div>\
  </div> \
  ';
  $$("#content").append(content);

}

$$(document).on("click", "#sign_up", function() {
  $$("#content").html("");
  var content='<div class="content-block-title">Sign In</div> \
  <div class="list-block">\
    <ul>\
  <div class="item-content">\
    <div class="item-media"><i class="material-icons">account_circle</i></div>\
    <div class="item-inner">\
      <div class="item-title label">Username</div>\
      <div class="item-input">\
        <input id="username" type="text" placeholder="Username">\
      </div>\
    </div>\
  </div>\
</li>\
<li>\
<div class="item-content">\
  <div class="item-media"><i class="material-icons">mail</i></div>\
  <div class="item-inner">\
    <div class="item-title label">E-mail</div>\
    <div class="item-input">\
      <input id="email" type="email" placeholder="E-mail">\
    </div>\
  </div>\
</div>\
</li>\
<li>\
  <li>\
  <div class="item-content">\
    <div class="item-media"><i class="material-icons">https</i></div>\
    <div class="item-inner">\
      <div class="item-title label">Password</div>\
      <div class="item-input">\
        <input id="password" type="password" placeholder="Password">\
      </div>\
    </div>\
  </div>\
  </li>\
  <li>\
  <div class="item-content">\
    <div class="item-media"><i class="material-icons">https</i></div>\
    <div class="item-inner">\
      <div class="item-title label">Re-Password</div>\
      <div class="item-input">\
        <input id="re_password" type="password" placeholder="Re-Password">\
      </div>\
    </div>\
  </div>\
  </li>\
  </ul>\
  </div>\
  </div>\
  <div class="row">\
    <div class="col-100">\
      <a id="sign_up_regis" href="#" class="button  button-fill">Sign Up</a>\
    </div>\
  </div> \
  ';
  $$("#content").append(content);

});

$$(document).on("click", "#sign_up_regis", function() {
var username = $$('#username').val();
var email = $$('#email').val();
var password = $$('#password').val();
var re_password = $$('#re_password').val();
if(password==re_password){
  var url = "http://"+hosturl+"/ballsteppro_mobile/api/regisuser.php?jsoncallback=?";
  $$.getJSON( url, {
      username:username,
      email:email,
      password:password,
      re_password:re_password,}
,function( data ) {
  $$.each(data, function(i, field){
  var msg=field.msg;
  if(msg=="no"){
  myApp.alert("Have User", 'Ballstep!');
  }
  else{
login();
  }
  });
  });
}else{
myApp.alert('Password Not Match Re-Password', 'Ballstep!');
}
});


$$(document).on("click", "#sign_in", function() {
  var username = $$('#username').val();
  var password = $$('#password').val();
    var url = "http://"+hosturl+"/ballsteppro_mobile/api/loginuser.php?jsoncallback=?";
    $$.getJSON( url, {
        username:username,
        password:password}
  ,function( data ) {
    $$.each(data, function(i, field){
    var msg=field.msg;
    if(msg=="no"){
    myApp.alert("User Or Password Worng", 'Ballstep!');
    }
    else{
      user_id2=field.user_id;
      track=field.track;
      localStorage.user_id2=field.user_id;
      localStorage.track=field.track;
      homevip();
    }
    });
    });

});//click sign_in


$$(document).on("click", "#barcat", function() {
$$("#content").html("");
myApp.attachInfiniteScroll($$('.infinite-scroll'));
var addback='<a id="catbar" href="#" class="floating-button color-pink"> \
Back \
  </a>';
$$(".page").append(addback);
var newscat_id=$$(this).attr('newscat_id');
 feednews(0,3,newscat_id);
});




function setting() {
var content='<div class="card"> \
    <div class="card-header">นโยบายความเป็นส่วนตัว</div> \
    <div class="card-content"> \
<div class="card-content-inner">\
โปรแกรมนี้จัดทำขึ้นมาเพื่อรวบรวมลิงค์ข่าวจากเวบข่าวต่าง ๆ ไม่ได้เก็บข้อมูลเนื้อหาข่าวใด ๆ ไว้ในเครื่องเซอเว่อร์หรือในแอพพลิเคชั่น</br>สำนักข่าวอาจจะมีการเพิ่มลดเปลี่ยนแปลงโดยไม่แจ้งให้ทราบล่วงหน้า</br>ติดต่อสอบถามหรือจ้างงานได้ที่ nawacenter@gmail.com </div>\
    </div>\
  </div>';
  $$('#content').append(content);
}


$$(document).on("click", "#likenews", function() {
var newsdetail_id=$$(this).attr('newsdetail_id');
var numlike=$$(this).attr('numlike');
var numlikeall=parseInt(numlike)+1;
var n = numlikeall.toString();
var totallike = "http://"+hosturl+"/newpaper/api/totallike.php?jsoncallback=?";
$$.getJSON( totallike, {
    newsdetail_id:newsdetail_id,
  format: "json"
  });
$$("#likecon"+newsdetail_id).html("");
$$("#likecon"+newsdetail_id).append(n);


 });


$$(document).on("click", "#share", function() {
var newstitle=$$(this).attr('newstitle');
var newsimg=$$(this).attr('newsimg');
var newslink=$$(this).attr('linknews');
var newsdetail_id=$$(this).attr('newsdetail_id');
var totalshare = "http://"+hosturl+"/newpaper/api/totalshare.php?jsoncallback=?";
 $$.getJSON( totalshare, {
     newsdetail_id:newsdetail_id,
  format: "json"
   });
window.plugins.socialsharing.share(null, null, null, newslink);

  });

$$(document).on("click", "#newslinkclick", function() {
  var newslink=$$(this).attr('linknews');
  var newsdetail_id=$$(this).attr('newsdetail_id');
   var totalread = "http://"+hosturl+"/newpaper/api/totalread.php?jsoncallback=?";
    $$.getJSON( totalread, {
        newsdetail_id:newsdetail_id,
    	format: "json"
      });
  var ref = cordova.InAppBrowser.open(newslink, '_blank', 'location=yes','hardwareback=yes');
  with (ref) {

          addEventListener('exit', loadexitCallBack);
      }

   });
   var numads=0;
   function loadexitCallBack(){
  if(numads==0){
  if(AdMob) AdMob.showInterstitial();
  }
  numads++;
   }

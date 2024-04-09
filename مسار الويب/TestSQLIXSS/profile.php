
     
<?php
include("auth.php");
require_once 'conn.php';
$username= $_SESSION["username"] ;
$query="SELECT * FROM member where username='$username'" ;
$result = $conn->query($query);

?> 

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Hsoub Weather App</title>
    <link href="https://fonts.googleapis.com/css?family=Almarai&display=swap" rel="stylesheet">    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> 
    <link rel="stylesheet" href="./css/style.css">   
</head>
<body style="font-family: 'Almarai', sans-serif;">
<nav class="navbar navbar-default">
		 <div class="container-fluid" style="float:left">
			<a class="navbar-brand" >أكاديمية حسوب</a>
		</div>
        <div style="float:right">
			<a class="navbar-brand" href="weatherapp.php" >تطبيق حالة الطقس </a>
		</div> 
</nav>
<div class="container-fluid" style="margin: 5% 5% 5% 5%">
<h1> الصفحة الشخصية</h1>
<?php
foreach($result as $my_row){
    $my_row = (object) $my_row;
    echo "<h4>اسم المستخدم: <strong>$my_row->username</strong></h4>";
    echo "<h4>معرِّف المستخدم :<strong>$my_row->id</strong></h4>";
    echo "<h4>كلمة المرور: <strong>$my_row->password</strong></h4>";
    echo "<h4>الاسم الأول:<strong>$my_row->firstname</strong></h4>";
    echo "<h4>الاسم الأخير: <strong>$my_row->lastname</strong></h4>";
    echo "<h4>البريد الإلكتروني:<strong>$my_row->email</strong></h4>";
    echo "<hr>";
 }
?>
<a  href="logout.php">تسجيل خروج</a>
</div>
</body>
</html>



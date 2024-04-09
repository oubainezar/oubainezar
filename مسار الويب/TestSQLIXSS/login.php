<?php
	session_start();
	require_once 'conn.php';
	
	if(ISSET($_POST['login'])){
		$username = $_REQUEST['username'];
		$password = $_REQUEST['password'];
        
		$user=$conn->query("SELECT * FROM member where username= '$username' and password= '$password'") ;
		
		if($user->rowCount()){
			$_SESSION['username']=$username;
			header("location:profile.php");			
		}else {
			$_SESSION['error'] = "اسم المستخدم أو كلمة السر غير صحيح";

		 }
	}

?>

<!DOCTYPE html>
<html lang="ar" >
<head>
    <meta charset="UTF-8">
    <title>Hsoub Weather App</title>
    <link href="https://fonts.googleapis.com/css?family=Almarai&display=swap" rel="stylesheet">    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> 
    <link rel="stylesheet" href="./css/style.css">   
</head>
<body style="font-family: 'Almarai', sans-serif;">
    <nav class="navbar navbar-default">
		 <div class="container-fluid">
			<a class="navbar-brand" href="">أكاديمية حسوب</a>
		</div> 
	</nav>
	<div class="col-md-2"></div>
	<div class="col-md-8 well">
		<div style="float:right">
			<h2> سجل دخول لاستخدام تطبيق حالة الطقس</h2>
		
		     <a  href="index.php">لا تمتلك حساب.. أنشئ من هنا</a>
		</div>
		<br style="clear:both;"/><br />
		<div class="row col-md-12">
			<form method="POST" action="login.php">	
			    <?php
					if(ISSET($_SESSION['error'])){
				?>
					<div style="float:right" class="alert alert-danger"><?php echo $_SESSION['error']?></div>
				<?php
					session_unset();
					}
				?>
					<div class="form-group">
					<label style="float:right">اسم المستخدم </label>
					<input type="text" name="username" class="form-control" value="<?php echo isset($_POST['username'])? $_POST['username'] : "" ?>" required />
				</div>
				<div class="form-group">
					<label style="float:right">كلمة المرور</label>
					<input type="password" name="password" class="form-control"  />
				</div>
				
				<button class="btn btn-block" name="login"><span class="glyphicon glyphicon-log-in"></span> تسجيل دخول</button>
			</form>	
		</div>
	</div>
</body>
</html>

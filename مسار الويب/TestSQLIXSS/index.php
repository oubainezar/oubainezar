<?php
	session_start();
	require_once 'conn.php';
	
	if(ISSET($_POST['register'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
		$email = $_POST['email'];
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$sql = "INSERT INTO member (username, password, email, firstname, lastname) VALUES ('$username', '$password','$email', '$firstname', '$lastname')";	
		if ($conn->query($sql)) {
			$_SESSION['username']=$username;
			header('location: login.php');
		} else {
			$_SESSION['error']="فشل إنشاء الحساب";
		}
		
	}
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
		 <div class="container-fluid">
			<a class="navbar-brand" href="">أكاديمية حسوب</a>
		</div> 
	</nav>
	<div class="col-md-2"></div>
	<div class="col-md-8 well">
		<h3 > أنشئ حساب لاستخدام تطبيق حالة الطقس</h3>
		<hr style="border-top:1px dotted #ccc;"/>
		<a href="login.php">لديك حساب بالفعل.. سجل الدخول من هنا</a>
		<br style="clear:both;"/><br />
		<div class="col-md-12">
			<form method="POST" action="index.php">	
			    <?php
					if(ISSET($_SESSION['error'])){
				?>
					<div class="alert alert-danger"><?php echo $_SESSION['error']?></div>
				<?php
					session_unset();
					}
				?>
				<div class="form-group">
					<label>اسم المستخدم</label>
					<input type="text" name="username" class="form-control" value="<?php echo isset($_POST['username'])? $_POST['username'] : "" ?>" required />
				</div>
				<div class="form-group">
					<label>البريد الإلكتروني</label>
					<input type="email" name="email" class="form-control" value="<?php echo isset($_POST['email'])? $_POST['email'] : "" ?>" required />
				</div>
				<div class="form-group">
					<label>كلمة المرور</label>
					<input type="password" name="password" class="form-control" required />
				</div>
				<div class="form-group">
					<label>الاسم الأول</label>
					<input type="text" name="firstname" class="form-control" value="<?php echo isset($_POST['firstname'])? $_POST['firstname'] : "" ?>" required />
				</div>
				<div class="form-group">
					<label>الاسم الأخير</label>
					<input type="text" name="lastname" class="form-control" value="<?php echo isset($_POST['lastname'])? $_POST['lastname'] : "" ?>" required />
				</div>
				
				<button class="btn btn-block" name="register"><span class="glyphicon glyphicon-save"></span> إنشاء حساب</button>
			</form>	
		</div>
	</div>
</body>
</html>

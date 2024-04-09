
<?php
 include("auth.php");
 require_once 'conn.php';
 $username = $_SESSION["username"] ;
 if(ISSET($_POST['comments'])){
    $username = $_SESSION['username'];
    $comment_text = $_POST['comment'];
    $query = "INSERT into `comment` (username, comment_text) VALUES ('$username', '$comment_text')";
    $stmt = $conn->prepare($query);
    if($stmt->execute()){
        header('location: weatherapp.php');
    }
    else $_SESSION['error']= "خطأ في إضافة التعليق";
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
    <style>
        h5{
        margin-bottom:2.5% ;
        } 
        h4{
        margin-top:2% ;
        } 
        h1{
        margin-top:-3% ;
        } 
        h3{
        margin-right:2.5% ;
        } 
    </style>  
</head>

<body style="font-family: 'Almarai', sans-serif;">
    <nav class="navbar navbar-default">
            <div class="container-fluid"  style="float:left">
                <a class="navbar-brand" >أكاديمية حسوب</a>
            </div>
            <div style="float:right">
                <a class="navbar-brand" href="profile.php" >الملف الشخصي </a>
            </div> 
    </nav>
    <div class="container" style="height:650px;">
        <div class="row" >
            <div class="col-md-12" style="margin-bottom:10px;">
                <h2 class="text-center ">اعرف حالة الطقس لمدينتك </h2>
                <span id="error" class="text-center"></span>
            </div>
            
            <div class="row form-group form-inline" id="cityDiv">
            
                <input type="text" name="city" id="city" class="form-control" placeholder="أدخل اسم المدينة " >
                <button id="submitCity" class="btn">ابحث عن المدينة </button>
            </div>

        </div>  
        <div id="showWeather" style=" background-color: rgb(153, 153, 153);"></div>

        <div style="text-align:right " class="row form-group form-inline">
            <form method="POST" action="weatherapp.php">
            <h3  class=" text-primary">آراء مستخدمي التطبيق</h4>
            <h4><?php echo $username; ?></h4>

            <textarea type="text" name="comment" id="comment" class="form-control" placeholder="أدخل تعليقك" ></textarea>
            <button style="text-align:left " id="comments" name="comments" class="btn ">أرسل التعليق</button>
            </form>
        </div>
        <div style="text-align:right " class="row form-group form-inline">
                <?php
					if(ISSET($_SESSION['error'])){
				?>
					<div class="alert alert-danger"><?php echo $_SESSION['error']?></div>
				<?php
					session_unset();
					}
				?>
            <?php
            $query="SELECT * from comment order by id desc" ;
            $result = $conn->query($query) ;
            foreach($result as $my_row){
                $my_row = (object) $my_row;
                echo "<h4><strong>$my_row->username<strong></h4>";
                echo "<h5>$my_row->comment_text</h5>";   
            }
            ?>
        </div> 
    </div>  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>        
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>       
    <script src="./js/weather.js"></script>        
</body>
</html>

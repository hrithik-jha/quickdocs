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

$sqlCommand = "SELECT * FROM studentRec";
//echo $sqlCommand;

$flag = 0;

$checkData = mysqli_query($con, $sqlCommand);


echo "
    <table border='1px' cellpadding='3px'>
        <tr>
            <td>
                <b>First Name(User Name)</b>
            </td>
        </tr>
        ";


while($row = mysqli_fetch_row($checkData)) {
    echo "<tr><td>".$row[0]."</td></tr>";
}

echo "
    </table>
";

mysqli_close($con);

?>

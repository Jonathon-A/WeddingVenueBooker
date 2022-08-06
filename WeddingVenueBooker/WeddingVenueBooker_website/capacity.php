<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Catering</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
    <?php
    //Includes previous page above table
    include "capacity.html";
    //Includes database values needed for connection
    include "coa123-mysql-connect.php";
    //Connects to database
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    //Check connection
    if (!$conn) {
        //Displays error message and does not display table
        die("<br><p class=\"center\">Connection failed: " . mysqli_connect_error()."</p><br>");
    }
    echo "<br><p class=\"center\">Connected successfully</p><br>";
    //Gets values from form
    $minCap = $_GET['minCapacity'];
    $maxCap =  $_GET['maxCapacity'];
    //If any of the entered values are invalid
    if(!is_numeric($minCap) || !is_numeric($maxCap) || $minCap > $maxCap){
        //Displays error message and does not display table
        $ErrorString = "";
        if(!is_numeric($minCap) || !is_numeric($maxCap)){
            $ErrorString = $ErrorString."All values entered must be numeric. ";
        }
        if($minCap > $maxCap){
            $ErrorString = $ErrorString."Minimum capacity must be lower or equal to maximum capacity. ";
        }
        $ErrorString = trim($ErrorString);
        echo "<p class=\"center\">$ErrorString</p>";
        exit;
    }
    //SQL statment used to query database (gets name, capacity, weekday_price, weekend_price, licensed columns from venue table)
    $sql = "SELECT name, capacity, weekday_price, weekend_price, licensed FROM venue";
    //Executes query
    $result = mysqli_query($conn, $sql);
    $Venues = array();
    //Adds row to array if its capacity is within specified bounds and the venue is licensed
    while ($row = mysqli_fetch_array($result)) {
        if($row['capacity'] >= $minCap && $row['capacity'] <= $maxCap && $row['licensed']){
            $Venues[] = $row;
        }
    }
    ?>
    <!--HTML table with columns headed by Name, Weekday price and Weekend price-->
    <table border="4">
            <thead>
                <tr>
                    <!--Column headers-->
                    <th scope="col">Name</th>
                    <th scope="col">Weekday price</th>
                    <th scope="col">Weekend price</th> 
                </tr>
            </thead>
            <tbody>
              
            <?php
            //Rows
            foreach ($Venues as $Venue){
                    echo "<tr>
                    <td>".$Venue['name']."</td>
                    <td>".$Venue['weekday_price']."</td>
                    <td>".$Venue['weekend_price']."</td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
    </body>
</html>
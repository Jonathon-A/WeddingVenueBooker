<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Count</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
    <?php
    //Includes previous page above table
    include "count.html";
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
    //Gets value from form
    $month = $_GET['month'];
    //If entered month is invalid
    //Displays error message and does not display table
    if(!is_numeric($month)){
        $ErrorString = "Entered month must be numeric value.";
        echo "<p class=\"center\">$ErrorString</p>";
        exit;
    }
    if($month < 1 || $month > 12){
        $ErrorString = "Entered month must be between 1-12.";
        echo "<p class=\"center\">$ErrorString</p>";
        exit;
    }
    //SQL statment used to query database (gets name and booking dates for every venue)
    $sql = "SELECT name, booking_date FROM venue LEFT JOIN venue_booking ON venue.venue_id = venue_booking.venue_id";
    
    //Alternative method with different SQL statment below:
    //$sql = "SELECT name, COUNT(name) FROM venue LEFT JOIN venue_booking ON venue.venue_id = venue_booking.venue_id 
    //WHERE MONTH(booking_date)=\"$month\" ORDER BY COUNT(name) DESC";

    //Executes query
    $result = mysqli_query($conn, $sql);
    $Venues = array();
    //Counts number of booking dates that are in the month specified for every venue
    while ($row = mysqli_fetch_array($result)) {
        $mon = date("m", strtotime($row['booking_date']));
        if($mon == $month){
            if(array_key_exists($row['name'], $Venues)){
                $Venues[$row['name']] = $Venues[$row['name']] + 1;
            }else{
                $Venues[$row['name']] = 1;
            }
        }
    }
    //Sorts in desceding order
    arsort($Venues);
    ?>
    <!--HTML table with columns headed by Name and Number of bookings-->
    <table border="4">
            <thead>
                <tr>
                    <!--Column headers-->
                    <th scope="col">Name</th>
                    <th scope="col">Number of bookings</th>
                </tr>
            </thead>
            <tbody>
            <?php
            //Rows
            foreach ($Venues as $name=>$count){
                echo "<tr>
                    <td>$name</td>
                    <td>$count</td>
                    </tr>";
            }
            ?>
            </tbody>
        </table>
    </body>
</html>
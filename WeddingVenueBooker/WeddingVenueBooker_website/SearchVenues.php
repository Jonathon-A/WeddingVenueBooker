<?php
//Includes database values needed for connection
include "coa123-mysql-connect.php";
//Connects to database
$conn = mysqli_connect($servername, $username, $password, $dbname);
//Check connection
if (!$conn) {
    //Displays error message and does not display table
    exit("Connection failed: " . mysqli_connect_error());
}

$grade = $_POST['grade'];
$date = $_POST['date'];
$capacity = $_POST['capacity'];

//SQL statment used to query database (gets venue ID and catering cost/pp for every venue that meets search criteria)
$sql = "SELECT venue_id, cost FROM catering WHERE grade=$grade
AND venue_id IN (SELECT venue_id FROM venue WHERE capacity >= $capacity) 
AND venue_id NOT IN (SELECT venue_id FROM venue_booking WHERE booking_date = '$date')";
    
//Executes query
$result = mysqli_query($conn, $sql);
$Venues = array();

//Creates array of venue IDs and associated catering costs
while ($row = mysqli_fetch_array($result)) {
    $Venues[] =  array(
        "venue_id" => $row['venue_id'],
        "cost" => $row['cost'],
    );
}

//Returns json econded array of venue names and booking counts
echo json_encode($Venues);
?>
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
//SQL statment used to query database (gets venue details for every venue)
$sql = "SELECT venue_id, name, capacity, weekend_price, weekday_price, licensed FROM venue";
    
//Executes query
$result = mysqli_query($conn, $sql);
$Venues = array();

//Creates array that associates venue id with venue details
while ($row = mysqli_fetch_array($result)) {
    $Venues[$row['venue_id']] = array(
        "name" => $row['name'],
        "capacity" => $row['capacity'],
        "weekend_price" => $row['weekend_price'],
        "weekday_price" => $row['weekday_price'],
        "licensed"  => $row['licensed'],
    );
}

//Returns json econded array of venue details
echo json_encode($Venues);
?>
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
//SQL statment used to query database (gets name and booking dates for every venue)
$sql = "SELECT venue_booking.venue_id, booking_date FROM venue LEFT JOIN venue_booking ON venue.venue_id = venue_booking.venue_id";
    
//Executes query
$result = mysqli_query($conn, $sql);
$Venues = array();

//Counts number of booking dates for every venue
while ($row = mysqli_fetch_array($result)) {
        if(array_key_exists($row['venue_id'], $Venues)){
            $Venues[$row['venue_id']] = $Venues[$row['venue_id']] + 1;
        }else{
            $Venues[$row['venue_id']] = 1;
        }
    
}
//Returns json econded array of venue names and booking counts
echo json_encode($Venues);
?>
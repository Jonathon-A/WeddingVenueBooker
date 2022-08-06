<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Catering</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
    <?php
    //Gets values from form
    $min = $_GET['min'];
    $max =  $_GET['max'];
    $c1 =  $_GET['c1'];
    $c2 =  $_GET['c2'];
    $c3 =  $_GET['c3'];
    $c4 =  $_GET['c4'];
    $c5 =  $_GET['c5'];
    //Includes previous page above table
    include "catering.html";
    echo "<br>";
    //If any of the entered values are invalid
    if(!is_numeric($min) || !is_numeric($max) ||
    !is_numeric($c1) || !is_numeric($c2) || !is_numeric($c3) || !is_numeric($c4) || !is_numeric($c5) || $min > $max){
        //Displays error message and does not display table
        $ErrorString = "";
        if(!is_numeric($min) || !is_numeric($max) || !is_numeric($c1) || 
        !is_numeric($c2) || !is_numeric($c3) || !is_numeric($c4) || !is_numeric($c5)){
            $ErrorString = $ErrorString."All values entered must be numeric. ";
        }
        if($min > $max){
            $ErrorString = $ErrorString."Minimum party size must be lower or equal to maximum party size. ";
        }
        $ErrorString = $ErrorString."<br><br>Forms reset to defualt values.";
        $ErrorString = trim($ErrorString);
        echo "<p class=\"center\">$ErrorString</p>";
        exit;   
    }
    ?>
    <!--HTML table with rows headed by min to max (incremented in steps of 5) and columns headed by c1 to c5-->
    <table border="4">
            <thead>
                <tr>
                    <td>Cost per person →<hr>
                    ↓ Party size cost </td>
                    <?php
                    //Column headers
                    echo "
                    <th scope=\"col\">$c1</th>
                    <th scope=\"col\">$c2</th>
                    <th scope=\"col\">$c3</th>
                    <th scope=\"col\">$c4</th>
                    <th scope=\"col\">$c5</th>";
                    ?>
                </tr>
            </thead>
            <tbody>
                <?php
                //Rows with header
                for($i = $min; $i <= $max; $i += 5){
                    echo "<tr>
                    <th scope=\"row\">$i</th>
                    <td>".$i * $c1."</td>
                    <td>".$i * $c2."</td>
                    <td>".$i * $c3."</td>
                    <td>".$i * $c4."</td>
                    <td>".$i * $c5."</td>
                    </tr>";
                }
                ?>
            </tbody>
        </table>
    </body>
</html>
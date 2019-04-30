<?php
include('database.php');

$query = "SELECT * from task";
$result = mysqli_query($connection, $query);

if(!$result){
    die("Query Failed".mysqli_error($connecction));
}

$json = array();
while($row = mysqli_fetch_Array($result)){
    $json[] = array(
        'name'=>$row['name'],
        'description'=>$row['description'],
        'id'=>$row['ID']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;
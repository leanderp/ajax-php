<?php

    include ('database.php');

    $id = $_POST['id'];

    $query = "SELECT * FROM task WHERE ID = $id";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query Faild');
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name'=> $row['name'],
            'description'=>$row['description'],
            'id'=>$row['ID']
        );
    }

    $jsonstring =  json_encode($json[0]);
    echo $jsonstring;
<?php

$method = $_SERVER['REQUEST_METHOD'];
require __DIR__ .'/conection.php';

if ($method == 'POST') {
    $jsonData = file_get_contents('php://input');

    $userName = "";
    $userEmail = "";
    $userPassword = "";
    $fromForm = "";
    $userInd;
    $postLable;
    $postText = "";


    $fromForm = json_decode($jsonData)->fromForm;
    if (property_exists(json_decode($jsonData), 'name')) {
        $userName = json_decode($jsonData)->name;
    }
    if (property_exists(json_decode($jsonData), 'email')) {
        $userEmail = json_decode($jsonData)->email;
    }
    if (property_exists(json_decode($jsonData), 'password')) {
        $userPassword = json_decode($jsonData)->password;
    }
    if (property_exists(json_decode($jsonData), 'idUser')) {
        $userInd = json_decode($jsonData)->idUser;
    }
    if (property_exists(json_decode($jsonData), 'postLable')) {
        $postLable = json_decode($jsonData)->postLable;
    }
    if (property_exists(json_decode($jsonData), 'postText')) {
        $postText = json_decode($jsonData)->postText;
    }




    
    //registration user
    function reg($u_name, $u_email, $u_password, $connection) {

        $conn = new mysqli($connection[0], $connection[1], $connection[2], $connection[3]);

        if ($conn->connect_error) {
            die("Connection failed syka: " . $conn->connect_error);
        }

        $sqlRequest ="INSERT INTO `users`(`User`, `Email`, `Password`) VALUES ('$u_name','$u_email','$u_password')";
        $sqlCheck = "SELECT * FROM `users` WHERE `User` = '$u_name'";
        $result = $conn->query($sqlCheck);
        
        if ($result->num_rows == 0) {
            $conn->query($sqlRequest);
            $exist = "yes";
            echo json_encode(["name" => $exist]);
        } else if ($result->num_rows > 0) {
            $exist = "no";
            echo json_encode(["name" => $exist]);
        }
        $conn->close();
    }
    //autorisation user
    function autorisation($u_name, $u_password, $connection) {
    
        $conn = new mysqli($connection[0], $connection[1], $connection[2], $connection[3]);

        if ($conn->connect_error) {
            die("Connection failed syka: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM `users` WHERE `User` = '$u_name'";

        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {

            $data = $result->fetch_assoc();
            $data_password = $data["Password"];
            $access = "";

            if ($data_password === $u_password) {
                $access = "allowed";
                $user_id = $data["UserId"];
                $id = (int)$user_id;
                $sql = "SELECT * FROM `users_posts` WHERE `user_id` = $id";
                $posts = $conn->query($sql)->num_rows;
                echo json_encode(['aut' => $access, 'id_user' => $user_id, 'posts' => $posts]);
            } else {
                $access = "denied";
                echo json_encode(['aut' => $access]);
            }
        }
    }
    //add user post
    function addPost($id_User, $post_Lable, $post_Text, $connection) {

        $conn = new mysqli($connection[0], $connection[1], $connection[2], $connection[3]);

        if ($conn->connect_error) {
            die("Connection failed syka: " . $conn->connect_error);
        }

        $sql = "INSERT INTO `users_posts`(`text_post`, `data`, `user_id`) VALUES ('$post_Text','$post_Lable','$id_User')";
        $conn->query($sql);
    
    }

    if ($fromForm === "reg") {
        reg($userName, $userEmail, $userPassword, $conn_data);
    }
    if ($fromForm === "aut") {
        autorisation($userName, $userPassword, $conn_data);
    }
    if ($fromForm === "add") {
        addPost($userInd, $postLable, $postText, $conn_data);
    }
}
if ($method === 'GET') {

    $user_id = $_GET['user_id'];

    $conn = new mysqli($conn_data[0], $conn_data[1], $conn_data[2], $conn_data[3]);

    $sql = "SELECT * FROM `users_posts` WHERE `user_id` = $user_id";
    $result = $conn->query($sql);
    $posts = array();
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    

    header('Content-Type: application/json');
    echo json_encode(['posts'=> $posts, 'id' => $user_id]);

}
?>
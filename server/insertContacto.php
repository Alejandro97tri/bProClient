<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once './db.php';
$db = new db();
$conexion = $db->conexion();
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: *"); // Allow POST requests
header("Access-Control-Allow-Headers: *"); // Allow the Content-Type header
$datos = json_decode(file_get_contents('php://input'),true);

$consulta = $conexion->prepare('INSERT INTO Contacto (id_ath, id_nut, id_tra, ath_username, nut_username, tra_username) VALUES (?,?,?,?,?,?)');
$resultado = $consulta->execute([
    $datos['id_ath'],
    $datos['id_nut'],
    $datos['id_tra'],
    $datos['ath_username'],
    $datos['nut_username'],
    $datos['tra_username'],
]);

$lista = $consulta->fetchAll();
echo json_encode($lista);
?>
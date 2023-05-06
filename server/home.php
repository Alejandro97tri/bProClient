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

$consultaRol = $conexion->prepare('SELECT Rol FROM User WHERE Username = ?');
$resultado = $consultaRol->execute([
    $datos['username'],
]);

$rolUsuario = $consultaRol->fetchAll();

?>
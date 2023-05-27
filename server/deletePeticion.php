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

$consulta = $conexion->prepare('DELETE FROM Contactos WHERE id_enviado = ? AND id_recibido = ?');
$resultado = $consulta->execute([
    $datos['id_enviado'],
    $datos['id_recibido'],
]);

$lista = $consulta->fetchAll();
echo json_encode($lista);
?>
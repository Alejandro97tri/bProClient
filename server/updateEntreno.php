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

$consulta = $conexion->prepare('UPDATE Actividades SET fecha=?, id_deporte=?, duracion=?, distancia=?, ritmo_medio=?, fc_media=?, descripcion=? WHERE id=?');
$resultado = $consulta->execute([
    $datos['fecha'],
    $datos['id_deporte'],
    $datos['duracion'],
    $datos['distancia'],
    $datos['ritmo_medio'],
    $datos['fc_media'],
    $datos['descripcion'],
    $datos['id'],
]);

$lista = $consulta->fetchAll();
echo json_encode($lista);
?>
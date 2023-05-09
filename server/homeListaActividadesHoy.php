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

$consulta = $conexion->prepare('SELECT * FROM Actividades a INNER JOIN User u ON a.id_user = u.id WHERE a.fecha = CURDATE() AND u.trainer = ?');
$resultado = $consulta->execute([
    $datos['id'],
]);

$lista = $consulta->fetchAll();
echo json_encode($lista);
?>
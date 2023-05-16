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

$consulta = $conexion->prepare('UPDATE User SET fecha_nacimiento=?, genero=?, peso=?,  altura=?, deporte_principal=?, objetivos=?, horario_entrenamiento=?, horario_comidas=? WHERE id=?');
$resultado = $consulta->execute([
    $datos['fecha_nacimiento'],
    $datos['genero'],
    $datos['peso'],
    $datos['altura'],
    $datos['deporte_principal'],
    $datos['objetivos'],
    $datos['horario_entrenamiento'],
    $datos['horario_comidas'],
    $datos['id'],
]);

$lista = $consulta->fetchAll();
echo json_encode($lista);
?>
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
$hash = password_hash($datos['password'], PASSWORD_DEFAULT);

$consulta = $conexion->prepare('SELECT * FROM User WHERE username = ?');
$consulta->execute([
    $datos['username'],
]);


$resultados = $consulta->fetchAll();
if (count($resultados) > 0) {
    echo json_encode(false);
    return;
}

// if($datos['pass'] != $datos['pass2']){
//     echo json_encode(false);
//     return;
// }

// if(!preg_match('/^[a-zA-Z0-9_-]{3,16}$/', $datos['username'])) {
//     echo json_encode(false);
//     return;
// }

// if(!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $datos['email'])) {
//     echo json_encode(false);
//     return;
// }

// if(!preg_match('/\S+/', $datos['pass']) || !preg_match('/\S+/', $datos['pass2'])){
//     echo json_encode(false);
//     return;
// }

$consulta = $conexion->prepare('INSERT INTO `User` (username, `password`, nombre, apellidos, rol, email, fecha_nacimiento, genero, peso, altura ) VALUES (?,?,?,?,?,?,?,?,?,?)');
$resultado = $consulta->execute([
    $datos['username'],
    $hash,
    $datos['nombre'],
    $datos['apellidos'],
    $datos['rol'],
    $datos['email'],
    $datos['fecha_nacimiento'],
    $datos['genero'],
    $datos['peso'],
    $datos['altura'],
]
);

if($resultado) { echo json_encode(true); }
else { echo json_encode(false); }

?>
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../modelos/conexion.php');
require_once('../modelos/rol_usuario.php');

$control    = $_GET['control'];
$rolUsuario = new RolUsuario($conexion);

switch($control){
    case 'consulta':
        $vec = $rolUsuario->consulta();
    break;

    case 'insertar':
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $rolUsuario->insertar($params);
    break;

    case 'editar':
        $json   = file_get_contents('php://input');
        $id     = $_GET['id'];
        $params = json_decode($json);
        $vec    = $rolUsuario->editar($id, $params);
    break;

    case 'eliminar':
        $id  = $_GET['id'];
        $vec = $rolUsuario->eliminar($id);
    break;
}

echo json_encode($vec);
header('Content-Type: application/json');
?>
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../modelos/conexion.php');
require_once('../modelos/inventario.php');

$control    = $_GET['control'];
$inventario = new Inventario($conexion);

switch($control){
    case 'consulta':
        $vec = $inventario->consulta();
    break;

    case 'insertar':
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $inventario->insertar($params);
    break;

    case 'editar':
        $json   = file_get_contents('php://input');
        $id     = $_GET['id'];
        $params = json_decode($json);
        $vec    = $inventario->editar($id, $params);
    break;

    case 'eliminar':
        $id  = $_GET['id'];
        $vec = $inventario->eliminar($id);
    break;
}

echo json_encode($vec);
header('Content-Type: application/json');
?>
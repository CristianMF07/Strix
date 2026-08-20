<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../modelos/conexion.php');
require_once('../modelos/proveedor.php');

$control   = $_GET['control'];
$proveedor = new Proveedor($conexion);

switch($control){
    case 'consulta':
        $vec = $proveedor->consulta();
    break;

    case 'insertar':
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $proveedor->insertar($params);
    break;

    case 'editar':
        $json   = file_get_contents('php://input');
        $id     = $_GET['id'];
        $params = json_decode($json);
        $vec    = $proveedor->editar($id, $params);
    break;

    case 'eliminar':
        $id  = $_GET['id'];
        $vec = $proveedor->eliminar($id);
    break;
}

echo json_encode($vec);
header('Content-Type: application/json');

?>
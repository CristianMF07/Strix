<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../modelos/conexion.php');
require_once('../modelos/estado_cliente.php');

$control       = $_GET['control'];
$estadoCliente = new EstadoCliente($conexion);

switch($control){
    case 'consulta':
        $vec = $estadoCliente->consulta();
    break;

    case 'insertar':
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $estadoCliente->insertar($params);
    break;

    case 'editar':
        $json   = file_get_contents('php://input');
        $id     = $_GET['id'];
        $params = json_decode($json);
        $vec    = $estadoCliente->editar($id, $params);
    break;

    case 'eliminar':
        $id  = $_GET['id'];
        $vec = $estadoCliente->eliminar($id);
    break;
}

echo json_encode($vec);
header('Content-Type: application/json');
?>
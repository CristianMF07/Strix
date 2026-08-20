<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../modelos/conexion.php');
require_once('../modelos/usuarios.php');

$control  = $_GET['control'];
$usuarios = new Usuarios($conexion);

switch($control){
    case 'consulta':
        $vec = $usuarios->consulta();
    break;

    case 'login':
        // Caso especial: Angular manda usuario y clave para autenticar
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $usuarios->login($params->usuario, $params->clave);
    break;

    case 'insertar':
        $json   = file_get_contents('php://input');
        $params = json_decode($json);
        $vec    = $usuarios->insertar($params);
    break;

    case 'editar':
        $json   = file_get_contents('php://input');
        $id     = $_GET['id'];
        $params = json_decode($json);
        $vec    = $usuarios->editar($id, $params);
    break;

    case 'eliminar':
        $id  = $_GET['id'];
        $vec = $usuarios->eliminar($id);
    break;
}

echo json_encode($vec);
header('Content-Type: application/json');
?>
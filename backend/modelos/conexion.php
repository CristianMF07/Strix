<?php
$servidor = "sql109.infinityfree.com";
$usuario = "if0_42926285";
$clave = "U5MJfBp7rZOv2P";
$bd = "if0_42926285_proyectocj";

$conexion = mysqli_connect($servidor, $usuario, $clave) or die('No se conectó a MySQL');

mysqli_select_db($conexion, $bd) or die('No se conectó a la base de datos proyectocj');
mysqli_set_charset($conexion, 'utf8'); //codificacion

?>
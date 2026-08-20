<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "proyecto_cj";

$conexion = mysqli_connect($servidor, $usuario, $clave) or die('No se conectó a MySQL');

mysqli_select_db($conexion, $bd) or die('No se conectó a la base de datos proyecto_cj');
mysqli_set_charset($conexion, 'utf8'); //codificacion

?>

<?php
class Usuarios {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los usuarios ordenados por nombre de usuario
    public function consulta() {
        $sql = "SELECT 
                    usuarios.*,
                    rol_usuario.administrador  AS rol_administrador,
                    rol_usuario.trabajador     AS rol_trabajador,
                    rol_usuario.otros_usuarios AS rol_otros
                FROM usuarios
                INNER JOIN rol_usuario ON usuarios.fo_rol_usuario = rol_usuario.id_rol_usuario
                ORDER BY usuarios.usuario ASC";

        $res = mysqli_query($this->conexion, $sql)
                or die('No se encontró la tabla usuarios o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }   

    // BUSCAR un usuario específico por usuario y clave (para el login)
    public function login($usuario, $clave) {
        $sql = "SELECT * FROM usuarios 
                WHERE usuario = '$usuario' AND clave = '$clave'";
        $res = mysqli_query($this->conexion, $sql) 
               or die('Error en la consulta de login');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un usuario por su id
    public function eliminar($id) {
        $sql = "DELETE FROM usuarios WHERE id_usuarios = $id";
        mysqli_query($this->conexion, $sql) 
        or die('No eliminó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el usuario";
        return $vec;
    }

    // INSERTAR un nuevo usuario
    public function insertar($params) {
        $sql = "INSERT INTO usuarios(usuario, correo, clave, fo_rol_usuario) 
                VALUES('$params->usuario', '$params->correo', 
                       '$params->clave', $params->fo_rol_usuario)";
        mysqli_query($this->conexion, $sql) 
        or die('No insertó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el usuario";
        return $vec;
    }

    // EDITAR un usuario existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE usuarios 
                SET usuario = '$params->usuario', 
                    correo  = '$params->correo', 
                    clave   = '$params->clave', 
                    fo_rol_usuario = $params->fo_rol_usuario 
                WHERE id_usuarios = $id";
        mysqli_query($this->conexion, $sql) 
        or die('No editó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el usuario";
        return $vec;
    }
}
?>
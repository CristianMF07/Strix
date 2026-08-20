<?php
class RolUsuario {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los roles disponibles
    // No necesita INNER JOIN porque no tiene foráneas
    // Esta tabla define los tipos de usuario del sistema
    public function consulta() {
        $sql = "SELECT * FROM rol_usuario ORDER BY id_rol_usuario ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla rol_usuario');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un rol por su id
    public function eliminar($id) {
        $sql = "DELETE FROM rol_usuario WHERE id_rol_usuario = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de rol_usuario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el rol correctamente";
        return $vec;
    }

    // INSERTAR un nuevo rol
    // Los tres campos describen los niveles de acceso del rol
    public function insertar($params) {
        $sql = "INSERT INTO rol_usuario(
                    administrador,
                    trabajador,
                    otros_usuarios
                ) VALUES(
                    '$params->administrador',
                    '$params->trabajador',
                    '$params->otros_usuarios'
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de rol_usuario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el rol correctamente";
        return $vec;
    }

    // EDITAR un rol existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE rol_usuario SET
                    administrador  = '$params->administrador',
                    trabajador     = '$params->trabajador',
                    otros_usuarios = '$params->otros_usuarios'
                WHERE id_rol_usuario = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de rol_usuario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el rol correctamente";
        return $vec;
    }
}
?>
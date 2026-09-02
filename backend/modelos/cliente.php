<?php
class Cliente {

    private $conexion;

    public function __construct(mysqli $conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los clientes con INNER JOIN
    // fo_estado  → trae el nombre del estado del cliente (activo, inactivo, etc.)
    // fo_usuario → trae el nombre del usuario que registró al cliente
    public function consulta() {
        $sql = "SELECT 
                    cliente.*,
                    estado_cliente.estado  AS nombre_estado,
                    usuarios.usuario       AS nombre_usuario_registro
                FROM cliente
                INNER JOIN estado_cliente ON cliente.fo_estado  = estado_cliente.id_estado
                INNER JOIN usuarios       ON cliente.fo_usuario = usuarios.id_usuarios
                ORDER BY cliente.nombre ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla cliente o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un cliente por su id
    public function eliminar($id) {
        $sql = "DELETE FROM cliente WHERE id_cliente = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el cliente correctamente";
        return $vec;
    }

    // INSERTAR un nuevo cliente
    // fecharegisto se guarda con la fecha actual del sistema (NOW())
    public function insertar($params) {
        $sql = "INSERT INTO cliente(
                    nombre,
                    email,
                    direccion,
                    telefono,
                    fecharegisto,
                    fo_estado,
                    fo_usuario
                ) VALUES(
                    '$params->nombre',
                    '$params->email',
                    '$params->direccion',
                    '$params->telefono',
                    NOW(),
                    $params->fo_estado,
                    $params->fo_usuario
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el cliente correctamente";
        return $vec;
    }

    // EDITAR un cliente existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE cliente SET
                    nombre       = '$params->nombre',
                    email        = '$params->email',
                    direccion    = '$params->direccion',
                    telefono     = '$params->telefono',
                    fo_estado    = $params->fo_estado,
                    fo_usuario   = $params->fo_usuario
                WHERE id_cliente = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el cliente correctamente";
        return $vec;
    }
}
?>
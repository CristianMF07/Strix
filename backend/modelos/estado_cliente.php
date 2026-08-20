<?php
class EstadoCliente {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los estados disponibles
    // Esta tabla es simple (solo id y nombre del estado)
    // No necesita INNER JOIN porque no tiene foráneas
    public function consulta() {
        $sql = "SELECT * FROM estado_cliente ORDER BY estado ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla estado_cliente');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un estado por su id
    public function eliminar($id) {
        $sql = "DELETE FROM estado_cliente WHERE id_estado = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de estado_cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el estado correctamente";
        return $vec;
    }

    // INSERTAR un nuevo estado
    public function insertar($params) {
        $sql = "INSERT INTO estado_cliente(estado) 
                VALUES('$params->estado')";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de estado_cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el estado correctamente";
        return $vec;
    }

    // EDITAR un estado existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE estado_cliente SET
                    estado = '$params->estado'
                WHERE id_estado = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de estado_cliente');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el estado correctamente";
        return $vec;
    }
}
?>
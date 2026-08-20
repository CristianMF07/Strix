<?php
class Inventario {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los registros de inventario
    // No necesita INNER JOIN porque no tiene foráneas
    public function consulta() {
        $sql = "SELECT * FROM inventario ORDER BY id_inventario ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla inventario');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un registro de inventario por su id
    public function eliminar($id) {
        $sql = "DELETE FROM inventario WHERE id_inventario = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de inventario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el registro de inventario correctamente";
        return $vec;
    }

    // INSERTAR un nuevo registro de inventario
    public function insertar($params) {
        $sql = "INSERT INTO inventario(
                    stockactual,
                    stockminimo,
                    ultima_actualizacion,
                    registromovimientos
                ) VALUES(
                    '$params->stockactual',
                    '$params->stockminimo',
                    '$params->ultima_actualizacion',
                    '$params->registromovimientos'
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de inventario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el registro de inventario correctamente";
        return $vec;
    }

    // EDITAR un registro de inventario existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE inventario SET
                    stockactual          = '$params->stockactual',
                    stockminimo          = '$params->stockminimo',
                    ultima_actualizacion = '$params->ultima_actualizacion',
                    registromovimientos  = '$params->registromovimientos'
                WHERE id_inventario = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de inventario');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el registro de inventario correctamente";
        return $vec;
    }
}
?>
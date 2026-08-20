<?php
class Proveedor {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los proveedores con INNER JOIN a productos
    // Así en lugar de ver solo el número fo_productos,
    // vemos el nombre real del producto que ofrece ese proveedor
    public function consulta() {
        $sql = "SELECT 
                    proveedor.*,
                    productos.nombre  AS nombre_producto
                FROM proveedor
                INNER JOIN productos ON proveedor.fo_productos = productos.id_productos
                ORDER BY proveedor.nombre_empresa ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla proveedor o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un proveedor por su id
    public function eliminar($id) {
        $sql = "DELETE FROM proveedor WHERE id_proveedor = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de proveedor');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el proveedor correctamente";
        return $vec;
    }

    // INSERTAR un nuevo proveedor
    public function insertar($params) {
        $sql = "INSERT INTO proveedor(
                    nombre_empresa,
                    producto_ofrecido,
                    fo_productos,
                    contacto,
                    condiciones_comerciales
                ) VALUES(
                    '$params->nombre_empresa',
                    '$params->producto_ofrecido',
                    $params->fo_productos,
                    '$params->contacto',
                    '$params->condiciones_comerciales'
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de proveedor');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el proveedor correctamente";
        return $vec;
    }

    // EDITAR un proveedor existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE proveedor SET
                    nombre_empresa          = '$params->nombre_empresa',
                    producto_ofrecido       = '$params->producto_ofrecido',
                    fo_productos            = $params->fo_productos,
                    contacto                = '$params->contacto',
                    condiciones_comerciales = '$params->condiciones_comerciales'
                WHERE id_proveedor = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de proveedor');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el proveedor correctamente";
        return $vec;
    }
}
?>
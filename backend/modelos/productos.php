<?php
class Productos {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los productos con INNER JOIN a inventario
    // Así en lugar de ver solo el número fo_inventario, 
    // vemos el stock real del producto
    public function consulta() {
        $sql = "SELECT 
                    productos.*,
                    inventario.stockActual        AS stock_actual,
                    inventario.stockMinimo        AS stock_minimo,
                    inventario.ultima_actualizacion AS ultima_actualizacion
                FROM productos
                INNER JOIN inventario ON productos.fo_inventario = inventario.id_inventario
                ORDER BY productos.nombre ASC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla productos o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR un producto por su id
    public function eliminar($id) {
        $sql = "DELETE FROM productos WHERE id_productos = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de productos');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el producto correctamente";
        return $vec;
    }

    // INSERTAR un nuevo producto
    public function insertar($params) {
        $sql = "INSERT INTO productos(
                    nombre,
                    tipo,
                    precio,
                    talla,
                    color,
                    fo_inventario
                ) VALUES(
                    '$params->nombre',
                    '$params->tipo',
                    '$params->precio',
                    '$params->talla',
                    '$params->color',
                    $params->fo_inventario
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de productos');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el producto correctamente";
        return $vec;
    }

    // EDITAR un producto existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE productos SET
                    nombre        = '$params->nombre',
                    tipo          = '$params->tipo',
                    precio        = '$params->precio',
                    talla         = '$params->talla',
                    color         = '$params->color',
                    fo_inventario = $params->fo_inventario
                WHERE id_productos = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de productos');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el producto correctamente";
        return $vec;
    }
}
?>
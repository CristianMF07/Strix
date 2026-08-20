<?php
class Compras {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todas las compras con INNER JOIN
    // Traemos el nombre de la empresa proveedora y el nombre 
    // del producto en lugar de solo los IDs numéricos
    public function consulta() {
        $sql = "SELECT 
                    compras.*,
                    proveedor.nombre_empresa  AS nombre_proveedor,
                    productos.nombre          AS nombre_producto
                FROM compras
                INNER JOIN proveedor  ON compras.fo_proveedor  = proveedor.id_proveedor
                INNER JOIN productos  ON compras.fo_productos   = productos.id_productos
                ORDER BY compras.fecha DESC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla compras o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR una compra por su id
    public function eliminar($id) {
        $sql = "DELETE FROM compras WHERE id_compras = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de compras');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó la compra correctamente";
        return $vec;
    }

    // INSERTAR una nueva compra
    public function insertar($params) {
        $sql = "INSERT INTO compras(
                    fecha,
                    fo_proveedor,
                    fo_productos,
                    cantidades,
                    precio_unitario,
                    subtotal,
                    iva,
                    total
                ) VALUES(
                    '$params->fecha',
                    $params->fo_proveedor,
                    $params->fo_productos,
                    '$params->cantidades',
                    '$params->precio_unitario',
                    '$params->subtotal',
                    '$params->iva',
                    '$params->total'
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de compras');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó la compra correctamente";
        return $vec;
    }

    // EDITAR una compra existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE compras SET
                    fecha           = '$params->fecha',
                    fo_proveedor    = $params->fo_proveedor,
                    fo_productos    = $params->fo_productos,
                    cantidades      = '$params->cantidades',
                    precio_unitario = '$params->precio_unitario',
                    subtotal        = '$params->subtotal',
                    iva             = '$params->iva',
                    total           = '$params->total'
                WHERE id_compras = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de compras');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó la compra correctamente";
        return $vec;
    }
}
?>
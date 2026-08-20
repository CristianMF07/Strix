<?php
class Ventas {

    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todas las ventas con INNER JOIN
    // Traemos el nombre del usuario, el nombre del producto 
    // y el nombre del vendedor en lugar de solo los IDs
    public function consulta() {
        $sql = "SELECT 
                    ventas.*,
                    usuarios.usuario        AS nombre_usuario,
                    productos.Nombre        AS nombre_producto,
                    vendedor.vendedor       AS nombre_vendedor
                FROM ventas
                INNER JOIN usuarios  ON ventas.fo_usuario   = usuarios.id_usuarios
                INNER JOIN productos ON ventas.fo_productos  = productos.id_productos
                INNER JOIN vendedor  ON ventas.fo_vendedor   = vendedor.id_vendedor
                ORDER BY ventas.fecha DESC";

        $res = mysqli_query($this->conexion, $sql)
               or die('No se encontró la tabla ventas o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    // ELIMINAR una venta por su id
    public function eliminar($id) {
        $sql = "DELETE FROM ventas WHERE id_ventas = $id";
        mysqli_query($this->conexion, $sql)
        or die('No eliminó el registro de ventas');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó la venta correctamente";
        return $vec;
    }

    // INSERTAR una nueva venta
    // $params es el objeto que llega desde Angular con todos los datos del formulario
    public function insertar($params) {
        $sql = "INSERT INTO ventas(
                    fecha,
                    fo_usuario,
                    fo_productos,
                    cantidad,
                    preciounitario,
                    subtotal,
                    iva,
                    total,
                    fo_vendedor
                ) VALUES(
                    '$params->fecha',
                    $params->fo_usuario,
                    $params->fo_productos,
                    '$params->cantidad',
                    '$params->preciounitario',
                    '$params->subtotal',
                    '$params->iva',
                    '$params->total',
                    $params->fo_vendedor
                )";
        mysqli_query($this->conexion, $sql)
        or die('No insertó el registro de ventas');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó la venta correctamente";
        return $vec;
    }

    // EDITAR una venta existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE ventas SET
                    fecha           = '$params->fecha',
                    fo_usuario      = $params->fo_usuario,
                    fo_productos    = $params->fo_productos,
                    cantidad        = '$params->cantidad',
                    preciounitario  = '$params->preciounitario',
                    subtotal        = '$params->subtotal',
                    iva             = '$params->iva',
                    total           = '$params->total',
                    fo_vendedor     = $params->fo_vendedor
                WHERE id_ventas = $id";
        mysqli_query($this->conexion, $sql)
        or die('No editó el registro de ventas');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó la venta correctamente";
        return $vec;
    }
}
?>
<?php
class Vendedor {
    // Atributo privado que guarda la conexión a la base de datos
    private $conexion;

    // Constructor: recibe la conexión cuando se crea el objeto
    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    // CONSULTAR todos los vendedores ordenados por nombre
    public function consulta() {
        $sql = "SELECT 
                    vendedor.*,
                    rol_usuario.administrador  AS rol_administrador,
                    rol_usuario.trabajador     AS rol_trabajador,
                    rol_usuario.otros_usuarios AS rol_otros
                FROM vendedor
                INNER JOIN rol_usuario ON vendedor.fo_rol_usuario = rol_usuario.id_rol_usuario
                ORDER BY vendedor.vendedor ASC";

        $res = mysqli_query($this->conexion, $sql)
                or die('No se encontró la tabla vendedor o sus relaciones');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }
    

    // ELIMINAR un vendedor por su id
    public function eliminar($id) {
        $sql = "DELETE FROM vendedor WHERE id_vendedor = $id";
        mysqli_query($this->conexion, $sql) 
        or die('No eliminó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se eliminó el vendedor";
        return $vec;
    }

    // INSERTAR un nuevo vendedor
    public function insertar($params) {
        $sql = "INSERT INTO vendedor(vendedor, fo_rol_usuario) 
                VALUES('$params->vendedor', $params->fo_rol_usuario)";
        mysqli_query($this->conexion, $sql) 
        or die('No insertó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se insertó el vendedor";
        return $vec;
    }

    // EDITAR un vendedor existente por su id
    public function editar($id, $params) {
        $sql = "UPDATE vendedor 
                SET vendedor = '$params->vendedor', 
                    fo_rol_usuario = $params->fo_rol_usuario 
                WHERE id_vendedor = $id";
        mysqli_query($this->conexion, $sql) 
        or die('No editó el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje']   = "Se editó el vendedor";
        return $vec;
    }
    
}
?>
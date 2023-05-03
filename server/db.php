<?php
class db
{
  const HOST = "db5012894154.hosting-data.io";
  const DBNAME = "dbs10828636";
  const USER = "dbu5419270";
  const PASSWORD = "Romera44998-"; // Evidentemente adapta los valores

  static public function conexion()
  {
    $conexion = null;
    try {
      $opciones =  [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_CASE    => PDO::CASE_LOWER
      ];
      $conexion = new PDO('mysql:host='.self::HOST.';  dbname=' . self::DBNAME, self::USER, self::PASSWORD, $opciones);
    } catch (Exception $e) {
      echo "Ocurrió algo con la base de datos: " . $e->getMessage();
    }
    return $conexion; //Es un objeto de conexion PDO
  }

  static public function desconexion()
  {
    $conexion = null;
    return $conexion; //Es un objeto de conexion PDO
  }
}
?>
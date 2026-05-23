<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Acceso no permitido");
}

// Datos del formulario
$nombre = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$telefono = htmlspecialchars($_POST["phone"]);
$servicio = htmlspecialchars($_POST["service"]);
$mensaje = htmlspecialchars($_POST["message"]);

$mail = new PHPMailer(true);

try {
    // CONFIGURACIÓN DEL SERVIDOR GMAIL
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // 🔐 TU CUENTA GMAIL
    $mail->Username = 'samuelelvir74@gmail.com';
    $mail->Password = 'gvqz bycy gihg touy'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // REMITENTE Y DESTINATARIO
    $mail->setFrom('samuelelvir74@gmail.com', 'Mj6Montajes');
    $mail->addAddress('samuelelvir18@gmail.com'); 

    // RESPONDER AL CLIENTE
    $mail->addReplyTo($email, $nombre);

    // CONTENIDO
    $mail->isHTML(false);
    $mail->Subject = "Nuevo mensaje desde la web";

    $mail->Body =
"NUEVO CONTACTO WEB

Nombre: $nombre
Email: $email
Teléfono: $telefono
Servicio: $servicio

Mensaje:
$mensaje
";

    $mail->send();
    echo "Mensaje enviado correctamente";

} catch (Exception $e) {
    echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
}
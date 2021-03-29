<?php

$email   = $_POST['email'];
$name    = $_POST['name'];
$message = $_POST['message'];

$subject = "=?utf-8?B?".base64_encode("Сообщение с сайта")."?=";
$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
$address = "roman.semenikhin@inbox.ru";

$success = mail($address, $subject, nl2br($message), $headers);

echo $success;

?>
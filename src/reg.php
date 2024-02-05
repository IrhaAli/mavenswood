<?php
$email = $_POST['email'];
$password = $_POST['pass'];
$user_login = $_POST['user'];
$authKey = 'abc123'

$url = 'https://ns1.youngtalentz.com/?rest_route=/simple-jwt-login/v1/users&email=' . $email . '&user_login=' . $user_login . '&password=' . $password . '&authkey=' . $authKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec($ch);
curl_close ($ch);

$server_output_decode = json_decode($server_output);

if (isset($server_output_decode->success) && $server_output_decode->success == 0){
  echo $server_output;
}
else {
  $authenticationUrl = 'https://ns1.youngtalentz.com/?rest_route=/simple-jwt-login/v1/auth&email=' . $email . '&password=' . $password
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $server_output = curl_exec($ch);
  curl_close ($ch);
  echo $server_output;
}

?>
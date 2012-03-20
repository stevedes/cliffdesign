<?php

function remove_headers($string) { 
  $headers = array(
    "/to\:/i",
    "/from\:/i",
    "/bcc\:/i",
    "/cc\:/i",
    "/Content\-Transfer\-Encoding\:/i",
    "/Content\-Type\:/i",
    "/Mime\-Version\:/i" 
  ); 
  $string = preg_replace($headers, '', $string);
  return strip_tags($string);
} 

// post vars
$name = remove_headers($_POST['name']);
$email = remove_headers($_POST['email']);
$message = remove_headers($_POST['message']);

if ($name && $email && $message) {

	// valid email
	if(filter_var($email, FILTER_VALIDATE_EMAIL)) {


		$to = 'david@cliffdesign.co.uk';
		//$to = 'steve@designition.co.uk';
		$subject = "Website message";
		$body = "$name said: $message";
		$headers = "From: $email";

		// Send the mail using PHPs mail() function
		if (mail($to, $subject, $body, $headers)) {

			echo 'done';
		}

	}
	else {
	}

}

?>
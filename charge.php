<?php
require_once('./stripe-php-1.7.1/lib/Stripe.php');

Stripe::setApiKey("JTeqqyrUnqR0lEj8RmKFavE0JGg9x1Fs");

// get the credit card details submitted by the form
$token = $_POST['token'];

// create a Customer
$customer = Stripe_Customer::create(array(
  "card" => $token,
  "description" => "yuliinfo@gmail.com")
);

// charge the Customer instead of the card
Stripe_Charge::create(array(
  "amount" => 1000, # amount in cents, again
  "currency" => "usd",
  "customer" => $customer->id)
);

?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<title></title>
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body>
	<p>Done!</p>
</body>
</html>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Configuration
$store_url = "https://admin.bikanerlaser.com";
$consumer_key = "ck_d66a5e7159d90a89d7824872bb1fb5ec8b8c80c9";
$consumer_secret = "cs_b8a5f68213197c0e911e62a80a96849ec98ddb88";

$category = isset($_GET['category']) ? $_GET['category'] : null;
$per_page = isset($_GET['per_page']) ? $_GET['per_page'] : '100';
$product_id = isset($_GET['id']) ? $_GET['id'] : null;
$media_id = isset($_GET['media_id']) ? $_GET['media_id'] : null;

if ($media_id) {
    $url = rtrim($store_url, '/') . "/wp-json/wp/v2/media/$media_id";
} elseif ($product_id) {
    $url = rtrim($store_url, '/') . "/wp-json/wc/v3/products/$product_id?consumer_key=$consumer_key&consumer_secret=$consumer_secret";
} else {
    $category_id = $category ? $category : '17';
    $url = rtrim($store_url, '/') . "/wp-json/wc/v3/products?category=$category_id&per_page=$per_page&consumer_key=$consumer_key&consumer_secret=$consumer_secret&_embed";
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    echo json_encode(["error" => "CURL Error: " . $curl_error]);
} else {
    http_response_code($http_code);
    echo $response;
}
?>

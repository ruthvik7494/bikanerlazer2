<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// CONFIGURATION - Replace with your actual WooCommerce details
$store_url = "https://admin.bikanerlaser.com"; // Your WordPress URL
$consumer_key = "ck_d66a5e7159d90a89d7824872bb1fb5ec8b8c80c9"; 
$consumer_secret = "cs_b8a5f68213197c0e911e62a80a96849ec98ddb88"; 


// Get the posted data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Debug logging
file_put_contents('debug.log', "[" . date('Y-m-d H:i:s') . "] Data received: " . $json . "\n", FILE_APPEND);

if (!$data) {
    echo json_encode(["error" => "No data provided"]);
    exit;
}

// Prepare WooCommerce Order Data
$order_data = [
    'payment_method' => 'razorpay',
    'payment_method_title' => 'Razorpay Payment',
    'status' => 'processing', // Explicitly set status to processing
    'set_paid' => true,
    'billing' => [
        'first_name' => $data['name'],
        'email' => $data['email'],
        'phone' => $data['phone'],
        'address_1' => $data['address'],
        'city' => $data['city'],
        'state' => $data['state'],
        'postcode' => $data['pincode'],
        'country' => 'IN'
    ],
    'line_items' => [
        [
            'product_id' => 86, // Linked to your "laser Job work" product
            'quantity' => 1,
            'total' => (string)$data['amount']
        ]
    ],
    'customer_note' => "SERVICE ORDERED: " . $data['product_title'] . "\nTransaction ID: " . $data['payment_id'] . "\nAlt Phone: " . $data['alt_phone']
];

// Call WooCommerce REST API
$url = rtrim($store_url, '/') . '/wp-json/wc/v3/orders';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order_data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bypass SSL for testing
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($consumer_key . ':' . $consumer_secret)
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Log response for debugging
file_put_contents('debug.log', "[" . date('Y-m-d H:i:s') . "] Response Code: $http_code | Error: $curl_error | Response: $response\n", FILE_APPEND);

if ($http_code == 201) {
    echo json_encode(["success" => true, "message" => "Order created and email triggered"]);
} else {
    echo json_encode([
        "error" => "WooCommerce API Error", 
        "http_code" => $http_code,
        "details" => json_decode($response, true),
        "curl_error" => $curl_error
    ]);
}
?>

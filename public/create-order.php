<?php
/**
 * Razorpay Order Creation Script (PHP)
 * Place this in your Hostinger public_html folder
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// --- CONFIGURATION ---
// Replace these with your actual Razorpay Keys
$key_id = 'rzp_test_ShGAH4bFKjd1as'; 
$key_secret = '5a4Foo4HmnCGzdnHGLTcCYlj';
// ---------------------

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['amount']) || empty($data['amount'])) {
    echo json_encode(['error' => 'Amount is required']);
    exit;
}

// Convert amount to paise (Razorpay expects amount in smallest currency unit)
// We use round() to avoid floating point issues
$amountInPaise = round(floatval($data['amount']) * 100);

$orderData = [
    'receipt'         => 'rcpt_' . time(),
    'amount'          => $amountInPaise,
    'currency'        => 'INR',
    'payment_capture' => 1 // Auto-capture payment
];

// Initialize cURL to call Razorpay API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ':' . $key_secret);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'cURL Error: ' . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>

<?php
require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    handleError('Method not allowed', 405);
}

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    handleError('All fields are required', 400);
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    handleError('Invalid email format', 400);
}

// Sanitize inputs
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

try {
    $pdo = getDbConnection();
    
    // Insert contact message into database
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, subject, message, created_at) 
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$name, $email, $subject, $message]);
    
    // Send email notification (optional)
    $to = 'm3gahand@gmail.com';
    $email_subject = "New Contact Message: " . $subject;
    $email_body = "
        New contact message from website:
        
        Name: $name
        Email: $email
        Subject: $subject
        Message: $message
        
        Sent at: " . date('Y-m-d H:i:s');
    
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email (make sure your hosting supports mail() function)
    if (function_exists('mail')) {
        mail($to, $email_subject, $email_body, $headers);
    }
    
    sendResponse(['success' => true, 'message' => 'Message sent successfully']);
    
} catch (PDOException $e) {
    error_log("Error saving contact message: " . $e->getMessage());
    handleError("Failed to send message");
}
?>
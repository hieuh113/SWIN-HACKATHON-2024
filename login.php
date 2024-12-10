<?php
session_start(); // Start the session

// Database connection details
$servername = "localhost";
$username = "root";  
$password = "";  
$dbname = "fitness_dashboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare and execute SQL query to check credentials
$sql = "SELECT * FROM users WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Successful login
    $user = $result->fetch_assoc(); // Fetch user data
    $_SESSION['username'] = $user['username']; // Store username in session
    header("Location: home2.php"); // Redirect to home2.php
    exit();
} else {
    // Invalid login
    echo "Invalid email or password. Please try again.";
}

// Close the connection
$conn->close();
?>

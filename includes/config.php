
<?php
/* 
 * Database Configuration
 */
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'thefoodlog');

/* 
 * Admin Credentials
 * In a production environment, these would not be stored here
 */
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'password123');

/* 
 * Site Settings
 */
define('SITE_NAME', 'TheFoodLog');
define('SITE_URL', 'http://localhost/thefoodlog/');
define('UPLOAD_DIR', 'uploads/');

/* 
 * Initialize Database Connection
 */
function getDbConnection() {
  static $conn;
  
  if ($conn === null) {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if (!$conn) {
      die("Database connection failed: " . mysqli_connect_error());
    }
    
    mysqli_set_charset($conn, "utf8mb4");
  }
  
  return $conn;
}

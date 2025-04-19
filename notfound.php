
<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found - TheFoodLog</title>
    <meta name="description" content="The page you are looking for could not be found" />
    <meta name="author" content="Lovable" />
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  </head>

  <body>
    <div class="page-container">
      <?php include 'includes/navbar.php'; ?>
      
      <main class="main-content not-found-page">
        <div class="not-found-container text-center">
          <h1 class="not-found-title">404</h1>
          <h2>Page Not Found</h2>
          <p class="text-muted">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="not-found-actions">
            <a href="index.php" class="btn btn-primary">Return Home</a>
            <a href="javascript:history.back()" class="btn btn-outline">Go Back</a>
          </div>
        </div>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

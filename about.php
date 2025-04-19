
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
    <title>About - TheFoodLog</title>
    <meta name="description" content="Learn more about TheFoodLog and our mission to inspire home cooks" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="About - TheFoodLog" />
    <meta property="og:description" content="Learn more about TheFoodLog and our mission to inspire home cooks" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    
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
      
      <main class="main-content about-page">
        <div class="about-header">
          <h1 class="page-title">About <span class="text-spice">The</span><span class="text-herb">FoodLog</span></h1>
        </div>
        
        <div class="about-content">
          <p class="about-intro">
            Welcome to TheFoodLog, a place where culinary creativity meets technology. Our mission is to inspire home cooks of all skill levels to explore new flavors, techniques, and cuisines.
          </p>
          
          <section class="about-section">
            <h2>Our Story</h2>
            <p>
              TheFoodLog began as a small collection of family recipes that we wanted to preserve and share. Over time, it evolved into a comprehensive recipe platform with a passionate community of food lovers.
            </p>
            <p>
              We believe that good food brings people together, creates memories, and enriches lives. Our team of experienced cooks, food photographers, and writers work together to bring you recipes that are both delicious and achievable in your home kitchen.
            </p>
          </section>
          
          <section class="about-section">
            <h2>Our Recipes</h2>
            <p>
              Every recipe on TheFoodLog is carefully tested multiple times to ensure success in your kitchen. We focus on:
            </p>
            <ul>
              <li>Clear, step-by-step instructions</li>
              <li>Practical techniques for home cooks</li>
              <li>Accessible ingredients with suggested substitutions</li>
              <li>Beautiful photography that accurately represents the finished dish</li>
              <li>Honest preparation times and difficulty ratings</li>
            </ul>
          </section>
          
          <section class="about-section">
            <h2>Join Our Community</h2>
            <p>
              We invite you to be part of our growing community by:
            </p>
            <ul>
              <li>Leaving comments on recipes you've tried</li>
              <li>Sharing your own photos of dishes you've made</li>
              <li>Following us on social media for daily inspiration</li>
              <li>Signing up for our newsletter for seasonal recipes and cooking tips</li>
            </ul>
          </section>
          
          <section class="about-section">
            <h2>Contact Us</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:hello@thefoodlog.com">hello@thefoodlog.com</a>.
            </p>
            <p>
              Thank you for visiting TheFoodLog. Happy cooking!
            </p>
          </section>
        </div>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

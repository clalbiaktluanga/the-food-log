
<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  $categories = getAllCategories();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recipe Categories - TheFoodLog</title>
    <meta name="description" content="Browse recipe categories to find the perfect dish for any occasion" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="Recipe Categories - TheFoodLog" />
    <meta property="og:description" content="Browse recipe categories to find the perfect dish for any occasion" />
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
      
      <main class="main-content categories-page">
        <div class="categories-header text-center">
          <h1 class="page-title">Recipe Categories</h1>
          <p class="text-muted">
            Browse our recipes by category to find exactly what you're looking for, from quick breakfasts to elaborate dinners.
          </p>
        </div>
        
        <div class="categories-grid">
          <?php foreach($categories as $category): ?>
            <?php 
              $categoryImage = getCategoryImage($category);
              $categoryCount = getCategoryRecipeCount($category);
            ?>
            <a href="index.php?category=<?php echo $category; ?>" class="category-card">
              <div class="category-card-image">
                <img src="<?php echo $categoryImage; ?>" alt="<?php echo $category; ?>">
                <div class="category-card-overlay">
                  <h3 class="category-card-title"><?php echo $category; ?></h3>
                  <p class="category-card-count"><?php echo $categoryCount; ?> recipes</p>
                </div>
              </div>
            </a>
          <?php endforeach; ?>
        </div>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

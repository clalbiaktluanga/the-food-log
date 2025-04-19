
<?php
  // Start the session for managing user state
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  // Get latest recipes for homepage
  $featuredRecipe = getFeaturedRecipe();
  $categories = getAllCategories();
  $activeCategory = isset($_GET['category']) ? $_GET['category'] : 'All';
  $recipes = getRecipesByCategory($activeCategory);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TheFoodLog</title>
    <meta name="description" content="Discover delicious recipes and cooking inspiration" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="TheFoodLog" />
    <meta property="og:description" content="Discover delicious recipes and cooking inspiration" />
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
      
      <main class="main-content">
        <section class="welcome-section">
          <h1 class="page-title">Welcome to <span class="text-spice">The</span><span class="text-herb">FoodLog</span></h1>
          <p class="text-muted text-center">
            Discover delicious recipes and cooking inspiration for every meal and occasion.
          </p>
          
          <div class="featured-recipe-container">
            <h2 class="section-title">Featured Recipe</h2>
            <div class="featured-recipe">
              <div class="featured-recipe-image">
                <img src="<?php echo $featuredRecipe['image']; ?>" alt="<?php echo $featuredRecipe['title']; ?>">
              </div>
              <div class="featured-recipe-content">
                <h3 class="featured-recipe-title"><?php echo $featuredRecipe['title']; ?></h3>
                <div class="recipe-meta">
                  <span class="recipe-time"><?php echo $featuredRecipe['cookTime']; ?> mins</span>
                  <span class="recipe-difficulty"><?php echo $featuredRecipe['difficulty']; ?></span>
                </div>
                <p class="recipe-description"><?php echo substr($featuredRecipe['description'], 0, 150); ?>...</p>
                <div class="recipe-tags">
                  <?php foreach($featuredRecipe['tags'] as $tag): ?>
                    <span class="recipe-tag"><?php echo $tag; ?></span>
                  <?php endforeach; ?>
                </div>
                <a href="recipe.php?id=<?php echo $featuredRecipe['id']; ?>" class="btn btn-primary">View Recipe</a>
              </div>
            </div>
          </div>
        </section>
        
        <section class="recipes-section">
          <div class="section-header">
            <h2 class="section-title">Latest Recipes</h2>
          </div>
          
          <div class="category-filter">
            <ul class="category-list">
              <li class="category-item <?php echo $activeCategory == 'All' ? 'active' : ''; ?>">
                <a href="index.php">All</a>
              </li>
              <?php foreach($categories as $category): ?>
                <li class="category-item <?php echo $activeCategory == $category ? 'active' : ''; ?>">
                  <a href="index.php?category=<?php echo $category; ?>"><?php echo $category; ?></a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
          
          <div class="recipes-grid">
            <?php if(count($recipes) > 0): ?>
              <?php foreach($recipes as $recipe): ?>
                <div class="recipe-card">
                  <a href="recipe.php?id=<?php echo $recipe['id']; ?>">
                    <div class="recipe-card-image">
                      <img src="<?php echo $recipe['image']; ?>" alt="<?php echo $recipe['title']; ?>">
                    </div>
                    <div class="recipe-card-content">
                      <h3 class="recipe-card-title"><?php echo $recipe['title']; ?></h3>
                      <div class="recipe-card-meta">
                        <span class="recipe-time"><?php echo $recipe['cookTime']; ?> mins</span>
                        <span class="recipe-difficulty"><?php echo $recipe['difficulty']; ?></span>
                      </div>
                      <p class="recipe-card-description"><?php echo substr($recipe['description'], 0, 100); ?>...</p>
                    </div>
                  </a>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <div class="no-recipes">
                <p>No recipes found in this category.</p>
              </div>
            <?php endif; ?>
          </div>
        </section>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

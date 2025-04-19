
<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  $query = isset($_GET['q']) ? $_GET['q'] : '';
  $results = [];
  
  if (!empty($query)) {
    $results = searchRecipes($query);
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Search Results: <?php echo htmlspecialchars($query); ?> - TheFoodLog</title>
    <meta name="description" content="Search results for <?php echo htmlspecialchars($query); ?> on TheFoodLog" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="Search Results: <?php echo htmlspecialchars($query); ?> - TheFoodLog" />
    <meta property="og:description" content="Search results for recipes on TheFoodLog" />
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
      
      <main class="main-content search-page">
        <div class="search-header">
          <div class="back-button">
            <a href="javascript:history.back()" class="btn btn-outline btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </a>
          </div>
          
          <div class="search-results-info text-center">
            <h1 class="page-title">Search Results: "<?php echo htmlspecialchars($query); ?>"</h1>
            <p class="text-muted">
              Found <?php echo count($results); ?> recipe<?php echo count($results) !== 1 ? 's' : ''; ?>
            </p>
          </div>
        </div>
        
        <?php if(count($results) > 0): ?>
          <div class="recipes-grid">
            <?php foreach($results as $recipe): ?>
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
          </div>
        <?php else: ?>
          <div class="no-results text-center">
            <div class="no-results-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </div>
            <h2>No Results Found</h2>
            <p class="text-muted">
              We couldn't find any recipes matching "<?php echo htmlspecialchars($query); ?>".
            </p>
            <a href="index.php" class="btn btn-primary">Return to Home</a>
          </div>
        <?php endif; ?>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

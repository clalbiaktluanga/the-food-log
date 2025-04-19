
<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  // Get recipe ID from URL
  $recipeId = isset($_GET['id']) ? $_GET['id'] : null;
  
  if (!$recipeId) {
    // Redirect to homepage if no ID provided
    header('Location: index.php');
    exit;
  }
  
  // Get recipe details
  $recipe = getRecipeById($recipeId);
  
  if (!$recipe) {
    // Recipe not found
    header('Location: notfound.php');
    exit;
  }
  
  // Handle comment submission
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_comment'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];
    $rating = $_POST['rating'];
    
    // Handle image upload if present
    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
      $uploadDir = 'uploads/comments/';
      $fileName = time() . '_' . basename($_FILES['image']['name']);
      $uploadFile = $uploadDir . $fileName;
      
      if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        $imagePath = $uploadFile;
      }
    }
    
    addComment($recipeId, $name, $email, $comment, $rating, $imagePath);
    
    // Redirect to prevent form resubmission
    header('Location: recipe.php?id=' . $recipeId . '&comment_added=1');
    exit;
  }
  
  // Get comments for this recipe
  $comments = getCommentsByRecipeId($recipeId);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $recipe['title']; ?> - TheFoodLog</title>
    <meta name="description" content="<?php echo substr($recipe['description'], 0, 160); ?>" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="<?php echo $recipe['title']; ?> - TheFoodLog" />
    <meta property="og:description" content="<?php echo substr($recipe['description'], 0, 160); ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="<?php echo $recipe['image']; ?>" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="<?php echo $recipe['image']; ?>" />
    
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
      
      <main class="main-content recipe-detail">
        <div class="recipe-header">
          <div class="breadcrumbs">
            <a href="index.php">Home</a> &gt; 
            <a href="categories.php">Categories</a> &gt; 
            <a href="index.php?category=<?php echo $recipe['category']; ?>"><?php echo $recipe['category']; ?></a> &gt; 
            <span><?php echo $recipe['title']; ?></span>
          </div>
          
          <h1 class="recipe-title"><?php echo $recipe['title']; ?></h1>
          
          <div class="recipe-meta">
            <div class="recipe-author">
              <span>By <?php echo $recipe['author']; ?></span>
            </div>
            <div class="recipe-date">
              <span>Published on <?php echo date('F j, Y', strtotime($recipe['publishDate'])); ?></span>
            </div>
          </div>
        </div>
        
        <div class="recipe-content">
          <div class="recipe-image">
            <img src="<?php echo $recipe['image']; ?>" alt="<?php echo $recipe['title']; ?>">
          </div>
          
          <div class="recipe-stats">
            <div class="recipe-stat">
              <span class="stat-label">Prep Time</span>
              <span class="stat-value"><?php echo $recipe['prepTime']; ?> mins</span>
            </div>
            <div class="recipe-stat">
              <span class="stat-label">Cook Time</span>
              <span class="stat-value"><?php echo $recipe['cookTime']; ?> mins</span>
            </div>
            <div class="recipe-stat">
              <span class="stat-label">Servings</span>
              <span class="stat-value"><?php echo $recipe['servings']; ?></span>
            </div>
            <div class="recipe-stat">
              <span class="stat-label">Difficulty</span>
              <span class="stat-value"><?php echo $recipe['difficulty']; ?></span>
            </div>
          </div>
          
          <div class="recipe-description">
            <p><?php echo $recipe['description']; ?></p>
          </div>
          
          <div class="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              <?php foreach($recipe['ingredients'] as $ingredient): ?>
                <li><?php echo $ingredient; ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
          
          <div class="recipe-instructions">
            <h2>Instructions</h2>
            <ol>
              <?php foreach($recipe['instructions'] as $instruction): ?>
                <li><?php echo $instruction; ?></li>
              <?php endforeach; ?>
            </ol>
          </div>
          
          <div class="recipe-tags">
            <?php foreach($recipe['tags'] as $tag): ?>
              <span class="recipe-tag"><?php echo $tag; ?></span>
            <?php endforeach; ?>
          </div>
        </div>
        
        <div class="comments-section">
          <h2>Comments (<?php echo count($comments); ?>)</h2>
          
          <?php if(isset($_GET['comment_added']) && $_GET['comment_added'] == 1): ?>
            <div class="alert alert-success">
              Your comment has been added successfully!
            </div>
          <?php endif; ?>
          
          <div class="comment-form">
            <h3>Leave a Comment</h3>
            <form action="recipe.php?id=<?php echo $recipeId; ?>" method="post" enctype="multipart/form-data">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              
              <div class="form-group">
                <label for="rating">Rating</label>
                <div class="rating-select">
                  <input type="radio" id="star5" name="rating" value="5" required>
                  <label for="star5">5 stars</label>
                  <input type="radio" id="star4" name="rating" value="4">
                  <label for="star4">4 stars</label>
                  <input type="radio" id="star3" name="rating" value="3">
                  <label for="star3">3 stars</label>
                  <input type="radio" id="star2" name="rating" value="2">
                  <label for="star2">2 stars</label>
                  <input type="radio" id="star1" name="rating" value="1">
                  <label for="star1">1 star</label>
                </div>
              </div>
              
              <div class="form-group">
                <label for="comment">Your Comment</label>
                <textarea id="comment" name="comment" rows="4" required></textarea>
              </div>
              
              <div class="form-group">
                <label for="image">Add Image (optional)</label>
                <input type="file" id="image" name="image" accept="image/*">
              </div>
              
              <button type="submit" name="submit_comment" class="btn btn-primary">Submit Comment</button>
            </form>
          </div>
          
          <div class="comments-list">
            <?php if(count($comments) > 0): ?>
              <?php foreach($comments as $comment): ?>
                <div class="comment">
                  <div class="comment-header">
                    <div class="comment-author">
                      <h4><?php echo $comment['name']; ?></h4>
                    </div>
                    <div class="comment-rating">
                      <?php for($i = 1; $i <= 5; $i++): ?>
                        <span class="star <?php echo $i <= $comment['rating'] ? 'filled' : ''; ?>">★</span>
                      <?php endfor; ?>
                    </div>
                    <div class="comment-date">
                      <span><?php echo date('F j, Y', strtotime($comment['date'])); ?></span>
                    </div>
                  </div>
                  
                  <div class="comment-content">
                    <p><?php echo $comment['comment']; ?></p>
                    <?php if($comment['image']): ?>
                      <div class="comment-image">
                        <img src="<?php echo $comment['image']; ?>" alt="Comment image">
                      </div>
                    <?php endif; ?>
                  </div>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <div class="no-comments">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            <?php endif; ?>
          </div>
        </div>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

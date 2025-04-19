
<?php
  session_start();
  include 'includes/config.php';
  include 'includes/functions.php';
  
  // Check if user is logged in
  $isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
  
  // Handle login form submission
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Check credentials (in a real app, this would use password_verify)
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
      $_SESSION['admin_logged_in'] = true;
      $_SESSION['admin_username'] = $username;
      
      // Redirect to prevent form resubmission
      header('Location: admin.php');
      exit;
    } else {
      $loginError = "Invalid username or password";
    }
  }
  
  // Handle new recipe submission
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_recipe']) && $isLoggedIn) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $prepTime = $_POST['prep_time'];
    $cookTime = $_POST['cook_time'];
    $servings = $_POST['servings'];
    $difficulty = $_POST['difficulty'];
    $ingredients = explode("\n", $_POST['ingredients']);
    $instructions = explode("\n", $_POST['instructions']);
    $tags = explode(",", $_POST['tags']);
    
    // Handle image upload
    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
      $uploadDir = 'uploads/recipes/';
      $fileName = time() . '_' . basename($_FILES['image']['name']);
      $uploadFile = $uploadDir . $fileName;
      
      if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        $imagePath = $uploadFile;
      }
    }
    
    // Add recipe to database
    $recipeId = addRecipe($title, $description, $category, $prepTime, $cookTime, $servings, $difficulty, $ingredients, $instructions, $tags, $imagePath);
    
    if ($recipeId) {
      $success = "Recipe added successfully!";
    } else {
      $error = "There was an error adding the recipe. Please try again.";
    }
  }
  
  // Get all categories for the form
  $categories = getAllCategories();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin - TheFoodLog</title>
    <meta name="description" content="Admin panel for TheFoodLog" />
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
      
      <main class="main-content admin-page">
        <div class="admin-header">
          <h1 class="page-title">
            <?php echo $isLoggedIn ? 'Admin Dashboard' : 'Admin Login'; ?>
          </h1>
        </div>
        
        <?php if ($isLoggedIn): ?>
          <div class="admin-dashboard">
            <div class="admin-welcome bg-muted">
              <h2>Welcome, Admin!</h2>
              <p class="text-muted">
                From here, you can add new recipes to the TheFoodLog database. 
                Make sure to fill in all the required information and upload a high-quality image.
              </p>
            </div>
            
            <?php if (isset($success)): ?>
              <div class="alert alert-success">
                <?php echo $success; ?>
              </div>
            <?php endif; ?>
            
            <?php if (isset($error)): ?>
              <div class="alert alert-error">
                <?php echo $error; ?>
              </div>
            <?php endif; ?>
            
            <div class="add-recipe-form">
              <h2>Add New Recipe</h2>
              
              <form action="admin.php" method="post" enctype="multipart/form-data">
                <div class="form-row">
                  <div class="form-group">
                    <label for="title">Recipe Title</label>
                    <input type="text" id="title" name="title" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category" required>
                      <?php foreach($categories as $category): ?>
                        <option value="<?php echo $category; ?>"><?php echo $category; ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea id="description" name="description" rows="3" required></textarea>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="prep_time">Prep Time (minutes)</label>
                    <input type="number" id="prep_time" name="prep_time" min="0" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="cook_time">Cook Time (minutes)</label>
                    <input type="number" id="cook_time" name="cook_time" min="0" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="servings">Servings</label>
                    <input type="number" id="servings" name="servings" min="1" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="difficulty">Difficulty</label>
                  <select id="difficulty" name="difficulty" required>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="ingredients">Ingredients (one per line)</label>
                  <textarea id="ingredients" name="ingredients" rows="6" required></textarea>
                </div>
                
                <div class="form-group">
                  <label for="instructions">Instructions (one step per line)</label>
                  <textarea id="instructions" name="instructions" rows="6" required></textarea>
                </div>
                
                <div class="form-group">
                  <label for="tags">Tags (comma separated)</label>
                  <input type="text" id="tags" name="tags" required>
                </div>
                
                <div class="form-group">
                  <label for="image">Recipe Image</label>
                  <input type="file" id="image" name="image" accept="image/*" required>
                  <small class="form-hint">Upload a high-quality image that represents the finished dish</small>
                </div>
                
                <button type="submit" name="add_recipe" class="btn btn-primary">Add Recipe</button>
              </form>
            </div>
          </div>
          
        <?php else: ?>
          <div class="admin-login">
            <?php if (isset($loginError)): ?>
              <div class="alert alert-error">
                <?php echo $loginError; ?>
              </div>
            <?php endif; ?>
            
            <form action="admin.php" method="post" class="login-form">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
              </div>
              
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
              </div>
              
              <button type="submit" name="admin_login" class="btn btn-primary">Login</button>
            </form>
          </div>
        <?php endif; ?>
      </main>
      
      <?php include 'includes/footer.php'; ?>
    </div>

    <script src="js/main.js"></script>
  </body>
</html>

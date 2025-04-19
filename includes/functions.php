
<?php
/**
 * Database functions for TheFoodLog
 */

/**
 * Get all recipes
 */
function getAllRecipes() {
  $conn = getDbConnection();
  $recipes = [];
  
  $query = "SELECT * FROM recipes ORDER BY publish_date DESC";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $recipe = formatRecipeData($row);
      $recipes[] = $recipe;
    }
  }
  
  return $recipes;
}

/**
 * Get a featured recipe (currently just returns the first recent recipe)
 */
function getFeaturedRecipe() {
  $conn = getDbConnection();
  
  $query = "SELECT * FROM recipes ORDER BY publish_date DESC LIMIT 1";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    return formatRecipeData($row);
  }
  
  // If no recipes found, return a dummy recipe
  return [
    'id' => 1,
    'title' => 'Delicious Pasta Carbonara',
    'description' => 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
    'image' => 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    'prepTime' => 15,
    'cookTime' => 20,
    'servings' => 4,
    'difficulty' => 'Medium',
    'category' => 'Pasta',
    'author' => 'Chef John',
    'publishDate' => date('Y-m-d H:i:s', strtotime('-2 days')),
    'ingredients' => [
      '400g spaghetti',
      '200g pancetta or guanciale, diced',
      '4 large eggs',
      '100g Pecorino Romano, grated',
      '50g Parmigiano Reggiano, grated',
      'Freshly ground black pepper',
      'Salt to taste'
    ],
    'instructions' => [
      'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
      'While pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.',
      'In a bowl, whisk together eggs, cheese, and plenty of black pepper.',
      'When pasta is al dente, reserve 1 cup of pasta water and drain.',
      'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
      'Pour egg mixture over pasta and toss rapidly to create a creamy sauce.',
      'Add a splash of reserved pasta water if needed to loosen the sauce.',
      'Serve immediately with extra grated cheese and black pepper.'
    ],
    'tags' => ['Italian', 'Pasta', 'Quick', 'Dinner']
  ];
}

/**
 * Get a recipe by ID
 */
function getRecipeById($id) {
  $conn = getDbConnection();
  
  $id = mysqli_real_escape_string($conn, $id);
  $query = "SELECT * FROM recipes WHERE id = $id";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    return formatRecipeData($row);
  }
  
  return null;
}

/**
 * Get recipes by category
 */
function getRecipesByCategory($category) {
  $conn = getDbConnection();
  $recipes = [];
  
  if ($category === 'All') {
    return getAllRecipes();
  }
  
  $category = mysqli_real_escape_string($conn, $category);
  $query = "SELECT * FROM recipes WHERE category = '$category' ORDER BY publish_date DESC";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $recipe = formatRecipeData($row);
      $recipes[] = $recipe;
    }
  }
  
  return $recipes;
}

/**
 * Get all unique categories
 */
function getAllCategories() {
  $conn = getDbConnection();
  $categories = [];
  
  $query = "SELECT DISTINCT category FROM recipes ORDER BY category";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $categories[] = $row['category'];
    }
  }
  
  // If no categories found, return default ones
  if (empty($categories)) {
    $categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Drinks', 'Vegetarian', 'Vegan', 'Gluten-Free'];
  }
  
  return $categories;
}

/**
 * Get a random image for a category from its recipes
 */
function getCategoryImage($category) {
  $conn = getDbConnection();
  
  $category = mysqli_real_escape_string($conn, $category);
  $query = "SELECT image FROM recipes WHERE category = '$category' ORDER BY RAND() LIMIT 1";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    return $row['image'];
  }
  
  // Return default image if no recipes in category
  return 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80';
}

/**
 * Get count of recipes in a category
 */
function getCategoryRecipeCount($category) {
  $conn = getDbConnection();
  
  $category = mysqli_real_escape_string($conn, $category);
  $query = "SELECT COUNT(*) as count FROM recipes WHERE category = '$category'";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    return $row['count'];
  }
  
  return 0;
}

/**
 * Search for recipes
 */
function searchRecipes($query) {
  $conn = getDbConnection();
  $recipes = [];
  
  $query = mysqli_real_escape_string($conn, $query);
  $sql = "SELECT * FROM recipes 
          WHERE title LIKE '%$query%' 
          OR description LIKE '%$query%' 
          OR ingredients LIKE '%$query%' 
          OR instructions LIKE '%$query%' 
          OR tags LIKE '%$query%'
          ORDER BY publish_date DESC";
          
  $result = mysqli_query($conn, $sql);
  
  if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $recipe = formatRecipeData($row);
      $recipes[] = $recipe;
    }
  }
  
  return $recipes;
}

/**
 * Get comments for a recipe
 */
function getCommentsByRecipeId($recipeId) {
  $conn = getDbConnection();
  $comments = [];
  
  $recipeId = mysqli_real_escape_string($conn, $recipeId);
  $query = "SELECT * FROM comments WHERE recipe_id = $recipeId ORDER BY date DESC";
  $result = mysqli_query($conn, $query);
  
  if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $comments[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'comment' => $row['comment'],
        'rating' => $row['rating'],
        'date' => $row['date'],
        'image' => $row['image']
      ];
    }
  }
  
  return $comments;
}

/**
 * Add a comment to a recipe
 */
function addComment($recipeId, $name, $email, $comment, $rating, $imagePath = null) {
  $conn = getDbConnection();
  
  $recipeId = mysqli_real_escape_string($conn, $recipeId);
  $name = mysqli_real_escape_string($conn, $name);
  $email = mysqli_real_escape_string($conn, $email);
  $comment = mysqli_real_escape_string($conn, $comment);
  $rating = mysqli_real_escape_string($conn, $rating);
  $imagePath = $imagePath ? mysqli_real_escape_string($conn, $imagePath) : null;
  
  $query = "INSERT INTO comments (recipe_id, name, email, comment, rating, image, date) 
            VALUES ($recipeId, '$name', '$email', '$comment', $rating, " . 
            ($imagePath ? "'$imagePath'" : "NULL") . ", NOW())";
            
  return mysqli_query($conn, $query);
}

/**
 * Add a new recipe
 */
function addRecipe($title, $description, $category, $prepTime, $cookTime, $servings, $difficulty, $ingredients, $instructions, $tags, $imagePath) {
  $conn = getDbConnection();
  
  $title = mysqli_real_escape_string($conn, $title);
  $description = mysqli_real_escape_string($conn, $description);
  $category = mysqli_real_escape_string($conn, $category);
  $prepTime = mysqli_real_escape_string($conn, $prepTime);
  $cookTime = mysqli_real_escape_string($conn, $cookTime);
  $servings = mysqli_real_escape_string($conn, $servings);
  $difficulty = mysqli_real_escape_string($conn, $difficulty);
  
  // Convert arrays to JSON for storage
  $ingredientsJson = json_encode(array_map('trim', $ingredients));
  $instructionsJson = json_encode(array_map('trim', $instructions));
  $tagsJson = json_encode(array_map('trim', $tags));
  
  $ingredientsJson = mysqli_real_escape_string($conn, $ingredientsJson);
  $instructionsJson = mysqli_real_escape_string($conn, $instructionsJson);
  $tagsJson = mysqli_real_escape_string($conn, $tagsJson);
  
  $imagePath = mysqli_real_escape_string($conn, $imagePath);
  $author = isset($_SESSION['admin_username']) ? mysqli_real_escape_string($conn, $_SESSION['admin_username']) : 'Admin';
  
  $query = "INSERT INTO recipes (title, description, category, prep_time, cook_time, servings, difficulty, ingredients, instructions, tags, image, author, publish_date) 
            VALUES ('$title', '$description', '$category', $prepTime, $cookTime, $servings, '$difficulty', '$ingredientsJson', '$instructionsJson', '$tagsJson', '$imagePath', '$author', NOW())";
  
  if (mysqli_query($conn, $query)) {
    return mysqli_insert_id($conn);
  }
  
  return false;
}

/**
 * Format recipe data from database row
 */
function formatRecipeData($row) {
  return [
    'id' => $row['id'],
    'title' => $row['title'],
    'description' => $row['description'],
    'category' => $row['category'],
    'prepTime' => $row['prep_time'],
    'cookTime' => $row['cook_time'],
    'servings' => $row['servings'],
    'difficulty' => $row['difficulty'],
    'ingredients' => json_decode($row['ingredients'], true),
    'instructions' => json_decode($row['instructions'], true),
    'tags' => json_decode($row['tags'], true),
    'image' => $row['image'],
    'author' => $row['author'],
    'publishDate' => $row['publish_date']
  ];
}

/**
 * Check if database tables exist, if not create them
 */
function initializeDatabase() {
  $conn = getDbConnection();
  
  // Create recipes table
  $query = "CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    prep_time INT NOT NULL,
    cook_time INT NOT NULL,
    servings INT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    tags TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publish_date DATETIME NOT NULL
  )";
  
  mysqli_query($conn, $query);
  
  // Create comments table
  $query = "CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL,
    image VARCHAR(255) NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  )";
  
  mysqli_query($conn, $query);
  
  // Check if we have any recipes, if not add some sample data
  $query = "SELECT COUNT(*) as count FROM recipes";
  $result = mysqli_query($conn, $query);
  $row = mysqli_fetch_assoc($result);
  
  if ($row['count'] == 0) {
    // Add sample recipes
    addSampleRecipes();
  }
}

/**
 * Add sample recipes to the database
 */
function addSampleRecipes() {
  // Sample recipe 1
  $ingredients1 = [
    '400g spaghetti',
    '200g pancetta or guanciale, diced',
    '4 large eggs',
    '100g Pecorino Romano, grated',
    '50g Parmigiano Reggiano, grated',
    'Freshly ground black pepper',
    'Salt to taste'
  ];
  
  $instructions1 = [
    'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
    'While pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.',
    'In a bowl, whisk together eggs, cheese, and plenty of black pepper.',
    'When pasta is al dente, reserve 1 cup of pasta water and drain.',
    'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
    'Pour egg mixture over pasta and toss rapidly to create a creamy sauce.',
    'Add a splash of reserved pasta water if needed to loosen the sauce.',
    'Serve immediately with extra grated cheese and black pepper.'
  ];
  
  $tags1 = ['Italian', 'Pasta', 'Quick', 'Dinner'];
  
  addRecipe(
    'Delicious Pasta Carbonara', 
    'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.', 
    'Pasta', 
    15, 
    20, 
    4, 
    'Medium', 
    $ingredients1, 
    $instructions1, 
    $tags1, 
    'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  );
  
  // Sample recipe 2
  $ingredients2 = [
    '2 ripe avocados',
    '1/4 cup finely chopped red onion',
    '2 Roma tomatoes, diced',
    '2 tbsp fresh cilantro, chopped',
    '1 jalapeño, seeded and minced',
    'Juice of 1 lime',
    '1/2 tsp salt',
    '1/4 tsp ground black pepper'
  ];
  
  $instructions2 = [
    'Cut avocados in half, remove pits, and scoop flesh into a medium bowl.',
    'Mash avocados with a fork, leaving some chunks for texture.',
    'Add red onion, tomatoes, cilantro, and jalapeño to the bowl.',
    'Squeeze lime juice over the mixture and season with salt and pepper.',
    'Stir gently to combine all ingredients.',
    'Taste and adjust seasoning if needed.',
    'Serve immediately with tortilla chips or cover with plastic wrap pressed directly onto the surface of the guacamole to prevent browning if serving later.'
  ];
  
  $tags2 = ['Mexican', 'Appetizer', 'Vegetarian', 'Vegan', 'Gluten-Free'];
  
  addRecipe(
    'Fresh Homemade Guacamole', 
    'The perfect guacamole is creamy, with just the right amount of lime, salt, and a hint of spice.', 
    'Appetizers', 
    15, 
    0, 
    6, 
    'Easy', 
    $ingredients2, 
    $instructions2, 
    $tags2, 
    'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
  );
  
  // Sample recipe 3
  $ingredients3 = [
    '300g chocolate chip cookies',
    '100g unsalted butter, melted',
    '500g cream cheese, room temperature',
    '150g granulated sugar',
    '3 large eggs',
    '200ml sour cream',
    '1 tsp vanilla extract',
    '2 tbsp all-purpose flour',
    '200g fresh berries for topping'
  ];
  
  $instructions3 = [
    'Preheat oven to 160°C (325°F). Line the bottom of a 9-inch springform pan with parchment paper.',
    'Crush cookies in a food processor. Mix with melted butter and press into the bottom of the pan. Refrigerate while preparing the filling.',
    'Beat cream cheese and sugar until smooth and creamy.',
    'Add eggs one at a time, mixing well after each addition.',
    'Mix in sour cream, vanilla extract, and flour until just combined.',
    'Pour filling over the crust and smooth the top.',
    'Bake for 50-60 minutes until the center is almost set but still slightly wobbly.',
    'Turn off the oven, leave the door slightly open, and let the cheesecake cool for 1 hour.',
    'Refrigerate for at least 4 hours or overnight.',
    'Before serving, top with fresh berries.'
  ];
  
  $tags3 = ['Dessert', 'Cheesecake', 'Baking'];
  
  addRecipe(
    'Creamy New York Cheesecake', 
    'A rich and indulgent cheesecake with a cookie crust and fresh berry topping.', 
    'Dessert', 
    30, 
    60, 
    12, 
    'Medium', 
    $ingredients3, 
    $instructions3, 
    $tags3, 
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  );
}

// Initialize database tables when including this file
initializeDatabase();

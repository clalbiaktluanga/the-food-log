
-- TheFoodLog Database Setup Script
-- Run this script to set up the database structure

-- Create database
CREATE DATABASE IF NOT EXISTS thefoodlog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE thefoodlog;

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
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
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  comment TEXT NOT NULL,
  rating INT NOT NULL,
  image VARCHAR(255) NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Insert sample recipes

-- Sample recipe 1: Pasta Carbonara
INSERT INTO recipes (title, description, category, prep_time, cook_time, servings, difficulty, ingredients, instructions, tags, image, author, publish_date)
VALUES (
  'Delicious Pasta Carbonara',
  'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
  'Pasta',
  15,
  20,
  4,
  'Medium',
  '["400g spaghetti","200g pancetta or guanciale, diced","4 large eggs","100g Pecorino Romano, grated","50g Parmigiano Reggiano, grated","Freshly ground black pepper","Salt to taste"]',
  '["Bring a large pot of salted water to boil and cook spaghetti according to package instructions.","While pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.","In a bowl, whisk together eggs, cheese, and plenty of black pepper.","When pasta is al dente, reserve 1 cup of pasta water and drain.","Working quickly, add hot pasta to the skillet with pancetta, remove from heat.","Pour egg mixture over pasta and toss rapidly to create a creamy sauce.","Add a splash of reserved pasta water if needed to loosen the sauce.","Serve immediately with extra grated cheese and black pepper."]',
  '["Italian","Pasta","Quick","Dinner"]',
  'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  'Admin',
  NOW() - INTERVAL 2 DAY
);

-- Sample recipe 2: Guacamole
INSERT INTO recipes (title, description, category, prep_time, cook_time, servings, difficulty, ingredients, instructions, tags, image, author, publish_date)
VALUES (
  'Fresh Homemade Guacamole',
  'The perfect guacamole is creamy, with just the right amount of lime, salt, and a hint of spice.',
  'Appetizers',
  15,
  0,
  6,
  'Easy',
  '["2 ripe avocados","1/4 cup finely chopped red onion","2 Roma tomatoes, diced","2 tbsp fresh cilantro, chopped","1 jalapeño, seeded and minced","Juice of 1 lime","1/2 tsp salt","1/4 tsp ground black pepper"]',
  '["Cut avocados in half, remove pits, and scoop flesh into a medium bowl.","Mash avocados with a fork, leaving some chunks for texture.","Add red onion, tomatoes, cilantro, and jalapeño to the bowl.","Squeeze lime juice over the mixture and season with salt and pepper.","Stir gently to combine all ingredients.","Taste and adjust seasoning if needed.","Serve immediately with tortilla chips or cover with plastic wrap pressed directly onto the surface of the guacamole to prevent browning if serving later."]',
  '["Mexican","Appetizer","Vegetarian","Vegan","Gluten-Free"]',
  'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  'Admin',
  NOW() - INTERVAL 1 DAY
);

-- Sample recipe 3: Cheesecake
INSERT INTO recipes (title, description, category, prep_time, cook_time, servings, difficulty, ingredients, instructions, tags, image, author, publish_date)
VALUES (
  'Creamy New York Cheesecake',
  'A rich and indulgent cheesecake with a cookie crust and fresh berry topping.',
  'Dessert',
  30,
  60,
  12,
  'Medium',
  '["300g chocolate chip cookies","100g unsalted butter, melted","500g cream cheese, room temperature","150g granulated sugar","3 large eggs","200ml sour cream","1 tsp vanilla extract","2 tbsp all-purpose flour","200g fresh berries for topping"]',
  '["Preheat oven to 160°C (325°F). Line the bottom of a 9-inch springform pan with parchment paper.","Crush cookies in a food processor. Mix with melted butter and press into the bottom of the pan. Refrigerate while preparing the filling.","Beat cream cheese and sugar until smooth and creamy.","Add eggs one at a time, mixing well after each addition.","Mix in sour cream, vanilla extract, and flour until just combined.","Pour filling over the crust and smooth the top.","Bake for 50-60 minutes until the center is almost set but still slightly wobbly.","Turn off the oven, leave the door slightly open, and let the cheesecake cool for 1 hour.","Refrigerate for at least 4 hours or overnight.","Before serving, top with fresh berries."]',
  '["Dessert","Cheesecake","Baking"]',
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  'Admin',
  NOW()
);

-- Sample comments
INSERT INTO comments (recipe_id, name, email, comment, rating, image, date)
VALUES (
  1,
  'Maria Rodriguez',
  'maria@example.com',
  'This recipe is amazing! The sauce came out perfectly creamy. I added a bit of garlic for extra flavor and it was delicious.',
  5,
  NULL,
  NOW() - INTERVAL 1 DAY
);

INSERT INTO comments (recipe_id, name, email, comment, rating, image, date)
VALUES (
  1,
  'James Smith',
  'james@example.com',
  'Good recipe but I found it needed a bit more salt. Otherwise, quick and easy to make for a weeknight dinner.',
  4,
  NULL,
  NOW() - INTERVAL 12 HOUR
);

INSERT INTO comments (recipe_id, name, email, comment, rating, image, date)
VALUES (
  2,
  'Sophia Garcia',
  'sophia@example.com',
  'Perfect guacamole recipe! I added a bit more lime juice because I like it tangy. Will definitely make again.',
  5,
  NULL,
  NOW() - INTERVAL 6 HOUR
);

-- Create necessary directories
-- Note: These commands need to be run from the command line, not in MySQL
-- mkdir -p uploads/recipes uploads/comments

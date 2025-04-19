
import { Recipe } from "@/components/RecipeCard";

// This would typically come from a database or API, but we'll use mock data for now
export const recipeData: Recipe[] = [
  {
    id: 1,
    title: "Creamy Garlic Parmesan Pasta",
    description: "A rich and creamy pasta dish that's perfect for a quick weeknight dinner. This indulgent pasta is ready in just 15 minutes!",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Dinner",
    prepTime: 15,
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad",
    description: "A healthy and flavorful salad packed with Mediterranean flavors. Perfect for meal prep or a light lunch option.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Vegetarian",
    prepTime: 20,
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Spicy Thai Coconut Soup",
    description: "A fragrant and spicy Thai soup with coconut milk, lemongrass, and tender chicken. Warming and full of flavor.",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ba2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Lunch",
    prepTime: 30,
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    description: "Decadent chocolate cake with a molten chocolate center. A perfect dessert to impress your guests!",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
    category: "Dessert",
    prepTime: 25,
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "Avocado Toast with Poached Egg",
    description: "Elevate your breakfast with this classic avocado toast topped with a perfectly poached egg and red pepper flakes.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Breakfast",
    prepTime: 10,
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "Beef and Vegetable Stir-Fry",
    description: "A quick and colorful stir-fry loaded with tender beef strips and crisp vegetables in a savory sauce.",
    image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Dinner",
    prepTime: 20,
    difficulty: "Medium"
  },
];

export interface FullRecipe extends Recipe {
  ingredients: string[];
  instructions: string[];
}

// Extended recipe data with ingredients and instructions
export const fullRecipeData: { [key: number]: FullRecipe } = {
  1: {
    ...recipeData[0],
    ingredients: [
      "8 oz fettuccine pasta",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated Parmesan cheese",
      "1/4 tsp black pepper",
      "1/2 tsp salt",
      "2 tbsp fresh parsley, chopped",
      "Red pepper flakes (optional)"
    ],
    instructions: [
      "Cook pasta according to package instructions until al dente. Drain, reserving 1/2 cup of pasta water.",
      "In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté for 30 seconds until fragrant.",
      "Pour in heavy cream and bring to a gentle simmer. Cook for 2 minutes.",
      "Add grated Parmesan cheese, stirring continuously until melted and sauce is smooth.",
      "Season with salt and pepper to taste.",
      "Add the cooked pasta to the sauce and toss to coat. If the sauce is too thick, add some of the reserved pasta water.",
      "Garnish with chopped parsley and red pepper flakes if desired.",
      "Serve immediately with additional Parmesan cheese on top."
    ]
  },
  2: {
    ...recipeData[1],
    ingredients: [
      "1 cup quinoa, rinsed",
      "2 cups water or vegetable broth",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, finely diced",
      "1/2 cup kalamata olives, pitted and halved",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup fresh parsley, chopped",
      "3 tbsp olive oil",
      "2 tbsp lemon juice",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a medium saucepan, combine quinoa and water or broth. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes until quinoa is tender and water is absorbed.",
      "Transfer quinoa to a large bowl and let cool for about 10 minutes.",
      "Add cucumber, cherry tomatoes, red onion, olives, feta cheese, and parsley to the cooled quinoa.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Cover and refrigerate for at least 30 minutes to allow flavors to meld.",
      "Taste and adjust seasonings before serving. Can be served cold or at room temperature."
    ]
  },
  3: {
    ...recipeData[2],
    ingredients: [
      "2 tbsp vegetable oil",
      "2 tbsp red Thai curry paste",
      "1 lemongrass stalk, bruised and cut into 2-inch pieces",
      "3 kaffir lime leaves",
      "4 cups chicken broth",
      "2 cups coconut milk",
      "2 chicken breasts, thinly sliced",
      "1 cup mushrooms, sliced",
      "1 red bell pepper, sliced",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "2 tbsp lime juice",
      "Fresh cilantro for garnish",
      "Red chili slices for garnish"
    ],
    instructions: [
      "In a large pot, heat vegetable oil over medium heat. Add Thai curry paste and stir-fry for 1 minute until fragrant.",
      "Add lemongrass and kaffir lime leaves, stirring for another 30 seconds.",
      "Pour in chicken broth and coconut milk. Bring to a gentle boil.",
      "Add sliced chicken, mushrooms, and red bell pepper. Reduce heat and simmer for 10-15 minutes until chicken is cooked through.",
      "Stir in fish sauce, brown sugar, and lime juice. Adjust seasonings to taste.",
      "Remove lemongrass and lime leaves before serving (or warn guests to eat around them).",
      "Ladle into bowls and garnish with fresh cilantro and chili slices."
    ]
  },
  4: {
    ...recipeData[3],
    ingredients: [
      "1/2 cup unsalted butter, plus extra for greasing",
      "4 oz dark chocolate, chopped",
      "1 cup powdered sugar",
      "2 whole eggs",
      "2 egg yolks",
      "1 tsp vanilla extract",
      "1/2 cup all-purpose flour",
      "1/4 tsp salt",
      "Vanilla ice cream for serving (optional)",
      "Powdered sugar for dusting"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter and lightly flour four 6-ounce ramekins.",
      "In a microwave-safe bowl, combine butter and chocolate. Microwave in 30-second intervals, stirring between each, until melted and smooth.",
      "Add powdered sugar and whisk until combined. Add eggs and egg yolks and whisk until incorporated. Stir in vanilla extract.",
      "Fold in flour and salt until just combined. Do not overmix.",
      "Divide batter evenly among the prepared ramekins. Place ramekins on a baking sheet.",
      "Bake for 12-14 minutes until the edges are firm but the center is still soft.",
      "Remove from oven and let stand for 1 minute. Run a knife around the edges to loosen.",
      "Invert onto serving plates, dust with powdered sugar, and serve immediately with a scoop of vanilla ice cream if desired."
    ]
  },
  5: {
    ...recipeData[4],
    ingredients: [
      "2 slices of whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tbsp vinegar",
      "1/2 lemon, juiced",
      "Salt and pepper to taste",
      "Red pepper flakes",
      "Extra virgin olive oil",
      "Fresh herbs (optional)"
    ],
    instructions: [
      "Fill a medium pot with water, add vinegar, and bring to a very gentle simmer for poaching the eggs.",
      "Toast the bread slices until golden brown.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl. Add lemon juice, salt, and pepper. Mash with a fork to desired consistency.",
      "Crack each egg into a small bowl. Stir the simmering water to create a gentle whirlpool, and carefully slide eggs into the water. Poach for 3-4 minutes until whites are set but yolks are still runny.",
      "Spread the mashed avocado onto the toast slices.",
      "Using a slotted spoon, remove poached eggs from water and place on paper towels to drain excess water.",
      "Place a poached egg on each toast slice. Season with salt, pepper, and red pepper flakes.",
      "Drizzle with olive oil and sprinkle with fresh herbs if using. Serve immediately."
    ]
  },
  6: {
    ...recipeData[5],
    ingredients: [
      "1 lb flank steak, thinly sliced against the grain",
      "2 tbsp vegetable oil",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "2 carrots, julienned",
      "1 broccoli crown, cut into florets",
      "1 small onion, sliced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, minced",
      "3 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tbsp hoisin sauce",
      "1 tsp sesame oil",
      "1 tbsp cornstarch dissolved in 2 tbsp water",
      "Green onions for garnish",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "In a small bowl, mix together soy sauce, oyster sauce, hoisin sauce, and sesame oil. Set aside.",
      "Heat 1 tablespoon oil in a large wok or skillet over high heat. Add beef and stir-fry for 2-3 minutes until browned but still slightly pink inside. Remove beef and set aside.",
      "Add remaining oil to the wok. Add garlic and ginger, stirring for 30 seconds until fragrant.",
      "Add onions and stir-fry for 1 minute. Add bell peppers, carrots, and broccoli. Stir-fry for 3-4 minutes until vegetables are crisp-tender.",
      "Return beef to the wok. Pour in the sauce mixture and stir to combine.",
      "Add cornstarch slurry and stir until sauce thickens, about 1 minute.",
      "Garnish with green onions and sesame seeds. Serve hot with rice."
    ]
  }
};

export const getCommentsForRecipe = (recipeId: number) => {
  // This would typically come from a database, but we'll use mock data
  const commentsByRecipe: { [key: number]: any[] } = {
    1: [
      {
        id: 1,
        name: "Sarah Johnson",
        content: "This pasta recipe is amazing! My whole family loved it. Will definitely make it again.",
        date: "2023-03-15",
        avatar: "",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80"
      },
      {
        id: 2,
        name: "Michael Smith",
        content: "I added some grilled chicken to this and it was fantastic. The sauce is so creamy!",
        date: "2023-03-18",
        avatar: ""
      }
    ],
    2: [
      {
        id: 1,
        name: "Emma Wilson",
        content: "Such a refreshing salad! I make it for lunch prep all the time now.",
        date: "2023-04-02",
        avatar: ""
      }
    ],
    3: [
      {
        id: 1,
        name: "David Chen",
        content: "This soup is the perfect level of spicy for me. So flavorful!",
        date: "2023-02-28",
        avatar: "",
        image: "https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=722&q=80"
      }
    ],
    4: [
      {
        id: 1,
        name: "Jessica Taylor",
        content: "OMG these lava cakes are to die for! The center was perfectly gooey.",
        date: "2023-05-10",
        avatar: ""
      },
      {
        id: 2,
        name: "Robert Miller",
        content: "Made these for Valentine's Day and they were a huge hit. Not as difficult as I expected!",
        date: "2023-02-15",
        avatar: "",
        image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=603&q=80"
      }
    ]
  };
  
  return commentsByRecipe[recipeId] || [];
};

// Return all unique categories from recipes
export const getAllCategories = (): string[] => {
  const categories = recipeData.map(recipe => recipe.category);
  return [...new Set(categories)];
};

// Search recipes function
export const searchRecipes = (query: string): Recipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return recipeData.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) || 
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter recipes by category
export const filterRecipesByCategory = (category: string): Recipe[] => {
  if (category === 'All') return recipeData;
  return recipeData.filter(recipe => recipe.category === category);
};


import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedRecipe from '@/components/FeaturedRecipe';
import RecipeCard from '@/components/RecipeCard';
import CategoryFilter from '@/components/CategoryFilter';
import { recipeData, getAllCategories, filterRecipesByCategory } from '@/api/recipeData';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = getAllCategories();
  const filteredRecipes = filterRecipesByCategory(activeCategory);
  
  // Use the first recipe as featured recipe
  const featuredRecipe = recipeData[0];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="font-serif text-4xl font-bold mb-6 text-center">Welcome to <span className="text-spice-500">Flavor</span><span className="text-herb-500">Forge</span></h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Discover delicious recipes, cooking tips, and culinary inspiration. From quick weeknight dinners to spectacular desserts, we've got something for everyone.
          </p>
          
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-medium mb-4">Featured Recipe</h2>
            <FeaturedRecipe recipe={featuredRecipe} />
          </div>
        </section>
        
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="font-serif text-2xl font-medium mb-4 md:mb-0">Latest Recipes</h2>
          </div>
          
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found in this category.</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { getAllCategories, filterRecipesByCategory } from '@/api/recipeData';

const CategoriesPage = () => {
  const categories = getAllCategories();
  
  // Get a random image for each category from its recipes
  const getCategoryImage = (category: string) => {
    const recipes = filterRecipesByCategory(category);
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      return recipes[randomIndex].image;
    }
    return 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80';
  };
  
  // Get count of recipes in each category
  const getCategoryCount = (category: string) => {
    return filterRecipesByCategory(category).length;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold mb-4">Recipe Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our recipes by category to find exactly what you're looking for, from quick breakfasts to elaborate dinners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/?category=${category}`} key={category}>
              <Card className="overflow-hidden h-full recipe-card-hover">
                <div className="h-48 relative">
                  <img 
                    src={getCategoryImage(category)} 
                    alt={category} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <CardContent className="text-white p-4">
                      <h3 className="font-serif text-xl font-medium">{category}</h3>
                      <p className="text-sm opacity-90">{getCategoryCount(category)} recipes</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;


import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, ChefHat } from 'lucide-react';
import { fullRecipeData, getCommentsForRecipe } from '@/api/recipeData';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const recipeId = Number(id);
  const recipe = fullRecipeData[recipeId];
  const comments = getCommentsForRecipe(recipeId);
  
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-6">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-8">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Recipe Hero */}
        <div className="relative h-80 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
            <div className="text-white max-w-3xl">
              <Badge className="mb-3 bg-cream-500 text-foreground hover:bg-cream-600">
                {recipe.category}
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">{recipe.title}</h1>
              <div className="flex items-center text-sm space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{recipe.prepTime} mins</span>
                </div>
                <div className="flex items-center">
                  <ChefHat className="h-4 w-4 mr-1" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipe Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-medium mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-spice-500 mt-2 mr-3"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column: Description & Instructions */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-4">Description</h2>
                <p className="text-muted-foreground">{recipe.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-4">Instructions</h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-spice-500 text-white font-medium mr-4">
                        {index + 1}
                      </span>
                      <div className="pt-1">{instruction}</div>
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* Comment Section */}
              <CommentSection recipeId={recipeId} comments={comments} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipePage;

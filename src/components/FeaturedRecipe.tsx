
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface FeaturedRecipeProps {
  recipe: Recipe;
}

const FeaturedRecipe: React.FC<FeaturedRecipeProps> = ({ recipe }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md border border-border">
      <div className="md:flex">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <Badge 
            className="absolute top-4 left-4 bg-cream-500 text-foreground hover:bg-cream-600"
          >
            Featured
          </Badge>
        </div>
        <div className="md:w-1/2 p-6 md:p-8 bg-card">
          <Badge 
            className="mb-3 bg-spice-100 text-spice-700 hover:bg-spice-200"
          >
            {recipe.category}
          </Badge>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">{recipe.title}</h2>
          <p className="text-muted-foreground mb-4">{recipe.description}</p>
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.prepTime} mins</span>
            <span className="mx-2">•</span>
            <Badge 
              variant={
                recipe.difficulty === 'Easy' 
                  ? 'outline' 
                  : recipe.difficulty === 'Medium' 
                    ? 'secondary' 
                    : 'default'
              }
              className={
                recipe.difficulty === 'Easy' 
                  ? 'border-herb-500 text-herb-500' 
                  : recipe.difficulty === 'Medium' 
                    ? 'bg-spice-100 text-spice-700 hover:bg-spice-200' 
                    : 'bg-spice-500 hover:bg-spice-600'
              }
            >
              {recipe.difficulty}
            </Badge>
          </div>
          <Link to={`/recipe/${recipe.id}`}>
            <Button className="bg-spice-500 hover:bg-spice-600 text-white group">
              View Recipe
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;

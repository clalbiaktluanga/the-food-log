
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden h-full recipe-card-hover border border-border">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge 
            className="absolute top-3 right-3 bg-cream-500 text-foreground hover:bg-cream-600"
          >
            {recipe.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-xl font-medium mb-2 line-clamp-2">{recipe.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;

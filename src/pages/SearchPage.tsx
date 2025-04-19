
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeCard, { Recipe } from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { searchRecipes } from '@/api/recipeData';
import { ArrowLeft, Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Recipe[]>([]);
  
  useEffect(() => {
    if (query) {
      const foundRecipes = searchRecipes(query);
      setResults(foundRecipes);
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
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
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold mb-4">
            Search Results: "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {results.length} recipe{results.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted rounded-lg">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-serif text-2xl font-medium mb-2">No Results Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any recipes matching "{query}".
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;

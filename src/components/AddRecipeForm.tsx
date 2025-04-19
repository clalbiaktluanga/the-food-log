
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ImagePlus, Save, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!title.trim()) return 'Recipe title is required';
    if (!description.trim()) return 'Description is required';
    if (!ingredients.trim()) return 'Ingredients are required';
    if (!instructions.trim()) return 'Instructions are required';
    if (!category) return 'Please select a category';
    if (!prepTime || isNaN(Number(prepTime))) return 'Prep time must be a valid number';
    if (!difficulty) return 'Please select a difficulty level';
    if (!image) return 'Please upload a recipe image';
    return '';
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setPrepTime('');
    setDifficulty('');
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, you would upload the image and save the recipe data
      // to your backend/database here
      
      toast({
        title: "Recipe Added",
        description: "Your recipe has been added successfully!",
        variant: "default",
      });
      
      setSuccess('Recipe added successfully!');
      setIsSubmitting(false);
      resetForm();
    }, 1500);
  };

  const categories = [
    "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", 
    "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Add New Recipe</CardTitle>
        <CardDescription>
          Fill in the details below to create a new recipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 bg-herb-50 text-herb-800 border-herb-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter recipe title"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the recipe"
                className="min-h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
              <Input
                id="prepTime"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="E.g., 30"
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Recipe Image</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                  className="flex items-center gap-2"
                >
                  <ImagePlus className="h-4 w-4" />
                  {image ? 'Change Image' : 'Upload Image'}
                </Button>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {image && (
                  <span className="text-sm text-muted-foreground">
                    {image.name.length > 20 ? image.name.substring(0, 20) + '...' : image.name}
                  </span>
                )}
              </div>
              
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Recipe Preview"
                    className="h-32 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="List ingredients, one per line"
                className="min-h-32"
              />
              <p className="text-sm text-muted-foreground">
                List each ingredient on a new line. Include quantities and any preparation notes.
              </p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Step-by-step instructions"
                className="min-h-40"
              />
              <p className="text-sm text-muted-foreground">
                Provide clear, step-by-step instructions. Number each step for clarity.
              </p>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-spice-500 hover:bg-spice-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Recipe...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Recipe
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddRecipeForm;

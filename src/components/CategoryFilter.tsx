
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl font-medium mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === 'All' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('All')}
          className={activeCategory === 'All' ? 'bg-spice-500 hover:bg-spice-600' : ''}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category)}
            className={activeCategory === category ? 'bg-spice-500 hover:bg-spice-600' : ''}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

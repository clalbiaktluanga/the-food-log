
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-background sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold text-spice-500">The<span className="text-herb-500">FoodLog</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-spice-500 transition-colors">Home</Link>
          <Link to="/categories" className="text-foreground hover:text-spice-500 transition-colors">Categories</Link>
          <Link to="/about" className="text-foreground hover:text-spice-500 transition-colors">About</Link>
          <Link to="/admin" className="text-foreground hover:text-spice-500 transition-colors">Admin</Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="text"
              placeholder="Search recipes..."
              className="w-48 lg:w-64 focus-visible:ring-spice-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search recipes..."
                className="w-full focus-visible:ring-spice-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-spice-500 py-2 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/categories" className="text-foreground hover:text-spice-500 py-2 transition-colors" onClick={toggleMenu}>Categories</Link>
              <Link to="/about" className="text-foreground hover:text-spice-500 py-2 transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/admin" className="text-foreground hover:text-spice-500 py-2 transition-colors" onClick={toggleMenu}>Admin</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

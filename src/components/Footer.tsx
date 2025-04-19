
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-12 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Flavor<span className="text-herb-500">Forge</span></h3>
            <p className="text-muted-foreground mb-4">
              Discover delicious recipes and cooking inspiration for every meal and occasion.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-spice-500 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-spice-500 transition-colors">Recipe Categories</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-spice-500 transition-colors">About Us</Link></li>
              <li><Link to="/admin" className="text-muted-foreground hover:text-spice-500 transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Connect With Us</h4>
            <p className="text-muted-foreground mb-2">Follow us on social media for more recipes and updates!</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-spice-500 transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-spice-500 transition-colors">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-spice-500 transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground text-sm">
          <p>© {currentYear} FlavorForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

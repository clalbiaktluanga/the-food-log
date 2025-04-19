
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/AdminLogin';
import AddRecipeForm from '@/components/AddRecipeForm';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-6 text-center">
            {isLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
          </h1>
          
          {isLoggedIn ? (
            <>
              <div className="bg-muted p-6 rounded-lg mb-8">
                <h2 className="font-serif text-xl font-medium mb-4">Welcome, Admin!</h2>
                <p className="text-muted-foreground mb-4">
                  From here, you can add new recipes to the FlavorForge database. 
                  Make sure to fill in all the required information and upload a high-quality image.
                </p>
              </div>
              
              <AddRecipeForm />
            </>
          ) : (
            <AdminLogin onLogin={handleLogin} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;

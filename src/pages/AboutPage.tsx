
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-6 text-center">About <span className="text-spice-500">Flavor</span><span className="text-herb-500">Forge</span></h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to FlavorForge, a place where culinary creativity meets technology. Our mission is to inspire home cooks of all skill levels to explore new flavors, techniques, and cuisines.
            </p>
            
            <h2 className="font-serif text-2xl font-medium mt-8 mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              FlavorForge began as a small collection of family recipes that we wanted to preserve and share. Over time, it evolved into a comprehensive recipe platform with a passionate community of food lovers.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that good food brings people together, creates memories, and enriches lives. Our team of experienced cooks, food photographers, and writers work together to bring you recipes that are both delicious and achievable in your home kitchen.
            </p>
            
            <h2 className="font-serif text-2xl font-medium mt-8 mb-4">Our Recipes</h2>
            <p className="text-muted-foreground mb-4">
              Every recipe on FlavorForge is carefully tested multiple times to ensure success in your kitchen. We focus on:
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground">
              <li>Clear, step-by-step instructions</li>
              <li>Practical techniques for home cooks</li>
              <li>Accessible ingredients with suggested substitutions</li>
              <li>Beautiful photography that accurately represents the finished dish</li>
              <li>Honest preparation times and difficulty ratings</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-medium mt-8 mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-4">
              We invite you to be part of our growing community by:
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground">
              <li>Leaving comments on recipes you've tried</li>
              <li>Sharing your own photos of dishes you've made</li>
              <li>Following us on social media for daily inspiration</li>
              <li>Signing up for our newsletter for seasonal recipes and cooking tips</li>
            </ul>
            
            <h2 className="font-serif text-2xl font-medium mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:hello@flavorforge.com" className="text-spice-500 hover:text-spice-600">hello@flavorforge.com</a>.
            </p>
            
            <p className="text-muted-foreground mt-8">
              Thank you for visiting FlavorForge. Happy cooking!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

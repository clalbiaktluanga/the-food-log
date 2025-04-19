
# TheFoodLog - Recipe Sharing Website

TheFoodLog is a recipe sharing website built with PHP, MySQL, HTML, CSS, and jQuery for XAMPP local server.

## Setup Instructions

1. **Install XAMPP**
   - Download and install [XAMPP](https://www.apachefriends.org/index.html) for your operating system

2. **Set up the project**
   - Clone or download this repository to your XAMPP `htdocs` folder
   - The path should be: `C:\xampp\htdocs\thefoodlog` (Windows) or `/Applications/XAMPP/htdocs/thefoodlog` (Mac)

3. **Start XAMPP services**
   - Start the Apache and MySQL services from the XAMPP Control Panel

4. **Create the database**
   - Open your browser and go to `http://localhost/phpmyadmin`
   - Create a new database named `thefoodlog`
   - Import the provided `database_setup.sql` file to set up the database structure and sample data

5. **Create upload directories**
   - Create the following directories in your project folder:
     - `uploads/recipes`
     - `uploads/comments`
   - Ensure these directories have write permissions

6. **Access the website**
   - Open your browser and navigate to `http://localhost/thefoodlog`
   - You should see the homepage with sample recipes

## Admin Access

- To access the admin panel, go to `http://localhost/thefoodlog/admin.php`
- Default admin credentials:
  - Username: `admin`
  - Password: `password123`
- These credentials can be changed in the `includes/config.php` file

## Project Structure

- `index.php` - Homepage
- `recipe.php` - Individual recipe page
- `categories.php` - Categories listing
- `search.php` - Search results
- `about.php` - About page
- `admin.php` - Admin login and dashboard
- `notfound.php` - 404 page
- `includes/` - PHP includes (navbar, footer, functions, config)
- `css/` - CSS stylesheets
- `js/` - JavaScript files
- `uploads/` - User uploaded images

## Technologies Used

- PHP 7.4+
- MySQL 5.7+
- HTML5
- CSS3
- jQuery 3.7.1
- XAMPP (Apache, MySQL, PHP)

## Features

- Responsive design for all devices
- Recipe listing and filtering by categories
- Recipe details with ingredients and instructions
- User comments and ratings
- Recipe search functionality
- Admin panel for adding new recipes
- Mobile-friendly navigation

## Notes

- This is a local development project and not configured for production environments
- For security in a production environment, admin credentials should not be stored directly in config files
- Consider implementing proper user authentication with password hashing for a production site

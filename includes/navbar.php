
<nav class="navbar">
  <div class="navbar-container">
    <div class="navbar-brand">
      <a href="index.php">
        The<span class="text-spice">Food</span><span class="text-herb">Log</span>
      </a>
    </div>
    
    <div class="navbar-menu">
      <ul class="navbar-nav">
        <li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="categories.php" class="nav-link">Categories</a></li>
        <li class="nav-item"><a href="about.php" class="nav-link">About</a></li>
        <li class="nav-item"><a href="admin.php" class="nav-link">Admin</a></li>
      </ul>
    </div>
    
    <div class="navbar-search">
      <form action="search.php" method="get">
        <input type="text" name="q" placeholder="Search recipes..." required>
        <button type="submit" class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </button>
      </form>
    </div>
    
    <div class="navbar-toggle">
      <button id="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>

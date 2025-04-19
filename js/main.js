
/**
 * TheFoodLog Main JavaScript
 */

$(document).ready(function() {
  // Mobile menu toggle
  $('#menu-toggle').on('click', function() {
    // Create mobile menu if it doesn't exist
    if ($('.mobile-menu').length === 0) {
      createMobileMenu();
    }
    
    $('.mobile-menu').addClass('active');
    $('body').css('overflow', 'hidden');
  });
  
  // Handle rating selection in comment form
  $('.rating-select label').on('click', function() {
    const rating = $(this).prev('input').val();
    $('.rating-select label').removeClass('active');
    $(this).addClass('active').prevAll('label').addClass('active');
  });
  
  // Initialize image preview for file uploads
  $('.form-group input[type="file"]').on('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      const previewId = $(this).attr('id') + '-preview';
      
      // Create preview element if it doesn't exist
      if ($('#' + previewId).length === 0) {
        $(this).after('<div id="' + previewId + '" class="image-preview mt-2"></div>');
      }
      
      reader.onload = function(e) {
        $('#' + previewId).html('<img src="' + e.target.result + '" class="preview-image">');
      };
      
      reader.readAsDataURL(file);
    }
  });
  
  // Add smooth scrolling to anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    const target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 500);
    }
  });
});

// Create mobile menu dynamically
function createMobileMenu() {
  const mobileMenu = `
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <div class="navbar-brand">
          The<span class="text-spice">Food</span><span class="text-herb">Log</span>
        </div>
        <button class="mobile-menu-close">&times;</button>
      </div>
      
      <div class="mobile-search">
        <form action="search.php" method="get">
          <input type="text" name="q" placeholder="Search recipes..." required>
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </button>
        </form>
      </div>
      
      <nav class="mobile-nav">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item"><a href="index.php" class="mobile-nav-link">Home</a></li>
          <li class="mobile-nav-item"><a href="categories.php" class="mobile-nav-link">Categories</a></li>
          <li class="mobile-nav-item"><a href="about.php" class="mobile-nav-link">About</a></li>
          <li class="mobile-nav-item"><a href="admin.php" class="mobile-nav-link">Admin</a></li>
        </ul>
      </nav>
    </div>
  `;
  
  $('body').append(mobileMenu);
  
  // Add close functionality
  $('.mobile-menu-close').on('click', function() {
    $('.mobile-menu').removeClass('active');
    $('body').css('overflow', 'auto');
  });
}

// Handle textarea resizing automatically
$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

// Add ingredients dynamically in the add recipe form
$(document).on('click', '.add-ingredient-btn', function() {
  const ingredientsList = $('#ingredients-list');
  const newIngredient = `
    <div class="ingredient-item">
      <input type="text" name="ingredients[]" class="ingredient-input" required>
      <button type="button" class="remove-ingredient-btn">&times;</button>
    </div>
  `;
  ingredientsList.append(newIngredient);
});

// Remove ingredient
$(document).on('click', '.remove-ingredient-btn', function() {
  $(this).parent('.ingredient-item').remove();
});

// Add instructions dynamically in the add recipe form
$(document).on('click', '.add-instruction-btn', function() {
  const instructionsList = $('#instructions-list');
  const newStep = `
    <div class="instruction-item">
      <textarea name="instructions[]" class="instruction-input" rows="2" required></textarea>
      <button type="button" class="remove-instruction-btn">&times;</button>
    </div>
  `;
  instructionsList.append(newStep);
});

// Remove instruction
$(document).on('click', '.remove-instruction-btn', function() {
  $(this).parent('.instruction-item').remove();
});

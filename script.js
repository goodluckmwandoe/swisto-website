document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu) navMenu.classList.remove('active');
      }
    });
  });

  // 3. Login Form Handling (Redirects based on role)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeRoleBtn = document.querySelector('.user-type-btn.active');
      const role = activeRoleBtn ? activeRoleBtn.getAttribute('data-type') : 'hotel';
      
      const btn = loginForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      btn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        if (role === 'hotel') {
          window.location.href = 'hotel-dashboard.html';
        } else {
          window.location.href = 'supplier-dashboard.html';
        }
      }, 1000);
    });

    // Demo Account Auto-fill
    document.querySelectorAll('.demo-account').forEach(account => {
      account.addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        const password = this.getAttribute('data-password');
        const type = this.getAttribute('data-type');
        
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
        
        // Toggle UI
        document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.user-type-btn[data-type="${type}"]`).classList.add('active');
      });
    });
  }

});

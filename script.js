// 1. Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 2. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdZ_tWHds0XjcAzA0XzM2DgejAtK-1YeQ",
  authDomain: "swisto-kenya.firebaseapp.com",
  projectId: "swisto-kenya",
  storageBucket: "swisto-kenya.firebasestorage.app",
  messagingSenderId: "328714398565",
  appId: "1:328714398565:web:1fb61ec84d64e774ad4f8c",
  measurementId: "G-NDTNHL5V69"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Wait for the page to load, then run the app logic
document.addEventListener('DOMContentLoaded', () => {
  
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  // --- Login Form Logic ---
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    
    // Toggle between Hotel Manager and Supplier buttons
    document.querySelectorAll('.user-type-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Handle the Login Button Click
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.querySelector('.user-type-btn.active').getAttribute('data-type');
      
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.innerHTML = 'Authenticating...';
      btn.disabled = true;

      try {
        // Attempt login with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Save the login to the browser's local storage
        localStorage.setItem('swisto_user', JSON.stringify({ 
            email: userCredential.user.email, 
            role: role 
        }));

        // Redirect to the correct dashboard
        if (role === 'hotel') {
          window.location.href = 'hotel-dashboard.html';
        } else {
          window.location.href = 'supplier-dashboard.html';
        }
        
      } catch (error) {
        // Show error if login fails
        alert("Login Error: " + error.message + "\n\nMake sure you created this exact email and password in Firebase Authentication.");
        btn.innerHTML = 'Login';
        btn.disabled = false;
      }
    });

    // Auto-fill Demo Accounts when clicked
    document.querySelectorAll('.demo-account').forEach(account => {
      account.addEventListener('click', function() {
        document.getElementById('email').value = this.getAttribute('data-email');
        document.getElementById('password').value = this.getAttribute('data-password');
      });
    });
  }
});

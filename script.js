// 1. Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 2. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx9xBzBvaz0dQ0Iln4yVT5jCzFEjETmww",
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
    
    // Toggle buttons
    document.querySelectorAll('.user-type-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // THIS IS THE FIX: We read which toggle button is currently active (Green)
      const selectedRole = document.querySelector('.user-type-btn.active').getAttribute('data-type');
      
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.innerHTML = 'Authenticating...';
      btn.disabled = true;

      try {
        // Login to Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Save EXACTLY the role you selected on the screen
        localStorage.setItem('swisto_user', JSON.stringify({ 
            email: userCredential.user.email, 
            role: selectedRole 
        }));

        // Redirect based on the toggle button
        if (selectedRole === 'hotel') {
          window.location.href = 'hotel-dashboard.html';
        } else {
          window.location.href = 'supplier-dashboard.html';
        }
        
      } catch (error) {
        alert("Login Error: " + error.message);
        btn.innerHTML = 'Login';
        btn.disabled = false;
      }
    });

    // Auto-fill Demo Accounts
    document.querySelectorAll('.demo-account').forEach(account => {
      account.addEventListener('click', function() {
        document.getElementById('email').value = this.getAttribute('data-email');
        document.getElementById('password').value = this.getAttribute('data-password');
        
        // Also visually select the correct toggle button when clicking a demo account
        const demoType = this.getAttribute('data-type');
        document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.user-type-btn[data-type="${demoType}"]`).classList.add('active');
      });
    });
  }
});

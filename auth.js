document.addEventListener('DOMContentLoaded', function () {
  // ===== LOGIN PAGE FUNCTIONALITY =====
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      
      // Reset error messages
      document.getElementById('emailError').style.display = 'none';
      document.getElementById('passwordError').style.display = 'none';

      let isValid = true;

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
      }

      // Password validation
      if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('flipkartUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          // Successful login
          const successMsg = document.getElementById('successMsg');
          successMsg.style.display = 'block';
          successMsg.innerText = 'Welcome back, ' + user.firstName + '! Redirecting...';
          
          // Store logged-in user
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        } else {
          // Login failed
          alert('Invalid email or password. Please try again or sign up for a new account.');
        }
      }
    });
  }

  // ===== SIGNUP PAGE FUNCTIONALITY =====
  const signupForm = document.getElementById('signupForm');
  console.log('Signup form found:', signupForm !== null);

  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('Signup form submitted');

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const gender = document.getElementById('gender').value;
      const termsChecked = document.getElementById('terms').checked;

      console.log('Form data:', { firstName, lastName, email, phone, gender, termsChecked });

      // Reset error messages
      resetSignupErrors();

      let isValid = true;

      // First name validation
      if (firstName.length === 0) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
      }

      // Last name validation
      if (lastName.length === 0) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById('signupEmailError').style.display = 'block';
        isValid = false;
      }

      // Phone validation (10 digits)
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
      }

      // Password validation
      if (password.length < 6) {
        document.getElementById('signupPasswordError').style.display = 'block';
        isValid = false;
      }

      // Confirm password validation
      if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
      }

      // Terms acceptance
      if (!termsChecked) {
        alert('Please agree to the Terms & Conditions');
        isValid = false;
      }

      console.log('Validation result:', isValid);

      if (isValid) {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('flipkartUsers')) || [];
        const emailExists = users.some(u => u.email === email);

        if (emailExists) {
          alert('Email already registered. Please login or use a different email.');
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
          gender: gender,
          createdAt: new Date().toLocaleString()
        };

        console.log('Creating new user:', newUser);

        // Save user to localStorage
        users.push(newUser);
        localStorage.setItem('flipkartUsers', JSON.stringify(users));

        // Show success message
        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        successMsg.innerText = 'Account created successfully! Redirecting to login...';

        console.log('User created successfully. Redirecting...');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        console.log('Form validation failed');
      }
    });
  } else {
    console.log('Signup form not found on this page');
  }

  // Helper function to reset signup error messages
  function resetSignupErrors() {
    document.getElementById('firstNameError').style.display = 'none';
    document.getElementById('lastNameError').style.display = 'none';
    document.getElementById('signupEmailError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    document.getElementById('signupPasswordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';
  }

  // ===== GLOBAL USER MANAGEMENT =====
  window.userAuth = {
    // Check if user is logged in
    isLoggedIn: function() {
      return localStorage.getItem('currentUser') !== null;
    },

    // Get current logged-in user
    getCurrentUser: function() {
      return JSON.parse(localStorage.getItem('currentUser'));
    },

    // Logout user
    logout: function() {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    },

    // Get all users
    getAllUsers: function() {
      return JSON.parse(localStorage.getItem('flipkartUsers')) || [];
    },

    // Update user profile
    updateUser: function(userData) {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.email === userData.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('flipkartUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        return true;
      }
      return false;
    }
  };

  // ===== DEMO USERS FOR TESTING =====
  // You can uncomment the following to pre-populate test users
  /*
  const demoUsers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'password123',
      gender: 'male',
      createdAt: new Date().toLocaleString()
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      password: 'password123',
      gender: 'female',
      createdAt: new Date().toLocaleString()
    }
  ];

  if (!localStorage.getItem('flipkartUsers')) {
    localStorage.setItem('flipkartUsers', JSON.stringify(demoUsers));
  }
  */

  console.log('%cAuthentication System Loaded', 'color: #f5576c; font-size: 16px; font-weight: bold;');
  console.log('Login page: login.html | Signup page: signup.html');

});

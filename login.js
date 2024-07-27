const sampleEmail = 'sample@example.com';
const samplePassword = 'password123';

document.getElementById('loginToggle').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    this.classList.add('active');
    document.getElementById('signupToggle').classList.remove('active');
});

document.getElementById('signupToggle').addEventListener('click', function() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    this.classList.add('active');
    document.getElementById('loginToggle').classList.remove('active');
});

document.getElementById('showSignup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupToggle').click();
});

document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginToggle').click();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email === sampleEmail && password === samplePassword) {
        window.location.href = 'index.html';
    } else {
        alert('Invalid login credentials. Please sign up if you do not have an account.');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Ideally, here we would send a request to the server to create a new account.
    // For this example, we'll simply alert the user and redirect to the login form.

    alert('Signup successful! Please use your new credentials to log in.');
    document.getElementById('loginToggle').click();
});

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        setupUI(user);
    } else {
        setupUI();
    }
});

// Sign up
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // // Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    // Signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value
        });
    }).then(() => {
        signupForm.reset();
        document.querySelector("#closeRegister").click();
        Swal.fire({
            icon: 'success',
            title: 'Your account has been registered!',
            showConfirmButton: false,
            timer: 1500
        });
    });
});

// Logout
const logout = document.querySelector("#logoutBtn");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
        document.querySelector("#closeLogin").click();
    });
});
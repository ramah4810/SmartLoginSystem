var signUpBtn = document.getElementById("signUpBtn");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var successMsg = document.getElementById("successMsg");
var errorMsg = document.getElementById("errorMsg");
var signUpGrp = document.getElementById("signUpGrp");
var signinGrp = document.getElementById("signinGrp");
var homeGrp = document.getElementById("homeGrp");
var navbar = document.querySelector("nav");
var signInEmail = document.getElementById("signInEmail");
var signInPas = document.getElementById("signInPas");
var logInBtn = document.getElementById("logInBtn");
var logOutBtn = document.getElementById("logOutBtn");
var storedUsers = [];
if(localStorage.getItem("users") != null) {
    storedUsers = JSON.parse(localStorage.getItem('users'));
}else{
    storedUsers = [];
}

//-----------------Validation Codes------------------------------//
function validateEmail() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail.value)) {
        displayError("Invalid email format");
        return false;
    }
    clearMessages();
    return true;
}

function validateName() {
    if (signUpName.value.length < 3) {
        displayError("Username must be at least 3 characters long");
        return false;
    }
    clearMessages();
    return true;
}

function validatePassword() {
    if (signUpPassword.value.length < 8) {
        displayError("Password must be at least 8 characters long");
        return false;
    }
    clearMessages();
    return true;
}

function isUserRegistered(email) {
    for (var i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === email) {
            return true;
        }
    }
    return false;
}


//---------------Sign Up-------------------//

function signUp() {
    var username = signUpName.value;
    var email = signUpEmail.value;
    var password = signUpPassword.value;

    if (!username || !email || !password) {
        displayError("All inputs are required");
        return;
    }

    if (validateName() && validateEmail() && validatePassword() == true) {
        for (var i = 0; i < storedUsers.length; i++) {
            if (storedUsers[i].email === email) {
                displayError("Email already registered");
                return;
            }
        }
        var newUser = { username, email, password };
        storedUsers.push(newUser); 
        localStorage.setItem("users", JSON.stringify(storedUsers)); 
        displaySuccess("Success, you can sign in now!");
        clearForm();
        
    }
}

//---------------Sign Up & Sign in Links code-------------------//

function showSignInEle() {
    signinGrp.classList.remove("d-none");
    signUpGrp.classList.add("d-none");
    successMsg.classList.add("d-none");
    document.title = "Login";
}

function showSignUpEle() {
    signUpGrp.classList.remove("d-none");
    signinGrp.classList.add("d-none");
    document.title = "Sign up";
}


//---------------------Hidde show password Code-----------------------//

function showPassword (inputId) {
    var input = document.getElementById(inputId);
    var icon = document.querySelector("i");
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


//---------------------------LOG IN CODE----------------------------//


function signIn() {
    var email = signInEmail.value;
    var password = signInPas.value;
    var loginErrorMsg = document.getElementById("loginErrorMsg");

    for (var i = 0; i < storedUsers.length; i++) {
        if (storedUsers[i].email === email && storedUsers[i].password === password) {
            signinGrp.classList.add("d-none");
            homeGrp.classList.remove("d-none");
            navbar.classList.remove("d-none");
            loginErrorMsg.classList.add('d-none');
            homeGrp.innerHTML = `<h2 class="text-h1-blue fs-1 fw-semibold">Welcome ${storedUsers[i].username}</h2>`;
            document.title = "Welcome";
            return;
        }
    }
    loginErrorMsg.textContent = "Invalid email or password";
    loginErrorMsg.classList.remove('d-none');
    clearForm ();
    return;
}



//---------------------------CLEAR FORM CODE----------------------------//

function clearForm () {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
    signInEmail.value = "";
    signInPas.value = "";

}

//---------------------------LOGOUT CODE----------------------------//

function logOut() {
    signinGrp.classList.remove("d-none");
    homeGrp.classList.add("d-none");
    navbar.classList.add("d-none");
    document.title = "Sign in";
    clearForm();
}



//---------------------------Display-Hide Messages CODE--------------------//

function displayError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('d-none');
    successMsg.classList.add('d-none');
}

function displaySuccess(message) {
    successMsg.textContent = message;
    successMsg.classList.remove('d-none');
    errorMsg.classList.add('d-none');
}

function clearMessages() {
    errorMsg.classList.add('d-none');
    successMsg.classList.add('d-none');
}

//-------------------------Events--------------------------------------//
signUpBtn.addEventListener("click", signUp);
logOutBtn.addEventListener("click", logOut);
logInBtn.addEventListener("click", signIn);
signUpName.addEventListener("input", validateName);
signUpEmail.addEventListener("input", validateEmail);
signUpPassword.addEventListener("input", validatePassword);

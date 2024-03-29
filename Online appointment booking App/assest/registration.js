import * as commonFunc from "./commonFunctions.js";

$(document).ready(() => {
  // Check for if any one is still logged in

  let CURRENT_USER = commonFunc.getSessionStorage("CURRENT_USER");

  if (CURRENT_USER && Object.keys(CURRENT_USER).length) {
    $("body").html(`<div>
                      <h1 class="text-center">
                        You are already login please logout first to register...
                      </h1>
                    
                      <div class="text-center">
                        <a href="./${CURRENT_USER.type}/dashboard.html">
                          <button class="btn btn-info">Dashboard</button>
                        </a>

                        <button class="btn btn-danger" id="logoutBtn">Logout</button>
                      </div>
                    </div>
`);

    $("#logoutBtn").click(logoutHandler);
  }
});

function logoutHandler() {
  commonFunc.setSessionStorage("CURRENT_USER", {});
  window.location.href = "./";
}

// initializing user list for duplicate email

const USER_LIST = initialUser_List();

function initialUser_List() {
  let pastList = commonFunc.getLocalStorage("USER_LIST");

  if (pastList === null || pastList === undefined) {
    // If no user list is there then create new empty array
    commonFunc.setLocalStorage("USER_LIST", []);

    return [];
  } else {
    //If user list then return that user list

    return pastList;
  }
}

//--------------------------Form Inputs
let userName = $("#registraion-name");
let userEmail = $("#registraion-email");
let userPassword = $("#registraion-password");
let confirmPassword = $("#registraion-confirmPassword");
let accountType = $("#accountType");

//-------------------------- Error msg divs

let userNameErr = $("#error-registration-name");
let userEmailErr = $("#error-registration-email");
let userPasswordErr = $("#error-registration-password");
let confirmPasswordErr = $("#error-registration-confirmPassword");
let accountTypeErr = $("#error-accountType");

// Registration clicked

$("#registerBtn").click(() => {
  //   first validate detials
  if (validate()) {
    // Check if user is also present with same email

    if (!isUserPresent()) {
      // Register user to array

      registerUser();

      clearForm();
    }
  }
});

function isUserPresent() {
  //if userlist is empty then return

  if (USER_LIST.length === 0) {
    return false;
  }

  let userFound = false;

  //searching for email

  userFound = USER_LIST.find((user) => {
    if (userEmail.val() === user.email) {
      return true;
    }
  });

  //user found then return it
  if (userFound) alert("User already exist please login.");

  return userFound;
}

//validation complete now register new user to user list

function registerUser() {
  let user = {
    id: userEmail.val(),
    name: userName.val(),
    email: userEmail.val(),
    pass: userPassword.val(),
    type: accountType.val(),
    appointment: [],
  };

  //push new user to user list
  USER_LIST.push(user);

  // save new user list
  commonFunc.setLocalStorage("USER_LIST", USER_LIST);

  //login to that new user
  commonFunc.setSessionStorage("CURRENT_USER", user);

  //redirect to that new user dashboard page
  commonFunc.redirect(user);
}

// Validation functions all--------------------------

function validate() {
  let bool = true;
  bool = validateName() && bool;
  bool = validateEmail() && bool;
  bool = validatePass() && bool;
  bool = validatePassCon() && bool;
  bool = validateAccountType() && bool;
  return bool;
}

// validate Name

function validateName() {
  let name = userName.val();

  let bool = true;

  if (name === "") {
    userName.addClass("border-danger");
    userNameErr.text("This field is required").slideDown();

    bool = false;
  } else if (/\d/.test(name)) {
    userName.addClass("border-danger");
    userNameErr.text("Can not contains Numbers").slideDown();

    bool = false;
  } else if (!/\w{2}/.test(name)) {
    userName.addClass("border-danger");
    userNameErr.text("Should be at least 2 Characters long").slideDown();

    bool = false;
  } else {
    userName.removeClass("border-danger");
    userNameErr.slideUp();
  }

  return bool;
}

// validate Email

function validateEmail() {
  let email = userEmail.val();

  let bool = true;
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    userEmail.addClass("border-danger");
    userEmailErr.text("This field is required").slideDown();

    bool = false;
  } else if (!regex.test(email)) {
    userEmail.addClass("border-danger");
    userEmailErr.text("Enter Valid Email").slideDown();

    bool = false;
  } else {
    userEmail.removeClass("border-danger");
    userEmailErr.slideUp();
  }

  return bool;
}

// validate password

function validatePass() {
  let pass = userPassword.val();

  let bool = true;
  let regex = /\w{8}/;

  if (pass === "") {
    userPassword.addClass("border-danger");
    userPasswordErr.text("This field is required").slideDown();

    bool = false;
  } else if (!regex.test(pass)) {
    userPassword.addClass("border-danger");
    userPasswordErr.text("Enter Valid password").slideDown();

    bool = false;
  } else {
    userPassword.removeClass("border-danger");
    userPasswordErr.slideUp();
  }

  return bool;
}

// validate confirm password

function validatePassCon() {
  let pass = userPassword.val();
  let conPass = confirmPassword.val();
  let bool = true;

  if (conPass === "") {
    confirmPassword.addClass("border-danger");
    confirmPasswordErr.text("This field is required").slideDown();

    bool = false;
  } else if (conPass !== pass) {
    confirmPassword.addClass("border-danger");
    confirmPasswordErr.text("Password Didnt Match").slideDown();

    bool = false;
  } else {
    confirmPassword.removeClass("border-danger");
    confirmPasswordErr.slideUp();
  }

  return bool;
}

// validate account type

function validateAccountType() {
  let bool = true;

  if (accountType.val() === "") {
    accountType.addClass("border-danger");
    accountTypeErr.slideDown();
    bool = false;
  } else {
    accountType.removeClass("border-danger");
    accountTypeErr.slideUp();
  }

  return bool;
}

// clear form

function clearForm() {
  userName.val("");
  userEmail.val("");
  userPassword.val("");
  accountType.val("");
  confirmPassword.val("");
}

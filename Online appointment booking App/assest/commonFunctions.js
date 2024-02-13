function validate(email, pass) {
  let bool = true;

  if (!validateEmail(email)) {
    bool = false;
    $("#LoginEmail").addClass("border-danger");
    $("#error-email-login").slideDown();
  } else {
    $("#LoginEmail").removeClass("border-danger");
    $("#error-email-login").slideUp();
  }

  if (!validatePass(pass)) {
    bool = false;
    $("#error-password-login").slideDown();
    $("#LoginPassword").addClass("border-danger");
  } else {
    $("#error-password-login").slideUp();
    $("#LoginPassword").removeClass("border-danger");
  }
  return bool;
}

function validateEmail(email) {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (regex.test(email)) {
    return true;
  }

  return false;
}

function validatePass(pass) {
  let regex = /\w{8}/;

  if (regex.test(pass)) {
    return true;
  }

  return false;
}

function getLocalStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName));
}

function setLocalStorage(storageName, storageItem) {
  return localStorage.setItem(storageName, JSON.stringify(storageItem));
}

function getSessionStorage(storageName) {
  return JSON.parse(sessionStorage.getItem(storageName));
}
function setSessionStorage(storageName, storageItem) {
  return sessionStorage.setItem(storageName, JSON.stringify(storageItem));
}

function redirect(user) {
  if (user.type === "doctor") {
    window.location.href = "./doctor/dashboard.html";
  } else {
    window.location.href = "./patient/dashboard.html";
  }
}

function addClass() {
  $("a").addClass("text-dark pt-2 pb-1 m-1");

  $("#links div")
    .addClass("rounded p-3")
    .hover(
      function () {
        $(this).addClass("bg-dark text-light");
      },
      function () {
        $(this).removeClass("bg-dark text-light");
      }
    );
}

const loginBTN = `
      <a href="../index.html">
        <button class="btn btn-dark mt-3">Login</button>
      </a>`;

const badReq =
  '<h1 class="text-center">Something is wrong please login...</h1>' + loginBTN;
const noLogin =
  '<h1 class="text-center">You are not logged in please login first...</h1>' +
  loginBTN;

export {
  validate,
  validatePass,
  validateEmail,
  getLocalStorage,
  setLocalStorage,
  getSessionStorage,
  setSessionStorage,
  redirect,
  addClass,
  loginBTN,
  badReq,
  noLogin,
};

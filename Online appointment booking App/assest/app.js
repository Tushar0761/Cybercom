import * as commonFunctions from "./commonFunctions.js";

// Show Help ICON---------------------------

$("#helpIcon").click(() => {
  $("#passwordHelp").fadeIn("fast");

  setTimeout(() => {
    $("#passwordHelp").fadeOut("slow");
  }, 4000);
});

// LOGIN CLicked ---------------------------

$("#loginBtn").click(() => {
  let email = $("#LoginEmail").val();
  let pass = $("#LoginPassword").val();

  if (!commonFunctions.validate(email, pass)) {
    return;
  }

  handleLogin(email, pass);
});

// Handle login---------------------------

function handleLogin(email, pass) {
  let USER_LIST = commonFunctions.getLocalStorage("USER_LIST");

  if (USER_LIST === undefined || USER_LIST === null) {
    alert("NO user data found please register first");
    return;
  }

  let user = USER_LIST.find((u) => {
    if (u.email === email) {
      if (u.pass === pass) return u;
      else {
        alert("User Id and Password didnt match...");
        return true;
      }
    }
  });

  if (user === undefined) {
    alert("User is not present, please check credentials.");
  } else if (user !== true) {
    commonFunctions.setSessionStorage("CURRENT_USER", user);
    commonFunctions.redirect(user);
  }
}

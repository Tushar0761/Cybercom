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
  //get updated user list from registrations

  let USER_LIST = commonFunctions.getLocalStorage("USER_LIST");

  //if no user list found then ask to register

  if (USER_LIST === undefined || USER_LIST === null) {
    alert("NO user data found please register first");
    return;
  }

  //if user list found then search for user

  let user = USER_LIST.find((u) => {
    if (u.email === email) {
      //user found and now match password

      if (u.pass === pass) return u;
      else {
        // wrong password for that user

        alert("User Id and Password didnt match...");
        return true;
      }
    }
  });

  //if user is not found in list then return
  if (user === undefined) {
    alert("User is not present, please check credentials.");
  } else if (user !== true) {
    //store user data to session storage and now login

    commonFunctions.setSessionStorage("CURRENT_USER", user);
    commonFunctions.redirect(user);
  }
}

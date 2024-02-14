import * as commonFunc from "../assest/commonFunctions.js";

//---------------------- Load User

let USER_LIST = commonFunc.getLocalStorage("USER_LIST");
let CURRENT_USER = checkLogin();

//---------------------- Check login

function checkLogin() {
  let currentUser = commonFunc.getSessionStorage("CURRENT_USER");

  if (
    currentUser === null ||
    currentUser === undefined ||
    currentUser === "undefined"
  ) {
    // no user list found...

    $("body").html(commonFunc.badReq);

    return false;
  } else if (!Object.keys(currentUser).length) {
    // no login found

    $("body").html(commonFunc.noLogin);

    return false;
  } else {
    // login found name placed

    if (!isDoctor(currentUser)) {
      return false;
    } else {
      $("#userName").text(currentUser.name);
      return currentUser;
    }
  }
}

//button functions

$(document).ready(() => {
  if (!checkLogin()) {
    return;
  } else {
    updatedUser();
    //----------------------Load Apoointments again

    showAppointments();
  }
  //----------------------Check is it a doctor or not
});
//------ Update user function

function updatedUser() {
  //----------------------Find updated user

  let updatedUser = USER_LIST.find((user) => {
    if (user.id === CURRENT_USER.id) {
      return user;
    }
  });

  //---------------------- Replace updated user to global and set in session storage
  CURRENT_USER = updatedUser;
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
}

//----------------------Check for user is doctor or not
function isDoctor(currentUser) {
  if (currentUser.type === "doctor") {
    return true;
  } else if (currentUser.type === "patient") {
    $("body").html(`
    <div
        class="container border rounded bg-white text-center border-danger shadow"
      >
        <h2>You dont have access to view this page.</h2>
        <h4>
          you are patient, go to patient dashboard

          <a href="../patient/dashboard.html" class="btn btn-primary"
            >Patient Dashboard</a
          >
        </h4>
      </div>
    `);

    return false;
  } else {
    $("body").html(commonFunc.noLogin);
    return false;
  }
}

// Adding Styles and logout handler also doctor list

commonFunc.addClass();

$("#logout").click(logoutHandler);

function logoutHandler() {
  commonFunc.setSessionStorage("CURRENT_USER", {});
  window.location.href = "../";
}

//add appointment button clicked
function acceptAppointment(id) {
  //----------------------Accepting appointment in both patient and doctor

  USER_LIST.map((user) => {
    user.appointment.map((app) => {
      if (app.id === id) {
        app.status = "Accepted";
      }
    });
  });

  //---------------------- replace button to message

  $(`#btnDiv-${id}`).html(
    "<span class='bg-success text-white p-1 rounded'>Accepted</span>"
  );

  //----------------------Save data to storage

  commonFunc.setLocalStorage("USER_LIST", USER_LIST);
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
}

function rejectAppointment(id) {
  //----------------------Rejecting appointment in both patient and doctor

  USER_LIST.map((user) => {
    user.appointment.map((app) => {
      if (app.id === id) {
        app.status = "Rejected";
      }
    });
  });

  //---------------------- replace button to message

  $(`#btnDiv-${id}`).html(
    "<span class='bg-danger text-white p-1 rounded'>Rejected</span>"
  );

  //----------------------Save data to storage

  commonFunc.setLocalStorage("USER_LIST", USER_LIST);
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
}

//----------------------Appointment function

function showAppointments() {
  updatedUser();

  //---------------------- select div

  let div = $("#appointmentDiv");

  //----------------------Empty div

  div.html("");

  if (CURRENT_USER.appointment.length === 0) {
    //---------------------- Check for no appointments

    div.html(`<h3 class="text-center">No patient Appointments for now</h3>`);
  } else {
    //----------------------iterate to all appointmetns

    CURRENT_USER.appointment.forEach((appointment) => {
      //---------------------- Add accept and reject message
      let btnDiv = btnStyles(appointment);

      //---------------------- make card div

      let card = `<div
            id="appointmentCard"
            class="border rounded bg-white p-1 m-1 d-flex flex-wrap shadow"
          >
            <div class="d-flex col-12">
              <div class="fw-bold col-9 col-md-7 ">
                Patient : <b>${appointment.patientName}</b>
              </div>
              <div class="status col-4 d-flex" id="btnDiv-${appointment.id}">
                ${btnDiv}
              </div>
            </div>
            <div class="col-12">Reason: ${appointment.reason}</div>
            <div class="col-12 text-secondary">${appointment.date}</div>
          </div>
        </div> `;

      div.append(card);

      //Select buttons and Add event listener
      $(`#acceptBtn-${appointment.id}`).click(() =>
        acceptAppointment(appointment.id)
      );

      $(`#rejectBtn-${appointment.id}`).click(() =>
        rejectAppointment(appointment.id)
      );
    });
  }
}

function btnStyles(appointment) {
  let btnDiv;

  if (appointment.status === "Pending") {
    btnDiv = `<div class="m-1">
                  <button id="acceptBtn-${appointment.id}" class="btn btn-success" 

                  >Accept</button>
                </div>
                <div class="m-1">
                  <button class="btn btn-danger"
                  id="rejectBtn-${appointment.id}"               
                  >Reject</button>
                </div>`;
  } else if (appointment.status === "Accepted") {
    //---------------------- Remove button to msg accepted

    btnDiv = `<span class='bg-success text-white p-1 rounded'>Accepted</span>`;
  } else {
    //---------------------- Remove button to msg rejected

    btnDiv = `<span class='bg-danger text-white p-1 rounded'>Rejected</span>`;
  }
  return btnDiv;
}

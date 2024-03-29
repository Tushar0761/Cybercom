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
    $("body").html(badRequest);

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

function checkAvailibility(appointmentId) {
  let isDoctorAvailable = true;

  console.log(CURRENT_USER);

  let currentAppointment = CURRENT_USER.appointment.find(
    (appoint) => appoint.id === appointmentId
  );
  console.log(currentAppointment);

  CURRENT_USER.appointment.forEach((appoint) => {
    if (
      appointmentId !== appoint.id &&
      appoint.date === currentAppointment.date &&
      appoint.status === "Accepted"
    ) {
      isDoctorAvailable = false;
    }
  });

  return isDoctorAvailable;
}

//add appointment button clicked
function acceptAppointment(id) {
  //----------------------Accepting appointment in both patient and doctor

  if (!checkAvailibility(id)) {
    alert("Another Patients Appointment is booked on that time.");
    return;
  }

  USER_LIST.map((user) => {
    user.appointment.map((app) => {
      if (app.id === id) {
        app.status = "Accepted";
      }
    });
  });

  //---------------------- replace button to message

  $(`#btnDiv-${id}`).html(
    "<div class='bg-success text-white p-1 rounded'>Accepted</div>"
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
    "<div class='bg-danger text-white p-1 rounded'>Rejected</div>"
  );

  //----------------------Save data to storage

  commonFunc.setLocalStorage("USER_LIST", USER_LIST);
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
}

function rescheduleAppointment(id) {
  //----------------------Asking user to reschedule appointment in both patient and doctor

  USER_LIST.map((user) => {
    user.appointment.map((app) => {
      if (app.id === id) {
        app.status = "Ask For Reschedule";
      }
    });
  });

  //---------------------- replace button to message

  $(`#btnDiv-${id}`).html(
    "<div class='bg-info text-white p-1 rounded'>Reschedule Asked</div>"
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

      let card = `
                   
<div
  id="appointmentCard-${appointment.id}"
  class="border rounded bg-white p-1 m-1 mb-3 d-flex  shadow"
>
  <div class="col-8">
    <table class="table ">
        
    <tr>
<th  class="col-3">Reason :</th>
<td>${appointment.reason}</td>
</tr>

    <tr>
          <th class="col-3">Patient :</th>
          <td>${appointment.patientName}</td>
      </tr>


      <tr     id="appointmentDate-${appointment.id}">
       
          <td colspan="2">${appointment.date}</td>
      </tr>
    </table>
  </div>

  <div  id="btnDiv-${appointment.id}" class="col-4 col-md-3">
                ${btnDiv}
</div> `;

      div.append(card);

      //Select buttons and Add event listener
      $(`#acceptBtn-${appointment.id}`).click(() =>
        acceptAppointment(appointment.id)
      );

      $(`#rejectBtn-${appointment.id}`).click(() =>
        rejectAppointment(appointment.id)
      );
      $(`#reschedule-${appointment.id}`).click(() =>
        rescheduleAppointment(appointment.id)
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
                </div>
                <div class="m-1">
                  <button class="btn btn-info"
                  id="reschedule-${appointment.id}"               
                  >Reschedule</button>
                </div>`;
  } else if (appointment.status === "Accepted") {
    //---------------------- Remove button to msg accepted

    btnDiv = `<div class='bg-success text-white p-1 rounded'>Accepted</div>`;
  } else if (appointment.status === "Ask For Reschedule") {
    //---------------------- Remove button to msg accepted

    btnDiv = `<div class='bg-info text-white p-1 rounded'>Ask For Reschedule</div>`;
  } else {
    //---------------------- Remove button to msg rejected

    btnDiv = `<div class='bg-danger text-white p-1 rounded'>Rejected</div>`;
  }
  return btnDiv;
}

const badRequest = `
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
    `;

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
    if (!isPatient(currentUser)) {
      return false;
    } else {
      $("#userName").text(currentUser.name);

      return currentUser;
    }
  }
}

// all reload refresh session storage

$(document).ready(() => {
  if (!checkLogin()) {
    return;
  } else {
    updatedUser();

    //----------------------Load Apoointments again
    showAppointments();

    //---------------applying blur
  }
});

//--------- reason blur validation check

$("#reason").blur(() => {
  validateReason($("#reason").val());
});

//--------- date blur validation check

$("#appointmentDate").blur(() => {
  validateDateTime($("#appointmentDate").val(), $("#appointmentTime").val());
  checkAvailability();
});

//--------- time blur validation check
$("#appointmentTime").blur(() => {
  validateDateTime($("#appointmentDate").val(), $("#appointmentTime").val());
  checkAvailability();
});

//--------- doctor blur validation check

$("#selectDoctor").blur(() => {
  validateDoctor($("#selectDoctor").val());
  checkAvailability();
});

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

function isPatient(currentUser) {
  if (currentUser.type === "patient") {
    return true;
  } else if (currentUser.type === "doctor") {
    $("body").html(`
    <div
        class="container border rounded bg-white text-center border-danger shadow"
      >
        <h2>You dont have access to view this page.</h2>
        <h4>
          you are Doctor, go to Doctor dashboard

          <a href="../doctor/dashboard.html" class="btn btn-primary"
            >Doctor Dashboard</a
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
addDoctorList();

$("#logout").click(logoutHandler);

function logoutHandler() {
  commonFunc.setSessionStorage("CURRENT_USER", {});
  window.location.href = "../";
}

//add appointment button clicked

// show appointment form

$("#addBtn").click(() => {
  $("#hiddenForm").slideDown();
});

// focus out handler

// hide appointment form

$("#cancleBtn").click(() => {
  $("#hiddenForm").slideUp();
});

//book button clicked
$("#bookBtn").click(bookAppointment);

function bookAppointment() {
  //taking values

  let reason = $("#reason").val();
  let date = $("#appointmentDate").val();
  let doctor = $("#selectDoctor").val();
  let time = $("#appointmentTime").val();

  //validating values
  if (validateAppointment(reason, date, doctor, time)) {
    //booking appointment using validated values

    addAppointment(reason, date, doctor, time);

    //clearing form values

    $("#reason").val("");
    $("#selectDoctor").val("");

    //hiding form

    $("#hiddenForm").slideUp();
  }
}

//appointment booking function

function addAppointment(reason, date, doctor, time) {
  //creating appointment details object

  let appointmentObject = {
    id: new Date().getTime(),
    reason: reason,
    date: date + " " + time,
    doctorId: doctor.split(" ")[0],
    doctorName: doctor.split(" ").slice(1).join(" "),
    patientId: CURRENT_USER.id,
    patientName: CURRENT_USER.name,
    status: "Pending",
  };

  //updating user list

  USER_LIST = commonFunc.getLocalStorage("USER_LIST");
  //adding object to user list and current user

  USER_LIST.map((user) => {
    if (
      user.id === appointmentObject.doctorId ||
      user.id === appointmentObject.patientId
    ) {
      user.appointment.unshift(appointmentObject);
    }
  });

  //storing user list and current list

  commonFunc.setLocalStorage("USER_LIST", USER_LIST);
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
  showAppointments();
}

//validate function

function validateAppointment(reason, date, doctor, time) {
  let bool = true;

  bool = validateReason(reason) && bool;
  bool = validateDoctor(doctor) && bool;
  bool = validateDateTime(date, time) && bool;

  bool = checkAvailability() && bool;

  return bool;
}

//----------------check availibility of doctor

function checkAvailability() {
  let date = $("#appointmentDate").val();
  let doctor = $("#selectDoctor").val();
  let time = $("#appointmentTime").val();

  let doctorId = doctor.split(" ")[0];

  let doctorObject = USER_LIST.find((obj) => obj.id === doctorId);

  if (doctorObject) {
    let isDoctorBusy = false;

    doctorObject.appointment.filter((appoint) => {
      if (appoint.date === date + " " + time) {
        isDoctorBusy = true;
      }
    });

    if (isDoctorBusy) {
      $("#error-available")
        .text(
          "Doctor is busy on that date and time. Please Choose different appointment time."
        )
        .slideDown();

      return false;
    }
  }
  // dumy false

  return true;
}

//------------------ validate doctor is selected or not

function validateDoctor(doctor) {
  if (!validate(doctor)) {
    $("#error-doctor").slideDown();

    return false;
  } else {
    $("#error-doctor").slideUp();
    return true;
  }
}

//------------------ validate date time required

function validateDateTime(date, time) {
  if (!validate(date) || !validateWorkingHours(time)) {
    $("#error-available").slideDown();
    return false;
  } else {
    $("#error-available").slideUp();
    return true;
  }
}

//------------------ validate working hours 9-6

function validateWorkingHours(time) {
  time = time.split(":");

  if (time[0] >= "09" && time[0] <= "17") {
    return true;
  } else {
    $("#error-available")
      .text("Please select appointment time between 9:00 AM to 6:00 PM")
      .slideDown();
    return false;
  }
}

//------------------ validate Reason

function validateReason(reason) {
  if (!validate(reason)) {
    $("#error-reason").slideDown();
    return false;
  } else {
    $("#error-reason").slideUp();
    return true;
  }
}

//validate string

function validate(str) {
  if (str === "") return false;
  return true;
}

//filtering doctor

function addDoctorList() {
  let filterDoctorList = USER_LIST.filter((user) => {
    if (user.type === "doctor") return user;
  });

  filterDoctorList.forEach((doctor) => {
    $("#selectDoctor").append(
      `<option value="${doctor.id + " " + doctor.name}">
      ${doctor.name}
      </option>`
    );
  });
}

//----------------------Appointment function

function showAppointments() {
  //---------------------- Update the current User
  updatedUser();

  //---------------------- select div

  let div = $("#appointmentDiv");

  //----------------------Empty div

  div.html("");

  if (CURRENT_USER.appointment.length === 0) {
    //---------------------- Check for no appointments

    div.html(`<h3 class="text-center">You have no Doctor Appointments</h3>`);
  } else {
    CURRENT_USER.appointment.map((appointment) => {
      //----------------------iterate to all appointmetns

      //----------------------define colour for message

      let colorClass;

      if (appointment.status === "Pending") {
        colorClass = "bg-warning text-dark";
      } else if (appointment.status === "Rejected") {
        colorClass = "bg-danger";
      } else {
        colorClass = "bg-success";
      }

      //---------------------- make card div

      let card = `   <div
         id="appointmentCard"
         class="border rounded bg-white p-1 m-1 d-flex flex-wrap shadow"
         >
         <div class="d-flex col-12">
         <div class="fw-bold col-9 col-md-8">Doctor : <b>${appointment.doctorName}</b></div>
         <div class="status ">
         Status: <span id="status" class=" text-white ${colorClass} p-1 rounded">${appointment.status}</span>
         </div>
         </div>
         <div class="col-12">Reason:${appointment.reason}</div>
         <div class="col-12 text-secondary">${appointment.date}</div>
         </div>`;

      div.append(card);
    });
  }
}

import * as commonFunc from "../assest/commonFunctions.js";

const CURRENT_USER = initial_current_user();
const USER_LIST = commonFunc.getLocalStorage("USER_LIST");

function initial_current_user() {
  let currentUser = commonFunc.getSessionStorage("CURRENT_USER");

  if (currentUser === null || currentUser === undefined) {
    // no user list found...

    $("body").html(commonFunc.badReq);
  } else if (!Object.keys(currentUser).length) {
    // no login found

    $("body").html(commonFunc.noLogin);
  } else {
    // login found name placed

    $("#userName").text(currentUser.name);
    return currentUser;
  }
}

// Adding Styles and logout handler also doctor list

commonFunc.addClass();
addDoctorList();

showAppointments();

$("#logout").click(logoutHandler);

function logoutHandler() {
  commonFunc.setSessionStorage("CURRENT_USER", {});
  window.location.href = "../";
}
//add appointment button clicked

$("#addBtn").click(() => {
  $("#hiddenForm").slideDown();
});

//book button clicked
$("#bookBtn").click(bookAppointment);

function bookAppointment() {
  //taking values

  let reason = $("#reason").val();
  let date = $("#appointmentDate").val();
  let doctor = $("#selectDoctor").val();

  //validating values
  if (validateAppointment(reason, date, doctor)) {
    //booking appointment using validated values

    addAppointment(reason, date, doctor);

    //clearing form values

    $("#reason").val("");
    $("#appointmentDate").val("");
    $("#selectDoctor").val("");

    //hiding form

    $("#hiddenForm").slideUp();
  } else {
    //form validation return false

    alert("Please provide all details...");
  }
}

//appointment booking function

function addAppointment(reason, date, doctor) {
  //creating appointment details object

  let appointmentObject = {
    id: new Date().getTime(),
    reason: reason,
    date: date,
    doctorId: doctor.split(" ")[0],
    doctorName: doctor.split(" ").slice(1).join(" "),
    patientId: CURRENT_USER.id,
    patientName: CURRENT_USER.name,

    status: "Pending",
  };

  //adding object to user list and current user

  CURRENT_USER.appointment.push(appointmentObject);

  USER_LIST.map((user) => {
    if (
      user.id === appointmentObject.doctorId ||
      user.id === appointmentObject.patientId
    ) {
      user.appointment.push(appointmentObject);
    }
  });

  showAppointments();

  //storing user list and current list

  commonFunc.setLocalStorage("USER_LIST", USER_LIST);
  commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
}

//validate function

function validateAppointment(reason, date, doctor) {
  let bool = true;
  bool = validate(reason) && validate(date) && validate(doctor);

  return bool;
}

//validate string

function validate(str) {
  if (str === "") {
    return false;
  } else {
    return true;
  }
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

function showAppointments() {
  let div = $("#appointmentDiv");

  div.html("");

  if (CURRENT_USER.appointment.length === 0) {
    div.html(`<h3 class="text-center">No appointment for now</h3>`);
  } else {
    CURRENT_USER.appointment.forEach((appointment) => {
      console.log(appointment);
      let card = `   <div
         id="appointmentCard"
         class="border rounded bg-white p-1 m-1 d-flex flex-wrap"
         >
         <div class="d-flex col-12">
         <div class="fw-bold col-6">Doctor : <b>${appointment.doctorName}</b></div>
         <div class="status col-6">
         Status: <span id="status" class="text-warning">${appointment.status}</span>
         </div>
         </div>
         <div class="col-12">Reason:${appointment.reason}</div>
         <div class="col-12 text-secondary">${appointment.date}</div>
         </div>`;

      div.append(card);
    });
  }
}

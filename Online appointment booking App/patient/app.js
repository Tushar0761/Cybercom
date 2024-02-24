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
//reschedule button

let rescheduleAppointment = (appointmentId, appointmentObject) => {
  let dateDiv = $(`#appointmentDate-${appointmentId}`);

  dateDiv.html(`<td
  colspan="2"
              class="border border-danger p-1 shadow"
            >
            <div class="d-flex flex-wrap">
              <div class="col-12 text-dark">Appointment Date & Time :</div>
              <div class="col-4 col-md-6">
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="appointmentRescheduleDate-${appointmentId}"
                  value="${appointmentObject.date.split(" ")[0]}"
                />
              </div>
              <div class="col-3">
                <input type="time" id="appointmentRescheduleTime-${appointmentId}" class="form-control form-control-sm 
                form-select form-select-sm " min="09:00" max="18:00" value="${
                  appointmentObject.date.split(" ")[1]
                }" / >
              </div>
              <div>
<button class="btn btn-success" id="change-${appointmentId}"> Change</button>
</div>
            </div>

              
            </td>`);

  console.log($(`#change-${appointmentId}`));

  $(`#change-${appointmentId}`).click(() => {
    let newDate = $(`#appointmentRescheduleDate-${appointmentId}`);
    let newTime = $(`#appointmentRescheduleTime-${appointmentId}`);

    USER_LIST = commonFunc.getLocalStorage("USER_LIST");

    newDate = newDate.val() + " " + newTime.val();

    CURRENT_USER.appointment.map((appoint) => {
      if (appoint.id === appointmentId) {
        appoint.status = "Pending";
        appoint.date = newDate;
      }
    });

    USER_LIST.forEach((user) => {
      if (
        user.id === appointmentObject.doctorId ||
        user.id === appointmentObject.patientId
      ) {
        user.appointment.map((appoint) => {
          if (appoint.id === appointmentId) {
            appoint.date = newDate;
            appoint.status = "Pending";
          }
        });
      }
    });

    commonFunc.setLocalStorage("USER_LIST", USER_LIST);
    commonFunc.setSessionStorage("CURRENT_USER", CURRENT_USER);
    showAppointments();
  });
};

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

//-------------

//taking values

let reasonInput = $("#reason");
let dateInput = $("#appointmentDate");
let doctorInput = $("#selectDoctor");
let timeInput = $("#appointmentTime");

//--------- reason blur validation check

reasonInput.blur(() => {
  validateReason(reasonInput.val());
});

//--------- date blur validation check

dateInput.blur(() => {
  validateDateTime(dateInput.val(), timeInput.val());
  checkAvailability(dateInput.val(), doctorInput.val(), timeInput.val());
});

//--------- time blur validation check
timeInput.blur(() => {
  validateDateTime(dateInput.val(), timeInput.val());
  checkAvailability(dateInput.val(), doctorInput.val(), timeInput.val());
});

//--------- doctor blur validation check

doctorInput.blur(() => {
  validateDoctor(doctorInput.val());
  checkAvailability(dateInput.val(), doctorInput.val(), timeInput.val());
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
  //validating values
  if (
    validateAppointment(
      reasonInput.val(),
      dateInput.val(),
      doctorInput.val(),
      timeInput.val()
    )
  ) {
    //booking appointment using validated values

    addAppointment(
      reasonInput.val(),
      dateInput.val(),
      doctorInput.val(),
      timeInput.val()
    );

    //clearing form values

    reasonInput.val("");
    doctorInput.val("");

    //hiding form

    $("#hiddenForm").slideUp();
  }
}

//appointment booking function

function addAppointment(reasonValue, dateValue, doctorValue, timeValue) {
  //creating appointment details object

  let appointmentObject = {
    id: new Date().getTime(),
    reason: reasonValue,
    date: dateValue + " " + timeValue,
    doctorId: doctorValue.split(" ")[0],
    doctorName: doctorValue.split(" ").slice(1).join(" "),
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

function validateAppointment(reasonValue, dateValue, doctorValue, timeValue) {
  let bool = true;

  bool = validateReason(reasonValue) && bool;
  bool = validateDoctor(doctorValue) && bool;
  bool = validateDateTime(dateValue, timeValue) && bool;

  bool = checkAvailability(dateValue, doctorValue, timeValue) && bool;

  return bool;
}

//----------------check availibility of doctor

function checkAvailability(dateValue, doctorValue, timeValue) {
  let doctorId = doctorValue.split(" ")[0];

  let doctorObject = USER_LIST.find((obj) => obj.id === doctorId);

  if (doctorObject) {
    let isDoctorBusy = false;

    doctorObject.appointment.filter((appoint) => {
      console.log(appoint);
      if (
        appoint.date === dateValue + " " + timeValue &&
        appoint.status === "Accepted"
      ) {
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

function validateDoctor(doctorValue) {
  if (!validate(doctorValue)) {
    $("#error-doctor").slideDown();

    return false;
  } else {
    $("#error-doctor").slideUp();
    return true;
  }
}

//------------------ validate date time required

function validateDateTime(dateValue, timeValue) {
  if (!validate(dateValue) || !validateWorkingHours(timeValue)) {
    $("#error-available").slideDown();
    return false;
  } else {
    $("#error-available").slideUp();
    return true;
  }
}

//------------------ validate working hours 9-6

function validateWorkingHours(timeValue) {
  timeValue = timeValue.split(":");

  if (timeValue[0] >= "09" && timeValue[0] <= "17") {
    return true;
  } else {
    $("#error-available")
      .text("Please select appointment time between 9:00 AM to 6:00 PM")
      .slideDown();
    return false;
  }
}

//------------------ validate Reason

function validateReason(reasonValue) {
  if (!validate(reasonValue)) {
    $("#error-reason").slideDown();
    return false;
  } else {
    $("#error-reason").slideUp();
    return true;
  }
}

//validate string

function validate(value) {
  if (value === "") return false;
  return true;
}

//filtering doctor

function addDoctorList() {
  let filterDoctorList = USER_LIST.filter((user) => {
    if (user.type === "doctor") return user;
  });

  filterDoctorList.forEach((doctor) => {
    doctorInput.append(
      `<option value="${doctor.id + " " + doctor.name}">
      ${doctor.name}
      </option>`
    );
  });
}

//---------------------rescheduleAppointment

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
      let rescheduleBtn = `
        <div class="m-1">
          <button class="btn btn-success shadow" id="rescheduleBtn-${appointment.id}">
            Reschedule Now
          </button>
        </div>`;

      if (appointment.status === "Pending") {
        colorClass = "bg-warning text-dark";
      } else if (appointment.status === "Rejected") {
        colorClass = "bg-danger";
      } else if (appointment.status === "Ask For Reschedule") {
        colorClass = "bg-info";
      } else {
        colorClass = "bg-success";
      }

      //---------------------- make card div

      let card = `
<div
  id="appointmentCard-${appointment.id}"
  class="border rounded bg-white p-1 m-1 d-flex  shadow"
>
  <!-- tablee -->
  <div class="col-8">
    <table class="table ">
        
    <tr>
<th  class="col-3">Reason :</th>
<td>${appointment.reason}</td>
</tr>

    <tr>
          <th class="col-3">Doctor :</th>
          <td>${appointment.doctorName}</td>
      </tr>


      <tr     id="appointmentDate-${appointment.id}">
       
          <td colspan="2">${appointment.date}</td>
      </tr>
    </table>
  </div>

  <div class="col-4 col-md-3">
    <div id="status" class="status text-white ${colorClass} p-1 rounded ">
        ${appointment.status}
        </div>
        ${appointment.status === "Ask For Reschedule" ? rescheduleBtn : ""}
        </div>
</div>

`;

      div.append(card);

      if (appointment.status === "Ask For Reschedule") {
        $(`#rescheduleBtn-${appointment.id}`).click(() => {
          rescheduleAppointment(appointment.id, appointment);
        });
      }
    });
  }
}

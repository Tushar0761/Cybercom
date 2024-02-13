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
//button functions

// Adding Styles and logout handler also doctor list

commonFunc.addClass();

function acceptAppointment(id) {
  console.log(id);

  USER_LIST.map((user) => {
    if (user.appointment.id === id) {
    }
  });
}
function rejectAppointment(id) {}

$(document).ready(() => {
  showAppointments();
});

$("#logout").click(logoutHandler);

function logoutHandler() {
  commonFunc.setSessionStorage("CURRENT_USER", {});
  window.location.href = "../";
}

//add appointment button clicked
function dummy() {
  console.log("dummy");
}

function showAppointments() {
  let div = $("#appointmentDiv");

  div.html("");

  if (CURRENT_USER.appointment.length === 0) {
    div.html(`<h3 class="text-center">No appointment for now</h3>`);
  } else {
    CURRENT_USER.appointment.forEach((appointment) => {
      let card = `<div
            id="appointmentCard"
            class="border rounded bg-white p-1 m-1 d-flex flex-wrap"
          >
            <div class="d-flex col-12">
              <div class="fw-bold col-6">
                Patient : <b>${appointment.patientName}</b>
              </div>
              <div class="status col-4 d-flex">
                <div class="m-1">
                  <button id="${appointment.id}" class="btn btn-success" 
                    onclick="acceptAppointment('${appointment.id}')"

                  >Accept</button>
                </div>
                <div class="m-1">
                  <button class="btn btn-danger"
                  id="${appointment.id}"
                  onclick="rejectAppointment('${appointment.id}')"
                  
                  >Reject</button>
                </div>
              </div>
            </div>
            <div class="col-12">Reason: ${appointment.reason}</div>
            <div class="col-12 text-secondary">${appointment.date}</div>
          </div>
        </div> `;
      div.append(card);
    });
  }
}

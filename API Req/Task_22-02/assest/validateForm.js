"use strict";

function validateForm() {
  let bool = true;

  validateAreaString.forEach((area) => {
    bool = validate(area[0], area[1], area[2], area[3]) && bool;
  });
  validateAreaWithRange.forEach((area) => {
    bool = validateWithRange(area[0], area[1], area[2], area[3]) && bool;
  });

  bool = genderRadioInputHandler() && bool;

  return bool;
}

function validate(inputField, errorArea, errorMsg, regex) {
  let validation = false;

  let inputValue = $(inputField).val();

  validation = regex.test(inputValue);

  toggleErrorMsg(!validation, errorArea, errorMsg, inputField);

  return validation;
}

function clearForm() {
  $("#addUserFirstName").val("");
  $("#addUserLastName").val("");
  $("#addUserUsername").val("");
  $("#addUserHeight").val("");
  $("#addUserWeight").val("");
  $("input[name='gender']").prop("checked", false);
}

function genderRadioInputHandler() {
  let validation = false;

  let genderRadioInput = $("input[name='gender']:checked");

  validation = genderRadioInput.length > 0;

  toggleErrorMsg(!validation, "#gender-error-alert", "Please select");

  return validation;
}

function toggleErrorMsg(error, errorArea, errorMsg, inputField) {
  if (error) {
    $(errorArea).hide().text(errorMsg).removeClass("d-none").slideDown();

    $(inputField).addClass("border-danger");
  } else {
    $(errorArea).slideUp();
    $(inputField).removeClass("border-danger");
  }
}

function validateWithRange(inputField, errorArea, errorMsg, range) {
  let validation = false;

  let inputValue = $(inputField).val();

  validation = inputValue >= range[0] && inputValue <= range[1];

  toggleErrorMsg(!validation, errorArea, errorMsg, inputField);

  return validation;
}

//validate areas
let validateAreaWithRange = [
  [
    "#addUserHeight",
    "#height-error-alert",
    "Height must be between 50 and 300 cm",
    [50, 300],
  ],
  [
    "#addUserWeight",
    "#weight-error-alert",
    "Weight must be between 3 and 500 kg",
    [3, 500],
  ],
];

let validateAreaString = [
  [
    "#addUserFirstName",
    "#name-error-alert",
    "Name cannot contains any number or space",
    /^[^\d\s]+$/,
  ],
  [
    "#addUserLastName",
    "#name-error-alert",
    "Name cannot contains any number or space",
    /^[^\d\s]+$/,
  ],
  [
    "#addUserUsername",
    "#username-error-alert",
    "Username cannot contains any space",
    /^[^\s]+$/,
  ],
];

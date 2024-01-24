$("#txtFirstName ").blur(validateName);
$("#txtLastName ").blur(validateName);
$("#emailPatient").blur(validateEmail);
$("#numPatientHeight").blur(validateHeight);
$("#numPatientWeight").blur(validateWeight);
$("#slDay , #slYear , #slMonth").blur(validateDOB);
$("#slGender").blur(validateGender);
$("#txtReason").blur(validateReason);

function validateGender() {
  let bool = true;
  let genderInput = $("#slGender");
  if (genderInput.val() == "") {
    bool = false;
    $("#slGender").addClass("border-danger");
    $("#gender-error-msg").slideDown(400).text("This field is required.");
  } else {
    $("#slGender").removeClass("border-danger");
    $("#gender-error-msg").slideUp(400).text("");
  }
  return bool;
}
function validateDOB() {
  let bool = true;
  if ($("#slDay").val() == "") {
    bool = false;
  } else if ($("#slYear").val() == "") {
    bool = false;
  } else if ($("#slMonth").val() == "") {
    bool = false;
  }
  if (!bool) {
    $("#slDay , #slYear , #slMonth").addClass("border-danger");
  } else {
    $("#slDay , #slYear , #slMonth").removeClass("border-danger");
  }
  return bool;
}
function validateReason() {
  let bool = true;

  if ($("#txtReason").val() == "") {
    bool = false;
    $("#reason-error-msg").slideDown(400).text("This field is required.");
    $("#txtReason").addClass("border-danger");
  } else {
    $("#txtReason").removeClass("border-danger");
    $("#reason-error-msg").slideUp(400).text("");
  }
  return bool;
}

function validateString(str) {
  let regex = /^[A-Za-z]+/;
  return regex.test(str);
}

function validateName() {
  if (!validateString($(this).val())) {
    $(this).addClass("border-danger");
    $("#name-error-msg").slideDown(400).text("Name is invalid");
  } else {
    $(this).removeClass("border-danger");

    $("#name-error-msg").slideUp(400);
  }
}

function validateHeight() {
  let heightInput = $("#numPatientHeight");
  let errorBox = $("#height-error-msg");
  if (heightInput.val() > 250) {
    heightInput.addClass("border-danger");

    errorBox
      .slideDown(400)
      .text("Height is too much. please provide right height");
    $("numPatientHeight");
    return false;
  } else if (heightInput.val() < 0) {
    heightInput.addClass("border-danger");
    errorBox.slideDown(400).text("Height can not be negative");
    return false;
  } else if (heightInput.val() == "") {
    heightInput.addClass("border-danger");
    errorBox.slideDown(400).text("This field is required");
    return false;
  } else {
    heightInput.removeClass("border-danger");
    errorBox.slideUp(400);
    return true;
  }
}

function validateWeight() {
  let weightInput = $("#numPatientWeight");
  let errorMSG = $("#weight-error-msg");
  if (weightInput.val() > 250) {
    errorMSG
      .slideDown(400)
      .text("weight is too much. please provide right weight");
    weightInput.addClass("border-danger");
    return false;
  } else if (weightInput.val() < 0) {
    weightInput.addClass("border-danger");
    errorMSG.slideDown(400).text("Wight cannot be Negative");
    return false;
  } else if (weightInput.val() == "") {
    weightInput.addClass("border-danger");
    errorMSG.slideDown(400).text("This field is required");
    return false;
  } else {
    weightInput.removeClass("border-danger");
    errorMSG.slideUp(400);
    return true;
  }
}

function validateEmail() {
  let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  let emailInput = $("#emailPatient");
  let errorMSG = $("#email-error-msg");

  let email = $("#emailPatient").val();
  if (email === "") {
    errorMSG.slideDown(400).text("This field is required");
    emailInput.addClass("border-danger");
    return false;
  } else if (!regex.test(email)) {
    emailInput.addClass("border-danger");
    errorMSG.slideDown(400).text("email id is not valid");
    return false;
  } else {
    emailInput.removeClass("border-danger");
    errorMSG.slideUp(400);
    return true;
  }
}

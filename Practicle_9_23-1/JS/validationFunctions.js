$("#txtFirstName , #txtFirstName").blur(validateName);
$("#emailPatient").blur(validateEmail);
$("#numPatientHeight").blur(validateHeight);
$("#numPatientWeight").blur(validateWeight);

function validateSelect() {
  if ($("#slDay").val() == "") {
    alert("Please Provide Valid DOB");
    $("#slDay").focus();
    return false;
  } else if ($("#slYear").val() == "") {
    $("#slYear").focus();
    alert("Please Provide Valid DOB");
    return false;
  } else if ($("#slMonth").val() == "") {
    alert("Please Provide Valid DOB");
    $("#slMonth").focus();
    return false;
  } else if ($("#slGender").val() == "") {
    alert("Please Provide Gender");
    $("#slGender").focus();
    return false;
  } else if ($("#txtReason").val() == "") {
    alert("Please Provide Reason");
    $("#txtReason").focus();
    return false;
  } else return true;
}

function validateString(str) {
  let regex = /^[A-Za-z]+/;
  return regex.test(str);
}

function validateName() {
  if (!validateString($(this).val())) {
    $("#name-error-msg").slideDown(400).text("Name is invalid");
  } else {
    $("#name-error-msg").slideUp(400);
  }
}

function validateHeight() {
  if ($("#numPatientHeight").val() > 250) {
    $("#height-error-msg")
      .slideDown(400)
      .text("Height is too much. please provide right height");
    return false;
  } else if ($("#numPatientHeight").val() < 0) {
    $("#height-error-msg").slideDown(400).text("Height can not be negative");
    return false;
  } else if ($("#numPatientHeight").val() == "") {
    $("#height-error-msg").slideDown(400).text("This field is required");
    return false;
  } else {
    $("#height-error-msg").slideUp(400);
    return true;
  }
}

function validateWeight() {
  if ($("#numPatientWeight").val() > 250) {
    $("#weight-error-msg")
      .slideDown(400)
      .text("weight is too much. please provide right weight");
    return false;
  } else if ($("#numPatientWeight").val() < 0) {
    console.log("else if ");
    $("#weight-error-msg").slideDown(400).text("Wight cannot be Negative");
    return false;
  } else if ($("#numPatientWeight").val() == "") {
    $("#weight-error-msg").slideDown(400).text("This field is required");
    return false;
  } else {
    $("#weight-error-msg").slideUp(400);
    return true;
  }
}

function validateEmail() {
  let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  let email = $("#emailPatient").val();
  if (email === "") {
    $("#email-error-msg").slideDown(400).text("This field is required");
    return false;
  } else if (!regex.test(email)) {
    $("#email-error-msg").slideDown(400).text("email id is not valid");
    return false;
  } else {
    $("#email-error-msg").slideUp(400);
    return true;
  }
}

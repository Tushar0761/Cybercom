$(document).ready(() => {
  addBootstrapClasses();
  addOptions();
});
$("#submitBtn").click(function () {
  let bool = validateForm();
  if (bool) {
    $("form").submit();
  }
});

$("form").on("submit", function (event) {
  event.preventDefault();
  console.log($(this).serializeArray());
});

function validateForm() {
  let errors = [];
  let bool = true;
  if (!validateString($("#txtFirstName").val())) {
    errors.push("First Name");
    bool = false;
    $("#txtFirstName").focus();
  }
  if (!validateString($("#txtLastName").val())) {
    errors.push("Last Name");
    $("#txtLastName").focus();
    bool = false;
  }
  if (!validateHeight()) {
    errors.push("Height");
    $("#numPatientHeight").focus();
    bool = false;
  }
  if (!validateWeight()) {
    errors.push("Weight");
    $("#numPatientWeight").focus();
    bool = false;
  }
  if (!validateEmail()) {
    errors.push("Email");
    $("#emailPatient").focus();
    bool = false;
  }

  if (!validateDOB()) {
    errors.push("Date of Birth");
    $("#slMonth").focus();
    bool = false;
  }
  if (!validateGender()) {
    errors.push("Gender");
    $("#slGender").focus();
    bool = false;
  }
  if (!validateReason()) {
    errors.push("Reason");
    $("#txtReason").focus();
    bool = false;
  }
  if (!bool) {
    console.log("bool", errors);
    let str = errors.join(", ");
    alert(`Please Provide Valid Input (${str})`);
  }
  console.log("bool from validate drom", bool);
  return bool;
}

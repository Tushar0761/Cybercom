$(document).ready(() => {
  addBootstrapClasses();
  addOptions();
});
$("#submitBtn").click(function () {
  if (validateForm()) {
    $("form").submit();
  }
});

$("form").on("submit", function (event) {
  event.preventDefault();
  console.log($(this).serializeArray());
});

function validateForm() {
  if (!validateString($("#txtFirstName").val())) {
    $("#txtFirstName").focus();
    alert("First Name is not valid.");
    return false;
  } else if (!validateString($("#txtLastName").val())) {
    $("#txtLastName").focus();
    alert("Last Name is not valid.");
    return false;
  } else if (!validateHeight()) {
    $("#numPatientHeight").focus();
    alert("Height is not valid.");
    return false;
  } else if (!validateWeight()) {
    $("#numPatientWeight").focus();
    alert("Weight is not valid.");
    return false;
  } else if (!validateEmail()) {
    $("#emailPatient").focus();
    alert("Email is not valid.");
    return false;
  } else if (!validateSelect()) {
    return false;
  }
  return true;
}

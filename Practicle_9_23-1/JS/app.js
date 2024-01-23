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
    alert("First Name is not valid.");
    $("#txtFirstName").focus();
    return false;
  } else if (!validateString($("#txtLastName").val())) {
    alert("Last Name is not valid.");
    $("#txtLastName").focus();
    return false;
  } else if (!validateHeight()) {
    alert("Height is not valid.");
    $("#numPatientHeight").focus();
    return false;
  } else if (!validateWeight()) {
    alert("Weight is not valid.");
    $("#numPatientWeight").focus();
    return false;
  } else if (!validateEmail()) {
    alert("Email is not valid.");
    $("#emailPatient").focus();
    return false;
  } else if (!validateSelect()) {
    return false;
  }
  return true;
}

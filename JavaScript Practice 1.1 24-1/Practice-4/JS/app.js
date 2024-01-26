$(document).ready(() => {
  addClass();

  $("#name").blur(validateName);
  $("#email").blur(validateEmail);
  $("#address").blur(validateAddress);
  $("#gender").blur(validateGender);

  $("#error-name , #error-gender , #error-email , #error-address ").hide();
});

$("form").submit((event) => {
  if (validateFields()) {
    event.preventDefault();
    alert("Thanks !!! Form has been successfully filled.");
    document.querySelector("form").reset();
    return true;
  } else return false;
});

function addClass() {
  $("form > div").addClass("form-group mb-3");
  $("input").addClass("form-control");
  $("label").addClass("form-label");
  $("span , small").addClass("text-danger");
  $("input , select").attr("required", "true");
}

$(document).ready(() => {
  addClass();
  $("#name").blur(validateName);
  $("#email").blur(validateEmail);
  $("#address").blur(validateAddress);
  $("#gender").blur(validateGender);
});

$("form").submit((event) => {
  event.preventDefault();
  if (validateFields()) {
    console.log("done");
    return true;
  } else return false;
});

function addClass() {
  $("form > div").addClass("form-group");
  $(".form-group").addClass("mb-3");
  $("input").addClass("form-control");
  $("label").addClass("form-label");
  $("span , small").addClass("text-danger");
  $("input , select").attr("required", "true");
}

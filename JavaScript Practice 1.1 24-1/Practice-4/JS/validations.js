function validateFields() {
  let errors = [];

  if (!validateName()) {
    errors.push("Name");
  }
  if (!validateEmail()) {
    errors.push("Email");
  }
  if (!validateAddress()) {
    errors.push("Address");
  }
  if (!validateGender()) {
    errors.push("Gender");
  }

  if (errors.length) {
    alert(`Please Provide Valid inputs. (${errors.join(", ")})`);
    return false;
  } else {
    return true;
  }
}

function validateName() {
  let str = $("#name").val();
  let bool = true;
  let msg = "";

  if (!str) {
    bool = false;
    msg = "This field is required";
  } else if (/\d/.test(str)) {
    bool = false;
    msg = "Name Can not contains numbers";
  } else if (!/\w{2}/.test(str)) {
    bool = false;
    msg = "It should be more than 2 Characters ";
  }

  if (!bool) {
    $("#name").addClass("border-danger");
    $("#error-name").text(msg).slideDown();
  } else {
    $("#name").removeClass("border-danger");
    $("#error-name").slideUp().text("");
  }
  return bool;
}

function validateAddress() {
  let str = $("#address").val();
  let bool = true;
  let msg = "";

  if (!str) {
    bool = false;
    msg = "This field is required.";
  }

  if (!bool) {
    $("#address").addClass("border-danger");
    $("#error-address").text(msg).slideDown();
    return false;
  } else {
    $("#address").removeClass("border-danger");
    $("#error-address").slideUp().text("");
    return true;
  }
}

function validateGender() {
  let str = $("#gender").val();
  let msg = "This field is required.";

  if (!str) {
    $("#gender").addClass("border-danger");
    $("#error-gender").text(msg).slideDown();
    return false;
  } else {
    $("#gender").removeClass("border-danger");
    $("#error-gender").slideUp().text("");
    return true;
  }
}
function validateEmail() {
  let str = $("#email").val();
  let bool = true;
  let msg = "";

  if (!str) {
    bool = false;
    msg = "This field is required";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str)) {
    bool = false;
    msg = "Not valid Email Address";
  }

  if (!bool) {
    $("#email").addClass("border-danger");
    $("#error-email").text(msg).slideDown();
  } else {
    $("#email").removeClass("border-danger");
    $("#error-email").slideUp().text("");
  }
  return bool;
}

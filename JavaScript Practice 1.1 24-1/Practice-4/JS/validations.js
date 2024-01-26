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
    $("#error-name").slideDown().text(msg);
  } else {
    $("#name").removeClass("border-danger");
    $("#error-name").text("").hide();
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
    $("#error-address").slideDown().text(msg);
    return false;
  } else {
    $("#address").removeClass("border-danger");
    $("#error-address").text("").hide();
    return true;
  }
}

function validateGender() {
  let str = $("#gender").val();
  let msg = "This field is required.";

  if (!str) {
    $("#gender").addClass("border-danger");
    $("#error-gender").slideDown().text(msg);
    return false;
  } else {
    $("#gender").removeClass("border-danger");
    $("#error-gender").text("").hide();
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
    $("#error-email").slideDown().text(msg);
  } else {
    $("#email").removeClass("border-danger");
    $("#error-email").text("").hide();
  }
  return bool;
}

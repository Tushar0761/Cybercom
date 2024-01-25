$("#height").blur(validateHeight);
$("#weight").blur(validateWeight);

$("#error-height").hide();
$("#error-weight").hide();

$("#calcBMI").click(function () {
  validateHeight();
  validateWeight();
  if (validateHeight() && validateWeight()) {
    let bmi = calcBMI($("#height").val(), $("#weight").val());
    let bmiCategory = bmiCategories(bmi);
    $("#bmiResult").text(bmi);
    $("#bmiCatogary").text(bmiCategory);
  } else {
    $("#bmiResult").text("");
    $("#bmiCatogary").text("");
  }
});

function validateHeight() {
  let height = $("#height");

  if (height.val() === "") {
    height.addClass("border-danger");
    $("#error-height").text("This filed is required").fadeIn();
    return false;
  }

  let result = validate(height.val());

  if (!result[0]) {
    $("#error-height")
      .text("Height " + result[1])
      .fadeIn();

    height.addClass("border-danger");

    return false;
  }

  $("#error-height").fadeOut();

  return true;
}

function validateWeight() {
  let weight = $("#weight");

  if (weight.val() === "") {
    $("#error-weight").text("This filed is required").fadeIn();
    weight.addClass("border-danger");

    return false;
  }

  let result = validate(weight.val());

  if (!result[0]) {
    $("#error-weight")
      .text("Weight " + result[1])
      .fadeIn();

    weight.addClass("border-danger");

    return false;
  }

  $("#error-weight").fadeOut();

  return true;
}

function validate(property) {
  let msg = "";

  if (typeof property === NaN) {
    return [false, "should be Number"];
  } else if (property <= 0) {
    return [false, "can not be Negative or Zero"];
  } else if (property > 250) {
    return [false, "is too much. Please enter valid number."];
  } else return [true];
}

function calcBMI(Height, Weight) {
  let bmi = (Weight * 10000) / Height ** 2;

  return Number(bmi.toFixed(2));
}

function bmiCategories(bmi) {
  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi <= 24.9) {
    return "Normal Weight";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "OverWeight";
  } else {
    return "Obesity";
  }
}

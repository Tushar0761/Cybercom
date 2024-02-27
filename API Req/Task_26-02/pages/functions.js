const productName = $("#productName");
const productDescription = $("#productDescription");
const productPrice = $("#productPrice");
const productCategory = $("#productCategory");

const titleErrorDiv = $("#title-error-div");
const disErrorDiv = $("#dis-error-div");
const categoryErrorDiv = $("#category-error-div");
const priceErrorDiv = $("#price-error-div");

// ready function
$(document).ready(() => {
  categoryErrorDiv?.hide();
  titleErrorDiv.hide();
  disErrorDiv.hide();
  priceErrorDiv.hide();
});

//update product form submit

function validateForm() {
  let bool = true;
  bool = validateName() && bool;
  bool = validateDis() && bool;
  bool = validatePrice() && bool;

  if (productCategory?.val() === "") {
    categoryErrorDiv.slideDown().text("Product Category is required");
    bool = false;
  } else {
    categoryErrorDiv.slideUp();
  }

  return bool;
}

function validateName() {
  if (productName.val() === "") {
    titleErrorDiv.slideDown();
    return false;
  }
  titleErrorDiv.slideUp();
  return true;
}
function validateDis() {
  if (productDescription.val() === "") {
    disErrorDiv.slideDown();
    return false;
  }
  disErrorDiv.slideUp();
  return true;
}
function validatePrice() {
  if (productPrice.val() === "") {
    priceErrorDiv.slideDown();
    return false;
  }
  if (Number(productPrice.val()) < 0) {
    priceErrorDiv.text("Price should be positive").slideDown();
    return false;
  }
  priceErrorDiv.slideUp();
  return true;
}

//show and hide loader

function toggleLoader(bool = false) {
  if (bool) {
    $("#loaderDiv").removeClass("d-none");
  } else {
    $("#loaderDiv").addClass("d-none");
  }
}
// get and set all product categories

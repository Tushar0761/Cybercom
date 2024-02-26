const productName = $("#productName");
const productDescription = $("#productDescription");
const productPrice = $("#productPrice");
const productId = $("#productId");

const idErrorDiv = $("#id-error-div");
const titleErrorDiv = $("#title-error-div");
const disErrorDiv = $("#dis-error-div");
const priceErrorDiv = $("#price-error-div");

// ready function
$(document).ready(() => {
  idErrorDiv?.hide();
  titleErrorDiv.hide();
  disErrorDiv.hide();
  priceErrorDiv.hide();
});

//add product form submit
$("#productForm").submit((e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const product = createProduct();

  fetch("https://api.escuelajs.co/api/v1/products", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(product),
  })
    .then((res) => {
      console.log(res);
      productName.val("");
      productDescription.val("");
      productPrice.val("");
      return res.json();
    })
    .then((data) => {
      alert("product added successfully under id: " + data.id);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update product form submit
$("#productUpdateForm").submit((e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  let id = productId.val();

  const product = createProduct();
  try {
    fetch("https://api.escuelajs.co/api/v1/products/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        productName.val("");
        productDescription.val("");
        productPrice.val("");
        productId.val("");

        alert("product updated successfully under id: " + data.id);
        console.log(data);
      })

      .catch((err) => {
        console.log(err);

        alert("Product not found with id: " + id + " or some error occured");
      });
  } catch (error) {
    console.log("errrr");
  }
});

function createProduct() {
  let imageId = Math.floor(Math.random() * 100) + 300;
  console.log(imageId);
  return {
    title: productName.val(),
    price: productPrice.val(),
    description: productDescription.val(),
    categoryId: 1,
    images: [`https://picsum.photos/id/${imageId}/400`],
  };
}

function validateForm() {
  let bool = true;
  bool = validateName() && bool;
  bool = validateDis() && bool;
  bool = validatePrice() && bool;

  if (productId?.val() === "") {
    idErrorDiv.slideDown().text("Product Id is required");
    bool = false;
  } else if (productId?.val() < 0) {
    idErrorDiv.slideDown().text("Product Id can not be negative");

    bool = false;
  } else {
    idErrorDiv.slideUp();
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

const id = window.location.href.split("?").pop();
const GET_URL = "https://api.escuelajs.co/api/v1/products";
console.log(id);

$(document).ready(() => {
  toggleLoader(true);
  getProduct();
});

$("#productUpdateForm").submit((e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const product = createUpdatedProduct();

  console.log(product);

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

        alert("product updated successfully : " + data.title);
        console.log(data);
      })

      .catch((err) => {
        console.log(err);

        alert("Product not found or some error occured");
      });
  } catch (error) {
    console.log("errrr");
  }
});

//create new product for updating product
function createUpdatedProduct() {
  return {
    title: productName.val(),
    price: productPrice.val(),
    description: productDescription.val(),
  };
}

// set initlial product data

function getProduct() {
  try {
    fetch(GET_URL + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        loadProduct(data);
      })
      .catch((err) => {
        $("#main").html(`<h1>Product not found</h1>
        <a href="../index.html">Go back to home</a>
        `);
      });
  } catch (error) {
    console.log(error);
  }
}

function loadProduct(product) {
  $("#productName").val(product.title);
  $("#productPrice").val(product.price);
  $("#productDescription").val(product.description);
  toggleLoader(false);
}

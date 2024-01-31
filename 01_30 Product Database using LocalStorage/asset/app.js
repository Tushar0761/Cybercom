$(document).ready(() => {
  addProductCategories();

  $("#name-error , #price-error , #category-error").hide();
});

function addProduct() {
  let productName = $("#productName").val();
  let productCategory = $("#productCategory").val();
  let productPrice = $("#productPrice").val();
  let prodcutDes = $("#productDes").val();

  let isAllValid = validate(productName, productCategory, Number(productPrice));

  if (isAllValid) {
    addToLocalStorage(productName, productPrice, prodcutDes, productCategory);

    alert("Saved To Product list...");
    $("#productDes , #productPrice, #productCategory , #productName").val("");
  }
}

function addToLocalStorage(name, price, des, category) {
  let product = {
    Name: name,
    Price: price,
    Description: des,
    Category: category,
  };

  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  if (ProductList) {
    ProductList = [...ProductList, product];

    localStorage.setItem("ProductList", JSON.stringify(ProductList));
  } else {
    ProductList = [product];

    localStorage.setItem("ProductList", JSON.stringify(ProductList));
  }
}

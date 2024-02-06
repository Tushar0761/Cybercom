const ProductList = JSON.parse(localStorage.getItem("ProductList"));

$(document).ready(() => {
  showProductCart();
});

function showProductCart() {
  showProductTable();

  let totalPrice = getPrice();
  let gstValue = (totalPrice * 18) / 100;
  let grandTotal = totalPrice + gstValue;

  $("#totalPrice").text(totalPrice + " ₹");
  $("#gstValue").text(gstValue + " ₹");
  $("#grandTotal").text(grandTotal + " ₹");
}

$("#productListBtn").click(function () {
  window.location.href = "./";
});

function getPrice() {
  let price = 0;
  ProductList.forEach((product) => {
    price += product.price * product.quantity;
  });
  return price;
}

function showProductTable() {
  $("tbody").html("");

  ProductList.forEach((product) => {
    if (product.quantity) {
      let tr = `<tr>
              <td>${product.productName}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>
              <td>${product.price * product.quantity}</td>
            </tr>`;
      $("tbody").append(tr);
    }
  });
}

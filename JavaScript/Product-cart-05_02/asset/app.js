$(document).ready(() => {
  loadProduct();
});

$("#productCartBtn").click(function () {
  toggleBtnClass();
  showProductCart();
  $("#productList").fadeToggle("fast", () => {
    $("#productCart").fadeToggle("fast");
  });
});

$("#productListBtn").click(function () {
  toggleBtnClass();

  $("#productCart").fadeToggle("fast", () => {
    $("#productList").fadeToggle("fast");
  });
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

function getPrice() {
  let price = 0;
  ProductList.forEach((product) => {
    price += product.price * product.quantity;
  });
  return price;
}

const ProductList = [
  {
    productName: "MATEIN Laptop Backpack",
    price: 800,
    quantity: 0,
    src: "./asset/Images/bag.jpg",
  },
  {
    productName: "Amazon Echo Dot",
    price: 5000,
    quantity: 0,
    src: "./asset/Images/echo.jpg",
  },
  {
    productName: "Apple Ipad 9th Gen",
    price: 120000,
    quantity: 0,
    src: "./asset/Images/ipad.jpg",
  },
  {
    productName: "Apple Iphone 15 Plus",
    price: 80000,
    quantity: 0,
    src: "./asset/Images/iphone.jpg",
  },
  {
    productName: "Logitech Wireless Mouse",
    price: 550,
    quantity: 0,
    src: "./asset/Images/mouse.jpg",
  },
  {
    productName: "Samsung Smart Curved Tv",
    price: 40000,
    quantity: 0,
    src: "./asset/Images/tv.jpg",
  },
];

function loadProduct() {
  ProductList.forEach((product, index) => {
    let name = product.productName;
    let price = product.price;
    let quantity = product.quantity;
    let src = product.src;

    let htmlContent = ` <div
          class="productCard p-3 m-2 border border-dark bg-white rounded fw-bold  d-flex flex-column justify-content-between"
        >
          <img src="${src}" alt="img" />
          <div>
            <div id="productName-${index}" class="fs-5">${name}</div>
            <div class="float-end fs-5" id="productPrice-${index}">${price} ₹</div>
          </div>
          <div class="pt-3 d-flex justify-content-between">
            <button id="addBtn-${index}" class="btn btn-success" onclick="addItem(${index})">+</button>
            <span id="productQuantity-${index}" >${quantity}</span>
            <button class="btn btn-danger" id="removeBtn-${index}" onclick="removeItem(${index})">-</button>
          </div>
        </div>`;

    $("#listOfProduct").append(htmlContent);
  });
}

function addItem(index) {
  ProductList[index].quantity++;
  $(`#productQuantity-${index}`).text(ProductList[index].quantity);
}
function removeItem(index) {
  if (ProductList[index].quantity > 0) {
    ProductList[index].quantity--;
    $(`#productQuantity-${index}`).text(ProductList[index].quantity);
  }
}

function toggleBtnClass() {
  $("#productListBtn").toggleClass("btn-secondary");
  $("#productListBtn").toggleClass("btn-primary");
  $("#productCartBtn").toggleClass("btn-primary");
  $("#productCartBtn").toggleClass("btn-secondary");
}

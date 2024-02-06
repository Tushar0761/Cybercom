const ProductList = initialProductList();

$(document).ready(() => {
  loadProduct();
});

$("#productCartBtn").click(function () {
  window.location.href = "./cart.html";
});

function loadProduct() {
  ProductList.forEach((product, index) => {
    let name = product.productName;
    let price = product.price;
    let quantity = product.quantity;
    let src = product.src;

    let htmlContent = ` <div
          class="productCard p-3 m-2 border border-dark bg-white rounded fw-bold  d-flex flex-column justify-content-between">
          <img src="${src}" alt="img" />

          <div>
          
          <div class="fs-5">${name}</div>
          
          <div class="text-center fs-6" >${price} ₹</div>
          
          </div>
          <div class="pt-3 d-flex justify-content-between">
            
          <button class="btn btn-success" onclick="addItem(${index})">+</button>
          
          <span id="productQuantity-${index}" >${quantity}</span>
          
          <button class="btn btn-danger" onclick="removeItem(${index})">-</button>
          
          </div>
        </div>`;

    $("#listOfProduct").append(htmlContent);
  });
}

function addItem(index) {
  ProductList[index].quantity++;

  $(`#productQuantity-${index}`).text(ProductList[index].quantity);

  saveProductList();
}

function removeItem(index) {
  if (ProductList[index].quantity > 0) {
    ProductList[index].quantity--;

    $(`#productQuantity-${index}`).text(ProductList[index].quantity);
    saveProductList();
  }
}

function initialProductList() {
  let currentProductList = JSON.parse(localStorage.getItem("ProductList"));

  if (currentProductList === null) {
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

    localStorage.setItem("ProductList", JSON.stringify(ProductList));

    return ProductList;
  } else {
    return currentProductList;
  }
}

function saveProductList() {
  localStorage.setItem("ProductList", JSON.stringify(ProductList));
}

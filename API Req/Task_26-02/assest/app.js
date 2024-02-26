const GET_URL = "https://api.escuelajs.co/api/v1/products";
// query = "?limit=10&offset=9";

//divs
const loaderDiv = $("#loaderDiv");
const productDiv = $("#productDiv");
const errorDiv = $("#errorDiv");

//searching and filtering
const seacrhBarInput = $("#seacrhBarInput");
const seacrhBarBtn = $("#seacrhBarBtn");

//searching function
seacrhBarBtn.click(async function () {
  toggleLoader(true);
  if (seacrhBarInput.val() === "") {
    alert("Please enter a valid search");
    toggleLoader(false);
    return;
  } else if (isNaN(seacrhBarInput.val())) {
    alert("Please enter a valid search");
    toggleLoader(false);
    return;
  }
  try {
    let product = await getProducts(0, `/${seacrhBarInput.val()}`);
    let productArray = [product];
    cardGenerator(productArray);
  } catch (error) {
    productDiv.html(
      `<h1 class="text-center text-danger">No product found</h1>`
    );
  }
  toggleLoader(false);
});

//global object
const PRODUCT_CART = getLocalStorage("PRODUCT_CART") || {
  purchasedProducts: [],
};

//show and hide loader

function toggleLoader(bool = false) {
  if (bool) {
    loaderDiv.removeClass("d-none");
  } else {
    loaderDiv.addClass("d-none");
  }
}
//Get Fetch API
async function getProducts(offset = 0, query = `?limit=12&offset=${offset}`) {
  try {
    const response = await fetch(GET_URL + query);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

//ready function

$(document).ready(async function () {
  toggleLoader(true);
  let productArray = await getProducts();

  cardGenerator(productArray);
  toggleLoader(false);
});

//pagination link clicked
$("#paginationUl li").click(async function () {
  toggleLoader(true);
  $("#paginationUl li").removeClass("active");
  $(this).addClass("active");

  let page = Number(this.id) * 10;

  let productArray = await getProducts(page);

  cardGenerator(productArray);
  toggleLoader(false);
});

cardGenerator = (productArray) => {
  productDiv.html("");

  if (productArray.length === 0) {
    errorDiv.removeClass("d-none");
    errorDiv.html("No more products to show");
    return;
  }

  productArray.forEach((product) => {
    let Dis = product.description;
    Dis = Dis.split(".")[0];

    let card = `  <div
        id="productCard${product.id}"
        class="card shadow col-6 col-md-4 col-lg-3"
      >
        <img
      src="https://picsum.photos/id/${product.id}/400"
          class="card-img-top"
          alt="Image"
        />
        <div class="card-body">
          <h5 class="card-title" id="productTitle${product.id}">${
      product.title
    }</h5>
          <h5 class="card-title">
            <span id="productPrice${product.id}">${product.price}</span> ₹
          </h5>

          <p class="card-text" id="productDis${product.id}">
          ${Dis.slice(0, 30)}
          </p>
          <button id="productAddBtn-${
            product.id
          }" class="btn btn-primary">Add</button>
        </div>
      </div>`;

    productDiv.append(card);
    $(`#productAddBtn-${product.id}`).click(() => {
      addBtnClickHandler(product.id);
    });
  });
};

async function addBtnClickHandler(id) {
  let isProductPresent = PRODUCT_CART.purchasedProducts.find(
    (product) => product.id === id
  )
    ? true
    : false;

  if (isProductPresent) return;

  let product = await getProducts(0, `/${id}`);

  PRODUCT_CART.purchasedProducts.push(product);

  setLocalStorage("PRODUCT_CART", PRODUCT_CART);
}

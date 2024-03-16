const GET_URL = "https://api.escuelajs.co/api/v1/products";
let allProductArray = [];

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
  } else if (!isNaN(seacrhBarInput.val())) {
    alert("Please enter a valid search");
    toggleLoader(false);
    return;
  }

  try {
    allProductArray = await getProducts(`?title=${seacrhBarInput.val()}`);

    divideIntoPages(allProductArray.length);

    cardGenerator(allProductArray);
  } catch (error) {
    console.log(error);
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
async function getProducts(query = "") {
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

  allProductArray = await getProducts();

  divideIntoPages(allProductArray.length);

  cardGenerator(allProductArray, 0);
  toggleLoader(false);
});
//create pagination divs
function divideIntoPages(length) {
  $("#paginationUl").html("");
  let pages = Math.ceil(length / 10);

  for (let i = 0; i < pages; i++) {
    let li = `<li id="${i}" class="page-item"
    ><a class="page-link" href="#">${i + 1}</a></li>`;

    $("#paginationUl").append(li);
    $("#" + i).click(() => {
      paginationHandler(i);
    });
  }

  $("#paginationUl li").first().addClass("active");
}

//pagination link clicked
$("#paginationUl li").click();

async function paginationHandler(id) {
  toggleLoader(true);
  $("#paginationUl li").removeClass("active");
  $(`#${id}`).addClass("active");

  let page = id * 10;

  cardGenerator(allProductArray, page);
  toggleLoader(false);
}

function cardGenerator(productArray, skip = 0) {
  productDiv.html("");
  errorDiv.addClass("d-none");
  if (productArray.length === 0) {
    errorDiv.removeClass("d-none");
    errorDiv.html("<h1 class='text-center'>No products to show</h1>");
    return;
  }

  productArray = productArray.slice(skip, skip + 10);

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

          <p class="card-text" id="productCat${product.id}">
          ${product.category.name}
          </p>

          <button id="productEditBtn-${product.id}" class="btn btn-primary">
          Edit
          </button>
          
          <button id="productDeleteBtn-${product.id}" class="btn btn-danger">
          Delete
          </button>
        </div>
      </div>`;

    productDiv.append(card);
    $(`#productEditBtn-${product.id}`).click(() => {
      editBtnClickHandler(product.id);
    });
    $(`#productDeleteBtn-${product.id}`).click(() => {
      deleteBtnClickHandler(product.id);
    });
  });
}

function editBtnClickHandler(id) {
  console.log(id);
  window.location.href = `./pages/update.html?${id}`;
}

async function deleteBtnClickHandler(id) {
  if (confirm("are you sure to delete the product?") === false) return;

  toggleLoader(true);

  fetch(GET_URL + "/" + id, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) {
        throw Error("something bad");
      }
      return res.json();
    })
    .then((data) => {
      alert("product deleted successfully");
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// sorting function

$("#sortSelectInput").change(sortHandler);

function sortHandler() {
  toggleLoader(true);

  let selectValue = $("#sortSelectInput").val();

  if (selectValue === "") {
    sortProductArray("title", "asc");
    toggleLoader();

    return;
  }

  const functionMap = new Map([
    ["sortPLH", () => sortProductArray("price", "asc")],
    ["sortPHL", () => sortProductArray("price", "desc")],
    ["sortNAZ", () => sortProductArray("title", "asc")],
    ["sortNZA", () => sortProductArray("title", "desc")],
  ]);

  const selectedFunction = functionMap.get(selectValue);

  if (selectedFunction) {
    console.log(selectedFunction);
    selectedFunction();
  } else {
    console.log("Errror in sorting function");
  }

  // switch (selectValue) {
  //   case "sortPLH":
  //     sortProductArray("price", "asc");
  //     break;

  //   case "sortPHL":
  //     sortProductArray("price", "desc");

  //     break;

  //   case "sortNAZ":
  //     sortProductArray("title", "asc");
  //     break;

  //   case "sortNZA":
  //     sortProductArray("title", "desc");
  //     break;

  //   default:
  //     break;
  // }
  setTimeout(() => {
    toggleLoader();
  }, 500);
}

function sortProductArray(property, order) {
  allProductArray.sort((a, b) => {
    if (order === "asc") {
      return a[property] > b[property] ? 1 : -1;
    } else {
      return a[property] < b[property] ? 1 : -1;
    }
  });
  divideIntoPages(allProductArray.length);
  cardGenerator(allProductArray);
}
// filter change

$("#filterSelectInput").change(filterHandler);

async function filterHandler() {
  toggleLoader(true);
  let filterValue = $(this).val();

  if (filterValue === "") {
    intializeProducts();
    return;
  }

  allProductArray = await getProducts();

  allProductArray = allProductArray.filter((product) => {
    return product.category.name === filterValue;
  });

  divideIntoPages(allProductArray.length);

  cardGenerator(allProductArray);
  toggleLoader(false);
}

// intialize the products

async function intializeProducts() {
  toggleLoader(true);

  allProductArray = await getProducts();

  divideIntoPages(allProductArray.length);

  cardGenerator(allProductArray, 0);
  toggleLoader(false);
}

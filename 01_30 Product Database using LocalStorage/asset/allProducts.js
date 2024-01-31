$(document).ready(() => {
  loadProducts();
});

function loadProducts() {
  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  let count = 1;

  ProductList.forEach((product) => {
    let tr = ` <tr>
        <td>${count}</td>
        <td>${product.Name}</td>
        <td>${product.Price}</td>
        <td>${product.Category}</td>
        <td>${product.Description}</td>
        <td>${addButton(count - 1)}</td>
      </tr>
    `;

    $("table tbody").append(tr);

    count++;
  });
}

function addButton(count) {
  return `
  <btn class="btn btn-success m-1" onclick="editProduct(${count})">Edit</btn>
  <btn class="btn m-1 btn-danger" onclick="deleteProduct(${count})">Delete</btn>`;
}

function editProduct(count) {
  $("#hidden").slideDown();

  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  let product = ProductList[count];

  document.getElementById("saveBTN").addEventListener("click", function () {
    if (!ProductList[count]) {
      alert("This Product is no more present( Deleted in other window.)");
      location.reload();
    }

    product.Name = $("#editedName").val() || product.Name;

    product.Description = $("#editedDes").val() || product.Description;

    product.Price = $("#editedPrice").val() || product.Price;

    ProductList[count] = product;

    localStorage.setItem("ProductList", JSON.stringify(ProductList));

    $("#hidden").slideUp("fast", () => {
      location.reload();
    });
  });
}

function deleteProduct(count) {
  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  ProductList.splice(count, 1);

  localStorage.setItem("ProductList", JSON.stringify(ProductList));

  location.reload();
}

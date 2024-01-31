$(document).ready(() => {
  loadProducts();
});

function loadProducts() {
  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  let count = 1;

  ProductList.forEach((product) => {
    let tr = ` <tr id="${product.id}">
        <td>${count}</td>
        <td>${product.Name}</td>
        <td>${product.Price}</td>
        <td>${product.Category}</td>
        <td>${product.Description}</td>
        <td>${addButton(product.id)}</td>
      </tr>
    `;

    $("table tbody").append(tr);

    count++;
  });
}

function addButton(id) {
  return `
  <btn class="btn btn-success m-1" onclick="editProduct(${id})">Edit</btn>
  <btn class="btn m-1 btn-danger" onclick="deleteProduct(${id})">Delete</btn>`;
}

function editProduct(id) {
  $("#hidden").slideDown();

  let ProductList = JSON.parse(localStorage.getItem("ProductList"));
  document.getElementById("saveBTN").addEventListener("click", function () {
    ProductList.find((obj) => {
      if (obj.id === id) {
        obj.Name = $("#editedName").val() || obj.Name;
        obj.Description = $("#editedDes").val() || obj.Description;
        obj.Price = $("#editedPrice").val() || obj.Price;
      }
    });

    localStorage.setItem("ProductList", JSON.stringify(ProductList));

    $("#hidden").slideUp("fast", () => {
      location.reload();
    });
  });
}

function deleteProduct(id) {
  let ProductList = JSON.parse(localStorage.getItem("ProductList"));

  for (let i = 0; i < ProductList.length; i++) {
    if (id === ProductList[i].id) {
      if (confirm(`Are you sure to delete product ${ProductList[i].Name} ?`)) {
        ProductList.splice(i, 1);
      } else {
        return;
      }
    }
  }

  localStorage.setItem("ProductList", JSON.stringify(ProductList));

  $(`#${id}`).remove();
}

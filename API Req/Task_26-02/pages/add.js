$(document).ready(() => {
  getAllCategories();
});

function createProduct() {
  let imageId = Math.floor(Math.random() * 100) + 300;
  console.log(imageId);
  return {
    title: productName.val(),
    price: productPrice.val(),
    description: productDescription.val(),
    categoryId: productCategory.val(),
    images: [`https://picsum.photos/id/${imageId}/400`],
  };
}

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
      return res.json();
    })
    .then((data) => {
      productName.val("");
      productDescription.val("");
      productPrice.val("");
      alert("product added successfully : " + data.title);
    })
    .catch((err) => {
      console.log(err);
    });
});

function getAllCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories?limit=0")
    .then((response) => response.json())
    .then((data) => {
      setAllCategories(data);
    })
    .catch((err) => console.log(err));
}

function setAllCategories(categoryArray) {
  categoryArray.forEach((category) => {
    let option = ` <option value="${category.id}">${category.name}</option>`;
    $("#productCategory").append(option);
  });
}

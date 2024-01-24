// 3. Create an array of objects to store information about multiple people or products. Write code to loop through the array and display the information for each object.

const productList = [
  {
    name: "Steel Pipe",
    price: 200,
    quantity: 15,
  },

  {
    name: "Steel Wire",
    price: 75,
    quantity: 30,
  },

  {
    name: "Steel Plate",
    price: 500,
    quantity: 8,
  },
];

productList.forEach((obj) =>
  console.log(
    `${obj.name} has price of ${obj.price} and quantity of ${obj.quantity}`
  )
);

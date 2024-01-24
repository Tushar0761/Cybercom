// 2. Create an object to store information about a product (e.g., name, price, quantity, etc.). Write code to calculate the total cost of a specified quantity of the product.
const steelPipe = {
  name: "Steel Pipe",
  price: 200,
  quantity: 15,
};
const steelWire = {
  name: "Steel Wire",
  price: 75,
  quantity: 30,
};
const steelPlate = {
  name: "Steel Plate",
  price: 500,
  quantity: 8,
};
function calculateCost(obj) {
  return obj.price * obj.quantity;
}

console.log(calculateCost(steelPipe), "Pipe");
console.log(calculateCost(steelWire), "Wire");
console.log(calculateCost(steelPlate), "Plate");

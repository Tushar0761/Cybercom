// 4. Write a function that takes an object as an argument and returns a new object with specific properties. For example, a function that takes an object with name, age, and address properties and returns an object with only the name and age properties.

let tusharDetails = {
  name: "tushar",
  age: 20,
  address: "Vastral",
};

function createObj(object) {
  const newObj = {};
  newObj.name = object.name;
  newObj.age = object.age;

  return newObj;
}

const tusharNew = createObj(tusharDetails);

console.log(tusharNew);

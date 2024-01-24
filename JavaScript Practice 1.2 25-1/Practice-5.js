// 5. Write a function that takes two objects as arguments and returns a new object that combines the properties of both objects. For example, a function that takes two objectswith name and age properties and returns an object with name, age, and address properties.

const tusharPublic = {
  name: "Tushar Panchal",
  age: 21,
};

const tusharPersonal = {
  email: "tusharpanchal0761@gmail.com",
  address: "Vastral, Ahmedabad",
};

function combineObj(object1, object2) {
  return { ...object1, ...object2 };
}

const tusharDetails = combineObj(tusharPublic, tusharPersonal);

console.log(tusharDetails);

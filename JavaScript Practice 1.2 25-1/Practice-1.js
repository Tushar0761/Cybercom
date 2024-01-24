// 1. Create an object to store information about a person (e.g., name, age, address, etc.). Write code to access and modify the object's properties.

const person = {
  name: "Tushar Panchal",
  age: 21,
  address: "Vastral, Ahmedabad",
  email: "tusharpanchal@gmail.com",
  number: "00000-00000",

  get(prop) {
    return this[prop];
  },

  set(prop, val) {
    this[prop] = val;
    return this;
  },
};

console.log(person.get("email"));

console.log(person.set("age", 55));

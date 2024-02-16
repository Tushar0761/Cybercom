let arr = [{ name: "Name 1" }, { name: "Name 2" }, { name: "Name 3" }];

arr.map((item) => {
  if (item.name === "Name 2") {
    item.slected = "this";
  }
});

console.log(arr);

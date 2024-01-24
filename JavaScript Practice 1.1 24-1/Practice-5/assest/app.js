$("#rollDice").click(() => {
  let n = Math.floor(Math.random() * 6 + 1);
  $("#diceImg").attr({ src: `./Images/${n}.png` });
});
$("#Squirrle").click(function () {
  $("#animalImg").attr({ src: `./Images/squirrle.jpg` });
});
$("#dogs").click(function () {
  $("#animalImg").attr({ src: `./Images/dogs.jpg` });
});
$("#fox").click(function () {
  $("#animalImg").attr({ src: `./Images/fox.jpg` });
});
$("#parrot").click(function () {
  $("#animalImg").attr({ src: `./Images/parrot.jpg` });
});

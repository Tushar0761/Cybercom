$("#firstButton").click(() => {
  console.log(this);
  $("#firstParagraph").text("Red Button is Clicked");
});
$("#secondButton").click(() => {
  console.log(this);
  $("#secondParagraph").text("Blue Button is Clicked");
});
$("#thirdButton").click(() => {
  console.log(this);
  $("#thirdParagraph").text("Green Button is Clicked");
});
$("#fourthButton").click(() => {
  console.log(this);
  $("#fourthParagraph").text("Yellow Button is Clicked");
});

let list = `document.getElementById()
element.setAttribute()
element.style
element.classList
element.className
document.createElement()
element.appendChild()
element.removeChild()
element.replaceChild()
document.remove()
document.createTextNode()
document.getElementsByClassName()
document.getElementsByTagName()
document.querySelector()
document.querySelectorAll()
element.innerHTML
element.textContent
element.insertAdjacentHTML()
element.getAttribute()`;
list = list.split("\n");
let fs = require("fs");

fs.readdir("./", (err, files) => {
  for (let i = 0; i < files.length; i++) {
    let a = `<li class="m-2"><a href="./${files[i]}" target="_blank">${list[i]} Practical 🚀</a></li>`;

    console.log(a);
  }
});

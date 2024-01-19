let email = document.querySelector("#email");
let conemail = document.querySelector("#conemail");
let psw = document.querySelector("#psw");
let conpsw = document.querySelector("#conpsw");

let help = document.querySelector("#helpPass i");

email.addEventListener("focusout", () => {
  emailvalidate();
  email.addEventListener("keyup", emailvalidate);
});
psw.addEventListener("focusout", () => {
  pswvalidate();
  psw.addEventListener("keyup", pswvalidate);
});
conemail.addEventListener("focusout", () => {
  emailcon();
  conemail.addEventListener("keyup", emailcon);
});
conpsw.addEventListener("focusout", () => {
  pswcon();
  conpsw.addEventListener("keyup", pswcon);
});

function load() {
  addClass();
  addOptions();
}
function addOptions() {
  addMonth();
  addDays();
  addYears();
  addState();
}
function addState() {
  let stateSelect = document.getElementById("state");
  let state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  state.forEach((s) => {
    let opt = document.createElement("option");
    opt.text = s;
    stateSelect.add(opt);
  });
}
help.addEventListener("click", () => {
  let box = document.querySelector("#hidden");
  if (box.hidden) {
    box.hidden = false;
    setTimeout(() => {
      box.hidden = true;
    }, 3000);
  } else box.hidden = true;
});
function emailcon() {
  if (conemail.value !== email.value) {
    document.querySelector("#conemailerr").textContent = "email didn't match";
  } else {
    document.querySelector("#conemailerr").textContent = "";
  }
}
function pswcon() {
  if (conpsw.value !== psw.value) {
    document.querySelector("#pswerr").textContent = "password didn't match";
  } else {
    document.querySelector("#pswerr").textContent = "";
  }
  console.log(conpsw.value, "= ", psw.value);
}
function emailvalidate() {
  let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if (!regex.test(email.value)) {
    document.querySelector("#invalidemail").textContent =
      "enter valid email id";
  } else {
    document.querySelector("#invalidemail").textContent = "";
  }
}
function pswvalidate() {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  if (!regex.test(psw.value)) {
    document.querySelector("#invalidpsw").textContent =
      "Please enter appropriate password";
  } else {
    document.querySelector("#invalidpsw").textContent = "";
  }
}

function addDays() {
  let daySelect = document.getElementById("day");
  for (let i = 1; i <= 31; i++) {
    let option = document.createElement("option");
    option.text = i;
    daySelect.add(option);
  }
}

function addYears() {
  let yearSelect = document.getElementById("year");
  for (let i = 1980; i <= 2023; i++) {
    let option = document.createElement("option");
    option.text = i;
    yearSelect.add(option, yearSelect[0]);
  }
}

function addMonth() {
  let monthSelect = document.getElementById("month");
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months.forEach((m) => {
    let option = document.createElement("option");
    option.text = m;
    monthSelect.add(option);
  });
}
function addClass() {
  let spans = document.querySelectorAll("section span");
  let sections = document.querySelectorAll("section");
  let input = document.querySelectorAll("input , select, textarea");
  spans.forEach((span) => {
    span.classList.add("col-3", "fw-bold");
  });
  sections.forEach((sec) => {
    sec.classList.add("d-flex", "mt-2");
  });
  input.forEach((em) => {
    em.classList.add("form-control");
  });
}

// let bored_API = "https://www.boredapi.com/api/activity/";

// function sendReq() {
//   let xhr = new XMLHttpRequest();
//   let url = "https://reqres.in/api/users";
//   xhr.open("GET", bored_API, true);
//   xhr.send();

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       //  processData(xhr.response);

//       let data = JSON.parse(xhr.response);

//       let content = `${this.status}`;

//       for (d in data) {
//         content += `<br /> ${d} -> ${data[d]}`;
//       }

//       $("#resultDiv").html(content);
//     }
//   };
// }

// function dogImage() {
//   let url = "https://dog.ceo/api/breeds/image/random";

//   let xhr = new XMLHttpRequest();

//   xhr.open("GET", url, true);

//   xhr.send();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       $("#userCards").html("");

//       let data = xhr.response;
//       data = JSON.parse(data);
//       console.log(data);

//       let card = dogCard(data);
//       $("#userCards").append(card);
//     } else if (xhr.readyState === 4) {
//       $("#resultDiv").text(xhr.status + " " + xhr.response);
//     }
//   };
// }

// function findUser() {
//   $("#userCards").html("");
//   let userId = $("#findUserText").val();

//   if (userId === "") {
//     alert("please add user id ");
//   } else {
//     let xhr = new XMLHttpRequest();

//     let url = `https://reqres.in/api/users/${userId}`;

//     xhr.open("GET", url, true);

//     xhr.send();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         try {
//           let user = JSON.parse(xhr.response).data;
//           makeCard({ data: [user] });
//         } catch {
//           console.log(xhr.response);
//         }
//       } else if (xhr.readyState === 4) {
//         $("#resultDiv").text(this.status + " " + this.response);
//       }
//     };
//   }
// }

// function createUser() {
//   let userName = $("#createUserNames").val();
//   let userJob = $("#createUserJob").val();

//   let URL = "https://reqres.in/api/users";

//   if (userName !== "" && userJob !== "") {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", URL, true);
//     xhr.send({ name: userName, job: userJob });
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         $("#resultDiv").text(this.status + " " + this.response);
//       }
//     };
//   } else {
//     alert("please provide details");
//   }
// }

// function updateUser() {
//   let userName = $("#createUserNames").val();
//   let userJob = $("#createUserJob").val();
//   let userId = $("#findUserText").val();

//   let URL = "https://reqres.in/api/users";

//   if (userName !== "" && userJob !== "" && userId !== "") {
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", URL + "/" + userId, true);

//     let data = { job: userJob, uname: userName };
//     data = JSON.stringify(data);
//     xhr.send(data);

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         $("#resultDiv").text(this.status + " " + this.response);
//       }
//     };
//   } else {
//     alert("please provide details");
//   }
// }

// function processData(response) {
//   try {
//     makeCard(JSON.parse(response));
//   } catch {
//     console.log(response);
//   }
// }

// function makeCard(data) {
//   console.table(data);

//   let userList = data.data;
//   console.log(userList);

//   $("#userCards").html("");

//   userList.forEach((user) => {
//     let card = getCard(user);
//     $("#userCards").append(card);
//   });
// }

// function dogCard(data) {
//   let card = `<div class=" col-4 col-md-2 p-2 m-1 bg-white text-center rounded shadow ">
//         <div class="img">
//           <img
//             src="${data.message}"
//             alt="avatar"
//             class="img rounded shadow rounded-5"
//           />
//         </div>
//       </div>`;

//   return card;
// }

// function getCard(user) {
//   let card = `<div class=" col-4 col-md-2 p-2 m-1 bg-white text-center rounded shadow ">
//         <h5>${user.first_name} ${user.last_name}</h5>
//         <p class="w-auto">${user.email}</p>
//         <div class="img">
//           <img
//             src="${user.avatar}"
//             alt="avatar"
//             class="img rounded shadow rounded-5"
//           />
//         </div>
//       </div>`;

//   return card;
// }

//------------------------with fetch api

let bored_API = "https://www.boredapi.com/api/activity/";

//with
function sendReq() {
  /* 
  let url = "https://reqres.in/api/users?per_page=5&page=3";

  fetch(url)
    .then((resp) => {
      console.log(resp.status);
      console.log(resp.headers);
      return resp.json();
    })
    .then((data) => {
      processData(data);
    });
 */
  let url = "http://localhost:3001/";

  fetch(url)
    .then((resp) => resp.text())
    .then((data) => {
      $("#resultDiv").html(data);

      console.log(data);
    });

  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4) {

  //     let data = JSON.parse(xhr.response);

  //     let content = `${this.status}`;

  //     for (d in data) {
  //       content += `<br /> ${d} -> ${data[d]}`;
  //     }

  //     $("#resultDiv").html(content);
  //   }
  // };
}

function dogImage() {
  let url = "https://dog.ceo/api/breeds/image/random";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      $("#userCards").html("");
      let card = dogCard(data);
      $("#userCards").append(card);
    });

  // let xhr = new XMLHttpRequest();

  // xhr.open("GET", url, true);

  // xhr.send();

  // xhr.onreadystatechange = () => {
  // if (xhr.readyState === 4 && xhr.status === 200) {

  // let data = xhr.response;
  // data = JSON.parse(data);
  // console.log(data);

  // $("#userCards").append(card);
  // } else if (xhr.readyState === 4) {
  //   $("#resultDiv").text(xhr.status + " " + xhr.response);
  // }
  // };
}

function findUser() {
  $("#userCards").html("");
  let userId = $("#findUserText").val();

  if (userId === "") {
    alert("please add user id ");
  } else {
    let url = `https://reqres.in/api/users/${userId}`;
    try {
      let api = fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            $("#resultDiv").text(
              resp.status + " " + JSON.stringify(resp.headers)
            );
            throw "err err";
            return;
          }
          return resp.json();
        })
        .then((data) => {
          console.log("here");
          let user = data.data;
          makeCard({ data: [user] });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {
      console.log("something wrong happen");
    }
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     try {
    //       let user = JSON.parse(xhr.response).data;
    //       makeCard({ data: [user] });
    //     } catch {
    //       console.log(xhr.response);
    //     }
    //   } else if (xhr.readyState === 4) {
    //     $("#resultDiv").text(this.status + " " + this.response);
    //   }
    // };
  }
}

function createUser() {
  let userName = $("#createUserNames").val();
  let userJob = $("#createUserJob").val();

  let URL = "https://reqres.in/api/users";

  if (userName !== "" && userJob !== "") {
    fetch(URL, {
      method: "POST",
      body: { name: userName, job: userJob },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.log("error happen");
          throw resp.status;
        }
        return resp.json();
      })
      .then((data) => {
        $("#resultDiv").text(JSON.stringify(data));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        $("#resultDiv").text(err);
      });
  } else {
    alert("please provide details");
  }

  /*     let xhr = new XMLHttpRequest();
    xhr.open("POST", URL, true);
    xhr.send({ name: userName, job: userJob });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        $("#resultDiv").text(this.status + " " + this.response);
      }
    };
 */
}

function updateUser() {
  let userName = $("#createUserNames").val();
  let userJob = $("#createUserJob").val();
  let userId = $("#findUserText").val();

  let URL = "https://reqres.in/api/users";

  if (userName !== "" && userJob !== "" && userId !== "") {
    fetch(URL + "/" + userId, {
      method: "POST",
      body: { job: userJob, uname: userName },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp.status;
      })
      .catch((err) => {
        $("#resultDiv").text(err);
        console.log(err);
      })
      .then((data) => {
        $("#resultDiv").text(JSON.stringify(data));
        console.table(data);
      });
  } else {
    alert("please provide details");
  }
}

function processData(response) {
  try {
    makeCard(response);
  } catch {
    console.log(response);
  }
}

function makeCard(data) {
  console.table(data);

  let userList = data.data;
  console.log(userList);

  $("#userCards").html("");

  userList.forEach((user) => {
    let card = getCard(user);
    $("#userCards").append(card);
  });
}

function dogCard(data) {
  let card = `<div class=" col-4 col-md-2 p-2 m-1 bg-white text-center rounded shadow ">
        <div class="img">
          <img
            src="${data.message}"
            alt="avatar"
            class="img rounded shadow rounded-5"
          />
        </div>
      </div>`;

  return card;
}

function getCard(user) {
  let card = `<div class=" col-4 col-md-2 p-2 m-1 bg-white text-center rounded shadow ">
        <h5>${user.first_name} ${user.last_name}</h5>
        <p class="w-auto">${user.email}</p>
        <div class="img">
          <img
            src="${user.avatar}"
            alt="avatar"
            class="img rounded shadow rounded-5"
          />
        </div>
      </div>`;

  return card;
}

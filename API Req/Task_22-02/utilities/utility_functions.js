// ---------------------local storage functions
function setLocalStorage(localStorageName, localStorageItem) {
  localStorage.setItem(localStorageName, JSON.stringify(localStorageItem));
}

function getLocalStorage(localStorageName) {
  return JSON.parse(localStorage.getItem(localStorageName));
}

// ----------------------- Card generator

function cardDivGenerator(user) {
  // USER_DATA = getLocalStorage("USER_DATA");
  let userliked = 0;

  if (USER_DATA.likedUserId.find((id) => user.id === id)) userliked = 1;
  if (USER_DATA.dislikedUserId.find((id) => user.id === id)) userliked = 2;
  let contentMap = new Map([
    [
      0,
      ` <button href="#" class="btn btn-danger" id="dislikeUserBtn-${user.id}">Dislike</button>
              <button href="#" class="btn btn-primary" id="likeUserBtn-${user.id}">Like</button>`,
    ],
    [1, "<h4>Liked👍.</h4>"],
    [2, "<h4>Disiked👎.</h4>"],
  ]);

  let reactionBtnDivContent = contentMap.get(userliked);

  let card = ` <div class="userCard card col-8 col-sm-7 col-md-5 col-lg-3 text-center shadow" id="user-div-${user.id}">
            <h6 class="card-title" id="user-username-${user.id}">${user.username}
            <span class="badge text-bg-info">${user.id}</span>
            </h6>
            <img
              src="${user.image}"
              class="card-img-top"
              alt="img"
              id="user-image-${user.id}"
            />
            <div class="card-body">
              <p class="card-title fw-bold" id="user-name-${user.id}">
                ${user.firstName} ${user.lastName}
              </p>
              <p>${user.gender}</p>
              <table class="table">
                <tr>
                  <td>Height : ${user.height}</td>
                  <td>Weight : ${user.weight}</td>
                </tr>
              </table>
              <div id="reactionBtnDiv-${user.id}">
             ${reactionBtnDivContent}
              </div>
            </div>
          </div>
        `;
  return [card, userliked];
}

// -------------------sorting functions

function sortList(list, property) {
  if (property === "gender") {
    console.log(list);
    list.sort((b, a) => {
      if (a[property] > b[property]) return -1;

      if (a[property] < b[property]) return 1;

      return 0;
    });
    console.log(list);
  } else {
    list.sort((b, a) => {
      return Number(b[property]) - Number(a[property]);
    });
  }

  return list;
}

//---------------------------filtering functions

//-------------------------- Panel buttons styles

function activeBtn(btnId) {
  document.querySelectorAll("section button").forEach((btn) => {
    btn.classList.replace("btn-primary", "btn-outline-primary");
  });

  document
    .querySelector("#" + btnId)
    .classList.replace("btn-outline-primary", "btn-primary");
}

// -------------------toggle visibility
function toggleVisibility(showIds) {
  let allSections = [
    "searchingAndFilteringDiv",
    "filterGenderSelectDiv",
    "addNewUserForm",
    "newUsersAddedDiv",
    "pageNavDiv",
    "searchBtnDiv",
    "userCardDiv",
  ];

  allSections.forEach((section) => {
    $(`#${section}`).addClass("d-none");
  });

  showIds.forEach((id) => {
    $(`#${id}`).removeClass("d-none");
  });
}

function showLoading(bool = false) {
  bool
    ? $("#loaderDiv").removeClass("d-none")
    : $("#loaderDiv").addClass("d-none");
}

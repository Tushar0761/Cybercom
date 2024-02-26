"use strict";

const API_URL = "https://dummyjson.com/users";

const USER_DATA = getLocalStorage("USER_DATA") ?? {
  likedUser: [],
  dislikedUser: [],
  likedUserId: [],
  dislikedUserId: [],
  createdNewUsers: [],
  updatedUser: [],
};

let CURRENT_USERLIST;

//default api call

function getMultipleUsers(skip = 0) {
  showLoading(true);
  fetch(`${API_URL}/?limit=10&skip=${skip}`)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error(`HTTP error! Status: ${Response.status}`);
      }

      return Response.json();
    })
    .then((data) => {
      toggleVisibility([
        "pageNavDiv",
        "searchingAndFilteringDiv",
        "searchBtnDiv",
      ]);
      showLoading();

      CURRENT_USERLIST = data.users;

      loadUsers(data.users);
    })
    .catch((err) => console.log(err));
}
//-----------------gender filter changes
$("#filterGenderSelectInput").change(function () {
  let currentValue = $(this).val();
  if (!currentValue) {
    loadUsers(CURRENT_USERLIST);
    return;
  } else if (currentValue === "male" || currentValue === "female") {
    genderFilterHandler(currentValue);
  } else if (currentValue === "disliked" || currentValue === "liked") {
    reactionFilterHandler(currentValue);
  }
});

//------------------filter by gender
function genderFilterHandler(currentGender) {
  let genderList = CURRENT_USERLIST.filter(
    (user) => user.gender === currentGender
  );
  loadUsers(genderList);
}
//------------------filter by reaction

function reactionFilterHandler(currentReaction) {
  let reactionList =
    currentReaction === "liked" ? USER_DATA.likedUser : USER_DATA.dislikedUser;
  loadUsers(reactionList);
}

//pag navigation function---------------------

$("#pageNavDiv .pageButton").click(function () {
  $("#pageNavDiv .pageButton").addClass("btn-outline-primary");

  $("#pageNavDiv .pageButton").removeClass("btn-primary");
  $(this).removeClass("btn-outline-primary");

  $(this).addClass("btn-primary");

  let skip = $(this).val() * 10;

  getMultipleUsers(skip);
});

//-------------------- sorting functions

$("#sortSelectInput").change(sortHandler);

function sortHandler() {
  showLoading(true);

  let sortingInputValue = $("#sortSelectInput").val();

  CURRENT_USERLIST = sortList(CURRENT_USERLIST, sortingInputValue);
  showLoading();

  loadUsers(CURRENT_USERLIST);
}

//-------------------- searching function

$("#searchBtnInput").click(function () {
  let searchValue = $("#searchTextInput").val();

  if (searchValue === "") {
    alert("Please provide valid input.");
    return;
  }

  if (isNaN(searchValue)) {
    //search by name
    findOneUserByName(searchValue);
  } else {
    //search by id
    findOneUser(searchValue);
  }
});

//-------------- find one user by id
function findOneUser(id) {
  showLoading(true);

  fetch(`${API_URL}/${id}`)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error(`HTTP error! Status: ${Response.status}`);
      }

      return Response.json();
    })
    .then((data) => {
      showLoading();

      $("#pageNavDiv").removeClass("d-none");

      CURRENT_USERLIST = [data];

      loadUsers([data]);
    })
    .catch((err) => {
      showLoading();
      $("#userCardDiv").html("<h1>User Not Found (limit : 1-100)</h1>");
    });
}
//find user by name
function findOneUserByName(name) {
  showLoading(true);

  fetch(`${API_URL}/search?q=${name}`)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error(`HTTP error! Status: ${Response.status}`);
      }

      return Response.json();
    })
    .then((data) => {
      showLoading();

      if (!data.total) {
        throw new Error("Sorry, no Users found");
      }
      CURRENT_USERLIST = data.users;

      loadUsers(CURRENT_USERLIST);
    })
    .catch((error) => {
      showLoading();
      $("#userCardDiv").html(`<h1>${error}</h1>`);
    });
}

// ------------------- Initial button

$("#loadUserBtnInput").click(function () {
  activeBtn("loadUserBtnInput");
  toggleVisibility(["searchBtnDiv", "userCardDiv"]);

  getMultipleUsers();
});

function loadUsers(userArray) {
  if (!userArray) {
    return;
  }
  $("#userCardDiv").removeClass("d-none");

  let userCardDiv = $("#userCardDiv");
  userCardDiv.html("");

  userArray.forEach((user) => {
    let [card, userliked] = cardDivGenerator(user);
    userCardDiv.append(card);

    $(`#user-div-${user.id}`).addClass(
      `${userliked && "border-3"} ${
        userliked === 1
          ? "border-success"
          : userliked === 2
          ? "border-danger"
          : ""
      } `
    );

    $(`#likeUserBtn-${user.id}`).click(() => {
      likeOneUser(user.id);
    });

    $(`#dislikeUserBtn-${user.id}`).click(() => {
      dislikeOneUser(user.id);
    });
  });

  addHoverEffect();
}

//-------------------- Like one user

function likeOneUser(id) {
  if (USER_DATA.likedUserId.find((userId) => userId === id)) {
    return;
  }

  let userObject = CURRENT_USERLIST.find((user) => user.id === id);

  USER_DATA.likedUser.push(userObject);
  USER_DATA.likedUserId.push(id);

  USER_DATA.dislikedUser = USER_DATA.dislikedUser.filter(
    (user) => user.id !== id
  );
  USER_DATA.dislikedUserId = USER_DATA.dislikedUserId.filter(
    (userId) => userId !== id
  );

  $(`#user-div-${id}`).addClass("border-success  border-3");
  $(`#reactionBtnDiv-${id}`).html("<h4>Liked👍.</h4>");

  setLocalStorage("USER_DATA", USER_DATA);
}

//-------------------- Dislike one user

function dislikeOneUser(id) {
  let userObject = CURRENT_USERLIST.find((user) => user.id === id);

  if (USER_DATA.dislikedUserId.find((userId) => userId === id)) {
    return;
  }

  USER_DATA.likedUser = USER_DATA.likedUser.filter((user) => user.id !== id);
  USER_DATA.likedUserId = USER_DATA.likedUserId.filter(
    (userId) => userId !== id
  );

  $(`#user-div-${id}`).addClass("border-danger border-3");
  $(`#reactionBtnDiv-${id}`).html("<h4>Disiked👎.</h4>");

  USER_DATA.dislikedUser.push(userObject);
  USER_DATA.dislikedUserId.push(id);

  setLocalStorage("USER_DATA", USER_DATA);
}

// add hover effect

function addHoverEffect() {
  $(".userCard").hover(
    function () {
      $(this).toggleClass("shadow-lg");
    },
    function () {
      $(this).toggleClass("shadow-lg");
    }
  );
}
//=============================Form function

$("#addUserBtnInput").click(function () {
  activeBtn("addUserBtnInput");
  toggleVisibility(["addNewUserForm"]);
});

$("#newUserForm").submit((event) => {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }

  let newUser = createUser();

  addNewUserApiCall(newUser);

  clearForm();
});

function createUser() {
  let user = {
    username: $("#addUserUsername").val(),
    firstName: $("#addUserFirstName").val(),
    lastName: $("#addUserLastName").val(),
    height: parseFloat($("#addUserHeight").val()),
    weight: parseFloat($("#addUserWeight").val()),
    gender: $("input[name='gender']:checked").val(),
    image: `./assest/Images/Frederique.png`,
  };

  return user;
}

function addNewUserApiCall(newUser) {
  if (USER_DATA.createdNewUsers.length === 0) {
    newUser.id = 101;
    USER_DATA.createdNewUsers.push(newUser);
  } else {
    newUser.id =
      USER_DATA.createdNewUsers[USER_DATA.createdNewUsers.length - 1].id + 1;
    USER_DATA.createdNewUsers.push(newUser);
  }

  fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.error(error);
    });

  setLocalStorage("USER_DATA", USER_DATA);
  alert("User added successfully");
}
// --------------------- show new added users

$("#showNewUserBtnInput").click(function () {
  activeBtn("showNewUserBtnInput");

  toggleVisibility(["newUsersAddedDiv"]);

  CURRENT_USERLIST = USER_DATA.createdNewUsers;

  loadNewUsers(USER_DATA.createdNewUsers, "newUsersAddedDiv");
});

function loadNewUsers(UsersArray, cardDivId) {
  let cardDiv = $(`#${cardDivId}`);
  if (!UsersArray.length) {
    console.log("no cats");

    cardDiv.html("<h1>No New Cats added yet</h1>");
    return;
  }

  cardDiv.html("");

  UsersArray.forEach((user) => {
    let [card, userliked] = cardDivGenerator(user);
    cardDiv.append(card);

    let generatedClass = `${userliked && "border-3"} ${
      userliked === 1
        ? "border-success"
        : userliked === 2
        ? "border-danger"
        : ""
    } `;
    $(`#user-div-${user.id}`).addClass(generatedClass);

    $(`#likeUserBtn-${user.id}`).click(() => {
      likeOneUser(user.id);
    });

    $(`#dislikeUserBtn-${user.id}`).click(() => {
      dislikeOneUser(user.id);
    });
  });

  addHoverEffect();
}
//-------------------- saved button clicked
$("#savedBtnInput").click(function () {
  activeBtn("savedBtnInput");

  toggleVisibility(["searchingAndFilteringDiv", "filterGenderSelectDiv"]);

  CURRENT_USERLIST = [...USER_DATA.likedUser, ...USER_DATA.dislikedUser];

  loadUsers(CURRENT_USERLIST);
});

//--------------------------update form submit
$("#showUpdateUserFormBtnInput").click(function () {
  activeBtn("showUpdateUserFormBtnInput");

  toggleVisibility(["updateUserFormDiv"]);
});

$("#showUpdatedUserBtnInput").click(function () {
  activeBtn("showUpdatedUserBtnInput");

  toggleVisibility(["updatedUsersDiv"]);

  CURRENT_USERLIST = USER_DATA.updatedUser;

  loadNewUsers(USER_DATA.updatedUser, "updatedUsersDiv");
});

$("#updateUserForm").submit((event) => {
  event.preventDefault();

  let id = $(`#updateUserId`).val();
  let firstName = $(`#updateUserFirstName`).val();
  let lastName = $(`#updateUserLastName`).val();

  if (!validateUpdateForm(id, firstName, lastName)) {
    return;
  }

  updateApiCall(id, firstName, lastName);

  clearUpdateForm();
});

function validateUpdateForm(id, firstName, lastName) {
  let bool = true;
  bool = validateNameUpdate(firstName) && bool;
  bool = validateNameUpdate(lastName) && bool;

  if (id >= 100 || id < 0) {
    toggleErrorMsg(
      true,
      "#id-error-alert-update",
      "Invalid id (limit : 1-100)"
    );
    bool = false;
  }

  return bool;
}

function validateNameUpdate(value) {
  let validation = false;

  validation = /^[^\d\s]+$/.test(value);

  toggleErrorMsg(
    !validation,
    "#name-error-alert-update",
    "Name cannot contain Number is required"
  );

  return validation;
}

function updateApiCall(id, fN, lN) {
  fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: fN,
      lastName: lN,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("User updated successfully");

      USER_DATA.updatedUser.push(data);

      setLocalStorage("USER_DATA", USER_DATA);
    })
    .catch((error) => {
      console.log("something wrong happenned", error);
      alert(error);
    });
}

function clearUpdateForm() {
  $("#updateUserId").val("");
  $("#updateUserFirstName").val("");
  $("#updateUserLastName").val("");
}

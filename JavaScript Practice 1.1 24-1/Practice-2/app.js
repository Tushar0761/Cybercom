$("document").ready(function () {
  //   $("input").focus();
});
$("form").on("submit", function (event) {
  event.preventDefault();
  add();
});

function add() {
  let item = $("input").val();
  if (item == "") {
    alert("Please Provide Item");
  } else {
    addItem(item);
    $("input").val("");
  }
  $("input").focus();
}

function addItem(item) {
  let itemElement = `<li>
        <div
          class="d-flex justify-content-between p-2 rounded shadow m-2 border item"
        >
          <span>${item}</span>
          <div class=" d-flex justify-content-center align-items-center p-2 remove">
            <i class="  fa fa-lg fa-times"></i>
          </div>
        </div>
      </li>`;
  $("ul").append(itemElement);
  addEvent();
}
function addEvent() {
  let items = document.querySelectorAll(".remove");
  items[items.length - 1].addEventListener("click", itemClicked);
}

function itemClicked(e) {
  let listItem = $(this).parent();
  listItem.remove();
}

function saveTaskList() {
  localStorage.setItem("TASK_LIST", JSON.stringify(TASK_LIST));
}

function sortTaskListFilter() {
  let property = $(this).val();
  sortTaskList(property);
}

function sortTaskList(property) {
  console.log("sorted by ", property);

  if (property == "priorityIndex") {
    TASK_LIST.sort((b, a) => {
      a - b;
    });
    return;
  }

  TASK_LIST.sort((b, a) => {
    if (a[property] > b[property]) return -1;

    if (a[property] < b[property]) return 1;

    return 0;
  });
  showTaskTable();
}
async function fadeOutTable() {
  $("#taskTable tbody").fadeOut("fast");
}
async function fadeInTable() {
  $("#taskTable tbody").fadeIn("fast");
}

function initialTASK_LIST() {
  let currentTASK_LIST = JSON.parse(localStorage.getItem("TASK_LIST"));

  if (currentTASK_LIST === null) {
    const TASK_LIST = [];

    localStorage.setItem("TASK_LIST", JSON.stringify(TASK_LIST));

    return TASK_LIST;
  } else {
    return currentTASK_LIST;
  }
}

function resetFilter() {
  $("#filterCategorySelect").val("-1");
  $("#filterPrioritySelect").val("-1");
  $("#sortSelect").val("-1");

  showTaskTable();
}

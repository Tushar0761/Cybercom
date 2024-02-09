const TASK_LIST = initialTASK_LIST();

$(document).ready(() => {
  sortTaskList("priorityIndex");
  sortTaskList("timeStamp");
});

const PriorityValue = [
  "no-priority",
  "low-priority",
  "medium-priority",
  "high-priority",
];
const CategoryValue = ["Personal", "Work", "Coding", "Movies"];

$("#todobutton").click(addBtnHandler);

function addBtnHandler() {
  let task = $("#todoitem").val();

  if (!task) {
    alert("Please Enter Something to Add in to do list");
    return;
  }

  createTask(
    task,
    $("#dueDate").val(),
    document.getElementById("dueDate").valueAsNumber
  );

  $("#todoitem").val("");
  $("#dueDate").val("");
}

function createTask(task, dueDate, timestamp) {
  let priorityValue = $("#prioritySelect").val();
  let categoryValue = $("#categorySelect").val();

  timestampValue = timestamp ? timestamp : 0;

  let time = new Date().toString().split(" ").splice(1, 4).join(" ");

  let dueDateValue = dueDate ? dueDate : "-";

  let toDoWork = {
    task: task,
    dueDate: dueDateValue,
    priority: PriorityValue[priorityValue],
    priorityIndex: PriorityValue.indexOf(PriorityValue[priorityValue]),
    createdTime: time,
    updatedTime: "-",
    category: CategoryValue[categoryValue],
    timeStamp: timestampValue,
  };

  TASK_LIST.push(toDoWork);

  saveTaskList();

  showTaskTable();

  return;
}

function editTask(index) {
  $(`#task${index}`)
    .html(`<input type="text"   class="form-control form-text" id="input${index}" 
    value="${TASK_LIST[index].task}"
    />`);

  $(`tr#${index}`).addClass("table-active");

  $(`#editBtn${index}`).text("Save").attr("onclick", `updateTask(${index})`);
}

function updateTask(index) {
  task = $(`#input${index}`).val();

  if (task === "") {
    alert("Task Can not be empty.");
    return;
  }

  updatedTime = new Date().toString().split(" ").splice(1, 4).join(" ");

  TASK_LIST[index].task = task;
  TASK_LIST[index].updatedTime = updatedTime;

  $(`#editBtn${index}`).text("Edit").attr("onclick", `editTask(${index})`);

  $(`#${index}`).removeClass("table-active");

  saveTaskList();
  updateRow(index);
}

function deleteTask(index) {
  if (!confirm("Are you sure to delete Task?")) return;

  TASK_LIST.splice(index, 1);
  saveTaskList();
  showTaskTable();
}

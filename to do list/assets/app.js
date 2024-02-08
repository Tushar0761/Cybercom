//selectors
const todoInput = $("#todoitem");
const todoButton = $("#todobutton");
const todoList = $("#todolist");

const TASK_LIST = initialTASK_LIST();

const PriorityValue = [
  "no-priority",
  "low-priority",
  "medium-priority",
  "high-priority",
];
const CategoryValue = ["Personal", "Work", "Coding", "Movies"];

$(document).ready(showTaskTable);

//event listener
todoButton.click(addBtnHandler);

function addBtnHandler() {
  let task = todoInput.val();
  let priority = $("#prioritySelect");
  let dueDate = $("#dueDate");
  let categorySelect = $("#categorySelect");

  if (!task) {
    alert("Please Enter Something to Add in to do list");
    return;
  }
  createTask(
    task,
    priority.val(),
    dueDate.val(),
    categorySelect.val(),
    document.getElementById("dueDate").valueAsNumber
  );

  todoInput.val("");
  dueDate.val("");
}

$("#filterPrioritySelect ").change(showTaskTable);

$("#filterCategorySelect ").change(showTaskTable);

function createTask(
  task,
  priorityValue,
  dueDateValue,
  categoryValue,
  timestamp
) {
  let time = new Date();

  let dueDate = dueDateValue ? dueDateValue : "-";

  let toDoWork = {
    task: task,
    dueDate: dueDate,
    priority: PriorityValue[priorityValue],
    priorityIndex: PriorityValue.indexOf(PriorityValue[priorityValue]),
    createdTime: time.toString().split(" ").splice(1, 4).join(" "),
    updatedTime: "-",
    category: CategoryValue[categoryValue],
    timeStamp: timestamp,
  };

  TASK_LIST.push(toDoWork);

  saveTaskList();

  showTaskTable();

  return;
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

function saveTaskList() {
  localStorage.setItem("TASK_LIST", JSON.stringify(TASK_LIST));
}

function showTaskTable() {
  if (!TASK_LIST.length) {
    $("#error").fadeIn("slow");
    $("#taskTable").hide("fast");
    $("#filterDivs").hide("fast");
    return;
  }

  $("#error").fadeOut("fast");
  $("#taskTable").fadeIn("fast");
  $(" #filterDivs").fadeIn("fast");

  $("#taskTable tbody").html("");

  sortTaskList();

  let currentPriorityFilter = $("#filterPrioritySelect").val();
  let currentCategoryFilter = $("#filterCategorySelect").val();

  TASK_LIST.forEach((Task, index) => {
    if (
      (currentPriorityFilter !== "-1" &&
        currentPriorityFilter !== Task.priority) ||
      (currentCategoryFilter !== "-1" &&
        currentCategoryFilter !== Task.category)
    ) {
      return;
    }

    let [priorityInString, priorityClass] = getPriorityDetails(Task.priority);

    let tr = `<tr id="${index}" class="${priorityClass}">
            <td>${Task.category}</td>
        
            <td id="task${index}">${Task.task}</td>
           
            <td>${Task.dueDate}</td>
            <td>${priorityInString}</td>
            <td>${Task.createdTime}</td>
            <td  id="updatedTime${index}">${Task.updatedTime}</td>
            <td>${addButton(index)}</td>
          </tr>`;

    $("#taskTable tbody").append(tr);
  });
}

function sortTaskList() {
  TASK_LIST.sort((b, a) => {
    return a.priorityIndex - b.priorityIndex;
  });

  TASK_LIST.sort((a, b) => {
    return a.timeStamp - b.timeStamp;
  });
}

function getPriorityDetails(priorityIndex) {
  switch (priorityIndex) {
    case "low-priority":
      return ["Low Priority", "table-success"];
      break;
    case "medium-priority":
      return ["Medium Priority", "table-warning"];
      break;
    case "high-priority":
      return ["High Priority", "table-danger"];
      break;

    default:
      return ["No Priority", "table-secondary"];
      break;
  }
}

function addButton(index) {
  return `
  <btn class="btn btn-success m-1" 
  id="editBtn${index}"
  onclick="editTask('${index}')">Edit</btn>
  <btn class="btn m-1 btn-danger" 
  id="deleteBtn${index}"
  onclick="deleteTask('${index}')">Delete</btn>`;
}

function editTask(index) {
  let task = $(`#task${index}`).html(`<input type="text" 
    class="form-control form-text" 
    id="input${index}" 
    value="${TASK_LIST[index].task}"
    />`);

  $(`tr#${index}`).addClass("table-active");

  let edit = $(`#editBtn${index}`);

  edit.text("Save").attr("onclick", `updateTask(${index})`);
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

  saveTaskList();
  $(`#${index}`).removeClass("table-active");

  updateRow(index);
}

function updateRow(index) {
  $(`#${index}`).html("");

  let Task = TASK_LIST[index];

  let [priorityInString] = getPriorityDetails(Task.priority);

  let tr = `<td>${index + 1}</td>
            <td  id="task${index}">${Task.task}</td>
            <td>${Task.dueDate}</td>

            <td>${priorityInString}</td>
            <td>${Task.createdTime}</td>
            <td   id="updatedTime${index}">${Task.updatedTime}</td>
            <td>${addButton(index)}</td>
          `;
  $(`#${index}`).append(tr);
}

function deleteTask(index) {
  TASK_LIST.splice(index, 1);
  saveTaskList();
  showTaskTable();
}

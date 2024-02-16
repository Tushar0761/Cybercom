$("#filterPrioritySelect ").change(showTaskTable);

$("#filterCategorySelect ").change(showTaskTable);

$("#sortSelect").change(sortTaskListFilter);

function showTaskTable() {
  if (checkTaskList()) {
    return;
  }

  fadeOutTable();
  $("#taskTable tbody").html("");

  TASK_LIST.forEach((Task, index) => {
    if (!showTaskByFilter(Task)) return;

    let [priorityInString, priorityClass] = getPriorityDetails(Task.priority);

    let tableRow = `<tr id="${index}" class="${priorityClass}">
            <td>${Task.category}</td>
        
            <td id="task${index}">${Task.task}</td>
           
            <td>${Task.dueDate}</td>
            <td>${priorityInString}</td>
            <td>${Task.createdTime}</td>
            <td  id="updatedTime${index}">${Task.updatedTime}</td>
            <td>${addButton(index)}</td>
          </tr>`;

    $("#taskTable tbody").append(tableRow);
  });

  fadeInTable();
}

function getPriorityDetails(priorityIndex) {
  switch (priorityIndex) {
    case "low-priority":
      return ["Low Priority", "table-success"];

    case "medium-priority":
      return ["Medium Priority", "table-warning"];

    case "high-priority":
      return ["High Priority", "table-danger"];

    default:
      return ["No Priority", "table-secondary"];
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

function updateRow(index) {
  $(`#${index}`).html("");

  let Task = TASK_LIST[index];

  let [priorityInString] = getPriorityDetails(Task.priority);

  let tr = `
            <td>${Task.category}</td>
            <td  id="task${index}">${Task.task}</td>
            <td>${Task.dueDate}</td>
            <td>${priorityInString}</td>
            <td>${Task.createdTime}</td>
            <td   id="updatedTime${index}">${Task.updatedTime}</td>
            <td>${addButton(index)}</td>
          `;
  $(`#${index}`).append(tr);
}

function showTaskByFilter(Task) {
  let currentPriorityFilter = $("#filterPrioritySelect").val();
  let currentCategoryFilter = $("#filterCategorySelect").val();

  if (
    (currentPriorityFilter !== "-1" &&
      currentPriorityFilter !== Task.priority) ||
    (currentCategoryFilter !== "-1" && currentCategoryFilter !== Task.category)
  ) {
    return false;
  }
  return true;
}

function checkTaskList() {
  if (!TASK_LIST.length) {
    $("#error").fadeIn("slow");
    $("#taskTable").hide("fast");
    $("#filterDivs").hide("fast");
    return true;
  }

  $("#error").hide();
  $("#taskTable").fadeIn("fast");
  $(" #filterDivs").fadeIn("fast");
  return false;
}

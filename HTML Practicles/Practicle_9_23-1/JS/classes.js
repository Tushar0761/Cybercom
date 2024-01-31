function addBootstrapClasses() {
  $("select").addClass("form-select w-25 me-2 ms-2");
  $("#height .input , #weight .input ").addClass("col-6");
  $(`input[type="radio"]`).addClass("me-2");
  $(".caffeineItem , .alcoholItem , .dietItem , .exerciseItem").addClass(
    "mt-1"
  );
  $("h2").addClass("fs-3 border-bottom border-2");
  $(".error-msg").addClass("text-danger");
}

function addOptions() {
  addMonth();
  addDays();
  addYears();
  addDieases();
  addGenders();
}
function addGenders() {
  let genders = ["Male", "Female", "Others"];
  genders.forEach((g) => {
    $("#slGender").append(` <option value="${g}">${g}</option>`);
  });
}
function addDieases() {
  var humanDiseases = [
    "Influenza",
    "Hypertension",
    "Diabetes",
    "Cancer",
    "Alzheimer's Disease",
    "Parkinson's Disease",
    "Arthritis",
    "Asthma",
    "Heart Disease",
    "Stroke",
    "COVID-19",
    "Tuberculosis",
    "Malaria",
    "HIV/AIDS",
    "Ebola Virus Disease",
    "Cholera",
    "Dengue Fever",
    "Atrial Fibrillation",
    "Diverticulitis",
    "Eczema",
    "Psoriasis",
    "Acne",
    "Rosacea",
    "Lupus",
    "Fibromyalgia",
  ];
  humanDiseases.forEach((d) => {
    $("#diseasesList").append(`
    <div class="dieases">
              <input
                class="form-check-input me-2 mt-1"
                type="checkbox"
                class="dieasesItem"
                name="hDieases"
                value="${d}"
                id="${d}"
              />
              <label for="${d}">${d}</label>
            </div>
     `);
  });
}
function addDays() {
  for (let i = 1; i <= 31; i++) {
    $("#slDay").append(`<option value="${i}">${i}</option>`);
  }
}

function addYears() {
  for (let i = 1980; i <= 2023; i++) {
    $("#slYear").append(`<option value="${i}">${i}</option>`);
  }
}

function addMonth() {
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
  months.forEach((c) => {
    $("#slMonth").append(`<option value=" ${c} ">${c}</option>`);
  });
}

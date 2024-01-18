function load() {
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

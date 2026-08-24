// DOM ELEMENTS
const addApplicationBtn = document.getElementById("add-application-btn");
const applicationModal = document.getElementById("application-modal");
const cancelApplicationBtn = document.getElementById("cancel-application-btn");
const applicationForm = document.getElementById("application-form");

// Form fields
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const locationInput = document.getElementById("location");
const salaryInput = document.getElementById("salary");
const dateInput = document.getElementById("application-date");
const statusSelect = document.getElementById("application-status");
const notesInput = document.getElementById("notes");

// Array that holds all aplication objects
let applications = [];

// Open Modal
addApplicationBtn.addEventListener("click", function () {
  applicationModal.classList.add("active");
});

// Close Modal
cancelApplicationBtn.addEventListener("click", function () {
  applicationModal.classList.remove("active");
});

// Prevents the browser from refreshing the page when the form is submitted
applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Read the values from inputs
  const company = companyInput.value.trim();
  const position = positionInput.value.trim();
  const location = locationInput.value.trim();
  const salary = salaryInput.value;
  const applicationDate = dateInput.value;
  const status = statusSelect.value;
  const notes = notesInput.value.trim();

  // Object that represents a job application
  const newApplication = {
    id: Date.now(),
    company: company,
    position: position,
    location: location,
    salary: salary,
    applicationDate: applicationDate,
    status: status,
    notes: notes,
  };

  applications.push(newApplication);

  console.log(newApplication);
  console.log(applications);
});

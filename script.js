// DOM ELEMENTS
const addApplicationBtn = document.getElementById("add-application-btn");
const applicationModal = document.getElementById("application-modal");
const cancelApplicationBtn = document.getElementById("cancel-application-btn");
const applicationForm = document.getElementById("application-form");
const applicationList = document.getElementById("applications-list");

// Form fields
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const locationInput = document.getElementById("location");
const salaryInput = document.getElementById("salary");
const dateInput = document.getElementById("application-date");
const statusSelect = document.getElementById("application-status");
const notesInput = document.getElementById("notes");

// Array that holds all aplications
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
  renderApplications();
  applicationForm.reset();
  applicationModal.classList.remove("active");
});

function renderApplications() {
  applicationList.innerHTML = "";

  if (applications.length === 0) {
    applicationList.innerHTML = `<p class="empty-state">No applications yet.</p>`;
    return;
  }

  applications.forEach((application) => {
    const applicationCard = document.createElement("article");
    applicationCard.classList.add("application-card");

    const companyName = document.createElement("h3");
    companyName.textContent = application.company;

    const position = document.createElement("p");
    position.classList.add("application-position");
    position.textContent = application.position;

    const location = document.createElement("p");
    location.textContent = application.location;

    const salary = document.createElement("p");
    salary.textContent = application.salary;

    const date = document.createElement("p");
    date.textContent = application.applicationDate;

    const status = document.createElement("span");
    status.textContent = application.status;

    applicationCard.append(
      companyName,
      position,
      location,
      salary,
      date,
      status,
    );

    applicationList.appendChild(applicationCard);
  });
}

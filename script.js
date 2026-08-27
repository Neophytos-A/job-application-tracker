// DOM ELEMENTS
const addApplicationBtn = document.getElementById("add-application-btn");
const applicationModal = document.getElementById("application-modal");
const cancelApplicationBtn = document.getElementById("cancel-application-btn");
const applicationForm = document.getElementById("application-form");
const applicationsList = document.getElementById("applications-list");

// Form fields
const companyInput = document.getElementById("company");
const positionInput = document.getElementById("position");
const locationInput = document.getElementById("location");
const salaryInput = document.getElementById("salary");
const dateInput = document.getElementById("application-date");
const statusSelect = document.getElementById("application-status");
const notesInput = document.getElementById("notes");

// DOM REFERENCES FOR STATS
const totalApplicationsCount = document.getElementById(
  "total-applications-count",
);

const interviewCount = document.getElementById("interview-count");

const offerCount = document.getElementById("offer-count");

const rejectedCount = document.getElementById("rejected-count");

// Array that holds all applications
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
  updateStats();
  applicationForm.reset();
  applicationModal.classList.remove("active");
});

function renderApplications() {
  applicationsList.innerHTML = "";

  if (applications.length === 0) {
    applicationsList.innerHTML = `<p class="empty-state">No applications yet.</p>`;
    return;
  }

  applications.forEach((application) => {
    const applicationCard = document.createElement("article");
    applicationCard.classList.add("application-card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("application-card-header");

    const companyName = document.createElement("h3");
    companyName.classList.add("application-company");
    companyName.textContent = application.company;

    const position = document.createElement("p");
    position.classList.add("application-position");
    position.textContent = application.position;

    const details = document.createElement("div");
    details.classList.add("application-details");

    const location = document.createElement("p");
    location.classList.add("application-detail");
    location.textContent = application.location;

    const salary = document.createElement("p");
    salary.classList.add("application-detail");
    salary.textContent = application.salary;

    const date = document.createElement("p");
    date.classList.add("application-detail");
    date.textContent = application.applicationDate;

    const status = document.createElement("span");
    status.classList.add("application-status");
    status.textContent = application.status;

    cardHeader.append(companyName, status);
    details.append(location, salary, date);

    const notes = document.createElement("p");
    notes.classList.add("application-notes");
    notes.textContent = application.notes;

    applicationCard.append(cardHeader, position, details, notes);

    applicationsList.appendChild(applicationCard);
  });
}

function updateStats() {
  totalApplicationsCount.textContent = applications.length;

  const interviews = applications.filter((application) => {
    return (
      application.status === "interview" ||
      application.status === "technical-interview"
    );
  });

  const offers = applications.filter((application) => {
    return application.status === "offer";
  });

  const rejected = applications.filter((application) => {
    return application.status === "rejected";
  });

  interviewCount.textContent = interviews.length;
  offerCount.textContent = offers.length;
  rejectedCount.textContent = rejected.length;
}

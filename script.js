// DOM ELEMENTS
const addApplicationBtn = document.getElementById("add-application-btn");
const applicationModal = document.getElementById("application-modal");
const cancelApplicationBtn = document.getElementById("cancel-application-btn");
const applicationForm = document.getElementById("application-form");
const applicationsList = document.getElementById("applications-list");
const applicationSearch = document.getElementById("application-search");
const statusFilter = document.getElementById("status-filter");
const sortApplications = document.getElementById("sort-applications");

// Form fields
const applicationFormHeader = document.getElementById(
  "application-modal-title",
);
const applicationFormSubmitBtn = document.getElementById(
  "save-application-btn",
);
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
let editingApplicationId = null;

// Open Modal
addApplicationBtn.addEventListener("click", function () {
  editingApplicationId = null;
  applicationForm.reset();

  applicationFormHeader.textContent = "Add Application";
  applicationFormSubmitBtn.textContent = "Save Application";

  applicationModal.classList.add("active");
});

// Close with Cancel button
cancelApplicationBtn.addEventListener("click", closeModal);

// Close by clicking outside the modal
applicationModal.addEventListener("click", function (event) {
  if (event.target === applicationModal) {
    closeModal();
  }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && applicationModal.classList.contains("active")) {
    closeModal();
  }
});

// Search applications
applicationSearch.addEventListener("input", applyFilters);

// Filter applications by status
statusFilter.addEventListener("change", applyFilters);

// Sort applications
sortApplications.addEventListener("change", applyFilters);

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

  // Create new object that represents a job application
  if (editingApplicationId === null) {
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
  } else {
    const applicationToEdit = applications.find((application) => {
      return application.id === editingApplicationId;
    });

    applicationToEdit.company = company;
    applicationToEdit.position = position;
    applicationToEdit.location = location;
    applicationToEdit.salary = salary;
    applicationToEdit.applicationDate = applicationDate;
    applicationToEdit.status = status;
    applicationToEdit.notes = notes;

    editingApplicationId = null;
  }

  saveApplications();
  renderApplications(applications);
  updateStats();
  applicationForm.reset();
  applicationModal.classList.remove("active");
});

const salaryFormatter = new Intl.NumberFormat("en-CY", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function renderApplications(applicationsToRender) {
  applicationsList.innerHTML = "";

  if (applicationsToRender.length === 0) {
    if (applications.length === 0) {
      applicationsList.innerHTML = `<p class="empty-state">No applications yet.</p>`;
    } else {
      applicationsList.innerHTML = `<p class="empty-state">No applications match your search or filters.</p>`;
    }

    return;
  }

  applicationsToRender.forEach((application) => {
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
    location.textContent = application.location
      ? application.location
      : "Location not specified";

    const salary = document.createElement("p");
    salary.classList.add("application-detail");

    salary.textContent = application.salary
      ? salaryFormatter.format(application.salary)
      : "Salary not specified";

    const date = document.createElement("p");
    date.classList.add("application-detail");

    const applicationDate = new Date(application.applicationDate);
    date.textContent = dateFormatter.format(applicationDate);

    const status = document.createElement("span");
    status.classList.add("application-status");
    status.classList.add(`status-${application.status}`);
    status.textContent = application.status;

    const applicationActions = document.createElement("div");
    applicationActions.classList.add("application-actions");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-application-btn");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    const editButton = document.createElement("button");
    editButton.classList.add("edit-application-btn");
    editButton.type = "button";
    editButton.textContent = "Edit";

    applicationActions.append(editButton, deleteButton);
    cardHeader.append(companyName, status);
    details.append(location, salary, date);

    const notes = document.createElement("p");
    notes.classList.add("application-notes");
    notes.textContent = application.notes
      ? application.notes
      : "No additional notes";

    // Delete application
    deleteButton.addEventListener("click", function () {
      applications = applications.filter((savedApplication) => {
        // Keep all applications except the selected one
        return savedApplication.id !== application.id;
      });

      saveApplications();
      renderApplications(application);
      updateStats();
    });

    // Edit application
    editButton.addEventListener("click", function () {
      // The application we're editing according to ID
      editingApplicationId = application.id;

      // Fill form inputs
      companyInput.value = application.company;
      positionInput.value = application.position;
      locationInput.value = application.location;
      salaryInput.value = application.salary;
      dateInput.value = application.applicationDate;
      statusSelect.value = application.status;
      notesInput.value = application.notes;

      applicationFormHeader.textContent = "Edit Application";
      applicationFormSubmitBtn.textContent = "Save Changes";

      // Open Modal
      applicationModal.classList.add("active");
    });

    applicationCard.append(
      cardHeader,
      position,
      details,
      notes,
      applicationActions,
    );

    applicationsList.appendChild(applicationCard);
  });
}

// Update dashboard statistics
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

// Save applications to localStorage
function saveApplications() {
  const applicationsJSON = JSON.stringify(applications);
  localStorage.setItem("applications", applicationsJSON);
}

// Restore saved applications from localStorage
function loadApplications() {
  const savedApplications = localStorage.getItem("applications");

  // Check if there is any application
  if (savedApplications) {
    applications = JSON.parse(savedApplications);
  }
}

function applyFilters() {
  const search = applicationSearch.value.trim().toLowerCase();
  const status = statusFilter.value;
  const sort = sortApplications.value;

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.position.toLowerCase().includes(search) ||
      application.location.toLowerCase().includes(search);

    const matchesStatus = status === "all" || application.status === status;

    return matchesSearch && matchesStatus;
  });

  if (sort === "newest") {
    filteredApplications.sort((a, b) => {
      return new Date(b.applicationDate) - new Date(a.applicationDate);
    });
  }

  if (sort === "oldest") {
    filteredApplications.sort((a, b) => {
      return new Date(a.applicationDate) - new Date(b.applicationDate);
    });
  }

  if (sort === "company-asc") {
    filteredApplications.sort((a, b) => {
      return a.company.localeCompare(b.company);
    });
  }

  if (sort === "company-desc") {
    filteredApplications.sort((a, b) => {
      return b.company.localeCompare(a.company);
    });
  }

  renderApplications(filteredApplications);
}

function closeModal() {
  applicationModal.classList.remove("active");
  editingApplicationId = null;
  applicationForm.reset();
}

// Initialize the app
loadApplications();
renderApplications(applications);
updateStats();

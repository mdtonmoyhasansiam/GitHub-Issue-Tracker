// Base API URL 
const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

// DOM Elements 
const spinner = document.getElementById("spinner");
const cardContainer = document.getElementById("card-container");
const totalCount = document.getElementById("total-count");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const openTab = document.getElementById("openTab");
const allTab = document.getElementById("allTab");
const closedTab = document.getElementById("closedTab");

// Loading Functions 
function startLoading() {
    spinner.classList.remove("hidden");
    cardContainer.classList.add("hidden");
}

function stopLoading() {
    spinner.classList.add("hidden");
    cardContainer.classList.remove("hidden");
}

// Load All Issues 
const loadIssues = () => {
    startLoading();

    fetch(`${BASE_URL}/issues`)
        .then(res => res.json())
        .then(data => renderIssues(data.data));
};

loadIssues();


// Create Label Elements 
const createLabelElements = (labels) => {

    const elements = labels.map(label => {

        let badgeClass = "badge-success";
        let icon = "fa-wand-magic-sparkles";

        if (label === "bug") {
            badgeClass = "badge-error";
            icon = "fa-bug";
        }
        else if (label === "help wanted") {
            badgeClass = "badge-warning";
            icon = "fa-life-ring";
        }

        return `
        <div class="badge badge-soft ${badgeClass} text-xs">
            <i class="fa-solid ${icon}"></i>
            ${label.toUpperCase()}
        </div>
        `;
    });

    return elements.join(" ");
};


// Issues to UI
const renderIssues = (issues) => {

    cardContainer.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.classList.add(
            "issue-card",
            "rounded-lg",
            "bg-white",
            "flex",
            "flex-col"
        );

        card.classList.add(issue.status === "open" ? "open" : "closed");
        card.setAttribute("id", issue.id);

        card.innerHTML = `
        <div class="flex flex-col gap-3 p-4 flex-[80%]">

            <div class="flex items-center justify-between">
                <img src="assets/${issue.status}.png" alt="${issue.status}">

                <div class="badge badge-soft rounded-full text-sm 
                ${issue.priority === "high"
                ? "badge-error text-[#EF4444] bg-[#FEECEC]"
                : issue.priority === "medium"
                    ? "badge-warning text-[#F59E0B] bg-[#FFF6D1]"
                    : "badge-neutral text-[#9CA3AF]"}">

                    ${issue.priority.toUpperCase()}
                </div>
            </div>

            <div>
                <h3 class="text-md font-semibold">${issue.title}</h3>
                <p class="text-sm text-[#64748B]">${issue.description}</p>
            </div>

            <div class="flex flex-wrap gap-1">
                ${createLabelElements(issue.labels)}
            </div>

        </div>

        <div class="p-4 text-[#64748B] text-xs border-t border-[#E4E4E7]">

            <p class="mb-2">#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>

        </div>
        `;

        cardContainer.appendChild(card);
    });

    updateIssueCount();
    stopLoading();
};


// Count Total Issues
function updateIssueCount() {
    totalCount.innerText = cardContainer.children.length;
}


// Show Issue Details Modal 
cardContainer.addEventListener("click", (event) => {

    const card = event.target.closest(".issue-card");
    if (!card) return;

    const issueId = card.getAttribute("id");

    fetch(`${BASE_URL}/issue/${issueId}`)
        .then(res => res.json())
        .then(data => showModal(data.data));
});


// Modal UI 
const showModal = (data) => {

    const modal = document.getElementById("my_modal_5");

    modal.innerHTML = `
    <div class="modal-box p-6">

        <h3 class="text-2xl font-bold mb-2">${data.title}</h3>

        <div class="flex items-center gap-2">

            <div class="text-white text-sm py-[6px] px-[15px] rounded-full
            ${data.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"}">
                ${data.status}
            </div>

            <span class="text-sm text-[#64748B]">
                ${data.status} by ${data.assignee}
            </span>

            <span class="text-sm text-[#64748B]">
                ${new Date(data.updatedAt).toLocaleDateString("en-US")}
            </span>

        </div>

        <div class="flex flex-wrap gap-1 my-6">
            ${createLabelElements(data.labels)}
        </div>

        <p class="mb-6 text-[#64748B]">
            ${data.description}
        </p>

        <div class="grid grid-cols-2 gap-3 bg-[#F8FAFC] p-4 rounded-lg">

            <div>
                <p class="text-[#64748B] mb-1">Assignee</p>
                <h4 class="font-semibold">${data.assignee}</h4>
            </div>

            <div>
                <p class="text-[#64748B] mb-1">Priority</p>
                <div class="uppercase text-xs px-3 py-1 rounded-full">
                    ${data.priority}
                </div>
            </div>

        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>

    </div>
    `;

    modal.showModal();
};


// Search Function 
searchBtn.addEventListener("click", () => {

    startLoading();

    const query = searchInput.value.trim();

    fetch(`${BASE_URL}/issues/search?q=${query}`)
        .then(res => res.json())
        .then(data => renderIssues(data.data));
});


// Tab Button Style 
const disableActive = (btn) => btn.classList.remove("btn-primary");
const enableActive = (btn) => btn.classList.add("btn-primary");

const showTab = (id) => {

    const allBtns = document.querySelectorAll(".tab-btn");

    allBtns.forEach(btn => disableActive(btn));

    const activeBtn = document.getElementById(id);
    enableActive(activeBtn);
};

window.addEventListener("DOMContentLoaded", () => {
    showTab("allTab");
});


// Filter Open Issues 
openTab.addEventListener("click", () => {

    startLoading();

    fetch(`${BASE_URL}/issues`)
        .then(res => res.json())
        .then(data => {

            const openIssues = data.data.filter(
                issue => issue.status === "open"
            );

            renderIssues(openIssues);
        });
});


// Show All Issues 
allTab.addEventListener("click", () => {
    startLoading();
    loadIssues();
});


// Filter Closed Issues 
closedTab.addEventListener("click", () => {

    startLoading();

    fetch(`${BASE_URL}/issues`)
        .then(res => res.json())
        .then(data => {

            const closedIssues = data.data.filter(
                issue => issue.status === "closed"
            );

            renderIssues(closedIssues);
        });
});
const container = document.getElementById("job-container");
const loader = document.getElementById("loader");

const API_URL = "https://remotive.com/api/remote-jobs";

async function fetchJobs(query="") {

container.innerHTML = "";
loader.style.display = "block";

try{

let url = API_URL;

if(query){
url = `${API_URL}?search=${query}`;
}

const response = await fetch(url);
const data = await response.json();

displayJobs(data.jobs);

}
catch(error){
container.innerHTML = "<p>Failed to load jobs</p>";
}

loader.style.display = "none";

}

function displayJobs(jobs){

container.innerHTML="";

jobs.slice(0,20).forEach(job=>{

const jobCard = document.createElement("div");
jobCard.classList.add("job-card");

jobCard.innerHTML = `
<div class="job-title">${job.title}</div>
<div class="company">${job.company_name}</div>
<div class="location">${job.candidate_required_location}</div>
<p>${job.job_type}</p>
<a href="${job.url}" target="_blank" class="apply-btn">Apply</a>
`;

container.appendChild(jobCard);

});

}

function searchJobs(){

const query = document.getElementById("searchInput").value;

fetchJobs(query);

}

fetchJobs();
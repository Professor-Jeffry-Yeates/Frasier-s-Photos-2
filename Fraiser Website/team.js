// Team inventory data
let teamInventory = []

// JSON data
function retrieveTeamMembersFromMemory() {
    let value = window.localStorage.getItem("teams");
    let success = false
    if ( value ) {
        let results = JSON.parse(value);
        if ( results) {
            teamInventory.teams = []
            results.forEach(team => {
                teamInventory.teams.push(team);
            })
            success = true
        }
    }    
    if (success) {
        populateTeamBody();
    } else {
        loadTeamMembersFromJson()
    }
}
function loadTeamMembersFromJson() {
    fetch('../JSON/teams.json')
    .then((res) => res.json())
    .then((data) => {
        teamInventory.teams = []
        data.teams.forEach(team => {
            teamInventory.teams.push(team);
        }) 
        populateTeamBody();
    })
}
// Populate team members into the body ofthe website
function populateTeamBody() {
    const tableBody = document.getElementById('team-body');
    tableBody.innerHTML = '';
    teamInventory.teams.forEach(member => {
        if (member.visible && member.employed) {

            // check if the file in memberPhoto exists
            let filePath = "../images/" + member.image;
            let xhr = new XMLHttpRequest();
            xhr.open('HEAD', filePath, false);
            xhr.send();
            if (xhr.status === 404) {
                filePath = "../images/unknown.png";
            }

            const divForMember = document.createElement('div');
            let eachMemberInfo = 
                `<div class="row">
                    <div class="col-6">
                        <div class="team-member">
                            <div class="member-photo">
                                <div class="photo-placeholder">
                                    <img src="${filePath}" alt="${member.name}">
                                </div>
                            </div>
                            <div class="member-info">
                                <h3>${member.id}:  ${member.name} also known as ${member.nickname}</h3>
                                <div class="role">${member.position}</div>
                                <div class="role">${member.email}</div>
                                <div class="role">${member.phone}</div>
                                <p>${member.description}</p>
                                <div class="social-links">
                                    <a href="#"><i class="fab fa-instagram"></i></a>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <a href="#"><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`

            divForMember.innerHTML = eachMemberInfo
            tableBody.appendChild(divForMember);
        }
    })
}
// Initialize team table
document.addEventListener('DOMContentLoaded', retrieveTeamMembersFromMemory);

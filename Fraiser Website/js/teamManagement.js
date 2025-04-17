// Team inventory data
let teamInventory = []
// Helper functions for inventory management
function getTeamMemberById(id, teams=[]) {
    if (teams.length === 0) {
        teams = teamInventory.teams;
    }
    return teams.filter(team => team.id === id);
}
function getTeamMemberByName(name, teams=[]) {
    if (teams.length === 0) {
        teams = teamInventory.teams;
    }
    return teams.filter(team => team.name === name);
}

function getTeamMemberByInvisible(teams=[]) {
    if (teams.length === 0) {
        teams = teamInventory.teams;
    }
    return teams.filter(team => team.visible === false);
}
function getTeamMemberByVisible(teams=[]) {
    if (teams.length === 0) {
        teams = teamInventory.teams;
    }
    return teams.filter(team => team.visible === true);
}

function getTeamMemberByPosition(poition, teams=[]) {
    if (teams.length === 0) {
        teams = teamInventory.teams;
    }
    return teams.filter(team => team.poition === poition);
}
function hideTeamMember(id) {
    const index = teamInventory.teams.findIndex(p => p.id === id);
    if (index !== -1) {
        teamInventory.teams[index].visible = !teamInventory.teams[index].visible;
        placeTeamMembersIntoMemory()
        populateTeamTable();
    }
}
function unemployTeamMember(id) {
    const index = teamInventory.teams.findIndex(p => p.id === id);
    if (index !== -1) {
        teamInventory.teams[index].employed = !teamInventory.teams[index].employed;
        placeTeamMembersIntoMemory()
        populateTeamTable();
    }
}
// Populate inventory table
function populateTeamTable() {
    const tableBody = document.getElementById('team-table-body');
    tableBody.innerHTML = '';
    teamInventory.teams.forEach(member => {
        const row = document.createElement('tr');
        if (!member.visible) {
            row.classList.add('status-invisible');
        }
        let eachRow = ""
        let employment = member.employed ? "Employed" : "Unemployed"
        
        let memberPhoto = member.image
        if (memberPhoto.length === 0) {
            memberPhoto = "unknown.png";    
        } else {
            let dotIndex = memberPhoto.indexOf('.');        
            if (dotIndex === -1) {
                memberPhoto += ".jpg";
            }
        }
        // check if the file in memberPhoto exists
        let filePath = "../photos/" + memberPhoto;
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', filePath, false);
        xhr.send();
        if (xhr.status === 404) {
            filePath = "../photos/unknown.png";
        }
        eachRow = `
            <td>${member.id}</td>
            <td>${employment}</td>
            <td>${member.position}</td>
            <td>${member.name}</td>
            <td>${member.nickname}</td>
            <td>${member.email}</td>
            <td>${member.image}</td>
            <td><img class="miniture-image" src="${filePath}"</td>
            <td>
                <button class="action-btn edit-btn" onclick="editTeamMember('${member.id}')">
                    <i class="fas fa-edit"></i> </button>`

        if (member.employed) {
                eachRow += `<button class="action-btn unemploy-btn" onclick="unemployTeamMember('${member.id}')">
            <i class="fas fa-trash"></i> </button>`
        }
        else {
                eachRow += `<button class="action-btn good-btn" onclick="unemployTeamMember('${member.id}')">
            <i class="fas fa-trash"></i> </button>`
        }
        if (member.visible) {
            eachRow += `
                <button class="action-btn good-btn" onclick="hideTeamMember('${member.id}')">
                    <i class="fas fa-eye-slash"></i> </button>`
        }
        else {
            eachRow += `
                <button class="action-btn warning-btn" onclick="hideTeamMember('${member.id}')">
                    <i class="fas fa-eye"></i> </button>`
        }
        eachRow += `</td>`
        row.innerHTML = eachRow
        tableBody.appendChild(row);
    });
}
// Modal functions
function openAddTeamMemberModal() {
    document.getElementById('modalTitle').textContent = 'Add Team Member';
    document.getElementById('teamForm').reset();
    document.getElementById('teamModal').style.display = 'block';
}
function closeTeamModal() {
    document.getElementById('teamModal').style.display = 'none';
}
function editTeamMember(id) {
    const member = teamInventory.teams.find(p => p.id === id);
    if (member) {
        document.getElementById('modalTitle').textContent = 'Edit Team Member';
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberDescription').value = member.description;
        document.getElementById('memberNickname').value = member.nickname;
        document.getElementById('memberImage').value = member.image;
        document.getElementById('teamPosition').value = member.position;
        document.getElementById('memberStreet1').value = member.address.street1;
        document.getElementById('memberStreet2').value = member.address.street2;
        document.getElementById('memberCity').value = member.address.city;
        document.getElementById('memberState').value = member.address.state;
        document.getElementById('memberZipcode').value = member.address.zip;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone;
        document.getElementById('memberVisible').value = member.visible;
        document.getElementById('memberEmployed').value = member.employed;
        document.getElementById('teamModal').style.display = 'block';
    }
}

function handleTeamMemberSubmit(event) {
    event.preventDefault();
    teamImageName = document.getElementById('memberImage').value;
    if ( teamImageName.length === 0 ) {
        teamImageName = "unknown.png"
    } else {
        let dotIndex = teamImageName.indexOf('.');
        if (dotIndex === -1) {
            teamImageName += ".jpg";
        }
    }

    let visible = document.getElementById('memberVisible').value
    visible = visible === "true" ? true : false;
    let employed = document.getElementById('memberEmployed').value
    employed = employed === "true" ? true : false;
    
    const formData = {
        id: document.getElementById('memberId').value,
        name: document.getElementById('memberName').value,
        description: document.getElementById('memberDescription').value,
        nickname: document.getElementById('memberNickname').value,
        image: teamImageName,
        position: document.getElementById('teamPosition').value,
        address : {
            street1: document.getElementById('memberStreet1').value,
            street2: document.getElementById('memberStreet2').value,
            city: document.getElementById('memberCity').value,
            state: document.getElementById('memberState').value,
            zip: document.getElementById('memberZipcode').value
        },
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        employed: document.getElementById('memberEmployed').value,
        visible: visible,
        employed: employed
    };
    // Add or update team
    if (document.getElementById('modalTitle').textContent === 'Add Team Member') {
        let newID = 0;
        teamInventory.teams.forEach(eachTeam => {
            if (eachTeam.id >= newID) {
                newID = eachTeam.id;
            }
        })
        formData.id = newID+1;
        teamInventory.teams.push(formData);
    } else {
        const id = parseInt(document.getElementById('memberId').value);
        const index = teamInventory.teams.findIndex(p => p.id === id);
        if (index !== -1) {
            formData.id = id;
            teamInventory.teams[index] = formData;
        }
    }
    populateTeamTable();
    closeTeamModal();
    placeTeamMembersIntoMemory()
}

// JSON Access
function saveTeamMembersToJson() {
 // save the teams to a JSON file at "../JSON/team.json"
    const json = JSON.stringify({ teams: teamInventory.teams }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teams.json'; // Goes into Downloads folder
    a.click();
    URL.revokeObjectURL(url);

}
function placeTeamMembersIntoMemory() {
    let value = JSON.stringify(teamInventory.teams);
    window.localStorage.setItem("teams", value);
}
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
        populateTeamTable();
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
        populateTeamTable();
    })
}
// Initialize team table
document.addEventListener('DOMContentLoaded', retrieveTeamMembersFromMemory);

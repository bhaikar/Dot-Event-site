import {generateTransactionId,generateTicketId} from "./Generate_uuid.js";
import {updateDate , updateTime} from "./Generate_dateTime.js"

setInterval(() => {updateDate() ; updateTime()},1000);


const membersContainer = document.getElementById("members");
const addMemberBtn = document.getElementById("addMember");
const form = document.getElementById("teamForm");
const message = document.getElementById("message");
let memberCount = 2;
// let ticketPrice = 0;
const gameathonTicketPrice = "1000";
const hackathonTicketPrice = "2000";
const cicadaTicketPrice = "3000";

// Add member
addMemberBtn.addEventListener("click", function () {

    if (memberCount >= 4) {
        return;
    }

    memberCount++;

    const member = document.createElement("div");
    member.className = "member";

    member.innerHTML = `
        <label>Member ${memberCount} Name</label>

        <input
            type="text"
            name="member"
            placeholder="Enter member ${memberCount} name"
            required
        >

        <button
            type="button"
            class="remove-btn"
            onclick="removeMember(this)"
            aria-label="Remove member"
        >
            ×
        </button>
    `;

    membersContainer.appendChild(member);

    updateButton();
});


// Remove member
function removeMember(button) {

    button.parentElement.remove();

    memberCount--;

    const members = document.querySelectorAll(".member");

    members.forEach((member, index) => {

        const number = index + 2;

        member.querySelector("label").textContent =
            `Member ${number} Name`;

        member.querySelector("input").placeholder =
            `Enter member ${number} name`;
    });

    updateButton();
}


// Update add button
function updateButton() {

    if (memberCount >= 4) {

        addMemberBtn.disabled = true;
        addMemberBtn.textContent = "Maximum 4 Members";

    } else {

        addMemberBtn.disabled = false;
        addMemberBtn.textContent = "+ Add Member";
    }
}

// Setting the ticket price
function ticketAmt(event) {
        if (event === "Gameathon"){
      return gameathonTicketPrice;
    }
    else if (event === "Hackathon"){
      return hackathonTicketPrice;
    }
    else if (event === "Cicada"){
      return cicadaTicketPrice
    }
}

// Submit form
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const members = [];

    document
        .querySelectorAll('input[name="member"]')
        .forEach(input => {
            members.push(input.value);
        });


    if (members.length < 1) {
        alert("A team must have at least 2 members.");
        return;
    }

    if (members.length > 4) {
        alert("A team can have maximum 4 members.");
        return;
    }

    const uuid = generateTransactionId();

    const teamData = {
        teamName: document.getElementById("teamName").value,
        leaderName: document.getElementById("leaderName").value,
        mobile: document.getElementById("mobile").value,
        whatsapp: document.getElementById("whatsapp").value,
        members: members,
        ticket: document.getElementById("ticket").value,
        uuid :uuid,
        ticketId : generateTicketId(uuid, updateDate(),document.getElementById("ticket").value),
        date : updateDate(),
        timeApplication : updateTime(),
        timeUtr : "None",
        utr : "None",
        receiptID : "None",
        ticketPrice: ticketAmt(document.getElementById("ticket").value),
        paymentStatus:"UNDER_VERIFICATION"
    };

    // console.log("Registration:", teamData);

    sessionStorage.setItem("teamData", JSON.stringify(teamData));
    window.location.href = "Payment_gate.html";


    // message.style.display = "block";
    // form.reset();
    //
    // membersContainer.innerHTML = `
    //     <div class="member">
    //         <label>Member 2 Name</label>
    //         <input
    //             type="text"
    //             name="member"
    //             placeholder="Enter member 2 name"
    //             required
    //         >
    //     </div>
    // `;
    //
    // memberCount = 2;
    // updateButton();

});


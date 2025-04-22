
// Project Part 3 - Ashley Rohleder
document.addEventListener("DOMContentLoaded", function () {

    // Get the form by the ID
    var form = document.getElementById("event-signup-form");

    loadSignups();

    form.onsubmit = function (event) {
        event.preventDefault(); // Prevent the form from submitting early

        // Gets the values from the form
        var eventName = document.getElementById("event-name").value;
        var repName = document.getElementById("rep-name").value;
        var repEmail = document.getElementById("rep-email").value;
        var role = document.getElementById("role").value;

        // Checks if the required fields are filled
        if (!eventName || !repName || !repEmail || !role) {
            alert("Please fill in all fields.");
            return; // Exit the function if any field is empty
        }

        // Email validation 
        if (repEmail.indexOf("@") === -1 || repEmail.indexOf(".") === -1) {
            alert("Please enter a valid email address.");
            return; // Exit the function if the email is invalid
        }

        // Stores the data, and gives the instance a unique ID for tracking
        const signup = {
            id: Date.now(), // Unique ID for tracking
            eventName,
            representativeName: repName,
            representativeEmail: repEmail,
            companyRole: role
        };
        
        // Adds signup data to the table
        addToSignupTable(signup);
        // Saves the signup data to memory storage
        saveSignups(signup);
        updateRoleSignups();

        console.log("Form data:", formData); // Displays data in the console
        // Confirmation message
        alert("Thank you for signing up to one of our exciting events!");
        // Clears the form
        form.reset();
    };

        // Function to add the submission to the signup table.
    function addToSignupTable(signupData) {
        const tableBody = document.querySelector("#signup-table tbody");
        
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${signupData.eventName}</td>
            <td>${signupData.representativeName}</td>
            <td>${signupData.representativeEmail}</td>
            <td>${signupData.companyRole}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        
        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
            deleteSignups(signupData.id);
            updateRoleSignups();
        });

        tableBody.appendChild(row);
    }

    // Save the signups to localStorage
    function saveSignups(signup) {
        let signups = JSON.parse(localStorage.getItem("signups")) || [];
        signups.push(signup);
        localStorage.setItem("signups", JSON.stringify(signups));
    }

    function deleteSignups(id) {
        let signups = JSON.parse(localStorage.getItem("signups")) || [];
        signups = signups.filter(s => s.id !== id);
        localStorage.setItem("signups", JSON.stringify(signups));
    }

    function loadSignups() {
        const storedSignups = JSON.parse(localStorage.getItem("signups")) || [];
        storedSignups.forEach(addToSignupTable);
        updateRoleSummary();
    }
});
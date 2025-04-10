
// Project Part 3 - Ashley Rohleder
document.addEventListener("DOMContentLoaded", function () {

    // Get the form by the ID
    var form = document.getElementById("event-signup-form");

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

        // Stores the data in an object
        var formData = {
            eventName: eventName,
            representativeName: repName,
            representativeEmail: repEmail,
            companyRole: role
        };

        console.log("Form data:", formData); // Display data in the console

        // Confirmation message
        alert("Thank you for signing up to one of our exciting events!");

        // Clears the form
        form.reset();
    };
});
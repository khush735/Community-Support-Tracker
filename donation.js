const donations = [];

function validateDonation(charityName, amount, date) {
    const errors = [];
    if (!charityName?.trim()) errors.push("Charity name required");
    if (isNaN(amount)) errors.push("Amount must be a number");
    else if (amount <= 0) errors.push("Amount must be positive");
    if (!date) errors.push("Date required");
    return errors;
}

// Browser-specific code
if (typeof document !== 'undefined') {
    document.getElementById("donationForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = {
            charityName: document.getElementById("charityName").value,
            amount: parseFloat(document.getElementById("amount").value),
            date: document.getElementById("date").value,
            comment: document.getElementById("comment").value
        };

        const errors = validateDonation(formData.charityName, formData.amount, formData.date);
        const errorContainer = document.getElementById("errorContainer");

        if (errors.length > 0) {
            errorContainer.innerHTML = errors.join("<br>");
            errorContainer.style.display = "block";
        } else {
            donations.push(formData);
            e.target.reset();
            errorContainer.style.display = "none";
            alert("Donation recorded!");
        }
    });
}

module.exports = {
    validateDonation,
    donations
};
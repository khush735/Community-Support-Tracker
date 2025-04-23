let donations = JSON.parse(localStorage.getItem("donations")) || [];

function validateDonation(charityName, amount, date) {
    const errors = [];
    if (!charityName?.trim()) errors.push("Charity name required");
    if (isNaN(amount)) errors.push("Amount must be a number");
    else if (amount <= 0) errors.push("Amount must be positive");
    if (!date) errors.push("Date required");
    return errors;
}

function renderDonations() {
    const tableBody = document.getElementById("donationTableBody");
    const summary = document.getElementById("donationSummary");

    tableBody.innerHTML = "";
    let total = 0;

    donations.forEach((donation, index) => {
        total += donation.amount;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${donation.charityName}</td>
            <td>$${donation.amount.toFixed(2)}</td>
            <td>${donation.date}</td>
            <td>${donation.comment}</td>
            <td><button onclick="deleteDonation(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    summary.textContent = `Total Donated: $${total.toFixed(2)}`;
}

function deleteDonation(index) {
    donations.splice(index, 1);
    localStorage.setItem("donations", JSON.stringify(donations));
    renderDonations();
}

if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        renderDonations();

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
                localStorage.setItem("donations", JSON.stringify(donations));
                e.target.reset();
                errorContainer.style.display = "none";
                renderDonations();
            }
        });
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        validateDonation,
        deleteDonation,
        renderDonations,
        donations
    };
}

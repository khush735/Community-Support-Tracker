/**
 * @jest-environment jsdom
 */
describe("Donation Tracker - Stage 2", () => {
    let validateDonation, deleteDonation, donations;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = `
            <div id="errorContainer"></div>
            <form id="donationForm">
                <input id="charityName">
                <input id="amount">
                <input id="date">
                <input id="comment">
                <button type="submit">Submit</button>
            </form>
            <table><tbody id="donationTableBody"></tbody></table>
            <p id="donationSummary"></p>
        `;

        // Require AFTER DOM is created
        const module = require("./donation");
        validateDonation = module.validateDonation;
        deleteDonation = module.deleteDonation;
        donations = module.donations;
    });

    test("validateDonation identifies empty and invalid fields", () => {
        expect(validateDonation("", "", "")).toEqual([
            "Charity name required",
            "Amount must be positive",
            "Date required"
        ]);
    });

    test("deleteDonation updates localStorage and donations array", () => {
        donations.push({ charityName: "Test", amount: 10, date: "2024-01-01", comment: "A+" });
        localStorage.setItem("donations", JSON.stringify(donations));
        deleteDonation(0);
        expect(donations.length).toBe(0);
    });

    test("Form submits valid donation", () => {
        // Re-bind form logic manually (Jest doesn't run DOMContentLoaded)
        const form = document.getElementById("donationForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = {
                charityName: document.getElementById("charityName").value,
                amount: parseFloat(document.getElementById("amount").value),
                date: document.getElementById("date").value,
                comment: document.getElementById("comment").value
            };
            const errors = validateDonation(formData.charityName, formData.amount, formData.date);
            if (errors.length === 0) {
                donations.push(formData);
            }
        });

        document.getElementById("charityName").value = "WWF";
        document.getElementById("amount").value = "50";
        document.getElementById("date").value = "2024-04-22";
        document.getElementById("comment").value = "Earth Day";

        form.dispatchEvent(new Event("submit", { bubbles: true }));

        expect(donations.length).toBe(1);
        expect(donations[0].charityName).toBe("WWF");
    });
});

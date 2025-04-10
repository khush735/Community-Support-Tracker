const { validateDonation, donations } = require('./donation');

describe('Validation Function', () => {
    test('Valid input returns no errors', () => {
        expect(validateDonation("Red Cross", 100, "2023-10-15")).toEqual([]);
    });

    test('Empty charity name triggers error', () => {
        expect(validateDonation("", 50, "2023-10-15"))
            .toContain("Charity name required");
    });
});

describe('Donations Array', () => {
    beforeEach(() => donations.length = 0);

    test('Starts empty', () => {
        expect(donations).toHaveLength(0);
    });
});
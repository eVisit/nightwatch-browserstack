module.exports = {
    //This test edits all fiedls of Personal Info considering the happy path
    "Edit Personal Info Successfully": function (browser) {
        const personalInfoPage = browser.page.provider.my_account.personalInfoPage()

        personalInfoPage.accessPersonalInfoPage()
            //edit fields in Personal Info form according to parameters values
            .editPersonalInfo("Automation", "Test", "Provider", "Address 1 Edited", "Address 2 Edited", "City Edited", 
            "WyomingOption", "12345", "480-289-1576", "09/09/1990", "femaleOption", "Pediatrics, Dermatology, Oncologisty", "AmericaPhoenixMST0700Option")
            //check Success toast
            .checkToastMessage("Personal Info updated.")
            //check if all fields were saved as informed previously
            .checkPersistence("Automation", "Test", "Provider", "Address 1 Edited", "Address 2 Edited", "City Edited",
            "Wyoming", "12345", "480-289-1576", "09/09/1990", "Female", "Pediatrics, Dermatology, Oncologisty", "America/Phoenix (MST -0700)")
    },

    after: function (browser) {
        browser.end();
    }
};
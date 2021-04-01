module.exports = {
    //This test edit all fiedls of Personal Info considering the happy path
    "Edit Personal Info Successfully": function (browser) {
        const personalInfoPage = browser.page.patient.my_account.personalInfoPage()

        personalInfoPage.accessPersonalInfoPage()
            //edit fields in Personal Info form according to parameters values
            .editPersonalInfo("First Name Edited", "Middle Name Edited","Last Name Edited", "Address 1 Edited",
            "Address 2 Edited", "City Edited", "WyomingOption", "12345", "480-289-1576", "09/06/1990", "femaleOption", "AmericaNoronha020200Option")
            //check Success toast
            .checkToastMessage("Personal Info updated.")
            //check if all fields were saved as informed previously
            .checkPersistence("First Name Edited", "Middle Name Edited","Last Name Edited", "Address 1 Edited",
            "Address 2 Edited", "City Edited", "Wyoming", "12345", "480-289-1576", "09/06/1990", "Female", "America/Noronha (-02 -0200)")
    },

    after: function (browser) {
        browser.end();
    }
};
let pharmacyPage;

module.exports = {
    
    before: function (browser) {
        pharmacyPage = browser.page.patient.my_account.pharmacyPage();
    },
    
    "Search and Update Pharmacy": function (browser) {
        const personalInfoPage = browser.page.patient.my_account.personalInfoPage()

        personalInfoPage.accessPersonalInfoPage()
        //get Address 1 value inputed by the patient on Personal Info page
        personalInfoPage.getAttribute('@addressLine1', 'value', function(address) {
            //check if search field has the address input by the patient 
            pharmacyPage.checkAddressInputByPatient(address.value)
        })
        pharmacyPage
            //search by new address (by zipcode)
            .searchBy("47374")
            //select new pharmacy by List
            .selectByList()
            //search by new address (by zipcode)
            .searchBy("47374")
            //select new pharmacy by Map
            .selectByMap()
    },

    after: function (browser) {
        browser.end();
    }
};
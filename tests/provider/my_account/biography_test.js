module.exports = {
    "Edit Biography using Bio Generator Successfully": function (browser) {
        const biographyPage = browser.page.provider.my_account.biographyPage()

        biographyPage.accessBiographyPage()
        biographyPage.checkProviderInfo('Automation Provider', 'Pediatrics, Dermatology, Oncologisty', 
        'Address 1 Edited', 'Address 2 Edited', 'City Edited, WY, 12345')
        biographyPage.clearBiography()
        biographyPage.addBioGenerator()
    },

    "Edit Biography using HTML Editor Successfully": function (browser) {
        const biographyPage = browser.page.provider.my_account.biographyPage()

        biographyPage.accessBiographyPage()
        biographyPage.checkProviderInfo('Automation Provider', 'Pediatrics, Dermatology, Oncologisty', 
        'Address 1 Edited', 'Address 2 Edited', 'City Edited, WY, 12345')
        biographyPage.clearBiography()
        biographyPage.addBioHTML("Red", "Purple")
    },

    afterEach: function (browser) {
        browser.end();
    }
};
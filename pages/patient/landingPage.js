const elements = {

    // Patient list row
    SelectPatient: `[data-test-id='rowClick']`,

    // Menu and menu items
    btnUserProfile: `[data-test-id='userProfileButton']`,
    myAccountMenuItem: `[data-test-id='myAccountMenuItem']`,
    upcomingVisitsMenuItem: `[data-test-id="upcomingVisitsMenuItem"]`,
    visitHistoryMenuItem: `[data-test-id="visitHistoryMenuItem"]`,
    equipmentTestMenuItem: `[data-test-id="equipmentTestMenuItem"]`,
    helpMenuItem: `[data-test-id="helpMenuItem"]`,
    logoutMenuItem: `[data-test-id="logoutMenuItem"]`,
    requestVisitMenuItem: `[data-test-id="requestVisit"]`,

    // General modal locator for any modal on screen
    Modal: `.eVisitAppModal`,

    // Logout modal items
    logoutDeny: `[data-test-id="confirmModalDeny"]`,
    logoutAccept: `[data-test-id="confirmModalConfirm"]`,

    // Help modal items
    closeModal: `[data-test-id="genericModalClose"]`,
    submitTicketLink: `[href='https://support.evisit.com/?ticket=1']`,
    phoneLink: `[href='tel:(928) 297-2294']`,
    knowledgebaseLink: `[href='https://support.evisit.com/']`

};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible("@SelectPatient", 15000)
    },

    /*
    *    This function make sure the page is completely loaded before continuing, using any specified element as a trait
    */
    accessLandingPage(email, password) {
        this
        const loginPage = this.api.page.loginPage()
        const geolocationPage = this.api.page.patient.geolocationPage()
        loginPage
            .goToPracticeLoginPage()
            .userLogin(email, password)
        geolocationPage.confirmGeolocation()
        this.isOnPage();
        return this
    },

    /*
    *   This function will open the menu and click on my account
    *   Input: None
    */
    selectMyAccount() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@myAccountMenuItem')
            .pause(500)
            .verify.elementPresent('@myAccountMenuItem')
            .click('@myAccountMenuItem')
        return this
    },

    /*
    *   This function will open the menu and click on Logout
    */
    selectLogout() {
        this
            //verify and click user profile button
            //.waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@logoutMenuItem')
            .pause(500)
            .click('@logoutMenuItem')
        return this
    },

    /*
    *   Check the logout modal text and cancel the proccess
    *   Input: None
    */
    denyLogout(){
        this
        .waitForElementVisible('@Modal')
        .expect.element(`@Modal`).text.to.contain("Are you sure you want to log out?")
        this.click('@logoutDeny')
        .waitForElementNotPresent('@Modal')
        .waitForElementVisible("@SelectPatient")
        return this
    },

    /*
    *   Check the logout modal text and accept the proccess, checking if the login screen appears
    *   Input: None
    */
    acceptLogout(){
        const loginPage = this.api.page.loginPage()
        this
        .waitForElementVisible('@Modal')
        .expect.element(`@Modal`).text.to.contain("Are you sure you want to log out?")
        this.click('@logoutAccept')
        .waitForElementNotPresent('@Modal')
        loginPage.isOnPage()
        return this
    },

    /*
    *   This function will open the menu and click on Help
    */
    selectHelp() {
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@helpMenuItem')
            .pause(500)
            .click('@helpMenuItem')
        return this
    },

    /*
    *   This function will compare each line of text and the links available on the help modal
    *   Input: None
    */
    checkHelpModal(){
        this
        .waitForElementVisible('@Modal')

        //Check each text in the modal
        this.expect.element(`@Modal`).text.to.contain("Help")
        this.expect.element(`@Modal`).text.to.contain("Our friendly staff is standing by and happy to assist you with whatever you may need.")
        this.expect.element(`@Modal`).text.to.contain("Submit Ticket")
        this.expect.element(`@Modal`).text.to.contain("(928) 297-2294")
        this.expect.element(`@Modal`).text.to.contain("View Knowledge base")

        // Check all links remain as expected
        this.waitForElementVisible('@submitTicketLink')
        .waitForElementVisible('@phoneLink')
        .waitForElementVisible('@knowledgebaseLink')

        .click('@closeModal') // Close modal
        .waitForElementNotPresent('@Modal')
        return this
    },

    /*
    *   This function will open the menu and click on equipment test
    */
    selectEquipmentTest() {
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@equipmentTestMenuItem')
            .pause(500)

            // Click on equipment test, which will open a new tab with the third party solution
            this.click('@equipmentTestMenuItem')

        return this
    },

    /*
    *   This function will change to a different tab and verify if the link is the one expected
    *   Input: The link that should be in the new tab
    */
    checkNewTabLink(link){
                // Get all open tabs and handle it using a callback
                this.api.windowHandles(function(result) {
                    // Save the identifier of the second tab
                    var newHandle = result.value[1];
                    // Switch to this tab
                    this.switchWindow(newHandle);
                    // Verify the link of this tab is the desired one from the third party solution
                    this.expect.url().to.contain(link).before(1000);
                })
    },

    /*
    *   This function will open the menu and click on visit history
    */
    selectVisitHistory() {
        console.log("Accessing My Account")
        this
            //verify and click user profile button
            .waitForElementVisible('@SelectPatient')
            .waitForElementVisible('@btnUserProfile')
            .verify.elementPresent('@btnUserProfile')
            .pause(1000)
            .click('@btnUserProfile')
            .pause(500)
            //expect and click my account menu item
            .waitForElementVisible('@visitHistoryMenuItem')
            .pause(500)
            .verify.elementPresent('@visitHistoryMenuItem')
            .click('@visitHistoryMenuItem')
        return this
    }

}];

module.exports = {
    elements: elements,
    commands: commands
}
const elements = {

    // Geolocation items
    selectStateField: `[data-test-id="stateSelect"]`,
    FloridaStateOption: `[data-test-id="FloridaOption"]`,
    confirmCheckBox: `[data-test-id='confirmCheckBox']`,
    btnContinue: `[data-test-id='continue']`,
    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Alert banner on top if alert/success/failed action happens. Ex: "There is more than one field that is required."
    toast: `[data-test-id='toast']`,
    btnCloseToast: `[data-test-id='buttonCloseToast']`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@confirmCheckBox`, 15000)
    },

    /*
    *   This function will verify all possible failure toast messages on the geolocation page
    *   Input: None
    */
    checkGeolocationFailureMessages() {
        this
            .waitForElementVisible(`@confirmCheckBox`, 15000)
            // Check empty name yet to be changed
            .expect.element(`@btnUserProfile`).text.to.contain("No name")

            // Check failure message when try to continue without the needed information
        this.click('@btnContinue')
            .checkToastMessage("There is more than one field that is required.")
            .click('@btnCloseToast')
            .waitForElementNotPresent('@toast')

            // Check failure message if no state is selected
            .click('@confirmCheckBox')
            .click('@btnContinue')
            .checkToastMessage("Licensed State required.")
            .click('@btnCloseToast')
            .click('@confirmCheckBox')

            // Check failure message if checkbox is not selected
            .click('@selectStateField')
            .pause(500)
            .click('@FloridaStateOption')
            .click('@btnContinue')
            .checkToastMessage("Please confirm that you are in one of the listed locations.")
            .click('@btnCloseToast')

        return this
    },

    /*
    *   This function will select a state, confirm it and go to the next page IF geolocation is the current page on display
    *   Input: None
    */
    confirmGeolocation() {
        this
            .waitForElementVisible(`@btnUserProfile`, 15000)
            .api.element('@confirmCheckBox', (result) => {
                // Check if geolocation is requested
                if (result.status != -1) {
                    console.log("Starting Geolocation Page")
                    // Check and click confirm checkbox
                    this
                        .click('@selectStateField')
                        .pause(500)
                        .click('@FloridaStateOption')
                        .click('@confirmCheckBox')
                        .pause(500)
                        .click('@btnContinue')
                        .pause(1000)// Not ideal but will make sure the page is properly loaded
                } else {
                    console.log("- Skipping Geolocation Page Assertions")
                }
            })
        return this
    }
}];

module.exports = {
    elements: elements,
    commands: commands
}
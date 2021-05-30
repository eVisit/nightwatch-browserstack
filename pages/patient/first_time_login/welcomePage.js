// Array with every piece of text available inside the welcome page
var TextFromPanel;

const elements = {

    btnUserProfile: `[data-test-id='userProfileButton']`,

    // Welcome items
    welcomeContainer: `[data-test-id="sceneContainer/Page/enrollment/EnrollmentSuccessPage"]`,
    welcomeImage: `.eVisitAppBasePageMainColumn .eVisitAppIconIcon`,
    btnContinue: `[data-test-id="continue"]`,
};

const commands = [{

    /*
    *   This function will be used to make sure the specific page is the one opened
    *   Input: None
    */
    isOnPage() {
        return this.waitForElementVisible(`@welcomeImage`, 15000)
    },

    /*
    *   Verify if welcome message is correct
    *   Input: None
    */
    checkWelcomeText() {
        this.waitForElementVisible(`@welcomeImage`, 15000)
            // Save all text displayed in the panel as an array
            this.verify.containsText(`@welcomeContainer`, 'You have successfully completed your account registration. You can now request to be seen virtually.')
        return this
    },

    /*
    *   Skip welcome and go to the next page
    *   Input: None
    */
    skipWelcomePage() {
        this
            .waitForElementVisible(`@btnContinue`, 15000)
            .click('@btnContinue')
        return this
    },

}];

module.exports = {
    elements: elements,
    commands: commands
}
const userInteractionPuaseTiming = 1000;
const puaseTiming = 7500;
const waitingForLoadTiming = 15000;

var util = require('util')

var loginCommands = {
    
    regionID: function(elementName, value) {
        var element = this.elements[elementName.slice(1)];
        return util.format(element.selector, value);
    },
    logoutBTNId: function(elementName, data) {
        var element = this.elements[elementName.slice(1)];
        return util.format(element.selector, data);
    },
    loadSignDialog: function() {
        return this.waitForElementVisible('@signInBTN', waitingForLoadTiming)
                .click('@signInBTN')
                .pause(puaseTiming)
                .waitForElementVisible('@signInDialog', waitingForLoadTiming)
                .pause(puaseTiming)
    },
    clearForm: function () {
        return this.clearValue('@emailTextField')
                    .clearValue('@passwordTextField')
    },
    fillSignFormOnlyEmaild: function(emailValue) {
        return this.setValue('@emailTextField', emailValue)
    },
    fillSignFormOnlyPassword: function(passwordValue) {
        return this.setValue('@passwordTextField', passwordValue)
    },
    fillSignFormEmaildPasswordRegion: function(emailValue, passwordValue, regionData) {
        var regionSelector = this.regionID('@regionBTN', regionData)
        return this.click(regionSelector)
                    .pause(userInteractionPuaseTiming)
                    .setValue('@emailTextField', emailValue)
                    .setValue('@passwordTextField', passwordValue)
    },
    actionOnLoginButton: function() {
        return this.waitForElementVisible('@loginBTN', waitingForLoadTiming)
                .click('@loginBTN')
                .pause(userInteractionPuaseTiming)
    },
    validateErrorWrongEmailandPassword: function(errorText) {
        return this.verify.containsText('@loginErrorText', errorText)
                    .verify.visible('@loginErrorText')
                    .pause(puaseTiming)
    },
    validateErrorNoEmailandNoPassword: function(errorText) {
        //For this appliection the element is same may be in future we will have some other element to show this warning that's why every error is ahve separate method
        return this.verify.containsText('@loginErrorText', errorText)
                    .verify.visible('@loginErrorText')
                    .verify.containsText( '@emailTextField', '')
                    .verify.containsText( '@passwordTextField', '')
                    .pause(puaseTiming)
    },
    validateErrorNoEmail: function(errorText) {
        return this.verify.containsText('@loginErrorText', errorText)
        .verify.visible('@loginErrorText')
        .pause(puaseTiming)
    },
    validateErrorNoPassword: function(errorText) {
        return this.verify.containsText('@loginErrorText', errorText)
        .verify.visible('@loginErrorText')
        .pause(puaseTiming)
    },
    validateWithNoError: function() {
        return this.verify.elementNotPresent('@loginErrorText')
    },
    openProfileMenu: function() {
        return this.pause(waitingForLoadTiming)
            .waitForElementVisible('@userProfileBTN', waitingForLoadTiming)
            .click('@userProfileBTN')
            .pause(waitingForLoadTiming)
    },
    actionOnLogoutButton: function(index) {
        return this.verify.visible(this.regionID('@logoutBTNIndex', index))
                .click(this.regionID('@logoutBTNIndex', index))
                .pause(puaseTiming)
    },
    getMenuItemSelector: function () {
        return this.logoutBTNId('@logoutBTN', '')
    },
    removeSignInDialog: function() {
        return this.verify.visible('@removeSignDialog')
                    .click('@removeSignDialog')
                    .pause(puaseTiming)

    },

}

module.exports = {
    
    commands: [loginCommands],
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
        signInBTN: {
            selector: 'body > div.navigation > div > nav > button.login'
        },
        signInDialog: {
            selector: '.dialog__content'
        },
        regionBTN: {
            selector: '#userLogin > div.regions > div.availableRegions > div:nth-child(%s)'
        },
        emailTextField: {
            selector: '#email'
        },
        passwordTextField: {
            selector: '#password'
        },
        loginBTN: {
            selector: '#doLogin'
        },
        loginErrorText: {
            selector: '#userLogin > div:nth-child(4) > div > div'
        },
        userProfileBTN: {
            selector: '.userProfile'
        },
        logoutBTN: {
            selector: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li'
        },
        logoutBTNIndex: {
            selector: '#portal-navigation > div > div.userProfile > div.dropdown > ul > li:nth-child(%s)'
        },
        removeSignDialog: {
            selector: '#login > div.dialog__content > span'
        }
    },
    
};

var util = require('util')

const puaseTiming = 7500;
const waitingForLoadTiming = 15000;
const userInteractionPuaseTiming = 1000;

var selectors = {
    
        signInBTN: 'body > div.navigation > div > nav > button.login',
        signInDialog: '.dialog__content',
        forgotBTN: '.forgot',
        resetEmail: '#resetEmail',
        resetPasswordBTN: '#doResetpassword',
        regionErrorTitle: '#passwordreset > div.regions.error',
        backBTN: '#passwordreset > div.back',
        errorMessage: '#passwordreset > div.progress-button > #errorMessage',
        selectedRegion: '#passwordreset > div.regions > div.availableRegions > div:nth-child(%s)'
};

var textValue = {
    forgotBTNText : 'Did you forget your password?',
    emailIDNotValid: 'Entered email address is not valid',
    emailIdValue: 'naghma.europe@gmail.com'
};

var correctUserData = {
    '2': [
           ['naghma.e1@gmail.com'],
           ['naghma.e2@gmail.com'],
           ['naghma.e3@gmail.com']
           ],
    '1': [
            ['naghma.s1@gmail.com'],
            ['naghma.s2@gmail.com'],
            ['naghma.s3@gmail.com']
            ],
    '3': [
             ['naghma.a1@gmail.com'],
             ['naghma.a2@gmail.com'],
             ['naghma.a3@gmail.com']
             ]
};

var invalidUserData = {
    '2': [
           ['naghma.es1@gmail.com'],
           ['naghma.es1@gmail.com'],
           ['naghma.es1@gmail.com']
           ],
    '3': [
             ['naghma.eqazs1@gmail.com'],
             ['naghma.eqazs1@gmail.com'],
             ['naghma.eqazs1@gmail.com']
             ],
    '1': [
            ['naghma.est1@gmail.com'],
            ['naghma.est1@gmail.com'],
            ['naghma.est1@gmail.com']
            ]
};

var emptyEmailID = {
    
    '1': [ '' ],
    '2': [ '' ],
    '3': [ '' ]
};

module.exports = {
    
    '@tags': ['forgotpasswordSelectorObject'],
    
    'Selector Object: forgot password without selected region and without emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        _browser.init()

        _browser.waitForElementVisible('body', waitingForLoadTiming)
        _browser.expect.element(selectors.signInBTN).to.be.present;
        _browser.click(selectors.signInBTN);
        _browser.pause(puaseTiming);

        _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
        _browser.pause(puaseTiming);
        
        _browser.expect.element(selectors.forgotBTN).text.to.equal(textValue.forgotBTNText);
        _browser.click(selectors.forgotBTN);
        _browser.pause(puaseTiming);
        
        _browser.clearValue(selectors.resetEmail)
        _browser.waitForElementVisible(selectors.resetPasswordBTN, waitingForLoadTiming);
        _browser.click(selectors.resetPasswordBTN);
        _browser.pause(userInteractionPuaseTiming);
        
        _browser.expect.element(selectors.regionErrorTitle).to.be.visible;
        _browser.expect.element(selectors.errorMessage).text.to.equal(textValue.emailIDNotValid).to.be.visible;
        _browser.expect.element(selectors.backBTN).to.be.visible;
        
        _browser.pause(puaseTiming);
        _browser.click(selectors.backBTN)
        
        _browser.end();
        
    },
    

    'Selector Object: forgot password without selected region': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        _browser.init()

        _browser.waitForElementVisible('body', 1000 )
        _browser.expect.element(selectors.signInBTN).to.be.present;
        _browser.click(selectors.signInBTN);
        _browser.pause(puaseTiming);

        _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
        _browser.pause(puaseTiming);
        
        _browser.expect.element(selectors.forgotBTN).text.to.equal(textValue.forgotBTNText);
        _browser.click(selectors.forgotBTN);
        _browser.pause(puaseTiming);
        
        _browser.clearValue(selectors.resetEmail)
        _browser.setValue(selectors.resetEmail, textValue.emailIdValue);
        
        _browser.waitForElementVisible(selectors.resetPasswordBTN, waitingForLoadTiming);
        _browser.click(selectors.resetPasswordBTN);
        _browser.pause(puaseTiming);
        
        _browser.expect.element(selectors.regionErrorTitle).to.be.visible;
        _browser.expect.element(selectors.errorMessage).text.to.equal(textValue.emailIDNotValid).to.not.be.visible;
        _browser.expect.element(selectors.backBTN).to.be.visible;
        
        _browser.pause(puaseTiming);
        _browser.click(selectors.backBTN)
        
        _browser.end();
        
    },
    
    'Selector Object: forgot password with sccussefully': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        _browser.init()

        _browser.waitForElementVisible('body', waitingForLoadTiming)
        _browser.expect.element(selectors.signInBTN).to.be.present;
        _browser.click(selectors.signInBTN);
        _browser.pause(puaseTiming);

        _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);

        for (regionData in correctUserData) {
            
            var regionSelector = util.format(selectors.selectedRegion, regionData);
            var values = correctUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                _browser.pause(puaseTiming);
                
                _browser.expect.element(selectors.forgotBTN).text.to.equal(textValue.forgotBTNText);
                _browser.click(selectors.forgotBTN);
                _browser.pause(puaseTiming);
                
                _browser.clearValue(selectors.resetEmail)
                
                _browser.click(regionSelector);
                _browser.setValue(selectors.resetEmail, emailID);
                
                _browser.waitForElementVisible(selectors.resetPasswordBTN, waitingForLoadTiming);
                _browser.click(selectors.resetPasswordBTN);
                
                _browser.expect.element(selectors.errorMessage).text.to.equal(textValue.emailIDNotValid).to.not.be.visible;
                _browser.expect.element(selectors.regionErrorTitle).to.not.be.present;
                
                _browser.expect.element(selectors.backBTN).to.be.visible;
                
                _browser.pause(puaseTiming);
                _browser.click(selectors.backBTN)
                
            }
        }
        
        _browser.end();
        
    },
    
    'Selector Object: forgot password without emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        _browser.init()

        _browser.waitForElementVisible('body', waitingForLoadTiming)
        _browser.expect.element(selectors.signInBTN).to.be.present;
        _browser.click(selectors.signInBTN);
        _browser.pause(puaseTiming);

        _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
        
        for (regionData in emptyEmailID) {
            
            var regionSelector = util.format(selectors.selectedRegion, regionData);
            var values = emptyEmailID[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                _browser.pause(puaseTiming);

                _browser.expect.element(selectors.forgotBTN).text.to.equal(textValue.forgotBTNText);
                _browser.click(selectors.forgotBTN);
                _browser.pause(puaseTiming);
        
                _browser.clearValue(selectors.resetEmail)
        
                _browser.click(regionSelector);
                _browser.setValue(selectors.resetEmail, emailID);

                _browser.waitForElementVisible(selectors.resetPasswordBTN, waitingForLoadTiming);
                _browser.click(selectors.resetPasswordBTN);
        
                _browser.expect.element(selectors.regionErrorTitle).to.not.be.present;
                _browser.expect.element(selectors.errorMessage).text.to.equal(textValue.emailIDNotValid).to.be.visible;
        
                _browser.expect.element(selectors.backBTN).to.be.visible;
        
                _browser.pause(puaseTiming);
                _browser.click(selectors.backBTN)
            }
        }
        
        _browser.end();
        
    },
     
    'Selector Object: forgot password with wrong emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        _browser.init()

        _browser.waitForElementVisible('body', waitingForLoadTiming)
        _browser.expect.element(selectors.signInBTN).to.be.present;
        _browser.click(selectors.signInBTN);
        _browser.pause(puaseTiming);

        _browser.waitForElementVisible(selectors.signInDialog, waitingForLoadTiming);
        
        for (regionData in invalidUserData) {
            
            var regionSelector = util.format(selectors.selectedRegion, regionData);
            var values = invalidUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                _browser.pause(puaseTiming);

                _browser.expect.element(selectors.forgotBTN).text.to.equal(textValue.forgotBTNText);
                _browser.click(selectors.forgotBTN);
                _browser.pause(puaseTiming);
                
                _browser.clearValue(selectors.resetEmail)
                
                _browser.click(regionSelector);
                _browser.setValue(selectors.resetEmail, emailID);
                
                _browser.waitForElementVisible(selectors.resetPasswordBTN, waitingForLoadTiming);
                _browser.click(selectors.resetPasswordBTN);
                
                _browser.expect.element(selectors.regionErrorTitle).to.not.be.present;
                _browser.expect.element(selectors.errorMessage).text.to.equal(textValue.emailIDNotValid).to.be.visible;
                
                _browser.pause(puaseTiming);
                _browser.click(selectors.backBTN)

            }
        }
        _browser.end();
        
    },

    
}
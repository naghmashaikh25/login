const puaseTiming = 7500;
const waitingForLoadTiming = 15000;
const userInteractionPuaseTiming = 1000;

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
    
    '@tags': ['forgotpasswordPageObject'],

    'Page Object: forgot password without selected region and without emailID': function( _browser ) {

        _browser.resizeWindow(1024, 800);
        var login = _browser.page.pageObjectForgotPassword();
        
        login.navigate()
            .waitForElementVisible('body', waitingForLoadTiming)
            .verify.visible('@signInBTN')
            .click('@signInBTN')
            .pause(puaseTiming)
        
            .waitForElementVisible('@signInDialog', waitingForLoadTiming)
            .pause(puaseTiming)
        
            .verify.containsText( '@forgotBTN', textValue.forgotBTNText)
        
            .click('@forgotBTN')
            .pause(puaseTiming)
        
            .clearValue('@resetEmail')
            .waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
            .click('@resetPasswordBTN')
            .pause(userInteractionPuaseTiming)
        
            .verify.visible('@regionErrorTitle')
            .verify.containsText( '@errorMessage', textValue.emailIDNotValid)
            .verify.visible('@errorMessage')

            .pause(puaseTiming)
        
            .end();
        
    },

    'Page Object: forgot password without selected region': function( _browser ) {
     
        _browser.resizeWindow(1024, 800);
        
        var login = _browser.page.pageObjectForgotPassword();
        login.navigate()
            .waitForElementVisible('body', waitingForLoadTiming)
            .verify.visible('@signInBTN')
            .click('@signInBTN')
            .pause(puaseTiming)

            .waitForElementVisible('@signInDialog', waitingForLoadTiming)
            .pause(puaseTiming)
        
            .verify.containsText( '@forgotBTN', textValue.forgotBTNText)

            .click('@forgotBTN')
            .pause(puaseTiming)
        
            .clearValue('@resetEmail')
            .setValue('@resetEmail', textValue.emailIdValue)
        
            .waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
            .click('@resetPasswordBTN')
            .pause(userInteractionPuaseTiming)

            .verify.visible('@regionErrorTitle')
            .verify.hidden('@errorMessage')

            .pause(puaseTiming)

            .end();

    },


    'Page Object: forgot password with sccussefully': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        
        var login = _browser.page.pageObjectForgotPassword();
        login.navigate()
            .waitForElementVisible('body', waitingForLoadTiming)
            .verify.visible('@signInBTN')
            .click('@signInBTN')
            .pause(puaseTiming)
            .waitForElementVisible('@signInDialog', waitingForLoadTiming)

        
        for (regionData in correctUserData) {
            
            var regionSelector = login.regionID('@selectedRegion', regionData)
            var values = correctUserData[regionData]
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                login.pause(puaseTiming)
                
                .verify.containsText( '@forgotBTN', textValue.forgotBTNText)
                .click('@forgotBTN')
                .pause(puaseTiming)
                
                .clearValue('@resetEmail')
                .click(regionSelector)
                .setValue('@resetEmail', emailID)
                
                .waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
                .click('@resetPasswordBTN')
                .pause(userInteractionPuaseTiming)

                .verify.elementNotPresent('@regionErrorTitle', ' the region title should not be here')
                .verify.hidden('@errorMessage')
                .verify.visible('@backBTN')
                
                .pause(puaseTiming)
                .click('@backBTN')
                
            }
        }
        
        _browser.end()
        
    },

    
    'Page Object: forgot password without emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);

        var login = _browser.page.pageObjectForgotPassword();
        login.navigate()
            .waitForElementVisible('body', waitingForLoadTiming)
            .verify.visible('@signInBTN')
            .click('@signInBTN')
            .pause(puaseTiming)
            .waitForElementVisible('@signInDialog', waitingForLoadTiming)
        
        for (regionData in emptyEmailID) {
            
            var regionSelector = login.regionID('@selectedRegion', regionData)
            var values = emptyEmailID[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                login.pause(puaseTiming)

                    .verify.containsText( '@forgotBTN', textValue.forgotBTNText)
                    .click('@forgotBTN')
                    .pause(puaseTiming)

                    .clearValue('@resetEmail')
                    .click(regionSelector)
                    .setValue('@resetEmail', emailID)

                    .waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
                    .click('@resetPasswordBTN')
                    .pause(userInteractionPuaseTiming)

                    .verify.elementNotPresent('@regionErrorTitle', ' the region title should not be here')
                    .verify.containsText( '@errorMessage', textValue.emailIDNotValid)
                    .verify.visible('@errorMessage')
                    .verify.visible('@backBTN')
                
                    .pause(puaseTiming)
                    .click('@backBTN')

            }
        }
        
        _browser.end();
        
    },
    
    
    'Page Object: forgot password with wrong emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800);
        
        var login = _browser.page.pageObjectForgotPassword();
        login.navigate()
            .waitForElementVisible('body', waitingForLoadTiming)
            .verify.visible('@signInBTN')
            .click('@signInBTN')
            .pause(puaseTiming)
            .waitForElementVisible('@signInDialog', waitingForLoadTiming)

        for (regionData in invalidUserData) {
            
            var regionSelector = login.regionID('@selectedRegion', regionData)
            var values = invalidUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                login.pause(puaseTiming)

                    .verify.containsText( '@forgotBTN', textValue.forgotBTNText)
                    .click('@forgotBTN')
                    .pause(puaseTiming)
                
                    .clearValue('@resetEmail')
                    .click(regionSelector)
                    .setValue('@resetEmail', emailID)
                
                    .waitForElementVisible('@resetPasswordBTN', waitingForLoadTiming)
                    .click('@resetPasswordBTN')
                    .pause(userInteractionPuaseTiming)

                    .verify.elementNotPresent('@regionErrorTitle', ' the region title should not be here')
                    .verify.containsText( '@errorMessage', textValue.emailIDNotValid)
                    .verify.visible('@errorMessage')
                    .verify.visible('@backBTN')
                
                    .pause(puaseTiming)
                    .click('@backBTN')

            }
        }
        _browser.end();
        
    },
    
    
}
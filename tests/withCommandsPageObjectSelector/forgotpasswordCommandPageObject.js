const puaseTiming = 7500;
const waitingForLoadTiming = 15000;

var textValue = {
    forgotBTNText : 'Did you forget your password?',
    emailIDNotValid: 'Entered email address is not valid',
    emailIdSampleValue: 'naghma.europe@gmail.com'
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
    
    '@tags': ['forgotpasswordCommandPageObject'],


    'Page Object: forgot password without selected region and without emailID': function( _browser ) {

        _browser.resizeWindow(1024, 800)
                .waitForElementVisible('body', waitingForLoadTiming);
        
        var forgotPasswordPage = _browser.page.commandsPageObjectForgotPassword();
        forgotPasswordPage.navigate()
                        .loadSignDialog()
                        .loadForgetPasswordDialog(textValue.forgotBTNText)
                        .fillForgetPasswordFormOnlyEmaild('')
                        .actionOnResetPasswordButton()
                        .validateErrorRegionAndEmailIdBothEmpty(textValue.emailIDNotValid)
                        .pause(puaseTiming)
                        .end();
        
    },

    'Page Object: forgot password without selected region': function( _browser ) {
     
        _browser.resizeWindow(1024, 800)
                .waitForElementVisible('body', waitingForLoadTiming);

        var forgotPasswordPage = _browser.page.commandsPageObjectForgotPassword();
        forgotPasswordPage.navigate()
                        .loadSignDialog()
                        .loadForgetPasswordDialog(textValue.forgotBTNText)
                        .fillForgetPasswordFormOnlyEmaild(textValue.emailIdSampleValue)
                        .actionOnResetPasswordButton()
                        .validateErrorOnlyRegionEmpty(textValue.emailIDNotValid)
                        .pause(puaseTiming)
                        .end();
    },

    'Page Object: forgot password with sccussefully': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
                .waitForElementVisible('body', waitingForLoadTiming);
        
        var forgotPasswordPage = _browser.page.commandsPageObjectForgotPassword();
        forgotPasswordPage.navigate()
                        .loadSignDialog()

        for (regionData in correctUserData) {
            
            var values = correctUserData[regionData]

            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                forgotPasswordPage.pause(puaseTiming)
                                .loadForgetPasswordDialog(textValue.forgotBTNText)
                                .fillForgetPasswordFormEmaildWithRegion(emailID, regionData)
                                .actionOnResetPasswordButton()
                                .validateWithNoError()
                                .removeForgetPasswordDialog()
            }
        }
        
        _browser.end()
        
    },

    
    'Page Object: forgot password without emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
                .waitForElementVisible('body', waitingForLoadTiming);
        
        var forgotPasswordPage = _browser.page.commandsPageObjectForgotPassword();
        forgotPasswordPage.navigate()
                        .loadSignDialog()

        for (regionData in emptyEmailID) {
            
            var values = emptyEmailID[regionData];
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                forgotPasswordPage.pause(puaseTiming)
                                .loadForgetPasswordDialog(textValue.forgotBTNText)
                                .fillForgetPasswordFormEmaildWithRegion(emailID, regionData)
                                .actionOnResetPasswordButton()
                                .validateErrorOnlyEmailIdEmpty(textValue.emailIDNotValid)
                                .removeForgetPasswordDialog()
            }
        }
        
        _browser.end();
        
    },
    

    'Page Object: forgot password with wrong emailID': function( _browser ) {
        
        _browser.resizeWindow(1024, 800)
                .waitForElementVisible('body', waitingForLoadTiming);
        
        var forgotPasswordPage = _browser.page.commandsPageObjectForgotPassword();
        forgotPasswordPage.navigate()
                        .loadSignDialog()
        
        for (regionData in invalidUserData) {
            
            var values = invalidUserData[regionData];
            
            for (var i = 0; i < values.length; i++) {
                
                var emailID = values[i]

                forgotPasswordPage.pause(puaseTiming)
                                .loadForgetPasswordDialog(textValue.forgotBTNText)
                                .fillForgetPasswordFormEmaildWithRegion(emailID, regionData)
                                .actionOnResetPasswordButton()
                                .validateErrorOnlyEmailIdEmpty(textValue.emailIDNotValid)
                                .removeForgetPasswordDialog()

            }
        }
        _browser.end();
        
    },
    
}
const {
  protractor,
  browser,
  element,
  by
} = require('protractor');


describe('Pagina Inicial', function () {

  it('Teste Basico de mensagem de chat', function () {
    browser.driver.manage().timeouts().setScriptTimeout(20000);
    browser.waitForAngularEnabled(false);
    browser.get('http://localhost:3000');
    expect(browser.getTitle()).toBe('App');
    // espero a mensagem do bot
    browser.wait(function () {
      return element(by.css('[data-dialog="BOT"]')).isPresent();
    }, 10000);

    element(by.css('input')).sendKeys('Ola Bot').sendKeys(protractor.Key.ENTER);

    browser.wait(function () {
      return element(by.css('[data-dialog="OWNER"]')).isPresent();
    }, 10000);
    
    expect(element(by.css('[data-dialog="OWNER"]')).getText()).toContain('Ola Bot');
  });

});
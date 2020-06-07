const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://ec2-3-95-32-80.compute-1.amazonaws.com:3000/pracownik/login/');

driver.findElement(By.name('login')).sendKeys('admin');
driver.findElement(By.name('haslo')).sendKeys('admin');

driver.findElement(By.className('MuiButton-label')).click();

driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if(title === 'AGH - System Ankiet') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
    driver.quit();
  });
});
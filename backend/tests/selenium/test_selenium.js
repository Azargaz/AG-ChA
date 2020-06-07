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
expected_url = "http://ec2-3-95-32-80.compute-1.amazonaws.com:3000/pracownik/panel";
driver.sleep(10000).then(function() {
  driver.getCurrentUrl().then((url) => {
      if(expected_url === url)
      {
        console.log("Test passed");
      }
      else
      {
        console.log(url);
      }
        driver.quit();
    })
  });
Feature: Love reminder validation

Scenario: Home Page
  Given Open love reminder app
  When provide valid username and password
  Then click on submit button
  And verify title of the web page


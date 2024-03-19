import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('Open love reminder app', () => {
  cy.visit('http://localhost:3000/login')
})

When('provide valid username and password', () => {
  cy.get('[name=username]').type('josue')
  cy.get('[name=password]').type('qwer5256')
})

Then('click on submit button', () => {
  cy.get('button[type=submit]').click()
})

And('verify title of the web page', () => {
  cy.get('.my-4').contains('Recordatorios de amor ❤')
})
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('accessLogin', () => {
  cy.viewport(1920, 1080);
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('submitLoginForm', (email, password) => {
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password);

  cy.contains('button', 'Entrar').click();
});

Cypress.Commands.add('verifyMessageErrorInLogin', () => {
  cy.contains('Acesso negado! Tente novamente')
      .should('be.visible');
})
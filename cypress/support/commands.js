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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('[name="firstName"]').type('André').should('have.value', 'André');
    cy.get('[name="lastName"]').type('Roberto').should('have.value', 'Roberto');
    cy.get('#email').type('andre@gmail.com').should('have.value', 'andre@gmail.com');
    cy.get('#phone').type('123456').should('have.value', '123456');
    cy.get('[id="open-text-area"]').type('teste').should('have.value', 'teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
})
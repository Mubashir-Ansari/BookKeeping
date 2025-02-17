describe('Add an Account Information', () => {
  it('It should login if the form is Valid', () => {
    // cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });
  it('Test to Add an Account', () => {
    cy.wait(1000);
    // custom command
    cy.add_account(Cypress.env('testname'), Cypress.env('balance'));
  });
});

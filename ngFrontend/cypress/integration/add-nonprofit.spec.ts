describe('Add a Non-Profit Entry', () => {
  it('It should login if the form is Valid', () => {
    // cy.login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.bypass_login(Cypress.env('testemail'), Cypress.env('testpassword'));
    cy.url().should('include', 'dashboard');
    cy.wait(1000);
  });

  it('Test to Add A Non Profitable project in cost center', () => {
    cy.wait(1000);
    // custom command
    cy.add_nonprofit(
      Cypress.env('testname'),
      Cypress.env('expense'),
      Cypress.env('remarks')
    );
  });
});

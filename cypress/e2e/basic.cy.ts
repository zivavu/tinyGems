describe('Basic E2E Tests', () => {
  it('should visit the home page', () => {
    cy.visit('/');
    cy.get('h1').should('exist');
  });

  it('should have proper navigation', () => {
    cy.visit('/');
    cy.get('nav').should('exist');
    cy.get('nav a').should('have.length.at.least', 1);
  });

  // Test for dark mode toggle
  it('should toggle dark mode', () => {
    cy.visit('/');
    // Assuming there's a dark mode toggle button with data-testid
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });
});

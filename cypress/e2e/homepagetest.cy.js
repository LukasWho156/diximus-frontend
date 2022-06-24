describe('homepage', () => {

  it('correct page', () => {
    cy.visit('http://localhost:8000');
    cy.contains('Diximus');
  });

  it('change language to english', () => {
    cy.get('#dropdown-basic-button').click();
    cy.contains('English').click();
    cy.contains('Neues Spiel erstellen');
  })

  it('start game prematurely', () => {
    cy.get('button[type=submit]').click();
    cy.get('div[role=alert]');
    cy.get('button[class=btn-close]').click();
  })

})

describe('about', () => {

  it('correct page', () => {
    cy.visit('http://localhost:8000/about');
  })

})
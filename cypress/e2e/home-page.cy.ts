//Agrego referencia a Cypress para autocompletado y linting
/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('debe mostrar la tabla de vehículos', () => {
    cy.get('vapi-table').should('exist');
  });

  it('debe filtrar marcas por descripción', () => {
    cy.get('[data-cy="filter-input"]').should('exist');
    cy.get('[data-cy="filter-input"]').type('PBM');
    cy.get('vapi-table').contains('PBM');
  });

  it('debe navegar al detalle de la row filtrada', () => {
    cy.get('[data-cy="filter-input"]').type('PBM');
    cy.get('[data-cy="table-viewport"]')
      .contains('PBM')
      .click();
  });

});

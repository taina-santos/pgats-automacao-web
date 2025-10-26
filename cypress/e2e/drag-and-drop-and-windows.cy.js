/// <reference types="cypress" />

describe('Drag and drop and windows', () => {
    it('Múltiplas janelas', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');
        // Usando invoke para remover o target do html, e a página não abrirá uma nova janela/aba
        cy.get('a[href="/windows/new"]').invoke('removeAttr', 'target').click();

        cy.get('h3').should('have.text', 'New Window');
        cy.go('back');
        cy.get('a[href="/windows/new"]').should('be.visible');
        cy.get('a[href="/windows/new"]').should('have.text', 'Click Here');
    });

    it('Arrastar elementos', () => {
        const dataTransfer = new DataTransfer();
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop');
        cy.get('#column-a').trigger('dragstart', { dataTransfer }); // ação para arrastar
        cy.get('#column-b').trigger('drop', { dataTransfer }); // soltar no ponto desejado
    });
});
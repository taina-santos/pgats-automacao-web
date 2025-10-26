class Menu {
    navegarLogin(){
        cy.get('a[href="/login"]').click();
    }

    navegarContactUs(){
        cy.get('a[href="/contact_us"]').click();
    }
}

export default new Menu();
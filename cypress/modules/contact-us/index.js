import contactUsFields from '../../fixtures/contactUs.json'

class ContactUs {
    preencherContactForm() {
        cy.get('input[data-qa="name"]').type(contactUsFields.name);
        cy.get('input[data-qa="email"]').type(contactUsFields.email);
        cy.get('input[data-qa="subject"]').type(contactUsFields.subject);
        cy.get('textarea[data-qa="message"]').type(contactUsFields.message);

        cy.fixture('example.json').as('arquivo');
        cy.get('input[type="file"]').selectFile('@arquivo');

        cy.get('input[data-qa="submit-button"]').click();
    }
}

export default new ContactUs();
import { newRandomUser } from '../../support/helpers'

class Cadastro {
    preencherSignUpForm(name, email){
        cy.get('input[data-qa="signup-name"]').type(name);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('button[data-qa="signup-button"]').click();
    }

    preencherNewUserForm(){
        cy.get('input[type="radio"]').check('Mrs');
            
        cy.get('input#password').type('qa123456', { log: false });
        cy.get('select#days').select('10'); // usando o valor do value
        cy.get('select#months').select('September'); // ao invés de usar o value, podemos colocar o texto do valor
        cy.get('select#years').select('1990');

        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type(newRandomUser().firstName);
        cy.get('input#last_name').type(newRandomUser().lastName);
        cy.get('input#address1').type(newRandomUser().address);
        cy.get('select#country').select('United States');
        cy.get('input#state').type(newRandomUser().state);
        cy.get('input#city').type(newRandomUser().city);
        cy.get('input#zipcode').type(newRandomUser().zCode);
        cy.get('input#mobile_number').type(newRandomUser().mobileNumber);

        cy.get('button[data-qa="create-account"]').click();
    }
}

export default new Cadastro();

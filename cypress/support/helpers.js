import { fa, faker } from "@faker-js/faker";

export function getRandomNumber(){
    return new Date().getTime()
}

export function getNewEmail(){
    return `novo-qa-${getRandomNumber()}@mail.com`;
}

export function newRandomUser(){
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zCode: faker.location.zipCode('#####'),
        mobileNumber: faker.phone.number(),
    };
}

/**
 * cy.get('input#first_name').type('qa test');
        cy.get('input#last_name').type(`${timestamp}`);
        cy.get('input#address1').type('123 tralala ave');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('ont');
        cy.get('input#city').type('hamilton');
        cy.get('input#zipcode').type('R0R 0R0');
        cy.get('input#mobile_number').type('222 111 1234');
 */

export function signUpForm(){
    return {
        signUpName: faker.person.firstName(),
        email: faker.internet.email()
    };
}
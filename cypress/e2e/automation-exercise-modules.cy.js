/// <reference types="cypress" />
import loginFields from '../fixtures/login/usuarioValido.json'
import { signUpForm } from '../support/helpers'
import cadastro from '../modules/cadastro'
import login from '../modules/login'
import menu from '../modules/menu'
import contactus from '../modules/contact-us'


describe('Automation exercise refatorado com módulos', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        // menu.navegarLogin();
        cy.navegarParaLogin();
    });

    it('Cadastrar usuário', () => {
        cadastro.preencherSignUpForm(signUpForm().name, signUpForm().email);
        cadastro.preencherNewUserForm();

        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    });

    it('Login com sucesso', () => {
        login.preencherLogin(loginFields.email, loginFields.senha);

        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', loginFields.nome);
        cy.contains(`Logged in as ${loginFields.nome}`).should('be.visible');

    });

    it('Login com dados inválidos', () => {
        login.preencherLogin(loginFields.email, 'qa1234');
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
    });

    it('Cadastrar email existente', () => {
        cadastro.preencherSignUpForm(loginFields.nome, loginFields.email);
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    });

    it('Enviar formulário de contato com upload de arquivo na página de contact us', () => {
        menu.navegarContactUs();

        contactus.preencherContactForm();

        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
});
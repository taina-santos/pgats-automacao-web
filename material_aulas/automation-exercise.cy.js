// describe / context - suite ou conjunto de testes em um mesmo arquivo
// it - um teste dentro de um bloco ou conjunto de testes

// describe -> automation exercise
// it - cadastrar usuário
// it - teste abcd...

/// <reference types="cypress" />
import dadosUsuarios from '../cypress/fixtures/dadosUsuario.json'
import contactUsFields from '../cypress/fixtures/contactUs.json'
import { newRandomUser, signUpForm } from '../cypress/support/helpers'

const nome = dadosUsuarios.nome;

describe('Automation exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
    });

    it.only('Cadastrar usuário', () => {
        // const timestamp = new Date().getTime();

        // cy.visit('https://automationexercise.com/');

        // encontrando o elemento pelo seletor
        // cy.get('a[href="/login"]').click();

        // encontrando o elemento pelo texto
        // cy.contains('Signup / Login').click();

        // para id, usamos o #
        // para classe, usamos o .
        // para atributos, usamos [var=nomeVar], e é possível concatenar os seletores para filtrar a buscar
        // cy.get('input[data-qa="signup-name"]').type(nome);
        cy.get('input[data-qa="signup-name"]').type(signUpForm().signUpName);
        // cy.get('input[data-qa="signup-email"]').type('qa_criar_user@mail.com');
        // Esse teste daria um erro a partir da segunda execução, pois o email já está sendo usado
        // Uma forma de evitar isso é usando a lib faker, outra fora é concatenar com o timestamp
        // cy.get('input[data-qa="signup-email"]').type(`qa-criar-user-${timestamp}@mail.com`);
        cy.get('input[data-qa="signup-email"]').type(signUpForm().email);
        
        // cy.contains('Signup').click();
        // Daria erro pois há mais de um elemento que contém a string Signup
        // Caso eu queira ser específico, eu posso fazer mix do conceito do texto com o seletor, onde o seletor age como um filtro
        // cy.contains('button', 'Signup').click();
        cy.get('button[data-qa="signup-button"]').click();

        // Prosseguindo para a próxima página
        // Para marcar checkbox (ou radio), é possível usar uma das duas opções para acessar e chamar o check
        // cy.get('#id_gender1').check();
        cy.get('input[type="radio"]').check('Mrs');
        
        cy.get('input#password').type('qa123456', { log: false });
        // Se eu usar log false, ele oculta o comando de digitar a senha

        // para comboboxes, ou selects, podemos usar o select
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

        // Tripe A - Arrange, Act, Assert
        // Arrange serve é os passos feitos que são necessários para performar a ação que queremos validar
        // Act é a ação a ser testada, nesse caso, clicar no botão de create account
        // Assert é para garantir que tudo foi feito corretamente
        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    });

    it('Login com sucesso', () => {
        // cy.visit('https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();
        //login-email@mail.com
        cy.get('input[data-qa="login-email"]').type('login-email@mail.com');
        cy.get('input[data-qa="login-password"]').type('qa123456'); 

        cy.get('button[data-qa="login-button"]').click();

        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', nome);
        cy.contains(`Logged in as ${nome}`).should('be.visible');

    });

    it('Login com dados inválidos', () => {
        // cy.visit('https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();
        //login-email@mail.com
        cy.get('input[data-qa="login-email"]').type('login-email@mail.com');
        cy.get('input[data-qa="login-password"]').type('qa1234'); 

        cy.get('button[data-qa="login-button"]').click();
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
    });

    it('Cadastrar email existente', () => {
        // cy.visit('https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();

        cy.get('input[data-qa="signup-name"]').type('qa nome');
        cy.get('input[data-qa="signup-email"]').type('qa-criar-user-email-existente@mail.com');
        
        cy.get('button[data-qa="signup-button"]').click();
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    });

    it('Enviar formulário de contato com upload de arquivo na página de contact us', () => {
        cy.get('a[href="/contact_us"]').click();
        // Eu posso usar * como coringa para fazer buscar de um elemento
        // cy.get('a[href*=contact]').click();

        cy.get('input[data-qa="name"]').type(contactUsFields.name);
        cy.get('input[data-qa="email"]').type(contactUsFields.email);
        cy.get('input[data-qa="subject"]').type(contactUsFields.subject);
        cy.get('textarea[data-qa="message"]').type(contactUsFields.message);

        cy.fixture('example.json').as('arquivo');
        cy.get('input[type="file"]').selectFile('@arquivo');

        cy.get('input[data-qa="submit-button"]').click();

        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
});
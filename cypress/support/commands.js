Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Mavi',
    lastName: 'Silva',
    email: 'alexmkjr413@gmail.com',
    phone: '1923124155',
    text: Cypress._.repeat('A vida é uma maravilha', 10)
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('textarea[id="open-text-area"]').type(data.text, {delay: 20})
    cy.contains('Button', 'Enviar').click()
})
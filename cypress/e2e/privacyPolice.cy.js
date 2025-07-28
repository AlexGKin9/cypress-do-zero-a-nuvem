describe('Política de Privacidade', () => {
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    Cypress._.times(5,() =>{
        it.only('testa a página da política de privacidade de forma independente', () =>{
            cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
            cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
            cy.contains('p', 'Talking About Testing').should('be.visible')
        })
    })
})

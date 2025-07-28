describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o titulo da aplicação', ()=>{
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () =>{
    const longText = Cypress._.repeat('OnePiece é real', 20) //Gerar textos longos

    cy.get('#firstName').type('Alex').should('have.value', 'Alex')
    cy.get('#lastName').type('Matsumoto').should('have.value', 'Matsumoto')
    cy.get('#email').type('alex@gmail.com').should('have.value', 'alex@gmail.com')
    cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0}).should('have.value', longText)
    cy.contains('Button', 'Enviar').click()


    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#email').type('alex@!@#$%¨&*()""gmail.com').should('have.value', 'alex@!@#$%¨&*()""gmail.com')
    cy.contains('Button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('valor não-numerico digitado no campo telefone', ()=>{

    cy.get('#phone').type('Obrigado!').invoke('val').then((valor) => {
      expect(isNaN(valor)).to.be.false;
    })
    })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    const longText = Cypress._.repeat('OnePiece é real', 20) //Gerar textos longos

    cy.get('#firstName').type('Alex').should('have.value', 'Alex')
    cy.get('#lastName').type('Matsumoto').should('have.value', 'Matsumoto')
    cy.get('#email').type('alex@gmail.com').should('have.value', 'alex@gmail.com')
    cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0}).should('have.value', longText)
    cy.get('#phone-checkbox').check()
    cy.contains('Button', 'Enviar').click()


    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Alex')
      .should('have.value', 'Alex')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Matsumoto')
      .should('have.value', 'Matsumoto')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('alex@gmail.com')
      .should('have.value', 'alex@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11999999999')
      .should('have.value', '11999999999')
      .clear()
      .should('have.value', '')
  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.contains('Button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  })
  
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })
  
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(radio => {
      cy.wrap(radio)
        .check()
        .should('be.checked')
    })
  })

  it('marca todas as opções', () => {
    cy.get('#check input[type="checkbox"]').as('checkboxes').check()

    cy.get('@checkboxes').each(checkbox =>{
      expect(checkbox[0].checked).to.equal(true)
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', {encoding: null}).as('fileExample') 
    cy.get('#file-upload').selectFile({
      contents:'@fileExample',
      fileName:'example.json'
    })
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })

  it.only('testando responsividade mobile para iphone 6', () => {
    cy.viewport('iphone-x')
  })
  })

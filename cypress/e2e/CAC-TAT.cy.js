describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('[name="firstName"]').should('be.visible').type('André')
    cy.get('[name="firstName"]').should('have.value', 'André')
    cy.get('[name="lastName"]').should('be.visible').type('Casanova')
    cy.get('[name="lastName"]').should('have.value', 'Casanova')
    cy.get('[id="email"]').should('be.visible').type('andre@gmail.com')
    cy.get('[id="email"]').should('have.value', 'andre@gmail.com')
    cy.get('[id="open-text-area"]').should('be.visible').type('teste')
    cy.get('[id="open-text-area"]').should('have.value', 'teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.get('#open-text-area').clear().type(`Vamos digitar um texto longo: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quibusdam dolorum eveniet possimus. Veritatis dolorem quo veniam reprehenderit doloremque quasi perferendis eos sed rerum. Earum cupiditate voluptatibus iste dolorum repellendus.`, { delay: 0 })
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[name="firstName"]').type('André')
    cy.get('[name="lastName"]').type('Roberto')
    cy.get('#email').clear().type('teste@teste')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('testando o aceite apenas de caracteres numericos no campo telefone', () => {
    cy.get('#phone').type('abc')
    cy.get('#phone').should('have.value', '');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[name="firstName"]').type('André');
    cy.get('[name="lastName"]').type('Roberto');
    cy.get('#email').type('andre@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('[name="firstName"]').type('André')
      .should('have.value', 'André')
      .clear()
      .should('have.value', '')
    cy.get('[name="lastName"]').type('Roberto')
      .should('have.value', 'Roberto')
      .clear()
      .should('have.value', '')
    cy.get('#email').type('andre@gmail.com')
      .should('have.value', 'andre@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone').type('88888888')
      .should('have.value', '88888888')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get("#product").select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('test', () => {
    cy.get('#product')
      .find('option')
      .its('length', { log: false }).then(n => {
        cy.get('select').select(Cypress._.random(1, n - 1))
      })
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((elem) => {
        cy.wrap(elem)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check input[type="checkbox"]')
      .as('checkboxes')
      .check()

    cy.get('@checkboxes')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })

    cy.get('@checkboxes')
      .last()
      .uncheck()
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input)
        expect((input[0].files[0].name)).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('myFixture');
    cy.get('#file-upload').selectFile('@myFixture')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
    .click();
  })

  it('testa a página da política de privacidade de forma independente', ()=>{
    cy.contains('a', 'Política de Privacidade').invoke('attr', 'href').then(attr => {
      console.log(attr)
      cy.visit('./src/'+attr)
    })
  })
})



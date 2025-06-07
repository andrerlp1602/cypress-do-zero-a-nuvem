describe('Checkboxes', () => {
  beforeEach(() => {
    cy.visit('https://bit.ly/3vswFBe')
  })

  it('checks all checkboxes with one command', () => {
    cy.get('#check input[type="checkbox"]')
      .as('checkboxes')
      .check()

    cy.get('@checkboxes')
      .each(checkbox => {
        console.log(checkbox)
        expect(checkbox[0].checked).to.equal(true)
      })
  })
})
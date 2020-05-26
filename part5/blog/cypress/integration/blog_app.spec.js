describe('Blog app', function () {
  const userTest = {
    username: 'admin',
    name: 'Admin',
    password: 'admin1234',
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', userTest)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()

      cy.get('.notification--success').contains(`Welcome ${userTest.name}`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get('.notification--error')
        .contains('wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})

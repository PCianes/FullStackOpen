describe('Blog app', function () {
  const userTest = {
    username: 'admin',
    name: 'Admin',
    password: 'admin1234',
  }
  const blogTest = {
    title: 'Blog title',
    author: 'Blog Author name',
    url: 'https://myblog.com',
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(userTest.username)
      cy.get('#password').type(userTest.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(blogTest.title)
      cy.get('#author').type(blogTest.author)
      cy.get('#url').type(blogTest.url)
      cy.get('#submit-blog').click()

      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        const data = response.body
        expect(data).to.have.length(1)
        expect(data[0].title).contains(blogTest.title)
        expect(data[0].author).contains(blogTest.author)
        expect(data[0].url).contains(blogTest.url)
      })
    })

    it('user can like a blog twice', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(blogTest.title)
      cy.get('#author').type(blogTest.author)
      cy.get('#url').type(blogTest.url)
      cy.get('#submit-blog').click()

      cy.get('.show-more').click()
      cy.get('.extra-info').find('button.like').as('likeButton')
      cy.get('@likeButton').click()
      cy.get('@likeButton').click()

      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        const data = response.body
        expect(data[0].likes).to.equal(2)
      })
    })

    it('user can delete his blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(blogTest.title)
      cy.get('#author').type(blogTest.author)
      cy.get('#url').type(blogTest.url)
      cy.get('#submit-blog').click()

      cy.get('.show-more').click()
      cy.get('.extra-info').find('button.remove').as('removeButton')
      cy.get('@removeButton').click()

      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        const data = response.body
        expect(data).to.have.length(0)
      })
    })
  })

  describe('check order of blogs', function () {
    beforeEach(function () {
      cy.login({ username: userTest.username, password: userTest.password })
    })

    it('A blog can be created', function () {
      cy.createBlog({ ...blogTest, title: 'Blog with 0 likes' })
      cy.createBlog({ ...blogTest, title: 'Blog with more likes', likes: 10 })
      cy.createBlog({ ...blogTest, title: 'Blog with middle likes', likes: 5 })

      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        const data = response.body
        expect(data).to.have.length(3)
      })

      cy.get('.show-more').should('have.length', 3).click({ multiple: true })

      cy.get('.likes').then((likes) => {
        expect(likes[0]).to.contain(10)
        expect(likes[1]).to.contain(5)
        expect(likes[2]).to.contain(0)
      })
    })
  })
})

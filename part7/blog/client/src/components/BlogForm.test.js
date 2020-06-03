import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  let component
  const handleBlogForm = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm handleBlogForm={handleBlogForm} />)
  })

  test('after submit event handler it received the right arguments', () => {
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, {
      target: { value: 'My title to test' },
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Author name' },
    })
    fireEvent.change(inputUrl, {
      target: { value: 'https://myblog.com' },
    })
    fireEvent.submit(form)

    //https://jestjs.io/docs/en/mock-functions.html
    expect(handleBlogForm.mock.calls).toHaveLength(1)
    expect(handleBlogForm.mock.calls[0][0]).toBe('My title to test')
    expect(handleBlogForm.mock.calls[0][1]).toBe('Author name')
    expect(handleBlogForm.mock.calls[0][2]).toBe('https://myblog.com')
  })
})

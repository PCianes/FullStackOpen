import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const BlogForm = ({ handleBlogForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandleForm = (event) => {
    event.preventDefault()
    handleBlogForm(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card style={{ marginBottom: '20px', width: '50%' }}>
      <CardContent>
        <form onSubmit={onSubmitHandleForm}>
          <div>
            <TextField
              id="standard-basic"
              label="title"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="author"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Url"
              type="url"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardActions>
        <Button
          onClick={onSubmitHandleForm}
          variant="contained"
          color="primary"
          id="submit-blog"
        >
          create
        </Button>
      </CardActions>
    </Card>
  )
}

export default BlogForm

import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_LIKE':
    case 'NEW_COMMENT':
      return state.map((item) =>
        item.id !== action.data.id ? item : action.data
      )

    case 'NEW_BLOG':
      return [...state, action.data]

    case 'DELETE_BLOG':
      return state.filter((item) => item.id !== action.data.id)

    case 'INIT_BLOGS':
      return action.data

    default:
      return state
  }
}

export default reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title,
      author,
      url,
    })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.newComment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
  }
}

export const addLikeToBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({
      type: 'NEW_LIKE',
      data: newBlog,
    })
  }
}

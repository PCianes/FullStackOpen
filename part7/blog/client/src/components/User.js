import React from 'react'

const User = ({ blogs }) => {
  if (!blogs[0]) {
    return <h2>Nothing to show 👀</h2>
  }
  return (
    <div>
      <h2>{blogs[0].user.name}</h2>
      <p>added blogs</p>
      <ul>
        {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User

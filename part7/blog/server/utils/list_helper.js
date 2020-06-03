const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const mostLikes = (blogs) => {
  let authorMostLikes = {}
  let maxLikes = 0

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      authorMostLikes = {
        author: blog.author,
        likes: blog.likes,
      }
      maxLikes = blog.likes
    }
  })

  return authorMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}

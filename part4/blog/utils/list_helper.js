const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}

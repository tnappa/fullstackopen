const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var total = 0
  for (const blog of blogs) {
    total += blog.likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  var top = null
  var topLikes = 0
  for (const blog of blogs) {
    if (topLikes <= blog.likes) {
      top = blog
      topLikes = blog.likes
    }
  }
  return top
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
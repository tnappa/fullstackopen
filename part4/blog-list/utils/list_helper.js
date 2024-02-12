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

const mostBlogs = (blogs) => {
  var topAuthor = null
  var topCount = 0
  var counts = new Map()

  for (const blog of blogs) {
    const author = blog.author
    if (counts.has(author)) {
      var count = counts.get(author)
      count += 1
      counts.set(author, count)
      if (count > topCount) {
        topCount = count
        topAuthor = author
      }
    } else {
      counts.set(author, 1)
      if (topCount == 0) {
        topCount = 1
        topAuthor = author
      }
    }
  }

  const returnVal = {
    author: topAuthor,
    blogs: topCount
  }

  return returnVal
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
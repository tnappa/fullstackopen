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

module.exports = {
  dummy,
  totalLikes
}
const dummy = (blogs) => {
    return 1
  }
  
function totalLikes(blogs) {
  let sumlikes = 0;
  for(let i=0; i<blogs.length; i++) {
    sumlikes += blogs[i].likes
  }
  return sumlikes
  }

module.exports = {
    dummy,
    totalLikes
  }

  
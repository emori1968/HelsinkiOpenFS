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

const favoriteBlog = (blogs) => {
  let maxlikes = 0;
  let favblog = [];
  for(let i=0; i<blogs.length; i++) {
    if (blogs[i].likes>maxlikes) {
      favblog= [blogs[i]]
      maxlikes= blogs[i].likes
    }
  };
  return(favblog)
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

  
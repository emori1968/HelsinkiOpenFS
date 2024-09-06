var lodash = require('lodash');

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

  const mostBlogs = (blogs) => {
    const blogs_by_author = lodash.countBy(blogs, (blog) => blog.author)
    const most_blogs_author = lodash.maxBy(blogs, (blog) => blog.author)
    if (most_blogs_author) {
      return(
        {
          author : most_blogs_author.author,
          blogs : blogs_by_author[most_blogs_author.author] 
        })
    } else {
      return(
        {
          author : "",
          blogs:0,
        })
    }
  }



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }

  
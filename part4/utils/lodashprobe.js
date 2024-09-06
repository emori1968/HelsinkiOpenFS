// Testing area for LOdash
var lodash = require('lodash');


// data to test
const oneblog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f8",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]

  
  // Blogs by Author count
  const blogs_by_author = lodash.countBy(blogs, (blog) => blog.author)
  console.log("Blogs by Author: ", blogs_by_author)
  
  // Author with max Blogs count
  const most_blogs_author = lodash.maxBy(blogs, (blog) => blog.author)
  console.log("Most Blogs Author: ", most_blogs_author)

  // Blogs quantity for author with most blogs
  console.log("Blogs #:",blogs_by_author[most_blogs_author.author])

  // This is not like PythonPandas!!
  // GrupBy author
  // group by retorna una lista de todos los blogs por autor, no realiza agregado de datos
  const groupbyauthor = lodash.groupBy(blogs, (blog) => blog.author)
  console.log("GroupByAuthor:", groupbyauthor["Edsger W. Dijkstra"])

  const likesbyauthor = Object.entries(groupbyauthor).map( (x) => {
    return(
    {author: x[0],
    likes: x[1].reduce( (acc,blog)=> acc+blog.likes,0)})
    })

  // return a list of likes
  // const likesbyauthor = Object.entries(groupbyauthor).map( (x) => x[1].reduce( (acc,blog)=> acc+blog.likes,0))
  
  console.log("Likes Results",likesbyauthor)



// Agregate data for grouped data structure {'author': [{..},{..},{..}]}
  const summaryblogs = Object.entries(groupbyauthor).map( (x) => {
    const summary = {
      _id : x[1][0]._id,
      author: x[0],
      likes: x[1].reduce( (acc,blog)=> acc+blog.likes,0)
      }
    return summary 
    })
  console.log("Summary:" , summaryblogs)

  // Author with more likes
  const most_likes_author = lodash.maxBy(summaryblogs, (blog) => blog.likes)
  console.log("Most Likes Author: ", most_likes_author)


  
const mostL = (blogs) => {
  const grouped = lodash.groupBy(blogs, (blog) => blog.author);
  const agregated = Object.entries(grouped).map( (x) => {
    return(
    {author: x[0],
    likes: x[1].reduce( (acc,blog)=> acc+blog.likes,0)})
    })
  const most_likes_author = lodash.maxBy(agregated, (blog) => blog.likes);
  if(most_likes_author) {
    return(most_likes_author)
  } else {
    return({author:"", likes:0})
  }
}

console.log("Final: ", mostL([]))



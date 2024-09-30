import Togglable from './Togglable'
import blogService from '../services/blogs'



const Blog = ({ blog }, { username }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const redbutton = { backgroundColor: '#f44336' }

  const likeshandler = (event) => {

    const objectBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes +1,
      url: blog.url
    }
    console.log('blog object',blog)
    blogService
      .update(blog.id, objectBlog)
  }

  const deletehandler = (event) => {
    const flag = window.confirm(`remove blog: ${blog.title} by ${blog.author}`)
    if (flag) {
      blogService
        .deleteBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title}
        <Togglable buttonLabel= 'view'>
          {blog.url}<br/>
          {blog.author} <br/>
            Likes: {blog.likes} <button onClick={likeshandler} >like</button>  <br/>
            User: {username} <br/>
          <button style={redbutton} onClick={deletehandler} >remove</button>  <br/>
        </Togglable>
      </div>
    </div>
  )}

export default Blog
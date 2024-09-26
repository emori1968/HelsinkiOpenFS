import Togglable from "./Togglable"
let showme = false

const showhandler = (event) => {
 showme = !showme
}

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5

  }
  return(
    <div style={blogStyle}>
      <div>
          {blog.title}
          <Togglable buttonLabel= 'view'>
            {blog.url}<br/>
            Likes: {blog.likes} <button>like</button>  <br/>
            {blog.author} <br/>
          </Togglable>
      </div>
    </div>
)}

export default Blog
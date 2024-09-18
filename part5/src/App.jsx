import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="confirm">
      {message}
    </div>
  )
}

const App = () => {

  const [blogs, setBlogs] = useState([])
// const [newTitle, setNewTitle] = useState('')
// const [newAuthor,setNewAuthor] = useState('')
// const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => { 
    event.preventDefault()
    try {
        const user = await loginService.login({ username, password })
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
         setErrorMessage('Wrong credentials')
         setTimeout(() => {
            setErrorMessage(null)      }, 5000)
      }
    }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
  }

  /* not used yet
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newURL,
      }
    
      blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlog(blogs.concat(returnedBlog))
          setNewBlog('')
        })
    }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  */
  
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  /*
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>  
  )
  */

  const blogsToShow = (user === null)
    ? [{}]
    : blogs.filter((c) => c.user.username == user.username)


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
          {loginForm()}
      </div>
    )
  }
  

  return (
    <div>
      <h2>blogs</h2>
      <>{user.username} logged-in</>
      <button onClick={handleLogout}> logout </button>
      <Notification message={errorMessage} />
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}


export default App
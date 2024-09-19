import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)


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
        console.log("Token", user.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        console.log("User", user)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exeption) {
         setErrorMessage('Wrong username or password')
         setTimeout( () => {setErrorMessage(null)}, 5000)
      }
    }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
  }

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
          setBlogs(blogs.concat(returnedBlog))
          setConfirmMessage(`${newTitle} from ${newAuthor} was added`)
          setTimeout(() => {setConfirmMessage(null)}, 5000)
          setNewTitle('')
          setNewAuthor('')
          setNewURL('')
        })
    }
  
  
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
  
  
  const blogForm = () => (
    
    <form onSubmit={addBlog}>

      <p>create new</p>

      <div>
        Title:
        <input
          type="text"
          value={newTitle}
          onChange={({target}) => setNewTitle(target.value)}
        />
      </div>

      <div>
        Author:
        <input
          type="text"
          value={newAuthor}
          onChange={({target}) => setNewAuthor(target.value)}
        />
      </div>

      <div>
        URL:
        <input
          type="text"
          value={newURL}
          onChange={({target}) => setNewURL(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>  
  )

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
      <Notification message={confirmMessage} />
      {blogForm()}
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}


export default App
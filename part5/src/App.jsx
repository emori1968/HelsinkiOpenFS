import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm  from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


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
        //console.log("Token", user.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        // console.log("User", user)
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
    setPassword('')
  }

  const addBlog = (blogObject) => {
      blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
  
        })
    }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
 
  const blogsToShow = (user === null)
    ? [{}]
    : blogs.filter((c) => c.user.username == user.username)

  
return (
  <div>
    <h1>Blogs</h1>
    <Notification message={errorMessage} />
    {!user && loginForm()}
    {user && <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}> logout </button>
                <Togglable buttonLabel="new blog">
                  <BlogForm
                    createBlog={addBlog}
                  />
                </Togglable>
              </div>
    }
    <ul>
      {blogsToShow.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </ul>
  </div>
)
}














export default App
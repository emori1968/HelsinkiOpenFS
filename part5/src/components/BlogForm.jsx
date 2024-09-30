import { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0,
    })
    setConfirmMessage(`${newTitle} from ${newAuthor} was added`)
    setTimeout(() => {setConfirmMessage(null)}, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>

        <div>
                Title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>

        <div>
                Author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>

        <div>
                URL:
          <input
            type="text"
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
      <Notification message={confirmMessage} />
    </div>
  )
}


export default BlogForm
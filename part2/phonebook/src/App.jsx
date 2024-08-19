import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('botton clicked', event.target)
    // person is and Object {name: "Eduardo"}
    const personObject = {
      name: newName
    }
    // now new person can be added to the list
    setPersons(persons.concat(personObject))
    // reset previos value
    setNewName('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addPerson}>
        <div>
          name: <input
                   value = {newName}
                   onChange= {handlePersonChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(row => <p key={row.name}>{row.name}</p>)}
      </ul>
    </div>
  )
}

export default App
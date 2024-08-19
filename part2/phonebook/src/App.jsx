import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '39-44-5323523' }
  ]) 
  const [newName, setNewName] = useState('')
  const  [newNumber,setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('botton clicked', event.target)
    // person is and Object {name: "Eduardo"}
    const personObject = {
      name: newName,
      number: newNumber
    }
    // now new person can be added to the list
    setPersons(persons.concat(personObject))
    // reset previos value
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
    }
    
  // No name repeat check. Not working well!!
  const isNew = persons.find((person) => person.name === newName )
  if ( isNew != undefined ) {
    alert(`${newName} is already on the phonebook`);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
    }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addPerson}>
        <div>
          name: <input
                   value = {newName}
                   onChange= {handleNameChange}
                />
        </div>
        <div>
          number: <input
                   value = {newNumber}
                   onChange= {handleNumberChange}
                />
        </div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(row => <p key={row.name}>{row.name} {row.number}</p>)}
      </ul>
    </div>
  )
}

export default App
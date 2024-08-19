import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const  [newNumber,setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('botton clicked', event.target)
    // person is and Object {name: "Eduardo"}
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
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
  if (newName != '') {
    const isNew = persons.find((person) => person.name === newName )
    if ( isNew != undefined ) {
      alert(`${newName} is already on the phonebook`);
    }
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
    }

  const handleFilterChange = (event) => {
    console.log(filterName)
    setFilterName(event.target.value)
  }

  // filter person list 
  const filteredlist =  (filterName != '')
  ? persons.filter(row => row.name === filterName)
  : persons


  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input
                                value = {filterName}
                                onChange= {handleFilterChange}
                              />
        </div>

      <h2>add a new</h2>
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
        {filteredlist.map(row => <p key={row.id}>{row.name} {row.number}</p>)}
      </ul>
    </div>
  )
}

export default App
import { useState } from 'react'


const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value = {props.name} onChange= {props.handler} />
    </div>
  )
}

const PersonForm = (props) => {
  // No name repeat check
  if (props.newname != '') {
    const isNew = props.listnames.find((person) => person.name == props.newname )
    if ( isNew != undefined ) {
      alert(`${props.newname} is already on the phonebook`);
    }
  }
  return (
    <>
      <form onSubmit= {props.addperson}>
        <div>
          name: <input value = {props.newname} onChange= {props.handlenamechange}/>
        </div>
        <div>
          number: <input value = {props. newnumber} onChange= {props. handlenumberchange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = (props) => {
  // filter person list 
  const filteredlist =  (props.filtername != '')
  ? props.persons.filter(row => row.name === props.filtername)
  : props.persons
  return (
    <>
      <ul>
        {filteredlist.map(row => <p key={row.id}>{row.name} {row.number}</p>)}
      </ul>
    </>
  )
}



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

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
    }

  const handleFilterChange = (event) => {
    console.log(filterName)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name = {filterName} handler= {handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        listnames = {persons}
        addperson = {addPerson}
        newname = {newName}
        handlenamechange = {handleNameChange}
        newnumber = {newNumber}
        handlenumberchange = {handleNumberChange}      
      />
      <h3>Numbers</h3>
      <Persons persons= {persons} filtername={filterName}/>
    </div>
  )

  }

export default App
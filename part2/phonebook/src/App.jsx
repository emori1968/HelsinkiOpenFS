import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value = {props.name} onChange= {props.handler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit= {props.addperson}>
        <div>name: <input value = {props.newname} onChange= {props.handlenamechange}/> </div>
        <div>number: <input value = {props. newnumber} onChange= {props. handlenumberchange}/> </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      <ul>
        {props.showList.map(row => <p key={row.id}> {row.name} {row.number}
        <button onClick={() => props.deletePerson(row.id)}>delete</button></p>)}
      </ul>
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const  [newNumber,setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

   // No name repeat check
   if (newName != '') {
    const isNew = persons.find((person) => person.name == newName )
    if ( isNew != undefined ) alert(`${newName} is already on the phonebook`);
    }

  // filter person list 
  const filteredList =  (filterName != '')
  ? persons.filter(row => row.name === filterName)
  : persons

  const deletePersonOf = (id) => {
    const person = persons.find(n => n.id === id)
    console.log(person)
    const yn = window.confirm(`Delete ${person.name}?}`)
    if (yn) {
      personService
      .delperson(id)
      .then(setPersons(persons.filter(n => n.id !== id)))
      .catch(error => {
        alert(`the person ${person.name} was already deleted from server`)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name = {filterName} handler= {handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        addperson = {addPerson}
        handlenamechange = {handleNameChange}
        newname = {newName}
        newnumber = {newNumber}
        handlenumberchange = {handleNumberChange}      
      />
      <h3>Numbers</h3>
      <Persons showList={filteredList} deletePerson = {deletePersonOf}/>
    </div>
  )

  }

export default App
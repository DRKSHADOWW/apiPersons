import { useState, useEffect } from 'react'
import {AddNewName} from './components/AddNewName'
import {SearchPerson} from './components/SearchPerson'
import { FilterPersons } from './components/FilterPersons'
import personService from  './services/Persons'
import './index.css'
import { Notificacion } from './components/Notificacion'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPersonName, setNewPersonName] = useState('')
  const  [newPersonNumber, setPersonNumber] = useState('')
  const [searchName, setsearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationE, setNotificationE] = useState(null)

 useEffect(()=>{
  personService
  .getAll()
  .then(response => {
    setPersons(response.data)
  })
 }, [])

 const handleDelete = (id) => {
  personService
    .delPerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotificationE(`Person deleted successfully!`)
      setTimeout(() => {
        setNotificationE(null)
      }, 3000)    }).catch(error => console.error('Error deleting:', error));
    
}

const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    id: Math.floor(Math.random() * 1000).toString(),
    name: newPersonName,
    number: newPersonNumber
  }

  const existingPerson = persons.find(person => person.name.toLowerCase() === newPersonName.toLowerCase())

  if (existingPerson) {
    const confirm = window.confirm(`${newPersonName}   is already added to phonebook, replace the old number with a new one ? `)
    if (confirm) {
    setPersons(persons.map(person => person.id === existingPerson.id ? { ...person, number: newPersonNumber } : person))
    }
  } else {
    personService
      .create(personObject)
      .then(response => {
        setPersons([...persons, response.data])
        setNotification(`Person added successfully!`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  setNewPersonName('')
  setPersonNumber('')
}

  const handleNameChange = (e) =>{
    setNewPersonName(e.target.value)  
  }
  const handleNumberChange = (e) =>{
    setPersonNumber(e.target.value)
  }

  const handleSearchChange = (e) =>{
    setsearchName(e.target.value)  
  }

  return (
    <>

    <Notificacion notification={notification} type="create" />
    <Notificacion notification={notificationE} type="delete" />
  
      <SearchPerson value={searchName} onChange={handleSearchChange}/>
      
        <AddNewName
        onSubmit={addPerson} 
        value={newPersonName} 
        value2={newPersonNumber} 
        onChange={handleNameChange} 
        onChange2={handleNumberChange} 
        text={'name'} text2={'number'}/>

        <FilterPersons persons={persons} searchName={searchName} onDelete={handleDelete}/>

    </>
  )
}

export default App
export const FilterPersons = ({persons, searchName, onDelete}) =>{


  
    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    return(
      <>
        <h2>Numbers</h2>
           {filteredPersons.map(person => (
          <li key={person.id}>{person.name} {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
        ))}
      </>
    )
  }
export const Person = ({ person, toggleImportance }) => {
    const label = person.important
      ? 'make not important' : 'make important'
  
    return (
      <li>
        {person.content} 
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
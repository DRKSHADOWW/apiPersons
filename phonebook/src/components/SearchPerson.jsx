export const SearchPerson = ({value, onChange}) =>{
    return(
      <>
      <h2>Phonebook</h2>
      <input value={value} onChange={onChange} placeholder='Search by name'/>
      </>
    )
  }
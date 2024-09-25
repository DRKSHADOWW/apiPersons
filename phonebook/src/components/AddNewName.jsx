export const AddNewName = ({onSubmit,value, onChange, text, value2, onChange2, text2}) =>{
    return(
      <>
      <form onSubmit={onSubmit}>
          <h2>add a new</h2>
          <p>{text}</p><input value={value} onChange={onChange} />
          <p>{text2}</p><input value={value2} onChange={onChange2} />
          <button type="submit">add</button>
          </form>
      </>
    )
  }
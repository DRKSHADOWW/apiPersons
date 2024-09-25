export const Search = ({onChange, value, search}) =>{
    return (
      <>
        <h2>Search</h2>
        <input onChange={onChange} value={value} search={search} />
      </>
    )
  }
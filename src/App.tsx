import React, { useState } from 'react';
import './App.css';

import babyNamesData from "./babyNamesData.json"
import Child from "./Component/child"

function App() {

  const [inputSearch, setInputSearch] = useState("")
  const [favourites, setFavourites] = useState([""])

  const nameMapper = ({ name, sex }: { name: string, sex: string }) => {
    return (
      <div className={`holder ${sex === "m" ? "male" : "female"}`}>{name}</div>
    )
  }

  let sortedNames = babyNamesData.sort((a, b) => a.name.localeCompare(b.name))
  let filteredNames = sortedNames.filter((item) => {
    return (`${item.name.toLowerCase()}`).startsWith(`${inputSearch.toLowerCase()}`)
  })
  let mappedNames = filteredNames.map(nameMapper)
  return (
    <div >
      
      <div>
        <input value={inputSearch} onChange={(event) => setInputSearch(event.target.value)} />
      </div>
      <div>
        Favourites List: 
        <hr />
        {favourites}
      </div>

      Normal List:
      <hr/>
      <div>
        {mappedNames}
      </div>

    </div>
  );
}

export default App;

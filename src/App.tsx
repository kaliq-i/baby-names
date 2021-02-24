import React, { useState, useEffect } from 'react';
import './App.css';
import babyNamesData from "./babyNamesData.json"
import Child from "./Component/child"

let initialData = babyNamesData
const localValue:any = localStorage.getItem("favourites")
const parsedLocal = JSON.parse(localValue)

const localInitial:any = localStorage.getItem("initial")
const parsedInitial = JSON.parse(localInitial)

function App() {

  const [inputSearch, setInputSearch] = useState("")
  const [radio,setRadio] = useState("all")
  let [favourites, setFavourites] = useState<any>([])
  
  useEffect(() => {
    if (parsedLocal) {
    setFavourites([...parsedLocal])
    }
    if (parsedInitial) {
      initialData = [...parsedInitial]
    }
  }, []);
  //currently rewriting the add or remove function: my thoughts
  // Have initialData in the state
  // then create variable called filteredarray which filters initialdata for elements whose property DO NOT match paramenter
  // then run if statement with condition that length of filtered array is different from initialdata

  // but envisioned problems = if initial data is in state - how do we initialise this without every render starting with all the original json data
  // filtered array will always be different initialdata if initialdata is beng initialised from json in component
  ///more thinking

  const addOrRemove = (id: number) => {
    // PROBLEM - AFTER LOCAL STORAGE IF STATEMENT IS WRONG BECAUSE IT EXISTS
    // if it exists in initial data - remove from it and add to favourites
    const arrayWithSearched = initialData.filter((e) => e.id === id)
    const arrayWithSearchedFavourite = favourites.filter((e: any) => e.id === id)
    if (arrayWithSearched.length > 0) {
      initialData.splice(initialData.findIndex(item => item.id === id), 1)
      const newFavourites = [...favourites]
      const objectToBePushed = arrayWithSearched[0]
      newFavourites.push(objectToBePushed)
      setFavourites([...newFavourites])
      localStorage.setItem("favourites",JSON.stringify(newFavourites))
      localStorage.setItem("initial",JSON.stringify(initialData))
    }
    else {
      // else remove from favourites and add from initial data  
      initialData.push(arrayWithSearchedFavourite[0])
      const newFavourites = [...favourites]
      newFavourites.splice(newFavourites.findIndex(item => item.id === id), 1)
      setFavourites([...newFavourites])
      localStorage.setItem("favourites",JSON.stringify(newFavourites))
      localStorage.setItem("initial",JSON.stringify(initialData))

    }

  }
  const nameMapper = ({ name, sex, id }: { name: string, sex: string, id: number }) => {
    return (
      <button className={`holder ${sex === "m" ? "male" : "female"}`} onClick={() => addOrRemove(id)}>{name}</button>
    )
  }

  let sortedNames = initialData.sort((a, b) => a.name.localeCompare(b.name))
  let filteredNames = sortedNames.filter((item) => {
    return (item.name.toLowerCase().startsWith(inputSearch.toLowerCase()) && (radio!== "all"? item.sex === radio: item.sex === "m"||"f")  ) //why doesnt this work - input doesnt filter
  })
  let mappedNames = filteredNames.map(nameMapper)
  let mappedFavourites = favourites.map(nameMapper)
  return (
    <div >

      <div>
        <input value={inputSearch} onChange={(event) => setInputSearch(event.target.value)} /><br />
        <div>
          <input type="radio" id="male" name="gender" value="m" onChange={(event) => setRadio(event.target.value)}/>
          <label htmlFor="male">male</label><br />
          <input type="radio" id="female" name="gender" value="f" onChange={(event) => setRadio(event.target.value)} />
          <label htmlFor="female">female</label><br />
          <input type="radio" id="all" name="gender" value="all" onChange={(event) => setRadio(event.target.value)}/>
          <label htmlFor="all">all</label><br />
        </div>
      </div>

      <div>
        Favourites List:
        <hr />
        {mappedFavourites}
      </div>

      Normal List:
      <hr />
      <div>
        {mappedNames}
      </div>

    </div>
  );
}

export default App;

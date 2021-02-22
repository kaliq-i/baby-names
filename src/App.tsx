import React from 'react';
import './App.css';
import babyNamesData from "./babyNamesData.json"
import Child from "./Component/child"

function App() {

const nameMapper = ({name}:{name:string}) => {
  return (
    <div>{name}</div>>
  )
} 
let mappedNames = babyNamesData.map(nameMapper)  

  return (
    <div >
     {mappedNames}
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import post from "./post";

function App() {

let lista = [];
lista.push(new post(1,"master","eka"));
lista.push(new post(2, "kalle", "toka"));
lista.push(new post(3, "master", "kolmas"));


  return (
    <div className="App">

    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <div className='app'>
        <NavBar />
        <Chat />
    </div>
  );
}

export default App;


//Agrega () en la funcion del button para que lea cada movimiento
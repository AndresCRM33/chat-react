import React, {useState} from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import { NavBar } from './components/NavBar/NavBar';
import { Routes, Route, Link } from 'react-router-dom';
import { Login } from './components/LogIn/Login';

function App() {

  return (
    <div className='app'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
    </div>
  );
}

export default App;


//Agrega () en la funcion del button para que lea cada movimiento
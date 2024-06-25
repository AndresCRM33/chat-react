import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Login({name, setName}){

    return(<div>
        <h1>Welcome to SwiftChat</h1>
        <p>Please type your name</p>
        <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        {name ? (<Link to="/chat">Confirm</Link>): (<p>Por favor ingrese un nombre</p>)}
    </div>)
}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../redux/actions/actions";
import styles from "./Login.module.css"

export function Login({name, setName}){

    const dispatch = useDispatch()
    const userName = useSelector(state => state.userName)

    const handleNameChange = (e) => {
        dispatch(setUserName(e.target.value));
      };

    return(<div>
        <h1>Welcome to SwiftChat</h1>
        <p>Please type your name</p>
        <input 
            type="text"
            value={userName}
            onChange={(e) => handleNameChange(e)}
            className={styles.inputLogin}
        />
        {userName ? (<Link className={styles.buttonLogin} to="/chat">Confirm</Link>): (<p>Por favor ingrese un nombre</p>)}
    </div>)
}
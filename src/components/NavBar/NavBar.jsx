import React from "react";
import "./NavBar.css"
import {useSelector, useDispatch} from "react-redux"
import { logOut } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

export function NavBar(){

    const dispatch = useDispatch()
    const handleCLick = () => {
        dispatch(logOut())
    }

    return(<div className="containerNav">
        <h1 className="logoNav">SwiftChat</h1>
        <ul className="menuNav">
            {/* <li className="menuNavItem">Chats</li> */}
            <Link className="menuNavItem" to={"/"} onClick={handleCLick}>LogOut</Link>
        </ul>
    </div>)
}
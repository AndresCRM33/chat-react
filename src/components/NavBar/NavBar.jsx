import React from "react";
import "./NavBar.css"

export function NavBar(){
    return(<div className="containerNav">
        <h1 className="logoNav">SwiftChat</h1>
        <ul className="menuNav">
            <li>Chats</li>
            <li>LogOut</li>
        </ul>
    </div>)
}
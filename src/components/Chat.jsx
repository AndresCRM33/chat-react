import { useState, useEffect } from "react";
import {io} from "socket.io-client"

const socket = io("http://localhost:3000");

function Chat() {
  const [isConnected, setIsConnected] = useState()
  const [nuevoMensaje, setNuevoMensaje] = useState("")
  const [mensajes, setMensajes] = useState([])
  const [escribiendo, setEscribiendo] = useState(false)
  const [timeout, setTimeoutId] = useState(null)


  useEffect(() => {
    socket.on("connect", () => setIsConnected(true))

    socket.on("chat_message", (data) => {
      setMensajes(mensajes => [...mensajes, data]);
      setEscribiendo(false) // Deja de mostrar Escribiendo cuando llega un mensaje
      console.log(mensajes);
    });

    socket.on("typing", () => setEscribiendo(true))

    socket.on('stop_typing', () => setEscribiendo(false));

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off('typing');
      socket.off('stop_typing');
    }

  }, [])

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    })
    setNuevoMensaje("")
    clearTimeout(timeout)
    socket.emit("stop_typing")
  }

  const handleTyping = () => {
    if (!escribiendo) {
      socket.emit('typing');
    }
    clearTimeout(timeout);
    const newTimeout = setTimeout(() => {
      socket.emit('stop_typing');
      setEscribiendo(false);
    }, 1500);
    setTimeoutId(newTimeout);
  };

  return (
    <div>
      <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
      <h1>Chat</h1>
        <ul>
            {mensajes.map(msj => (
              <li><b>{msj.usuario}:</b>{msj.mensaje}</li>
            ))}
            {escribiendo ? <li>Un usuario está escribiendo</li> : null}
        </ul>
        <form onSubmit={e => {e.preventDefault(e)}}>
            <input 
                type="text" 
                value={nuevoMensaje}
                onChange={e => {
                setNuevoMensaje(e.target.value)
                handleTyping()
                }} 
            />
            <button type="submit" onClick={enviarMensaje}>Enviar</button> 
        </form>
    </div>
  )
}

export default Chat

import { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// const socket = io("http://localhost:3000");
const socket = io("https://chat-backend-lx93.onrender.com")

function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [timeout, setTimeoutId] = useState(null);

  const user = useSelector(state => state.userName)


  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));

    socket.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
      setEscribiendo(false); // Deja de mostrar Escribiendo cuando llega un mensaje
    });

    socket.on("typing", () => setEscribiendo(true));

    socket.on("stop_typing", () => setEscribiendo(false));

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      // usuario: socket.id,
      usuario: user + ": ",
      mensaje: nuevoMensaje,
    });
    setNuevoMensaje("");
    clearTimeout(timeout);
    socket.emit("stop_typing");
  };

  const handleTyping = () => {
    if (!escribiendo) {
      socket.emit("typing");
    }
    clearTimeout(timeout);
    const newTimeout = setTimeout(() => {
      socket.emit("stop_typing");
      setEscribiendo(false);
    }, 1500);
    setTimeoutId(newTimeout);
  };

  //user lo tomamos del estado global con useSelector
  if (user != ""){
    return (
      <div className={styles.container}>
        <h2>Welcome {user}</h2>
        <div className={styles.messages}>
          <ul>
            {mensajes.map((msj, index) => (
              <li key={index}>
                <b className={styles.name}>{msj.usuario}</b> {msj.mensaje}
              </li>
            ))}
            {escribiendo ? (
              <li id={styles.typing}>Un usuario está escribiendo...</li>
            ) : null}
          </ul>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className={styles.formChat}>
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => {
              setNuevoMensaje(e.target.value);
              handleTyping();
            }}
            className={styles.inputChat}
          />
          <button type="submit" onClick={enviarMensaje} className={styles.buttonChat}>
            Enviar
          </button>
        </form>
      </div>
    );
  }else{
    return(<div>
      <h2>Por favor, debe ingresar su nombre</h2>
      <Link to="/">Volver</Link>
      </div>)
  }

}

export default Chat;
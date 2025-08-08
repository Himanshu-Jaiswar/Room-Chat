import { useState } from 'react';
import Room from './component/Room';
import MessagesForm from './component/MessagesForm';
import Chats from './component/Chats'  
import io from 'socket.io-client'
import { useEffect } from 'react';
import LeaveChat from './component/LeaveChat';


const socket = io("http://localhost:9000");

function App() {
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userName, setUserName] = useState("");
 
  useEffect(() => {
  
    socket.on("receive-message", ({userMessage, sender, otherName}) => {
      console.log(otherName);
      
      console.log(userMessage, sender);
      
      setChat((prev) => [...prev, {userMessage, sender, otherName}]);
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-count");
    }

  }, []);


  return (
    <div className='mainDiv'>

        <div className='chat-container'>

          <Chats
        chat={chat}
        socket={socket}
        ></Chats>
        </div>
        
        {joinedRoom ? console.log(true) :
        <div><Room
        room={room}
        setRoom={setRoom}
        setJoinedRoom={setJoinedRoom}
        socket={socket}
        setUserName={setUserName}
        />
        </div>
        }

        
        

        {joinedRoom &&
        <div className='msg-leavebtn'> <MessagesForm
        message={message}
        setMessage={setMessage}
        socket={socket}
        joinedRoom={joinedRoom}
        userName={userName}
        ></MessagesForm>
        
        <LeaveChat
        joinedRoom={joinedRoom}
        socket={socket}
        setChat={setChat}
        setJoinedRoom={setJoinedRoom}
        ></LeaveChat>
        </div>
        }

        

       
    </div>
  )
}

export default App

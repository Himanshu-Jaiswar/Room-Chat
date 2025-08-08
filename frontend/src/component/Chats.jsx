import React from 'react'
// import io from 'socket.io-client'

// const socket = io("http://localhost:9000");

export default function Chats({chat, socket}) {
 
  return (
    <div>
      <ul>
        {chat.map((value, index) => {
          const isYou = value.sender;
          const Randomkey = Math.random() * 10000;
          return <div key={Randomkey} id={`${isYou === socket.id ? "you" : "someone"}`}><li 
          key={index}> {isYou === socket.id ? `You: ${value.userMessage}` : `${value.otherName}: ${value.userMessage}`}
          </li>
          </div>
          })}
      </ul>
      
    </div>
  )
}

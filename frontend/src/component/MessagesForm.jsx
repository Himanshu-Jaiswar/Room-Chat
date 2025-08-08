import React from 'react'

export default function MessagesForm(props) {
 
    const { message, setMessage} = props;

    const sendMessageHandler = (e) => {
       
        e.preventDefault();
        const {socket, joinedRoom, userName} = props;
        console.log(joinedRoom, message);
        
        socket.emit("send-message", {room:joinedRoom, userMessage:message, sender:socket.id, otherName:userName});
        
        setMessage("");
    }
    return (
        <div className='messageDiv'>
            <form onSubmit={sendMessageHandler}>
                <label htmlFor="">Message</label>
                <input type="text"
                    placeholder='Type Message...'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                    className='inputBox'
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

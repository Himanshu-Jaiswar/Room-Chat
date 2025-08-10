import React from 'react'

export default function LeaveChat(props) {
    const onLeaveHanlder = (e) => {
        e.preventDefault();
        
        let {socket, joinedRoom, setChat, setJoinedRoom} = props;

        socket.emit("leave-room", joinedRoom);
        setChat([]);
        setJoinedRoom("");
    }

  return (
    <div>
      <form onSubmit={onLeaveHanlder}>
        <button type='submit' className='btn'>Leave</button>
      </form>
    </div>
  )
}

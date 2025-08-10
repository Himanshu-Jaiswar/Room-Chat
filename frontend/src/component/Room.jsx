import React from 'react'



export default function Room(props) {
    const joinRoomHandler = (e) => {
    e.preventDefault();
    const {room, setJoinedRoom, socket} = props;
    setJoinedRoom(room);
    console.log(room);
    
    socket.emit("join-room", room);
    setRoom("");

}

    const {room, setRoom, setUserName} = props;
    return (
        <div className='roomDiv'>
            <form onSubmit={joinRoomHandler} className='form-container'>
                <label htmlFor="">Room : </label>
                <input type="text"
                    placeholder='Enter Room ID'
                    onChange={(e) => setRoom(e.target.value)}
                    value={room}
                    required
                    minLength={5}
                    className='inputBox'
                    />
                    <br></br>

                <label>Name : </label>
                <input type="text"
                    placeholder='Enter your User Name'
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                    required
                    className='inputBox'
                />
                <button type='submit' className='btn'>Enter</button>
            </form>
        </div>
    )
}

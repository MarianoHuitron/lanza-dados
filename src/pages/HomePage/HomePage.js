import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Cube } from '../../components/Cube';
import { GetNickName } from '../../components/GetNickName';
import { UsersList } from '../../components/UsersList';


const connectSocketServer = () => {
    // https://socket-server-dados.herokuapp.com
    const socket = io('https://socket-server-dados.herokuapp.com', {
        transports: ['websocket']
    });
    return socket;
}

export const HomePage = () => {


    const [socket] = useState(connectSocketServer);
    const [currentPosition, setCurrentPosition] = useState('');
    const [lastPosition, setLastPosition] = useState(null);
    const [users, setUsers] = useState([]);
    const [btnActive, setBtnActive] = useState(false);


 
    // Add user to list
    useEffect(() => {
        socket.on('user-joined', (users) => {
            setUsers(users)
        })
    }, [socket]);


    // Emit to the server the current position get from: handleRandom function
    useEffect(() => {
        socket.emit('change-position', {currentPosition, user: localStorage.getItem('uuid')});
    }, [currentPosition, socket]);

    // apply transform to cube
    useEffect(() => {
        socket.on('change-position', ({position, users}) => {

            const cube = document.querySelector('.cube');
            cube.style.transition = '';
            cube.style.transform = "translateY(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

            setTimeout(() => {
                cube.style.transition = 'transform 2s';

                switch (position) {
                    case 1:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 2:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                        break;
                    case 3:
                        cube.style.transform = `translateY(200px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 4:
                        cube.style.transform = `translateY(200px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 5:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                        break;
                    case 6:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                        break;
                }
                
            }, 20)

            // Wait for the transition
            setTimeout(() => {
                setUsers(users)
                setLastPosition(position);
            },2000);
        });

    }, [socket]);

    useEffect(() => {
        if(users.length == 0) {
            setBtnActive(false);
        } 

        users.map(user => {
            if(user.active) {
                if(user.id === localStorage.getItem('uuid')) {
                    setBtnActive(true)
                } else {
                    setBtnActive(false);
                }
            }
        });
    }, [users])


    const handleRandom = () => {
        let randomValue = '';

        // check the last position
        while((randomValue === lastPosition) || randomValue === '') {
            randomValue = Math.floor((Math.random() * 6) + 1);
        }
        setCurrentPosition(randomValue);
        setLastPosition(randomValue);
    }


    return (
        <>
            <GetNickName socket={socket} />
            <div className="m-0 vh-100 row justify-content-center align-items-center">
                <div className="col-auto p-5 text-center mt-5">
                    {/* CUBE 3D - DICE */}
                    <Cube />

                    <button
                        onClick={ handleRandom }
                        disabled={ !btnActive }
                        className='btn btn-primary btn-block'
                    >Lanzar dado</button>

                    <div className="card mt-4">
                        <div className="card-header">
                            <b>Usuarios</b>
                        </div>
                        <ul className="list-group">
                            <UsersList users={ users } />
                        </ul>
                    </div>
                
                </div>

            </div>

        </>
    )

   
}


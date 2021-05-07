import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';

export const GetNickName = ({socket}) => {

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        socket.on('user-created', ({nickname, id}) => {
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('uuid', id);
        })
    }, [socket])

    useEffect(() => {
        if(localStorage.getItem('nickname')) {
            localStorage.removeItem('nickname');
        }

        MySwal.fire({
            title: 'Escribe tu nombre',
            input: 'text',
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            inputValidator: (value) => {
                if(!value) return 'Escribe tu nombre';
            },
            preConfirm: (nickname) => {
                socket.emit('join-room', nickname);
            }
        });

    }, [socket])

    return (
        <div>       
        </div>
    )
}

GetNickName.propTypes = {
    socket: PropTypes.object
}


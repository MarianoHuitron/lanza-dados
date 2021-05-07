import React from 'react';
import PropTypes from "prop-types";

export const UsersList = ({ users }) => {
    return (
        <>
            {
                users.map((user,i) => (
                    <li
                        key={ user.id }
                        className={`list-group-item d-flex justify-content-between align-items-start  ${(user.active)? 'active': ''}`}
                    >
                        {user.nickname}
                        <span className="badge bg-primary rounded-pill">{user.value}</span>
                    </li>
                ))
            }
        </>
    );
}


UsersList.propTypes = {
    users: PropTypes.array
}

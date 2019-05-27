import React, { Fragment, useState } from 'react';

export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();

        const userData = {
            username,
            password
        }

        setUser(userData);
        setUsername("");
        setPassword("");
    }
    return (
        <Fragment>
            <h2 style={{ textAlign: 'center'}}>Login</h2>

        <form
            style={{
                display: 'grid',
                aliginItems: 'center',
                justifyContent: 'center'
            }}
        >
            <input
                type='text'
                placeholder='Username'
                onChange={event => setUsername(event.target.value)}
                value = {username}
            />
            <br />
            <input
                type='password'
                placeholder='Password'
                onChange={event => setPassword(event.target.value)}
                value = {password}
            />
            <br />

            <button 
            type='submit'
            onClick = {handleSubmit}
            >Submit</button>
        </form>

        {user && JSON.stringify(user, null, 2)}
        </Fragment>
    ) 
}
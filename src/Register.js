import React, { Fragment, useState } from 'react';

const initialState = {
    username: "",
    email: "",
    password: ""
}
export default function Register(){

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const [user, setUser] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();

        setUser(form);
        setForm(initialState);
    }


    const handleOnChange = event => {
        setForm ({
            ...form,
            [event.target.name] : event.target.value
        })
    }
    return (
        <Fragment>
            <h2 style={{ textAlign: 'center'}}>Register</h2>

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
                name='username'
                onChange={handleOnChange}
                value={form.username}
            />
            <br />

            <input
                type='email'
                placeholder='Email address'
                name='email'
                onChange={handleOnChange}
                value={form.email}
            />
            <br />

            <input
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleOnChange}
                value={form.password}
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
import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>
            <div className='text-center my-5'>
                <h1>
                    Welcome to Homepage
                </h1>
                <Link to="/registration">Click here For Registartion</Link>
            </div>
        </>
    )
}

export default Homepage;
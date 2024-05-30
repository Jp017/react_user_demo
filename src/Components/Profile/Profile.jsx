import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUserProfileDetails } from '../../service';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
    const token = localStorage.getItem("token");
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getUserProfileDetails(token);
                console.log("response+++", response.data.data.user)
                setUserProfile(response.data.data.user);
            } catch (error) {
                console.log(error)
                if (error?.response.data) {
                    setError(error?.response.data.message)
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (token && !userProfile) {
            fetchData();
        }
    }, [token])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='container my-5'>
            {
                !token ? <div>
                    <p>Please login and try again</p>
                    <Link to="/login">Login</Link>
                </div> : error ? <div>
                    <p className='text-danger text-center my-5'>{error}
                        <Link to="/login">Login</Link>
                    </p>

                </div> : userProfile ? (
                    <div>
                        <ul>
                            <li>
                                <strong>Name:</strong> {userProfile.name} <br />
                                <strong>Email:</strong> {userProfile.email} <br />
                                <strong>Mobile:</strong> {userProfile.mobile}
                            </li>
                        </ul>
                    </div>
                ) : (
                    <p>No user data available</p>
                )
            }
        </div>
    )
}

export default Profile
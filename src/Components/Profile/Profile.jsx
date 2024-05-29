import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUserProfileDetails } from '../../service';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
    const token = localStorage.getItem("token");
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data } = await getUserProfileDetails(token);
                console.log(data);
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
                    
              </div> : <div>
                      Profile
            </div>
        }
    </div>
  )
}

export default Profile
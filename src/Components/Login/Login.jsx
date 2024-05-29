import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service';

function Login() {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token")
    }, [])

    const handleSubmit = async(event) => {
        const form = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        setError(null);

        if (form.checkValidity()) {
            setValidated(false);
            const email = form.elements["email"].value;
            const password = form.elements["password"].value;
            try {
                const {data} = await login({email,password});
                console.log(data);
                localStorage.setItem("token", data.data.token);
                navigator("/profile")
            } catch (error) {
                if (error.response?.data) {
                    console.log(error.response.data)
                    setError(error.response.data.error)
                }
                
            }
        } else {
            setValidated(true);
        }
    };

    return (
        <Container>
            <Row className='justify-content-md-center my-5'>
                <Col md="6">
                    <h2>Login Form</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className='mt-3' controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required />
                            <Form.Control.Feedback type="invalid">
                                Please Enter a Password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className='my-4' type="submit">Login</Button>
                        <Link to="/registration" className='mx-4'>Register</Link>
                    </Form>

                    <Link to="/reset-password">Forgot Password?</Link>
                </Col>
            </Row>
            {
                error && <Row className='justify-content-md-center'>
                            <Col md={6} className='text-danger'>
                                <pre>{ JSON.stringify(error, null, 2)}</pre>
                            </Col>
                        </Row>
            }
        </Container>

    );
}

export default Login;
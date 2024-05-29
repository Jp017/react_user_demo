import { useState } from 'react';
import { Button, Container, Row, Col, Form, InputGroup, Toast  } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../service';

function Registration() {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        const form = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        setError(null);

        if (form.checkValidity()) {
            setValidated(false);
            const name = form.elements["name"].value;
            const country_code = form.elements["country_code"].value;
            const mobile = form.elements["mobile"].value;
            const email = form.elements["email"].value;
            const password = form.elements["password"].value;
            const formData = {name,country_code,mobile,email,password}

            try {
                const response = await register(formData);
                console.log(response);
                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                    navigate("/login")
                }, 3000);
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
                    <h2>Registration Form</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className='mt-3' controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter a Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="country_code">
                            <Form.Label>Country Code</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                maxLength={2}
                                minLength={2}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Select a Country code.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-3' controlId="mobile">
                            <Form.Label>Mobile</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="number"
                                    maxLength={10}
                                    minLength={10}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter a mobile number.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

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
                        <Button className='my-4' type="submit">Register</Button>
                        <Link to="/login" className='mx-4'>Login</Link>
                    </Form>
                </Col>
            </Row>

            
            {
                error && <Row className='justify-content-md-center'>
                    <Col md={6} className='text-danger'>
                        <pre>{ JSON.stringify(error, null, 2)}</pre>
                    </Col>
            </Row>
                    
            }
            
            {
                showToast && <Toast className='toast' show={true} delay={3000} autohide>
                    <Toast.Body className='text-success'>Woohoo, registered successfully!</Toast.Body>
              </Toast>
            }
                
                
          

        </Container>

    );
}

export default Registration;
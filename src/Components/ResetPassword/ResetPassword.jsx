import { useState } from 'react';
import { Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { generateOtp, resetPassword, verifyResetPasswordOtp } from '../../service';

function ResetPassword() {
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const [passowrd, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [resetPasswordStep, setResetPasswordStep] = useState(1);

    const onHandleSubmit = async (event) => {
        const form = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        setError(null);

        if (form.checkValidity()) {
            setValidated(false);
            setIsLoading(true);
            try {
                if (resetPasswordStep === 1) {
                    await generateOtp(userEmail);
                    setResetPasswordStep(2);
                } else if (resetPasswordStep === 2) {
                    const { data } = await verifyResetPasswordOtp({ email: userEmail, otp });
                    console.log(data);
                    setToken(data.data.token);
                    setResetPasswordStep(3);
                } else if (resetPasswordStep === 3) {
                    const { data } = await resetPassword({ email: userEmail, token, passowrd, password_confirmation: confirmPassword });
                    console.log(data);
                    navigator("/login");
                }
            } catch (error) {
                if (error.response?.data) {
                    setError(error.response.data.error)
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setValidated(true);
        }
    };

    return (
        <Container>
            <Row className='justify-content-md-center my-5'>
                <Col md="6">
                    <h2>Reset Password</h2>
                    {
                        resetPasswordStep === 1 && <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
                            <Form.Group className='mt-3' >
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" value={userEmail} required onChange={event => {
                                    setUserEmail(event.target.value)
                                }} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button className='my-4' type="submit" disabled={isLoading}>Generate OTP
                                {isLoading && <Spinner size='sm' />}
                            </Button>
                            <Link className='mx-4' to="/login">Login</Link>
                        </Form>
                    }

                    {
                        resetPasswordStep === 2 && <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
                            <Form.Group className='mt-3' >
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control type="text" value={otp} required onChange={event => {
                                    setOtp(event.target.value)
                                }} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid OTP.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button className='my-4' type="submit" disabled={isLoading}>Verify OTP
                                {isLoading && <Spinner size='sm' />}
                            </Button>
                            <Button className='m-4' onClick={() => {
                                setResetPasswordStep(1)
                            }}>Back
                            </Button>
                        </Form>
                    }

                    {
                        resetPasswordStep === 3 && <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
                            <Form.Group className='mt-3' >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={passowrd} required onChange={event => {
                                    setPassword(event.target.value)
                                }} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mt-3' >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" value={confirmPassword} required onChange={event => {
                                    setConfirmPassword(event.target.value)
                                }} />

                                {
                                    passowrd && confirmPassword && passowrd !== confirmPassword && <p className='text-danger' type="invalid">
                                        Password not matched
                                    </p>
                                }
                                <Form.Control.Feedback type="invalid">
                                    Please provide a confirm password.
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Button className='my-4' type="submit" disabled={isLoading || (!passowrd || !confirmPassword || passowrd !== confirmPassword)}>Submit
                                {isLoading && <Spinner size='sm' />}
                            </Button>
                            <Button className='m-4' onClick={() => {
                                setResetPasswordStep(2)
                            }}>Back
                            </Button>
                        </Form>
                    }

                </Col>
            </Row>
            {
                error && <Row className='justify-content-md-center'>
                    <Col md={6} className='text-danger'>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </Col>
                </Row>
            }
        </Container>

    );
}

export default ResetPassword;
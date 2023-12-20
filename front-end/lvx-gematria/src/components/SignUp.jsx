import { API } from '../utilities/API';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function SignUp({ onSignupSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // To store and display any error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const response = await API.post('users/signup/', { email, password });
            if (response.status === 201) {
                console.log("Sign up successful");
                onSignupSuccess();
                setEmail('');
                setPassword('');
            } else {
                // Handle non-successful responses, if any
                console.log("Sign up not successful:");
                setError('Sign up not successful. Please try again.');
            }
        } catch (err) {
            console.error('Error during signup:', err);
            setError('An error occurred during signup. Please try again.');
        }
    };
return (
        <Form onSubmit={handleSubmit}>
	 {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default SignUp;

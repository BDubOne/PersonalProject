import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { API } from '../utilities/API';

function LogIn({ setUser }) {  // Assuming setUser is passed as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('users/login/', { email, password });
            if (response.data.token) {
                setUser(response.data.user); // Update user state
                localStorage.setItem('userToken', response.data.token);
                API.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
                setUser(response.data)
                console.log(response.data)
                console.log(response.data.token)
                navigate("/");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("Login error. Please try again.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h4>Log In</h4>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                />
            </Form.Group>
            <Button type="submit">Log In</Button>
        </Form>
    );
}

export default LogIn;

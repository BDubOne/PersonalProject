import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { API } from './utilities/API';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Utility function to get a cookie value by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Function to get user info
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await API.post('users/login/', { email, password }, {
            withCredentials: true
        });

        if (response.data.student) {
            setUser({ email: response.data.student.email }); // Update the user state with the email
            navigate("/");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error('Login error:', error);
        alert("Login error. Please try again.");
    }
};

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div id="wrapper">
      <NavBar user={user} setUser={setUser} />
      <Container id="welcome">
        <h3>Welcome {user ? user.email : 'Guest'}</h3>
        <Outlet context={{ user, setUser }} />
      </Container>
    </div>
  );
}

export default App;


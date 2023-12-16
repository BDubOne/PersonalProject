import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

import './App.css'

import { API } from './utilities/API'

import Container from 'react-bootstrap/Container';


function App() {
  const [user, setUser] = useState(null);

  const getInfo = async () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        const response = await API.get("users/info/"); // Update with the correct endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Optionally handle error (e.g., invalid token)
      }
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


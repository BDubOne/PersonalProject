import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

import './App.css'

import { API } from './utilities/API'


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
    <>
      <NavBar user={user} setUser={setUser} />
      <h3>Welcome {user ? user.email : 'Guest'}</h3> {/* Assuming 'user' has an 'email' field */}
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;


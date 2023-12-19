import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './components/NavBar'
import { API } from './utilities/API'
import { PersonalDictionaryProvider } from './components/PersonalDictionaryContext'
import { PersonalDetailsProvider } from './components/PersonalDetailsContext'
import TutorialModal from './components/TutorialModal';

import './App.css'
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
    <div>
    <NavBar user={user} setUser={setUser} />
    <Container id="welcome">
      <h3>Welcome {user ? user.email : 'Guest'}</h3>
      <TutorialModal />
    </Container>
    <PersonalDetailsProvider>
      <PersonalDictionaryProvider>
        <Outlet context={{ user, setUser }} />
      </PersonalDictionaryProvider>
    </PersonalDetailsProvider>
  </div>
);
}

export default App;


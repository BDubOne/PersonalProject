
import { Link } from "react-router-dom"
import { API } from '../utilities/API'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

function NavBar({ user, setUser }) {
    const navigate = useNavigate()
    const logOut= async () => {
        try{
            await API.post('users/logout/');        
            setUser(null);
            navigate('/');    
        } catch (error) {
            console.error("error logging out", error);
        }
    };
    
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>LVX-Gematria</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
                {user ? (
                    <>
                
                        <Link to="global-dictionary/">Global Dictionary</Link>
                        <Link to="personal-dictionary/">Personal Dictionary</Link>
                        <Link to="lvx-calculator/">LVX Calculator</Link>
                        <Link to="about/">About</Link>
                        <Button onClick = {logOut} variant="danger">
                            Log Out
                        </Button>
                    </>
                ) : (
                    <Link to={"register/"}>Log in / Sign up</Link>
            
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
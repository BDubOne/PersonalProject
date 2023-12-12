
import { Link } from "react-router-dom"
import { API } from '../utilities/API'
import { useNavigate } from 'react-router-dom'

import SearchComponent from './SearchComponent'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

function NavBar({ user, setUser }) {
    const navigate = useNavigate()
    const logOut= () => {
        localStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
        setUser(null);
        navigate('/');
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
                        <Nav.Link><Link to="global-dictionary/">Global Dictionary</Link></Nav.Link>
                        <Nav.Link><Link to="personal-dictionary/">Personal Dictionary</Link></Nav.Link>
                        <Nav.Link><Link to="lvx-calculator/">LVX Calculator</Link></Nav.Link>                       
                        
                        <Button onClick = {logOut} variant="danger">
                            Log Out
                        </Button>
                    </>
                ) : (
                    <Link to={"register/"}>Log in / Sign up</Link>
            
            )}
          </Nav>
          <SearchComponent />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
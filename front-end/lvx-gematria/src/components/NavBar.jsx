import { Link, useNavigate } from "react-router-dom";
import { API } from '../utilities/API';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink'; // Import NavLink

function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
        setUser(null);
        navigate('/');
    };
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container >
                <Navbar.Brand>LVX-Gematria</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink as={Link} to="/" className="mx-2">Home</NavLink>
                        {user ? (
                            <>
                                <NavLink as={Link} to="/global-dictionary/" className="mx-2">Global Dictionary</NavLink>
                                <NavLink as={Link} to="/personal-dictionary/" className="mx-2">Personal Dictionary</NavLink>
                                <NavLink as={Link} to="/lvx-calculator/" className="mx-2">LVX Calculator</NavLink>
                                <Button onClick={logOut} variant="danger" className="mx-2">
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <NavLink as={Link} to="/register/" className="mx-2">Log in / Sign up</NavLink>
                        )}
                    </Nav>
                    {/* <SearchComponent /> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
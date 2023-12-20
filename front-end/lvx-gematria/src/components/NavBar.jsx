import { Link, useNavigate } from "react-router-dom";
import { API } from '../utilities/API';
import TutorialModal from './TutorialModal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

function NavBar({ user, setUser }) {
    const navigate = useNavigate();

   const logOut = async () => {
        try {
            // Make a request to the back-end to log out
            await API.post('users/logout/');
            
            // Clear user state
            setUser(null);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
	}
    };


    return (
        <Navbar style={{paddingBottom: "2%", padding: "2%"}}expand="lg" className="bg-body-tertiary">
            <Container >
                <Navbar.Brand>LVX-Gematria</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className="me-auto">
                        <NavLink as={Link} to="/" className="mx-2">Home</NavLink>
                        {user ? (
                            <>
                                <NavLink as={Link} to="/global-dictionary/" className="mx-2">Global Dictionary</NavLink>
                                <NavLink as={Link} to="/personal-dictionary/" className="mx-2">Personal Dictionary</NavLink>
                                <NavLink as={Link} to="/lvx-calculator/" className="mx-2">LVX Calculator</NavLink>
                                <NavLink as={Link} to="/about/" className="mx-2">About</NavLink>
                               
                            </>
                        ) : (
			<>
                            <NavLink as={Link} to="/register/" className="mx-2">Log in / Sign up</NavLink>
			    <NavLink as={Link} to="/about/" className="mx-2">About</NavLink>
			</>
                        )}
                    </Nav>
                    
                </Navbar.Collapse>
	    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: "2%" }}>
    		<div style={{ display: 'flex', alignItems: 'center' }}> {/* Row for buttons */}
        		<TutorialModal />
        		{user && (
            			<Button onClick={logOut} variant="danger" className="mx-2">
                			Log Out
            			</Button>
        		)}
    		</div>
    		<div style={{ marginTop: '0.5rem' }}> {/* Separate container for the welcome message */}
        		<span>Welcome, {user ? user.email : 'Guest'}</span>
    		</div>
	</div>
	  </Container>
	    
        </Navbar>
    );
}

export default NavBar;

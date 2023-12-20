import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TutorialModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show Tutorial
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" style={{ overflowY: 'auto' }}>
        <Modal.Header closeButton>
          <Modal.Title>Website Tutorial & Upcoming Features</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>How to Use LVX Gematria</h5>
	  <strong>Submit a valid email and password to utilize this site</strong>
	  <ul>
	  <li>We will never sell or misuse your data</li>
	  </ul>
          <strong>Global Dictionary</strong>
          <ul>
            <li>Browse through the gematria work of Dr. Paul Foster Case.</li>
            <li>Search by number or keyword to see related numbers (more keyword entries coming soon).</li>
            <li>
              Hit the 'Details' button for any entry to navigate to the LVX Calculator page and see additional details. 
              To explore more details about the number 0, perform a number search from the calculator page where it says "Enter a number."
            </li>                           
          </ul>
          <strong>LVX Calculator</strong>
          <ul>
            <li>The LVX Calculator is the heart of the website.</li>
            <li>Translate a word from any language into English, Hebrew, Greek, Latin, or Spanish.</li>
            <li>Search for definitions, synonyms, and antonyms of any English word.</li>
            <li>Find trivia and math facts related to most integers.</li>
            <li>Explore Dr. Paul Foster Case's work related to number searches.</li>
            <li>
              View your own personal entries. If you search for a number that you haven't worked with yet, 
              you will have the opportunity to create an entry for that number.
            </li>
          </ul>
          <strong>Personal Dictionary</strong>
          <ul>
            <li>Build your own personal dictionary of number relationships.</li>
            <li>
              Use the description field to enter insights related to a particular number or word valued at that number.
            </li>
            <li>
              Use the keyword field to relate specific words to a number, building your mental map with specific words 
              (possibly ones for which you have calculated the Latin, Greek, or Hebrew gematria value).
            </li>
            <li>
              Use the related-number field to connect numbers together.
              <strong> Games for number connections and word correspondences coming soon!</strong>
            </li>
          </ul>
          
          <h5>Upcoming Features</h5>
          <ul>
            <li>The ability to create a profile and share your discoveries with others!</li>
            <li>
              An interactive game for learning numerical correspondences for the Hebrew, Latin, and Greek alphabets.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TutorialModal;

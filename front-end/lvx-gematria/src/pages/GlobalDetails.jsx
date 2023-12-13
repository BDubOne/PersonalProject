import React, { useState, useEffect } from 'react';
import { API } from '../utilities/API';
import { useParams, useNavigate } from 'react-router-dom'
import { handleAddOrUpdateEntry } from '../utilities/handleAddOrUpdateEntry';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function GlobalDetails( {number }) {
 
  const [entry, setEntry] = useState(null);
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const navigate = useNavigate()
  // const {number} = useParams()
  
  useEffect(() => {
    if (number) {
      const fetchEntry = async () => {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await API.get(`/dictionary/${number}`);
        setEntry(response.data);
      };

      fetchEntry();
    }
  }, [number]);

  const handleAddDescriptionToPersonal = async (description) => {
    const token = localStorage.getItem("userToken");
    const selectedItems = {
      descriptions: [description], // Add the selected description
      keyWords: [] // Assuming no keywords are selected in this context
    };
    await handleAddOrUpdateEntry(number, selectedItems, token);
  };



  const renderDescriptions = () => {
    return entry.description.slice(descriptionIndex, descriptionIndex + 5).map((desc, idx) => (
      <p key={idx}>
        {desc}
      </p>
    ));
  };

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{maxWidth: '35vw', flex: 1 }}>
    <Container>  
    <Card>
      <Card.Body>
        <Card.Title>Number {entry.number}</Card.Title>
        <Card.Text>
          <div>Descriptions:</div>
          {renderDescriptions()}
          <div> Key Words:<br/>{entry.key_words}</div>
        </Card.Text>
        <Button disabled={descriptionIndex <= 0} onClick={() => setDescriptionIndex(i => i - 5)}>Previous</Button>
        <Button disabled={descriptionIndex + 5 >= entry.description.length} onClick={() => setDescriptionIndex(i => i + 5)}>Next</Button>
        <div style={{ maxHeight: '75px', overflowY: 'auto' }}>  {/* Scrollable list */}
            <ListGroup>
              Related Entries: 
              {entry.related_entries_display.map((relEntry, idx) => (
                <ListGroup.Item key={idx} action onClick={() => navigate(`global-dictionary/${relEntry}`)}>
                  Number {relEntry}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
      </Card.Body>
    </Card>    
    </Container>
    </div>
  );
}

export default GlobalDetails;

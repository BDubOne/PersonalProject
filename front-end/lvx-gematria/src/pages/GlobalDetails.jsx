import React, { useState, useEffect } from 'react';
import { API } from '../utilities/API';
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function GlobalDetails({number, onRelatedEntrySelect }) {
  const [entry, setEntry] = useState(null);
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  // const location = useLocation();
  // const number = location.state?.selectedNumber
  
      const fetchEntry = async () => {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await API.get(`/dictionary/${number}`);
        setEntry(response.data);
      };
      useEffect(() => {
        if (number !== null && number !== undefined) {
      fetchEntry();
    }
  }, [number]);

  const handleRelatedEntryClick = (relatedNumber) => {
    if (typeof onRelatedEntrySelect === 'function') {
      onRelatedEntrySelect(relatedNumber);
    }
  };

  const renderDescriptions = () => {
    return entry.description.slice(descriptionIndex, descriptionIndex + 5).map((desc, idx) => (
      <ListGroup.Item 
      style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }} 
      key={idx}>{desc}</ListGroup.Item>
    ));
  };

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="global-details" style={{ paddingRight: "5%", width: '40vw', flex: 1 }}>
      <Container>
        <Card style={{ minHeight: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)" }}>
          <Card.Body>
            <Card.Title>Number {entry.number}</Card.Title>
            <strong>Description:</strong>
            <ListGroup>{renderDescriptions()}</ListGroup>
            
            <Button disabled={descriptionIndex <= 0} onClick={() => setDescriptionIndex(i => i - 5)}>Previous</Button>
            <Button disabled={descriptionIndex + 5 >= entry.description.length} onClick={() => setDescriptionIndex(i => i + 5)}>Next</Button>

            <div style={{ maxHeight: '100px', overflowY: 'auto'}}>
              <strong>Key Words:</strong>
              <ListGroup>
                {entry.key_words.map((keyWord, idx) => (
                  <ListGroup.Item
                  style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }}
                  key={idx}>{keyWord}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div style={{ maxHeight: '75px', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.1)" }}>
              <strong>Related Numbers:</strong>
              <ListGroup>
                {entry.related_entries_display.map((relEntry, idx) => (
                  <ListGroup.Item 
                    style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }}
                    key={idx}
                    action
                    onClick={() => handleRelatedEntryClick(relEntry)}
                  >
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

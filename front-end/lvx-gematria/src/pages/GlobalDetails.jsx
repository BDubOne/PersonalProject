import React, { useState, useEffect } from 'react';
import { API } from '../utilities/API';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function GlobalDetails({ number, onRelatedEntrySelect }) {
  const [entry, setEntry] = useState(null);
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  useEffect(() => {
    if (number) {
      const fetchEntry = async () => {
        const response = await API.get(`/dictionary/${number}`, {withCredentials: true});
        setEntry(response.data);
      };

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
      <span key={idx}>{desc}</span>
    ));
  };

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div classname="global-details" style={{ paddingRight: "5%", flex: 1 }}>
      <Container>
        <Card id="detail-card" style={{ height: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)" }}>
          <Card.Body>
            <Card.Title>Number {entry.number}</Card.Title>
            <strong>Descriptions:</strong>
            <div>{renderDescriptions()}</div>
            
            <Button disabled={descriptionIndex <= 0} onClick={() => setDescriptionIndex(i => i - 5)}>Previous</Button>
            <Button disabled={descriptionIndex + 5 >= entry.description.length} onClick={() => setDescriptionIndex(i => i + 5)}>Next</Button>

            <div style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.5)" }}>
              <strong>Key Words:</strong>
              <ListGroup>
                {entry.key_words.map((keyWord, idx) => (
                  <ListGroup.Item key={idx}>{keyWord}</ListGroup.Item>
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

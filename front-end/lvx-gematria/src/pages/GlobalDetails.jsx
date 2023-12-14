import React, { useState, useEffect } from 'react';
import { API } from '../utilities/API';
import { handleAddOrUpdateEntry } from '../utilities/handleAddOrUpdateEntry';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function GlobalDetails( {number, onRelatedEntrySelect }) {
 
  const [entry, setEntry] = useState(null);
  const [descriptionIndex, setDescriptionIndex] = useState(0);
 
  
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

  // const handleAddDescriptionToPersonal = async (description) => {
  //   const token = localStorage.getItem("userToken");
  //   const selectedItems = {
  //     descriptions: [description], // Add the selected description
  //     keyWords: [] // Assuming no keywords are selected in this context
  //   };
  //   await handleAddOrUpdateEntry(number, selectedItems, token);
  // };

  const handleRelatedEntryClick = (relatedNumber) => {
    
    if (typeof onRelatedEntrySelect === 'function') {
      onRelatedEntrySelect(relatedNumber);
    }
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
    <div style={{paddingRight: "5%",width: '40vw', flex: 1 }}>
    <Container>  
    <Card style={{height: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)"}}>
      <Card.Body>
        <Card.Title>Number {entry.number}</Card.Title>
        <Card.Text>
          <div>Descriptions:</div>
          {renderDescriptions()}
        </Card.Text>
        <Button disabled={descriptionIndex <= 0} onClick={() => setDescriptionIndex(i => i - 5)}>Previous</Button>
        <Button disabled={descriptionIndex + 5 >= entry.description.length} onClick={() => setDescriptionIndex(i => i + 5)}>Next</Button>       

        <div style={{ maxHeight: '100px', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.5)" }}> 
      <p><strong>Key Words:<br/></strong></p>
      <ListGroup>{entry.key_words.map((keyWord, idx) =>(
        <ListGroup.Item key={idx}>
          {keyWord}
        </ListGroup.Item>
      ))}
      </ListGroup>
      </div>
        <div style={{ maxHeight: '75px', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.1)" }}>
        <p><strong> Related Numbers: </strong></p>
        <ListGroup>       
        {entry.related_entries_display.map((relEntry, idx) => (
          <ListGroup.Item style= {{backgroundColor: "rgba(255, 228, 196, 0.1)"}} key={idx} action onClick={() => handleRelatedEntryClick(relEntry)}>
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

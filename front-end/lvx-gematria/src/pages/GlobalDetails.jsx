import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function GlobalDetails() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  
  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("userToken");
      API.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await API.get(`/dictionary/${number}`);
      setEntry(response.data);
    };

    fetchEntry();
  }, [number]);

  const handleAddToPersonal = async (type, item) => {
    // Logic to add the item to the personal entry
    // Check if a personal entry exists, if not, create one
    // Then add the item (description, keyword, or related entry)
  };

  const renderDescriptions = () => {
    return entry.description.slice(descriptionIndex, descriptionIndex + 5).map((desc, idx) => (
      <p key={idx}>
        {desc}
        <Button onClick={() => handleAddToPersonal('description', desc)}>Add to My Entry</Button>
      </p>
    ));
  };

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Number {entry.number}</Card.Title>
        <Card.Text>
          <div>Descriptions:</div>
          {renderDescriptions()}
        </Card.Text>
        <Button disabled={descriptionIndex <= 0} onClick={() => setDescriptionIndex(i => i - 5)}>Previous</Button>
        <Button disabled={descriptionIndex + 5 >= entry.description.length} onClick={() => setDescriptionIndex(i => i + 5)}>Next</Button>
        <div>Related Entries: {entry.related_entries.map((relEntry, idx) => (
          <Link key={idx} to={`/global-dictionary/${relEntry}`}>{relEntry}</Link>
        ))}</div>
        {/* Similar functionality for keywords */}
      </Card.Body>
    </Card>
  );
}

export default GlobalDetails;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function DetailedCard({ number, descriptions, relatedEntries, keyWords, addDescriptionToPersonal }) {
  const [descIndex, setDescIndex] = useState(0);

  const handleNext = () => {
    // Update logic for 'next' button
    setDescIndex(prev => prev + 5);
  };

  const handlePrevious = () => {
    // Update logic for 'previous' button
    setDescIndex(prev => prev - 5);
  };

  const handleAddDescription = (description) => {
    addDescriptionToPersonal(number, description);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Number {number}</Card.Title>
        <Card.Text>
          Descriptions:
          {descriptions.slice(descIndex, descIndex + 5).map((desc, index) => (
            <p key={index}>
              {desc}
              <Button onClick={() => handleAddDescription(desc)}>Add to Personal Dictionary</Button>
            </p>
          ))}
        </Card.Text>
        <Button onClick={handlePrevious} disabled={descIndex === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={descIndex + 5 >= descriptions.length}>Next</Button>
        <div>
          Related Entries: {relatedEntries.map((relEntry, index) => (
            <Link key={index} to={`/dictionary/${relEntry}`}>{relEntry}</Link>
          ))}
        </div>
        {/* Key Words and other functionalities */}
      </Card.Body>
    </Card>
  );
}

export default DetailedCard;
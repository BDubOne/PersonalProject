import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NumberCard({ number, descriptionItem, keyWords }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    const path = '/lvx-calculator/'
   
    navigate(path, {state: {selectedNumber: number} });
  };

  // Handle the case where keyWords array is empty or undefined
  const displayKeywords = keyWords && keyWords.length > 0 ? keyWords.join(', ') : 'No keywords';

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Number {number}</Card.Title>
        <Card.Text>
          {descriptionItem}
          <br />
          Keywords: {displayKeywords}
        </Card.Text>
        <Button variant="primary" onClick={navigateToDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NumberCard;

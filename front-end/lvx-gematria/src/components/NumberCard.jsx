import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NumberCard({ number, descriptionItem, keyWords }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    const path = '/lvx-calculator/';
    // Explicitly check if number is not null or undefined
    if (number !== null && number !== undefined) {
        navigate(path, { state: { selectedNumber: number } });
    } else {
        console.error("Invalid number for navigation:");
    }
};


const keywordsArray = Array.isArray(keyWords) ? keyWords : [];

// Join keywords with a comma and space
const displayKeywords = keywordsArray.join(", ");

  return (
    <Card style={{ border: '1px black solid',width: '15rem', height: '15rem', padding: '2%', margin:"3%", backgroundColor: "rgba(255, 228, 196, 0.5)" }}>
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

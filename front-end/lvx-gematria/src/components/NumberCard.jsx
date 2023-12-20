import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function NumberCard({ number, descriptionItem, keyWords }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    const path = '/lvx-calculator/';

    if (number !== null && number !== undefined){
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
      <Card.Body style={{ padding: '2%', height: 'calc(100% - 2rem)' }} >
        <Card.Title>Number {number}</Card.Title>
        <Card.Text>
          {descriptionItem}
          <br />
          Keywords: {displayKeywords}
        </Card.Text>
      <div style={{ position: 'absolute', bottom: '2%', right: '2%' }}> {/* Positioning the button */}
        <Button variant="primary" onClick={navigateToDetails}>
          View Details
        </Button>
      </div>
      </Card.Body>
    </Card>
  );
}

export default NumberCard;

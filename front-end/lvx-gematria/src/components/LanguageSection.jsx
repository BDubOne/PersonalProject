import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LanguageSection = ({ languageName, characters, onCharacterClick }) => {
    return (
      <Card style={{height: "32.5rem",backgroundColor: "rgba(255, 228, 196, 0.5)"}}>
        <Card.Header style = {{backgroundColor: "rgba(255, 228, 196, 0.1)"}}>{languageName}</Card.Header>
        <Card.Body style = {{backgroundColor: "rgba(255, 228, 196, 0.1)"}}>
          {Object.keys(characters).map((char, index) => (
            <Button key={index} variant="outline-primary" onClick={() => onCharacterClick(char)} className="m-1">
              {char}
            </Button>
          ))}
        </Card.Body>
      </Card>
    );
  };

import React, { useState } from 'react';
import { characterValues } from '../utilities/characterValues'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import GlobalDetails from './GlobalDetails'
import PersonalDetails from './PersonalDetails'
import TranslateComponent from '../components/TranslateComponent';
import DictionarySearch from '../components/DictionarySearch';



const LanguageSection = ({ languageName, characters, onCharacterClick }) => {
  return (
    <Card>
      <Card.Header>{languageName}</Card.Header>
      <Card.Body>
        {Object.keys(characters).map((char, index) => (
          <Button key={index} variant="outline-primary" onClick={() => onCharacterClick(char)} className="m-1">
            {char}
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
};


const CalculatorPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [sum, setSum] = useState(0);
  const[selectedNumber, setSelectedNumber] = useState(null)

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleCharacterClick = (char) => {
    setInputValue(prev => prev + char);
    calculateAndUpdateSum(inputValue + char);
  };

  const calculateSum = (inputString) => {
    let sum = 0;
    const normalizedInput = inputString.toLowerCase();
  
    for (let i = 0; i < normalizedInput.length; i++) {
      const character = normalizedInput[i];
      if (characterValues.hasOwnProperty(character)) {
        sum += characterValues[character];
      }
    }
  
    return sum;
  };

  const calculateAndUpdateSum = (input) => {
    const newSum = calculateSum(input);
    setSum(newSum);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    calculateAndUpdateSum(e.target.value);
  };

  const latinCharacters = Object.fromEntries(
    Object.entries(characterValues).filter(([key]) => /^[a-z]$/i.test(key))
  );
  const hebrewCharacters = Object.fromEntries(
    Object.entries(characterValues).filter(([key]) => /^[\u0590-\u05FF]$/.test(key))
  );
  const greekCharacters = Object.fromEntries(
    Object.entries(characterValues).filter(([key]) => /^[\u0370-\u03FF]$/.test(key))
  );

  return (
    <Container>
      <TranslateComponent />  
      <div >
      {selectedNumber && !isNaN(selectedNumber) && (
            <GlobalDetails number={selectedNumber} />
          )}
      </div>
              
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="my-3">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type or click buttons..."
                  />
                </Form.Group>
              </Form>
              <h5>Sum: {sum}</h5>
            </Card.Body>
          </Card>

          <Row>
            <Col md={4}>
              <LanguageSection languageName="Latin" characters={latinCharacters} onCharacterClick={handleCharacterClick} />
            </Col>
            <Col md={4}>
              <LanguageSection languageName="Hebrew" characters={hebrewCharacters} onCharacterClick={handleCharacterClick} />
            </Col>
            <Col md={4}>
              <LanguageSection languageName="Greek" characters={greekCharacters} onCharacterClick={handleCharacterClick} />
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <DictionarySearch 
          classname="scrollable-container"
          onSelectedNumberChange={handleNumberSelect} />
        </Col>
      </Row>
    </Container>
  );
};

export default CalculatorPage;
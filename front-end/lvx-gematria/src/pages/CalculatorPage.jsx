import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom'
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

import { LanguageSection } from '../components/LanguageSection'


const CalculatorPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [sum, setSum] = useState(0);
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false)
  const[selectedNumber, setSelectedNumber] = useState(null)
  const location = useLocation();

  // const reFetchPersonalEntry = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("userToken");
  //     API.defaults.headers.common["Authorization"] = `Token ${token}`;
  //     const response = await API.get(`/dictionary/personal/${number}`);
  //     setEntry(response.data);
  //   } catch (error) {
  //     console.error('Error fetching entry:', error);
  //     // Handle error appropriately
  //   }
  //   setLoading(false);
  // };

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleRelatedEntrySelect = (newNumber) => {
    setSelectedNumber(newNumber);
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

  useEffect(() => {
    if (location.state && location.state.selectedNumber) {
      setSelectedNumber(location.state.selectedNumber);
    }
  }, [location]);

  return (
    <Container>
      <TranslateComponent />  
      <div  id="gematria-details">
      {selectedNumber && !isNaN(selectedNumber) && (
            <GlobalDetails number={selectedNumber} onRelatedEntrySelect={handleRelatedEntrySelect} />
          )}
      {selectedNumber && !isNaN(selectedNumber) && (
            <PersonalDetails number={selectedNumber} onRelatedEntrySelect={handleRelatedEntrySelect} />
          )}
      </div>
      <div style={{marginTop: "5rem"}}>     
      <Row className="justify-content-center">
        <Col style = {{backgroundColor: "rgba(255, 228, 196, 0.5)"}} md={6}>
          <Card style = {{backgroundColor: "rgba(255, 228, 196, 0.5)"}} className="my-3">
            <Card.Body>
              <Form >
                <Form.Group className="mb-3">
                  <Form.Control
                    style = {{backgroundColor: "rgba(255, 228, 196, 0.5)"}}
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

          <Row >
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
          style = {{backgroundColor: "rgba(255, 228, 196, 0.5)"}}
          classname="scrollable-container"
          onSelectedNumberChange={handleNumberSelect} />
        </Col>
      </Row>
      </div> 
    </Container>
  );
};

export default CalculatorPage;
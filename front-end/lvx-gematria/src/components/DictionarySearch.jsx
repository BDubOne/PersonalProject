
import { useState } from 'react';
import { API } from '../utilities/API';


import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


function DictionarySearch({ onSelectedNumberChange }) {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState('');
  const [dictionaryData, setDictionaryData] = useState(null);
  const [mathData, setMathData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [dateData, setDateData] = useState([]);

  

  const fetchWordData = async () => {
    if (word) {
      try {
        const response = await API.get(`words/${word}`);
        if (response.data && response.status === 200) {
          setDictionaryData(response.data);
        } else {
          console.error('Failed to fetch word data');
        }
      } catch (error) {
        console.error('Error fetching word data:', error);
      }
    }
  };

  const fetchNumberFacts = async () => {
    if (number) {
      try {
        const mathResponse = await API.get(`numbers/${number}/math`);
        const triviaResponse = await API.get(`numbers/${number}/trivia`);
        const dateResponse = await API.get(`numbers/${number}/date`);

        setMathData(mathResponse.data.data);
        setTriviaData(triviaResponse.data.data);
        setDateData(dateResponse.data.data);
        onSelectedNumberChange(number);
        
      
      } catch (error) {
        console.error('Error fetching number facts:', error);
      }
    }  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchWordData();
    await fetchNumberFacts();
    
    
  };
  
    


  const renderMeanings = () => {
    return dictionaryData.meanings.map((meaning, idx) => (
      <ListGroup className="dictsearch" key={idx}>
        <strong>Part of Speech: {meaning.partOfSpeech}</strong>
        <strong>Definitions:</strong>
        {meaning.definitions.map((def, index) => (            
            <ListGroup.Item className="dictsearch" key={`${idx}-${index}`}>
  
              {def.definition}
            </ListGroup.Item>
        ))}
        <strong>Synonyms:</strong>
        {meaning.synonyms.map((synonym, synIdx) => (
          <ListGroup.Item className="dictsearch" key={synIdx}>
            {synonym}
          </ListGroup.Item>
        ))}
        <strong>Antonyms:</strong>
        {meaning.antonyms.map((antonym, antIdx) => (
          <ListGroup.Item className="dictsearch" key={antIdx}>
            Antonym: {antonym}
          </ListGroup.Item>
        ))}
      </ListGroup>
    ));
  };

  const renderNumberData = (data, dataType) => {
    if (data.length === 0) {
      return null;
    }
  
    return (
      <ListGroup className="dictsearch">
        <strong>{dataType}:</strong>
        {data.map((item, idx) => (
          <ListGroup.Item className="dictsearch" key={idx}>
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  

  return (
    <Container className="dictsearch">
      <Form className="dictsearch" onSubmit={handleSubmit} id='wordsearch-form'>
        <InputGroup className="mb-3">
          <FormControl
            className="dictsearch"
            placeholder="Enter a word"
            aria-label="Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <FormControl
          className="dictsearch"
            placeholder="Enter a number"
            aria-label="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button className="dictsearch" variant="primary" type="submit">Search</Button>
        </InputGroup>
      </Form>
      <div className="scrollable-container">
      {dictionaryData && (
        <Card className="dictsearch">
          <Card.Body>
            <Card.Title>Word: {dictionaryData.word}</Card.Title>
            <Card.Text>Phonetic: {dictionaryData.phonetic}</Card.Text>
            <ListGroup variant="flush">
              {renderMeanings()}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {(mathData.length > 0 || triviaData.length > 0 || dateData.length > 0) && (
        <Card className="dictsearch">
          <Card.Body>
            <Card.Title>Number Data</Card.Title>
          <ListGroup variant="flush">
            {renderNumberData(mathData, 'Math Fact')}
            {renderNumberData(triviaData, 'Trivia')}
            {renderNumberData(dateData, 'Date Fact')}
          </ListGroup>
        </Card.Body>
      </Card>
    )}
    </div>
    </Container>

  );
}

export default DictionarySearch;

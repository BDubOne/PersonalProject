
import { useState } from 'react';
import { API } from '../utilities/API';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Checkbox from 'react-bootstrap/FormCheck';

function DictionarySearch() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState('');
  const [dictionaryData, setDictionaryData] = useState(null);
  const [mathData, setMathData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({ descriptions: [], keyWords: []});
  

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
  
    

const handleCheckboxChange = (type, item, isChecked) => {
  setSelectedItems(prev => {
    const updatedItems = isChecked 
      ? [...prev[type], item] 
      : prev[type].filter(i => i !== item);

    return { ...prev, [type]: updatedItems };
  });
};


  const renderMeanings = () => {
    return dictionaryData.meanings.map((meaning, idx) => (
      <ListGroup.Item key={idx}>
        <div>Part of Speech: {meaning.partOfSpeech}</div>
        {meaning.definitions.map((def, index) => (
            <div key={`${idx}-${index}`}>
                <Checkbox
                    checked={selectedItems.descriptions.includes(def.definition)}
                    onChange={(e) => handleCheckboxChange('definitions', def.definition, e.target.checked)}
                />
                Definition: {def.definition}
            </div>
        ))}
        {meaning.synonyms.map((synonym, synIdx) => (
          <div key={synIdx}>
            <Checkbox
              checked={selectedItems.keyWords.includes(synonym)}
              onChange={(e) => handleCheckboxChange('keyWords', synonym, e.target.checked)}
            />
            Synonym: {synonym}
          </div>
        ))}
        {meaning.antonyms.map((antonym, antIdx) => (
          <div key={antIdx}>
            <Checkbox
              checked={selectedItems.keyWords.includes(antonym)}
              onChange={(e) => handleCheckboxChange('keyWords', antonym, e.target.checked)}
            />
            Antonym: {antonym}
          </div>
        ))}
      </ListGroup.Item>
    ));
  };

  const renderNumberData = (data, dataType) => {
    return data.map((item, idx) => (
      <ListGroup.Item key={idx}>
        <Checkbox
          checked={selectedItems.descriptions.includes(item)}
          onChange={(e) => handleCheckboxChange('descriptions', item, e.target.checked)}
        />
        {dataType}: {item}
      </ListGroup.Item>
    ));
  };


  

  return (
    <Container >
      <Form onSubmit={handleSubmit} id='wordsearch-form'>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter a word"
            aria-label="Word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <FormControl
            placeholder="Enter a number"
            aria-label="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button variant="primary" type="submit">Search</Button>
        </InputGroup>
      </Form>
      <div className="scrollable-container">
      {dictionaryData && (
        <Card>
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
        <Card>
          <Card.Body>
            <Card.Title>Number Data</Card.Title>
          <ListGroup variant="flush">
            {renderNumberData(mathData, 'Math Fact')}
            {renderNumberData(triviaData, 'Trivia')}
            {renderNumberData(dateData, 'Date Fact')}
          </ListGroup>
          <Button>Add/Update My Entry</Button>
        </Card.Body>
      </Card>
    )}
    </div>
    </Container>

  );
}

export default DictionarySearch;
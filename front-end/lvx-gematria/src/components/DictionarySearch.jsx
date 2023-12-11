import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Checkbox from 'react-bootstrap/FormCheck'





function DictionarySearch() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState('');
  const [dictionaryData, setDictionaryData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({ descriptions: [], synonyms: [], antonyms: [] });
  const navigate = useNavigate();

  const fetchWordData = async () => {
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
  };
  
    
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchWordData();

    // Reset selected items on new search
    setSelectedItems({ descriptions: [], synonyms: [], antonyms: [] });
  };

  const handleCheckboxChange = (type, item, isChecked) => {
    setSelectedItems(prev => {
      const updatedItems = isChecked ? [...prev[type], item] : prev[type].filter(i => i !== item);
      return { ...prev, [type]: updatedItems };
    });
  };

  const handleAddOrUpdateEntry = async () => {
    // Check if the user has an entry with the given number
    // If yes, call UpdatePersonalEntry
    // If no, call AddPersonalEntry
    // Pass selectedItems.descriptions and selectedItems.synonyms/antonyms as needed
  };

  const renderMeanings = () => {
    return dictionaryData.meanings.map((meaning, idx) => (
      <ListGroup.Item key={idx}>
        <div>Part of Speech: {meaning.partOfSpeech}</div>
        {meaning.definitions.map((def, index) => (
          <div key={index}>
            <Checkbox
              checked={selectedItems.descriptions.includes(def.definition)}
              onChange={(e) => handleCheckboxChange('descriptions', def.definition, e.target.checked)}
            />
            Definition: {def.definition}
            {/* {def.examples?.examples.map((example, exIdx) => <p key={exIdx}>{example}</p>)} */}
          </div>
        ))}
        {meaning.synonyms.map((synonym, synIdx) => (
          <div key={synIdx}>
            <Checkbox
              checked={selectedItems.synonyms.includes(synonym)}
              onChange={(e) => handleCheckboxChange('synonyms', synonym, e.target.checked)}
            />
            Synonym: {synonym}
          </div>
        ))}
        {meaning.antonyms.map((antonym, antIdx) => (
          <div key={antIdx}>
            <Checkbox
              checked={selectedItems.antonyms.includes(antonym)}
              onChange={(e) => handleCheckboxChange('antonyms', antonym, e.target.checked)}
            />
            Antonym: {antonym}
          </div>
        ))}
      </ListGroup.Item>
    ));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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

      {dictionaryData && (
        <Card>
          <Card.Body>
            <Card.Title>Word: {dictionaryData.word}</Card.Title>
            <Card.Text>Phonetic: {dictionaryData.phonetic}</Card.Text>
            <ListGroup variant="flush">
              {renderMeanings()}
            </ListGroup>
            <Button onClick={handleAddOrUpdateEntry}>Add/Update My Entry</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default DictionarySearch;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../utilities/API';

import NumberCard from '../components/NumberCard';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function DictionaryQuery() {
    const [query, setQuery] = useState('');
    const [globalResults, setGlobalResults] = useState([]);
    const [personalResults, setPersonalResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const queryParam = searchParams.get('query') || '';
      setQuery(queryParam);
      if (queryParam) {
        fetchResults(queryParam);
      }
    }, [location.search]);

    const fetchResults = async (queryParam) => {
        // Initialize variables to hold response data
        let globalData = [];
        let personalData = [];
      
        // Fetching data from global dictionary endpoint
        try {
          const globalResponse = await API.get(`/dictionary/query/${queryParam}/`);
          if (globalResponse.status === 200 && globalResponse.data) {
            globalData = globalResponse.data.results;
          }
        } catch (error) {
          console.error('Error fetching global dictionary data:', error);
        }
      
        // Fetching data from personal dictionary endpoint
        try {
          const personalResponse = await API.get(`/dictionary/personal/query/${queryParam}`);
          if (personalResponse.status === 200 && personalResponse.data) {
            personalData = personalResponse.data.results;
          }
        } catch (error) {
          console.error('Error fetching personal dictionary data:', error);
        }
      
        // Update state based on the fetched data
        setGlobalResults(globalData);
        setPersonalResults(personalData);
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/dictionary-query/${query}/`); 
    fetchResults(query); // Fetch results with the current query
  };

  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value.replace(/\s+/g, ''))}
          />
          <Button variant="primary" type="submit">Search</Button>
        </InputGroup>
      </Form>

      <Row>
        <Col>
          <h2>Global Dictionary Results</h2>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            {globalResults.map(entry => (
              <NumberCard
                key={entry.id}
                number={entry.number}
                descriptionItem={entry.description && entry.description.length > 0 ? entry.description[0] : 'No description available.'}
                keyWords={entry.key_words}
                dictionaryType="global"
              />
            ))}
          </div>
        </Col>
        <Col>
          <h2>Personal Dictionary Results</h2>
          <div style={{ overflowX: 'auto', display: 'flex' }}>
            {personalResults.map(entry => (
              <NumberCard
                key={entry.id}
                number={entry.number}
                descriptionItem={entry.personal_description && entry.personal_description.length > 0 ? entry.personal_description[0] : 'No description available.'}
                keyWords={entry.personal_key_words}
                dictionaryType="personal"
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DictionaryQuery;
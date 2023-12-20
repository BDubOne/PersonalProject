import { useState, useEffect } from 'react';

import { API } from '../utilities/API';
import NumberCard from '../components/NumberCard';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function GlobalDictionary() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [globalResults, setGlobalResults] = useState([]);
  const [personalResults, setPersonalResults] = useState([]);  
  const [isSearching, setIsSearching] = useState(false);
  const [currentGlobalQueryPage, setCurrentGlobalQueryPage] = useState(1);
  const [totalGlobalQueryPages, setTotalGlobalQueryPages] = useState(0);

  const [currentPersonalQueryPage, setCurrentPersonalQueryPage] = useState(1);
  const [totalPersonalQueryPages, setTotalPersonalQueryPages] = useState(0);


 
  const fetchEntries = async () => {

    try {
      const response = await API.get('/dictionary/', { params: { page: currentPage } });
      if (response.data && response.data.results) {
          setEntries(response.data.results);
          setTotalPages(response.data.total_pages);
      } else {
          setEntries([]);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      setEntries([]);
  }
};

  useEffect(() => {
    if (!isSearching) {
    fetchEntries();
    }
  }, [currentPage, isSearching]);

  const handleNextPage = () => {
    setCurrentPage(current => current + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(current => current - 1);
  };
 
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
    setIsSearching(true)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchResults(query);
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value.replace(/\s+/g, '');
    setQuery(newQuery);
    if (!newQuery) {
      setIsSearching(false);
    }
  };



  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          />
          <Button variant="primary" type="submit">Search</Button>
        </InputGroup>
      </Form>
      {isSearching ? (
        // Render search results
        <>
          <h2 style={{color: "white"}}>Global Dictionary Results</h2>
          <Row className="query-results">
            
            {globalResults.map(entry => (
            <NumberCard
          key={entry.id}
          number={entry.number}
          descriptionItem={entry.description && entry.description.length > 0 ? entry.description[0] : 'No description available.'}
          relatedWords={entry.key_words}
          dictionaryType="global"
          />
            ))}
          </Row>
          <h2 style={{color: "white"}}>Personal Dictionary Results</h2>
          <Row className="query-results">
            {personalResults.map(entry => (
              <NumberCard
              key={entry.id}
              number={entry.number}
              descriptionItem={entry.description? entry.description[0] : 'No description available.'}
              relatedWords={entry.key_words}
              dictionaryType="personal"
              />
            ))}
          </Row>
        </>
      ) : (
      <>
      <Row className="entry-grid">
      {entries.map((entry, index) => (
        <Col md={3} key={entry.id} className={index >= 20 ? 'd-none' : ''}>
        <NumberCard
          key={entry.id}
          number={entry.number}
          descriptionItem={entry.description && entry.description.length > 0 ? entry.description[0] : 'No description available.'}
          relatedWords={entry.key_words}
          dictionaryType="global"
        />
        </Col>
      ))}
      </Row>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>Previous</Button>
        <span> Page {currentPage} of {totalPages} </span>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</Button>
      </div>
      </>
      )}
    </Container>
  );
}

export default GlobalDictionary;

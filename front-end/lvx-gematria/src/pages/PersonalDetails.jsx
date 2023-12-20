import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { usePersonalDictionary } from '../components/PersonalDictionaryContext';
import { usePersonalDetails } from '../components/PersonalDetailsContext';
import { DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
import AddEntryForm from '../components/AddPersonalEntry';
import UpdateEntryForm from '../components/UpdatePersonalEntry';


function PersonalDetails({ number, onRelatedEntrySelect }) {
  const { entry=null, loading, error, fetchEntry, dispatch } = usePersonalDetails();
  const [ showUpdateForm, setShowUpdateForm] = useState(false)
  const { fetchPersonalEntries, entries, setEntries } = usePersonalDictionary();
  const navigate = useNavigate();

   
   useEffect(() => {
    // Fetch entry details only if a number is provided
    if (number) {
      fetchEntry(number);
    } else {
      // If no number is provided, set the entry state to null
      dispatch({ type: 'FETCH_SUCCESS', payload: null });
    }
  }, [number, fetchEntry]);

  // Handler for updating entries
  const handleUpdateSuccess = (updatedData) => {
    setShowUpdateForm(false);
    dispatch({ type: 'FETCH_SUCCESS', payload: updatedData });
    fetchPersonalEntries();
  };

  // Handler for deleting entries
  const handleDelete = async () => {
    try {
      await DeletePersonalEntry(number);
      dispatch({ type: 'DELETE_SUCCESS' });
      fetchPersonalEntries();
      navigate('/personal-dictionary/');
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Handler for the AddEntryForm success
  const handleAddSuccess = (newEntry) => {
    setEntries([...entries, newEntry])  
    navigate('/personal-dictionary/');
  };
  const handleRelatedEntryClick = (relatedNumber) => {
    if (typeof onRelatedEntrySelect === 'function') {
      onRelatedEntrySelect(relatedNumber);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render AddEntryForm if no entry is found or if number is not provided
  if (!entry || !number) {
    return <AddEntryForm onSuccess={handleAddSuccess} />;
  }

  return (
    <div id="personal-details"> 
      <Container>
        <Card style={{ minHeight: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)" }}>
          <Card.Body>
          <Card.Title>Personal Entry Details for Number {entry.number}</Card.Title>
         <strong>Description:</strong>
          <ListGroup>
            {entry.personal_description.map((desc, index) => (
              <ListGroup.Item key={index} style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }}>{desc}</ListGroup.Item>
            ))}
          </ListGroup>
          <div style={{ maxHeight: '100px', overflowY: 'auto'}}>
              <strong>Key Words:</strong>
              <ListGroup>
                {entry.personal_key_words.map((keyWord, idx) => (
                  <ListGroup.Item
                  style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }}
                  key={idx}>{keyWord}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div style={{ maxHeight: '75px', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.1)" }}>
              <strong>Related Numbers:</strong>
              <ListGroup>
                {entry.personal_related_entries_display.map((relEntry, idx) => (
                  <ListGroup.Item 
                    style={{ backgroundColor: "rgba(255, 228, 196, 0.1)" }}
                    key={idx}
                    action
                    onClick={() => handleRelatedEntryClick(relEntry)}
                  >
                    Number {relEntry}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>

        {!showUpdateForm && (
          <div className="justify-content-bottom">
            <Button variant="primary" onClick={() => setShowUpdateForm(true)}>Update Entry</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
          </div>
        )}

        {showUpdateForm && (
          <UpdateEntryForm entryNumber={number} onUpdate={handleUpdateSuccess} />
        )}
      </Container>
    </div>
  );
}

export default PersonalDetails;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { usePersonalDictionary } from '../components/PersonalDictionaryContext';
import { usePersonalDetails } from '../components/PersonalDetailsContext';
import { DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
import AddPersonalEntry from '../components/AddPersonalEntry';
import UpdateEntryForm from '../components/UpdatePersonalEntry';


function PersonalDetails({ number, onRelatedEntrySelect }) {
  const { entry, loading, error, fetchEntry } = usePersonalDetails();
  const [ showUpdateForm, setShowUpdateForm] = useState(false)

  const { fetchPersonalEntries } = usePersonalDictionary();

  const navigate = useNavigate();


  useEffect(() => {
    if (number) {
      fetchEntry(number);
    }
  }, [number, fetchEntry]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
 
    if (error.response && error.response.status === 404) {
      return <AddPersonalEntry />;
    }
    return <div>Error: {error.message}</div>;
  }
  
  if (!entry) {
  
    return <AddPersonalEntry />;
  }

  const handleUpdate = () => {
    setShowUpdateForm(true);
  }

  const handleRelatedEntryClick = (relatedNumber) => {
    
    if (typeof onRelatedEntrySelect === 'function') {
      onRelatedEntrySelect(relatedNumber);
    }
  };

  const handleDelete = async () => {
    try {
      await DeletePersonalEntry(number);
      fetchPersonalEntries();
      fetchEntry();
      navigate('/personal-dictionary/');
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleUpdateSuccess = async (updatedData) => {
   setShowUpdateForm(false);
   await fetchPersonalEntries();
   await fetchEntry();    
  }

  if (!entry) return <AddPersonalEntry />;

  return (
    <div className="personal-details" style={{paddingRight:"5%",width: '40vw', flex: 1}} >
    <Container>
      <Card style={{minHeight: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)"}}>
    <h2>Personal Entry Details for Number {entry.number}</h2>
    <p><strong>Description:</strong></p>
    <ListGroup>
      {entry.personal_description.map((desc, index) => (
        <ListGroup.Item style={{backgroundColor: "rgba(255, 228, 196, 0.1)"}} key={index}>{desc}</ListGroup.Item>
      ))}
    </ListGroup>
    <div style={{ Height: '30vh', overflowY: 'auto', backgroundColor: "rgba(255, 228, 196, 0.1)" }}> 
      <p><strong>Key Words:<br/></strong></p>
      <ListGroup> {entry.personal_key_words.map((keyWord, idx) =>(
        <ListGroup.Item style = {{backgroundColor: "rgba(255, 228, 196, 0.1)"}} key={idx}>
          {keyWord}
        </ListGroup.Item>
      ))}
      </ListGroup>
      
    
      <p><strong>Related Numbers:</strong></p>
    <ListGroup>
         
        {entry.personal_related_entries_display.map((relEntry, idx) => (
          <ListGroup.Item style = {{backgroundColor: "rgba(255, 228, 196, 0.1)"}}key={idx} action onClick={() => handleRelatedEntryClick(relEntry)}>
           Number: {relEntry}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      
      
    {!showUpdateForm && (
    <div className="justify-content-bottom">
    <Button variant="primary" onClick={handleUpdate}>Update Entry</Button>
    <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
    

    </div>
    
    )}
    </Card>
    {showUpdateForm && (
      <UpdateEntryForm 
      entryNumber={number}
      onUpdate={handleUpdateSuccess}
      />
    )}
  </Container>
  </div>
  );
}

export default PersonalDetails;
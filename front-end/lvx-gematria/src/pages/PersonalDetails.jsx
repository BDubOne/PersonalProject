import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


import { DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
import AddPersonalEntry from '../components/AddPersonalEntry';
import UpdateEntryForm from '../components/UpdatePersonalEntry';
// You may also import other components as needed

function PersonalDetails({ number, onRelatedEntrySelect }) {
  const [entry, setEntry] = useState(null);
  const [ showUpdateForm, setShowUpdateForm] = useState(false)
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  // const { number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;
        const response = await API.get(`/dictionary/personal/${number}`);
        setEntry(response.data);
      } catch (error) {
        console.error('Error fetching entry:', error);
        // Handle error appropriately
      }
      setLoading(false);
    };

    fetchEntry();    
  }, [number, updateTrigger]);

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
      navigate('/personal-dictionary/');
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
    navigate('/personal-dictionary/'); // Redirect after deletion
  };

  const handleUpdateSuccess = () => {
    try {
      // await UpdatePersonalEntry();
      setShowUpdateForm(false);
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.error("error updating entry", error)
    }
    
  }

  if (loading) return <div>Loading...</div>;

  if (!entry) return <AddPersonalEntry />;

  return (
    <div style={{paddingRight:"5%",width: '40vw', flex: 1}} >
    <Container>
      <Card style={{height: '50vh', backgroundColor: "rgba(255, 228, 196, 0.5)"}}>
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
    <div classname="justify-content-bottom">
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
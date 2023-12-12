import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'


import { UpdatePersonalEntry, DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
import UpdateEntryForm from '../components/UpdatePersonalEntry';
// You may also import other components as needed

function PersonalDetails() {
  const [entry, setEntry] = useState(null);
  const [ showUpdateForm, setShowUpdateForm] = useState(false)
  const [loading, setLoading] = useState(true);
  const { number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/dictionary/personal/${number}`);
        setEntry(response.data);
      } catch (error) {
        console.error('Error fetching entry:', error);
        // Handle error appropriately
      }
      setLoading(false);
    };

    fetchEntry();
  }, [number]);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  }

  const handleDelete = async () => {
    try {
      await DeletePersonalEntry(number);
      navigate('/personal-dictionary');
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
    navigate('/personal-dictionary'); // Redirect after deletion
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
  }

  if (loading) return <div>Loading...</div>;

  if (!entry) return <div>Entry not found.</div>;

  return (
    <Container>
    <h2>Personal Entry Details for Number {entry.number}</h2>
    <p><strong>Description:</strong></p>
    <ListGroup>
      {entry.personal_description.map((desc, index) => (
        <ListGroup.Item key={index}>{desc}</ListGroup.Item>
      ))}
    </ListGroup>
    <p><strong>Key Words:</strong> {entry.personal_key_words.join(', ')}</p>
    <p><strong>Related Entries:</strong></p>
    <ListGroup>
      {entry.personal_related_entries_display.map((relatedNumber, index) => (
        <ListGroup.Item key={index} action onClick={() => navigate(`/personal-dictionary/${relatedNumber}`)}>
          Number {relatedNumber}
        </ListGroup.Item>
      ))}
    </ListGroup>
    {!showUpdateForm && (
    <>
    <Button variant="secondary" onClick={handleUpdate}>Update Entry</Button>
    <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
    {/* Add other functionalities as needed */}

    </>
    )}
    {showUpdateForm && (
      <UpdateEntryForm 
      entryNumber={number}
      onUpdate={handleUpdateSuccess}
      />
    )}
  </Container>
  );
}

export default PersonalDetails;
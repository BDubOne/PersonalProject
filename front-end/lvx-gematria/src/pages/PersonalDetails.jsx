import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../utilities/API';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { UpdatePersonalEntry, DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
// You may also import other components as needed

function PersonalDetails() {
  const [entry, setEntry] = useState(null);
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

  const handleUpdate = async (updatedData) => {
    try {
      await UpdatePersonalEntry(number, updatedData);
    } catch(err) {
      console.error("error updating", err)
    }
    // Implement the logic to update the entry
  };

  const handleDelete = async () => {
    try {
      await DeletePersonalEntry(number);
      navigate('/personal-dictionary');
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
    navigate('/personal-dictionary'); // Redirect after deletion
  };

  if (loading) return <div>Loading...</div>;

  if (!entry) return <div>Entry not found.</div>;

  return (
    <div>
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
      {entry.personal_related_entries.map((relatedNumber, index) => (
        <ListGroup.Item key={index} action onClick={() => navigate(`/personal-dictionary/${relatedNumber}`)}>
          Number {relatedNumber}
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Button variant="danger" onClick={handleDelete}>Delete Entry</Button>
    {/* Add other functionalities as needed */}
  </div>
  );
}

export default PersonalDetails;
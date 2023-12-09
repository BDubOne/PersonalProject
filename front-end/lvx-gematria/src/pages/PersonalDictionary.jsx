import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NumberCard from '../components/NumberCard';
import Button from 'react-bootstrap/Button';
import { API } from '../utilities/API';
import { DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';
import AddEntryForm from '../components/AddPersonalEntry';

function PersonalDictionary() {
  const [entries, setEntries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Moved fetchPersonalEntries outside of useEffect
  const fetchPersonalEntries = async () => {
    const token = localStorage.getItem("userToken");
    API.defaults.headers.common["Authorization"] = `Token ${token}`;
    try {
      const response = await API.get('dictionary/personal/');
      setEntries(response.data.results);
      console.log("Fetched entries:", response.data.results);
    } catch (err) {
      console.error("Error fetching personal dictionary:", err);
      setEntries([]);
    }
  };

  useEffect(() => {
    fetchPersonalEntries();
  }, []);

  const handleDelete = async (number) => {
    await DeletePersonalEntry(number);
    fetchPersonalEntries();
  };

  const onSuccessAddEntry = () => {
    fetchPersonalEntries();
    window.location.reload();
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  }

  const renderEntries = () => {
    return entries.map(entry => {
      const descriptionItem = Array.isArray(entry.personal_description) && entry.personal_description.length > 0
      ? entry.personal_description[0]
      : 'No description available.';
      const keyWords = Array.isArray(entry.personal_key_words) && entry.personal_key_words.length > 0
      ? entry.personal_key_words
      : ['No related entries'];
      return (
      <div key={entry.id}>
        <NumberCard
          number={entry.number}
          descriptionItem={descriptionItem}
          keyWords={keyWords}
          dictionaryType="personal"
        />
        <Button variant="danger" onClick={() => handleDelete(entry.number)}>Delete Entry</Button>
        <Button variant="secondary" onClick={() => navigate(`personal-dictionary/${entry.number}`)}>Details</Button>
      </div>
    )});
  };

  return (
    <div>
      
      <Button variant="primary" onClick={toggleAddForm}>
        {showAddForm ? 'Hide Form' : 'Add New Entry'}
      </Button>
      {showAddForm && <AddEntryForm onSuccess={fetchPersonalEntries} />}
      {entries.length > 0 ? renderEntries() : <p>No entries found.</p>}
    </div>
  );
}

export default PersonalDictionary;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NumberCard from '../components/NumberCard';
import { API } from '../utilities/API';
import { DeletePersonalEntry } from '../utilities/personalDictionaryUtilities';

import AddEntryForm from '../components/AddPersonalEntry';
import { usePersonalDictionary } from '../components/PersonalDictionaryContext';

function PersonalDictionary() {
  const { entries, setEntries, fetchPersonalEntries } = usePersonalDictionary()

  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();


  const handleDelete = async (number) => {
    try {
        await DeletePersonalEntry(number);
        console.log(`Entry with number ${number} deleted`);
        setEntries(currentEntries => currentEntries.filter(entry => entry.number !== number));
    } catch (error) {
        console.error("Error deleting entry:", error);
    }
};


  const onSuccessAddEntry = (newEntry) => {
    setEntries(currentEntries => [...currentEntries, newEntry]);

  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  }

  const renderEntries = () => {
    // Split entries into groups of 20 (4 columns x 5 rows)
    const groupedEntries = [];
    for (let i = 0; i < entries.length; i += 20) {
      groupedEntries.push(entries.slice(i, i + 20));
    }

    return groupedEntries.map((group, index) => (
      <Row key={index} className="mb-3">
        {group.map(entry => (
          <Col md={3} key={entry.id}>
            <NumberCard
              key={entry.id}
              number={entry.number}
              descriptionItem={Array.isArray(entry.personal_description) && entry.personal_description.length > 0
                ? entry.personal_description[0]
                : 'No description available.'}
              keyWords={Array.isArray(entry.personal_key_words) && entry.personal_key_words.length > 0
                ? entry.personal_key_words
                : ['No related entries']}
              dictionaryType="personal"
            />
            <div className="d-flex justify-content-around mt-2">
              <Button variant="danger" onClick={() => handleDelete(entry.number)}>Delete</Button>
            </div>
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <Container>
    <div className="d-flex justify-content-between mb-3">
      <Button variant="primary" onClick={toggleAddForm}>
        {showAddForm ? 'Hide Form' : 'Add New Entry'}
      </Button>
      {showAddForm && <AddEntryForm onSuccess={onSuccessAddEntry} />}
    </div>
    <div className="overflow-auto" style={{ maxHeight: 'calc(5 * 18rem)' }}>
      {entries.length > 0 ? renderEntries() : <p>No entries found.</p>}
    </div>
  </Container>
  );
}

export default PersonalDictionary;


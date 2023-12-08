import React, { useState, useEffect } from 'react';
import { API } from '../utilities/API';
import NumberCard from '../components/NumberCard';
import Button from 'react-bootstrap/Button';

function PersonalDictionary() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchPersonalEntries();
  }, []);

  const fetchPersonalEntries = async () => {
    const token = localStorage.getItem("userToken");
    API.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await API.get('/personal-dictionary/');
    setEntries(response.data); // Adjust according to API response structure
  };

  const addEntry = async (newEntry) => {
    // POST request to add new entry
  };

  const updateEntry = async (updatedEntry) => {
    // PUT request to update an entry
  };

  const deleteEntry = async (entryId) => {
    // DELETE request to delete an entry
    fetchPersonalEntries(); // Refresh the list after deletion
  };

  const handleSelectEntry = (entry) => {
    // Logic to handle selected entry (for update or delete)
    setSelectedEntry(entry);
  };

  // Render a list of personal dictionary entries
  return (
    <div>
      {entries.map(entry => (
        <NumberCard
          key={entry.id}
          number={entry.number}
          descriptionItem={entry.description[0] || 'No description available.'}
          relatedWords={entry.related_entries || ['No related entries']}
        />
      ))}
      {/* Add buttons or forms to handle add, update, and delete functionalities */}
      <Button onClick={() => addEntry(/* entry data */)}>Add Entry</Button>
      {selectedEntry && (
        <>
          <Button onClick={() => updateEntry(selectedEntry)}>Update Entry</Button>
          <Button onClick={() => deleteEntry(selectedEntry.id)}>Delete Entry</Button>
        </>
      )}
    </div>
  );
}

export default PersonalDictionary;
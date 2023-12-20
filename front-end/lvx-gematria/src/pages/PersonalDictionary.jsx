import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
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
  const { entries,setEntries, fetchPersonalEntries } = usePersonalDictionary()
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
	  const fetchData = async () => {
		  setIsLoading(true);
		  try {
	 		await fetchPersonalEntries();
		  } catch (error) {
			  console.error("error during fetch", error);
		} finally {
			setIsLoading(false);
		}
	  };
	  fetchData();
    },[]);


  const handleDelete = async (number) => {
    try {
        await DeletePersonalEntry(number);
        console.log(`Entry with number ${number} deleted`);
        setEntries(entries.filter(entry => entry.number !== number));
       
    } catch (error) {
        console.error("Error deleting entry:", error);
    }
  };


  const onSuccessAddEntry = (newEntry) => {
    setEntries(prevEntries => [...prevEntries, newEntry]);
    setShowAddForm(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  }

  const renderEntries = () => {
    if (!entries) {
      return <p>No entries found.</p>;
    }
	  console.log(entries)

    return (
        <div className="entry-container">
            <Row className="mb-3">
                {entries.map(entry => (
                    <Col md={3} key={entry.id}>
                        <NumberCard
                            number={entry.number}
                            descriptionItem={entry.personal_description?.[0] || 'No description available.'}
                            keyWords={entry.personal_key_words?.join(', ') || "no keywords for this number."}
                            dictionaryType="personal"
                        />
                        <div className="d-flex justify-content-around mt-2">
                            <Button variant="danger" onClick={() => handleDelete(entry.number)}>Delete</Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
  }
  return (
  <Container>
    <div className="mb-3">
      {!showAddForm && (
        <Button className="btn-sm" variant="primary" onClick={toggleAddForm}>
          Add New Entry
        </Button>
      )}
      
       {showAddForm && (
        <>
          <AddEntryForm onSuccess={onSuccessAddEntry} />
          <Button className="btn-sm mt-2" variant="primary" onClick={toggleAddForm}>
            Hide Form
          </Button>
        </>
      )}
    </div>
    <div className="overflow-auto" style={{ maxHeight: 'calc(5 * 18rem)' }}>
      {entries ? renderEntries() : <p>No entries found.</p>}
    </div>
  </Container>
  );
}

export default PersonalDictionary;


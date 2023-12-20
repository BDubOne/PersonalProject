
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'
import { API } from '../utilities/API';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { usePersonalDictionary } from './PersonalDictionaryContext';

function AddEntryForm(props) {
    const [entryData, setEntryData] = useState({
        number: '',
        personal_description: '',
        personal_key_words: '',
        personal_related_entries: ''
    });
    const { user } = useOutletContext();
    const navigate = useNavigate()
    const { fetchPersonalEntries } = usePersonalDictionary();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntryData({ ...entryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            student_id: user.id,
            number: parseInt(entryData.number, 10),
            personal_description: entryData.personal_description.split(',').map(item => item.trim()),
            personal_key_words: entryData.personal_key_words.split(',').map(item => item.trim()),
            personal_related_entries: entryData.personal_related_entries.split(',').map(Number)
        };

        try {


            const response = await API.post('dictionary/personal/', formattedData);
            
            if(props.onSuccess) {
            props.onSuccess(formattedData);
            }
            
            setEntryData({ number: '', personal_description: '', personal_key_words: '', personal_related_entries: '' });
            
            navigate('/personal-dictionary/');
        } catch (error) {
            console.error("Error adding entry:", error);
        }
    };

    return (
        <div id="add-entry">
        <Form onSubmit={handleSubmit}>
            {/* Number input field */}
            <Form.Group className="mb-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                    type="number"
                    name="number"
                    value={entryData.number}
                    onChange={handleChange}
                    placeholder="Enter number"
                />
            </Form.Group>

            {/* Description textarea field */}
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="personal_description"
                    value={entryData.personal_description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />
            </Form.Group>

            {/* Key Words input field */}
            <Form.Group className="mb-3">
                    <Form.Label>Key Words</Form.Label>
                    <Form.Control
                        type="text"
                        name="personal_key_words"
                        value={entryData.personal_key_words}
                        onChange={handleChange}
                        placeholder="Enter key words (comma-separated)"
                    />
                </Form.Group>

            {/* Related Entries input field */}
            <Form.Group className="mb-3">
                    <Form.Label>Related Entries</Form.Label>
                    <Form.Control
                        type="text"
                        name="personal_related_entries"
                        value={entryData.personal_related_entries} // Use as a string
                        onChange={handleChange}
                        placeholder="Enter related entry numbers (comma-separated)"
                    />
                </Form.Group>

            <Button variant="primary" type="submit">Add Entry</Button>
        </Form>
        </div>
    );
}

export default AddEntryForm;



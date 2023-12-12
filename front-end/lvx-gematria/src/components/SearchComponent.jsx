import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function SearchComponent() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/dictionary-query/${query.trim()}/`); // Trim spaces and navigate
    };

    return (
        <Form inline onSubmit={handleSearch}> {/* Add inline prop and onSubmit handler */}
            <FormControl 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <Button variant="secondary" type="submit">Search</Button> {/* Change type to submit */}
        </Form>
    );
}

export default SearchComponent;
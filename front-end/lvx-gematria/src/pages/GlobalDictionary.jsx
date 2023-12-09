import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { API } from '../utilities/API';
import NumberCard from '../components/NumberCard';
import Button from 'react-bootstrap/Button';

function GlobalDictionary() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("userToken");        
      API.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await API.get('/dictionary/', {
        params: { page: currentPage }
      });
      setEntries(response.data.results);
      setTotalPages(response.data.total_pages); // Adjust according to your API response structure
    };

    fetchEntries();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(current => current + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(current => current - 1);
  };

  return (
    <div>
      {entries.map(entry => (
        <NumberCard
          key={entry.id}
          number={entry.number}
          descriptionItem={entry.description && entry.description.length > 0 ? entry.description[0] : 'No description available.'}
          relatedWords={entry.key_words && entry.key_words.length > 0 ? entry.key_words : ['No keywords']}
          dictionaryType="global"
        />
      ))}
      <div>
        <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>Previous</Button>
        <span> Page {currentPage} of {totalPages} </span>
        <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</Button>
      </div>
    </div>
  );
}

export default GlobalDictionary;

import{ createContext, useState, useContext } from 'react';
import { API } from '../utilities/API';

const PersonalDictionaryContext = createContext({
    entries: [],
    setEntries: () => {},
    isLoading: false,
    fetchPersonalEntries: () => {}
  });

export const usePersonalDictionary = () => useContext(PersonalDictionaryContext);

export const PersonalDictionaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchPersonalEntries = async () => {
    setIsLoading(true);
    
    try {
        const response = await API.get('dictionary/personal/');
        setEntries(response.data.results);
	    console.log(response.data.results)
    } catch (error) {
        console.error("Error fetching personal dictionary:", error);
        setEntries([]);
    } finally {
        setIsLoading(false);
    }
};


  

  return (
    <PersonalDictionaryContext.Provider value={{ entries, setEntries, isLoading, fetchPersonalEntries }}>
      {children}
    </PersonalDictionaryContext.Provider>
  );
};

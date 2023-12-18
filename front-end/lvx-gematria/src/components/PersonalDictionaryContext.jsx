import React, { createContext, useState, useContext, useEffect } from 'react';
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
    const token = localStorage.getItem("userToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    API.defaults.headers.common["Authorization"] = `Token ${token}`;
    
    try {

      const response = await API.get('dictionary/personal/');
      setEntries(response.data.results);
    } catch (error) {
      console.error("Error fetching personal dictionary:", error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalEntries();
  }, []);

  return (
    <PersonalDictionaryContext.Provider value={{ entries, setEntries, isLoading, fetchPersonalEntries }}>
      {children}
    </PersonalDictionaryContext.Provider>
  );
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import { API } from '../utilities/API';

const PersonalDetailsContext = createContext();

export const usePersonalDetails = () => useContext(PersonalDetailsContext);

export const PersonalDetailsProvider = ({ children }) => {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEntry = async (number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      API.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await API.get(`/dictionary/personal/${number}`);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entry:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <PersonalDetailsContext.Provider value={{ entry, loading, fetchEntry }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};

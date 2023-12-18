import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { API } from '../utilities/API';

const PersonalDetailsContext = createContext();

const initialState = {
    entry: null,
    loading: false,
    error: null,
};

const personalDetailsReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, entry: action.payload, error: null };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

export const usePersonalDetails = () => useContext(PersonalDetailsContext);

export const PersonalDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personalDetailsReducer, initialState)


  const fetchEntry = useCallback(async (number) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const token = localStorage.getItem("userToken");
      API.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await API.get(`/dictionary/personal/${number}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error fetching entry:', error);
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  }, []) ;


  return (
    <PersonalDetailsContext.Provider value={{ ...state, dispatch, fetchEntry }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};

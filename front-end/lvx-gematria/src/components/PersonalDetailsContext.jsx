import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { API } from '../utilities/API';

const PersonalDetailsContext = createContext({
  entry: null,
  loading: false,
  error: null,
  fetchEntry: () => {},
  dispatch: () => {}
});

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
      if (action.payload.response && action.payload.response.status === 404)
      return { ...state, loading: false, entry: null, error: null };
    case 'DELETE_SUCCESS':
      return { ...state, entry: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const usePersonalDetails = () => useContext(PersonalDetailsContext);

export const PersonalDetailsProvider = ({ children, initialNumber }) => {
  const [state, dispatch] = useReducer(personalDetailsReducer, initialState);

  const fetchEntry = useCallback(async (number) => {

    dispatch({ type: 'FETCH_START' });


    try {
      const response = await API.get(`/dictionary/personal/${number}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error fetching entry:', error);
      dispatch({ type: 'FETCH_ERROR', payload: error });
    }
  }, []);

  // Fetch data on mount if initialNumber is provided
  useEffect(() => {
    if (initialNumber) {
      fetchEntry(initialNumber);
    }
  }, [initialNumber, fetchEntry]);

  return (
    <PersonalDetailsContext.Provider value={{ ...state, fetchEntry, dispatch }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};

export default PersonalDetailsProvider;

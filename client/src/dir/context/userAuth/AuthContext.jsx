
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import useCookie from 'react-use-cookie';

export const INITIAL_STATE = {
  currentUser: localStorage.getItem("user") || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem("user",  state.currentUser);
  }, [state.currentUser]);

  
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
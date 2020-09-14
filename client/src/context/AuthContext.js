/* @flow */
import { createContext } from "react";

const initialState = {
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
};

export const AuthContext = createContext(initialState);

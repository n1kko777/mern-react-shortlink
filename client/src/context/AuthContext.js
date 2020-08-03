/* @flow */
import { createContext } from "react";
type AuthType = {|
  token: string | null,
  userId: string | null,
  login: Function,
  logout: Function,
  isAuth: boolean,
|};

const initialState: AuthType = {
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
};

export const AuthContext = createContext<Function>(initialState);

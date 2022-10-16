import { createContext, useReducer } from "react";

export const Store = createContext();

export const intialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  assignMents: [],
  classMates: [],
  loading: true,
  error: false,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, userInfo: action.payload };
    case "SIGN_OUT":
      return {
        userInfo: null,
        assignMents: [],
        classMates: [],
        loading: true,
        error: false,
      };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, intialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StateProvider;

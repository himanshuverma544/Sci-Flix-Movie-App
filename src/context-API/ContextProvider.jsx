import dataReducer from "./reducer";
import { useReducer } from "react";

import { homeContext as HomeContext } from "./context";


const initialState = {
  states: null,
  nodes: null,
  objects: null,
  arrays: null,
  refVars: null,
  vars: null,
  triggered: false
};     


const ContextProvider = ({ children }) => {

  const [data, dispatch] = useReducer(dataReducer, initialState);

  return (
    <HomeContext.Provider value = {{ data, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
}

export default ContextProvider;
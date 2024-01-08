import './index.css';

import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";
import store from "./redux/store";

import ContextProvider from "./context-API/ContextProvider";

import { QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </Provider>
  </ContextProvider>
);


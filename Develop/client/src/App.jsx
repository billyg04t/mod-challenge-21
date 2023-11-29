import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApolloClient from './path-to-your-apollo-client-config'; // Adjust the path accordingly

import Navbar from './components/Navbar';
import SearchBooks from './components/SearchBooks'; // Import other components as needed
import SavedBooks from './components/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

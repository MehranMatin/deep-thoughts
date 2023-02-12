import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import React from 'react';
import { BrowseRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleThought from './pages/SingleThought';

import Footer from './components/Footer';
import Header from './components/Header';

import Home from './pages/Home';

// API endpoint
const httpLink = createHttpLink({
  // Uniform Resource Identifier
  uri: '/graphql'
});

// instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate a new cache object
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/thought' element={<SingleThought />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Journal from '../pages/Journal';
import Communities from '../pages/Communities';
import NavBar from '../components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/journal" element={Journal} />
        <Route path="/communities" element={Communities} />
      </Routes>
    </Router>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LibraryPage from './components/LibraryPage';
import ShipDetailsPage from './components/ShipDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/ship/:id" element={<ShipDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Mintpage from './components/mintpage';
import Aboutpage from './components/about';

function App() {
  return (
    <Router>
      {/* <Mintpage /> */}
      {/* <Aboutpage /> */}
      <Routes>
        <Route exact path="/home" element={<Mintpage />} />
        <Route exact path="/about" element={<Aboutpage />} />
      </Routes>
    </Router>
  );
}

export default App;

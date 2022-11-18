import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes, NavLink
} from "react-router-dom";
import AnalyzeArticle from './AnalyzeArticle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page-container">
          <div className="header-panel">
            <h1 style={{ marginLeft: "0px" }}>Text Analysis with Machine Learning</h1>
          </div>
          <div className="main-panel" style={{ display: "block", paddingBottom: "50px" }}>
            <Routes>
              <Route path="/" exact element={<AnalyzeArticle />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

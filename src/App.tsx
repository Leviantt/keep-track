import React from 'react';
import ProjectsPage from './projects/ProjectsPage';
import HomePage from './home/HomePage';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';


function App() {
  return (
    <Router>
      <header className='sticky'>
        <NavLink to='/' className='button rounded'>
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to='/projects' className='button rounded'>Projects</NavLink>
      </header>
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/projects' element={<ProjectsPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
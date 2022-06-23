import React from 'react';
import ProjectsPage from './projects/ProjectsPage';
import HomePage from './additional_pages/HomePage';
import NotFound from './additional_pages/NotFound';
import ProjectPage from './projects/ProjectPage';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <header className='sticky'>
          <NavLink 
            to='/'
            className='button rounded'
          >
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink 
            to='/projects' 
            className='button rounded'
          >
            Projects
          </NavLink>
        </header>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/projects' element={<ProjectsPage />}></Route>
            <Route path='/projects/:id' element={<ProjectPage />}></Route>
            <Route path='/*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
import React from 'react';
import ListItem from './components/ListsItem(List)';
import MainTab from './components/MainTab';
import AlbumItem from './components/ListsItem(Album)';
import { Route, Routes } from 'react-router-dom';
import MyView from './pages/MyView';

function App() {
  return (
    <div className='App'>

      <nav id="NAV" > 
      <h1>Navbar</h1>
      </nav>
      
      <div className='grid grid-cols-8 gap-4'>

        <div id="aside"> 
        </div>
        
        <div id="Main" className='col-start-4 col-span-4'>
        <MainTab />
        <MyView />
        </div>

      </div>

    </div>
  );
}

export default App;

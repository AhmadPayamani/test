import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QrView from './pages/QrView';
import { QrViewRoute } from './routes';
import "./index.css"

function App() {

 
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path={QrViewRoute} element={<QrView />} />
       </Routes>
     </BrowserRouter>
   </div>
   
  );
}

export default App;

import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QrView from './pages/QrView';
import {ConsoleDriverConfigRoute, NetworkRoute, QrReaderSettingRoute, QrViewRoute, UpdateUrlRoute} from './routes';
import "./index.css"
import Network from './pages/Newteork';
import UpdateUrl from "./pages/UpdateUrl";
import QrReaderSetting from "./pages/QrReaderSetting";
import ConsoleDriverConfig from "./pages/ConsoleDriverConfig";

function App() {

 
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path={NetworkRoute} element={<Network />} />
           <Route path={QrViewRoute} element={<QrView />} />
           <Route path={UpdateUrlRoute} element={<UpdateUrl />} />
           <Route path={QrReaderSettingRoute} element={<QrReaderSetting />} />
           <Route path={ConsoleDriverConfigRoute} element={<ConsoleDriverConfig />} />
       </Routes>
     </BrowserRouter>
   </div>
   
  );
}

export default App;

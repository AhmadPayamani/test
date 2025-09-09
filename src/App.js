import React from 'react';
import Home from './pages/Home';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import QrView from './pages/QrView';
import {
    ConsoleDriverConfigRoute, ConsoleDriverLoginRoute, ConsoleDriverSmsFormRoute, ConsoleDriverUrlRoute,
    GateSettingRoute,
    LicenceGeneratorRoute,
    NetworkRoute,
    QrReaderSettingRoute,
    QrViewRoute,
    UpdateUrlRoute
} from './Routes';
import "./index.css"
import Network from './pages/Newteork';
import UpdateUrl from "./pages/UpdateUrl";
import QrReaderSetting from "./pages/QrReaderSetting";
import ConsoleDriverConfig from "./pages/ConsoleDriverConfig";
import GateSetting from "./pages/GateSetting";
import ConsoleDriverUrl from "./pages/ConsoleDriverUrl";
import LicenceGenerator from './pages/LicenceGenerator';
import ConsoleDriverLogin from "./pages/ConsoleDriverLogin";

import ConsoleSmsForm from "./pages/ConsoleSmsForm";
function App() {

  return (
    <div className="App">
     <Router>
       <Routes>
           {/*<Route path="/login" element={<Login />} />*/}
           <Route path="/" element={<Home />} />
           <Route path="/home" element={<Home />} />
           <Route path={NetworkRoute} element={<Network />} />

           <Route path={QrViewRoute} element={<QrView />} />
           <Route path={UpdateUrlRoute} element={<UpdateUrl />} />
           <Route path={QrReaderSettingRoute} element={<QrReaderSetting />} />
           <Route path={GateSettingRoute} element={<GateSetting />} />
           <Route path={LicenceGeneratorRoute} element={<LicenceGenerator />} />
           <Route path={ConsoleDriverConfigRoute} element={<ConsoleDriverConfig />} />
           <Route path={ConsoleDriverUrlRoute} element={<ConsoleDriverUrl />} />
           <Route path={ConsoleDriverLoginRoute} element={<ConsoleDriverLogin />} />
           <Route path={ConsoleDriverSmsFormRoute} element={<ConsoleSmsForm />} />
       </Routes>
     </Router>

   </div>
  );
}

export default App;

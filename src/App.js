import React, {useEffect, useState} from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QrView from './pages/QrView';
import {
    backendUrl,
    ConsoleDriverConfigRoute, ConsoleDriverLoginRoute, ConsoleDriverSmsFormRoute, ConsoleDriverUrlRoute,
    GateSettingRoute,
    LicenceGeneratorRoute,
    NetworkRoute,
    QrReaderSettingRoute,
    QrViewRoute,
    UpdateUrlRoute, UserInfoRoute
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
import Login from "./pages/Login";
import {get} from "./services/api/api";
import { useSelector} from "react-redux";
import axios from "axios";
import ConsoleSmsForm from "./pages/ConsoleSmsForm";
function App() {
    // const {user,token} = useSelector((state) => state?.user);
    // const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     const checkAuthUser = async () => {
    //         try {
    //             const data = await get(backendUrl+UserInfoRoute);
    //             console.log({data})
    //
    //         } catch (error) {
    //             console.log({error});
    //         }
    //     };
    //     checkAuthUser();
    //
    // }, []);
  return (
    <div className="App">
     <BrowserRouter>
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
     </BrowserRouter>

   </div>
  );
}

export default App;

import React from 'react';
import {
    ConsoleDriverConfigRoute, ConsoleDriverUrlRoute,
    GateSettingRoute,
    NetworkRoute,
    QrReaderSettingRoute,
    QrViewRoute,
    UpdateUrlRoute
} from "../routes";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import '../assets/styles/app.css';

const Home = () => {
    const navigate = useNavigate();

    const genarateQrCode = (type) => {
        // console.log({ type });
        let data, data_string, data_base64;
        switch (type) {
            case "configuration":
                navigate(QrReaderSettingRoute);
                break;
            case "gateReader":
                navigate(GateSettingRoute);
                break;
            case "network":
                navigate(NetworkRoute);
                break;
            case "DriverConsoleConfig":
                navigate(ConsoleDriverConfigRoute);
                break;
            case "DriverConsoleUrl":
                navigate(ConsoleDriverUrlRoute);
                break;
            case "SHOWINFO": //ok
                data = {
                    h: type,
                };
                data_string = JSON.stringify(data);
                data_base64 = btoa(data_string);
                navigate(QrViewRoute, {state: {qrCodeString: data_base64,qrName:"نمایش اطلاعات QR"}});
                break;
            case "SHOWDEBUG":
                data = {
                    h: type,
                };
                data_string = JSON.stringify(data);
                data_base64 = btoa(data_string);
                navigate(QrViewRoute, {state: {qrCodeString: data_base64,qrName:"نمایش تنظیمات QR"}});
                break;
            case "ShowLastTickets":
                data = {
                    h: type,
                };
                data_string = JSON.stringify(data);
                data_base64 = btoa(data_string);
                navigate(QrViewRoute, {state: {qrCodeString: data_base64,qrName:"نمایش آخرین بلیت ها QR"}});
                break;
            case "UPDATEURL":
                navigate(UpdateUrlRoute);
                break;

            default:

                break;
        }

    }

    return (
        <div className="body-style bg-[#1f2e39] ">
            <Helmet>
                <title>diana | QR Code Generator</title>
            </Helmet>

            <div className="text-center p-5 text-white  ">
                <p className="font-bold text-lg">نوع qr مورد نیاز خود را انتخاب کنید</p>
            </div>
            <div className="service-list">
                <div className="box-service" onClick={() => genarateQrCode("SHOWINFO")}>
                    <span> نمایش اطلاعات</span>
                    <span className={`mt-2`}>Show Info</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("network")}>
                    <span>تنظیمات شبکه</span>
                    <span className={`mt-2`}>Network Setting</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("configuration")}>
                    <span>تنظیمات کاهنده</span>
                    <span className={`mt-2`}> Qr-Reader Config </span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("UPDATEURL")}>
                    <span> لینک بروزرسانی</span>
                    <span className={`mt-2`}>Update Url</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("SHOWDEBUG")}>
                    <span>نمایش تنظیمات</span>
                    <span className={`mt-2`}>Show Debug</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("DriverConsoleConfig")}>
                    <span>تنظیمات کنسول راننده</span>
                    <span className={`mt-2`}>DDS Config</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("DriverConsoleUrl")}>
                    <span>تنظیم سرور کنسول راننده</span>
                    <span className={`mt-2`}>DDS Server Url</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("gateReader")}>
                    <span>تنظیمات گیت</span>
                    <span className={`mt-2`}>Gate Config</span>
                </div>
                <div className="box-service" onClick={() => genarateQrCode("ShowLastTickets")}>
                    <span>نمایش آخرین بلیت ها</span>
                    <span className={`mt-2`}>Show Last Tickets</span>
                </div>
            </div>
        </div>
    )
        ;
}

export default Home;
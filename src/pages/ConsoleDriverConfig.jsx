import React from 'react';
import { useState } from "react";
import { HomeRoute, QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ConsoleDriverConfig = () => {
    const navigate = useNavigate();

    const defaultDataDriverConsoleConfig = localStorage.getItem('defaultDataDriverConsoleConfig');
    const [formData, setFormData] = useState(defaultDataDriverConsoleConfig ? JSON.parse(defaultDataDriverConsoleConfig) : []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataDriverConsoleConfig", data_string);
    };

    const genarateQrCode = (type) => {
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "DriverConsoleConfig":
                let data = { ...formData, h: type };
                setFormData(data);
                console.log(data)
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64,qrName:"تنظیمات کنسول راننده QR" } });
                break;

            default:
                navigate(HomeRoute);
                break;
        }

    }

    return (
        <>
            <Helmet>
                <title>diana | Network QR Code Generator</title>
            </Helmet>
            <div className="body-style bg-[#1f2e39] ">
                <div className="text-center pt-10 text-white ">
                    <p className="font-bold text-lg pb-3">ساخت QR کانفیگ کنسول راننده </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">

                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="mac">
                                Mac
                            </label>
                            <input
                                type="text"
                                name="mac"
                                id="mac"
                                placeholder="912"
                                value={formData.console_mac}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="token">
                                Token
                            </label>
                            <input
                                type="text"
                                name="token"
                                id="token"
                                value={formData.console_token}
                                onChange={handleInputChange}
                                placeholder="gAAAgrdgrdgdrgrdgdr"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => genarateQrCode("DriverConsoleConfig")}
                                className="btn-custom btn-create"
                            >
                                ساخت QR
                            </button>
                            <button
                                onClick={() => genarateQrCode("back")}
                                className="btn-custom btn-back"
                            >
                                برگشت
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ConsoleDriverConfig;
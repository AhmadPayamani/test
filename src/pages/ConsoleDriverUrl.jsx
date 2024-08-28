import React from 'react';
import { useState } from "react";
import { HomeRoute, QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ConsoleDriverUrl = () => {
    const navigate = useNavigate();
    let defaultData = {
        action : "url",
        data:{
            base_url: null,
            http_url: null,
        }
    }
    const defaultDataDriverConsoleUrl = localStorage.getItem('defaultDataDriverConsoleUrl');
    const [formData, setFormData] = useState(defaultDataDriverConsoleUrl ? JSON.parse(defaultDataDriverConsoleUrl) : defaultData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData};

        switch (name) {
            case 'base_url':
                data.data.base_url = value;
                break
            case 'http_url':
                data.data.http_url = value;
                break
            default :
                break

        }
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataDriverConsoleUrl", data_string);
    };

    const genarateQrCode = (type) => {
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "DriverConsoleUrl":
                let data = { ...formData };
                setFormData(data);
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64,qrName:"تنظیم سرور کنسول راننده QR" } });
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
                    <p className="font-bold text-lg pb-3">ساخت QR تنظیم سرور کنسول راننده </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">

                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="base_url">
                                Socket Url
                            </label>
                            <input
                                type="text"
                                name="base_url"
                                id="base_url"
                                placeholder="wss://"
                                value={formData?.data?.base_url}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="http_url">
                                Http Url
                            </label>
                            <input
                                type="text"
                                name="http_url"
                                id="http_url"
                                placeholder="https://"
                                value={formData?.data?.http_url}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => genarateQrCode("DriverConsoleUrl")}
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

export default ConsoleDriverUrl;
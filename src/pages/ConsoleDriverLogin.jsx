import React from 'react';
import { useState } from "react";
import { HomeRoute, QrViewRoute } from "../Routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ConsoleDriverLogin = () => {
    const navigate = useNavigate();
    let defaultData = {
        action : "login",
        data:{
            national_code: null
        }
    }
    const defaultDataDriverConsoleLogin = localStorage.getItem('defaultDataDriverConsoleLogin');
    const [formData, setFormData] = useState(defaultDataDriverConsoleLogin ? JSON.parse(defaultDataDriverConsoleLogin) : defaultData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData};

        switch (name) {
            case 'national_code':
                data.data.national_code = value;
                break
            default :
                break

        }
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataDriverConsoleLogin", data_string);
    };

    const generateQrCode = (type) => {
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "DriverConsoleLogin":
                let data = { ...formData };
                setFormData(data);
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64,qrName:"ورود کنسول راننده QR",fileName: data.data.national_code} });
                break;

            default:
                navigate(HomeRoute);
                break;
        }

    }

    return (
        <>
            <Helmet>
                <title>diana | Lgoin Console Driver QR Code Generator</title>
            </Helmet>
            <div className="body-style bg-[#1f2e39] ">
                <div className="text-center pt-10 text-white ">
                    <p className="font-bold text-lg pb-3">ساخت QR  ورود کنسول راننده </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                <div className="mx-auto w-full max-w-[550px] px-1">

                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="nationalCode">
                                Natiobal Code
                            </label>
                            <input
                                type="text"
                                name="national_code"
                                id="nationalCode"
                                placeholder="national code"
                                value={formData?.data?.base_url}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => generateQrCode("DriverConsoleLogin")}
                                className="btn-custom btn-create"
                            >
                                ساخت QR
                            </button>
                            <button
                                onClick={() => generateQrCode("back")}
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

export default ConsoleDriverLogin;
import React from 'react';
import { useState} from "react";
import {HomeRoute, QrViewRoute} from "../Routes";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";


const GateSetting = () => {
    const navigate = useNavigate();

    const defaultQrGate = localStorage.getItem('defaultQrGate');
    const [formData, setFormData] = useState(defaultQrGate ? JSON.parse(defaultQrGate) : []);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        let data = {...formData, [name]: value};

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultQrGate", data_string);
    };
    const generateQrCode = (type) => {
        //console.log({type});
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "configuration":
                setFormData(formData);
                //console.log(data)
                let data_string = JSON.stringify(formData);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, {state: {qrCodeString: data_base64, qrName: "تنظیمات گیت QR"}});
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
                    <p className="font-bold text-lg pb-3">ساخت QR تنظیمات گیت </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">

                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="h1">
                                Host 1
                            </label>
                            <input
                                type="text"
                                name="h1"
                                id="h1"
                                placeholder=""
                                value={formData.h1}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="h2">
                                Host 2
                            </label>
                            <input
                                type="text"
                                name="h2"
                                id="h2"
                                placeholder=""
                                value={formData.h2}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="did">
                                Door Id
                            </label>
                            <input
                                type="number"
                                name="did"
                                id="did"
                                value={formData.did}
                                onChange={handleInputChange}
                                placeholder="1"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="rip">
                                Realy ip
                            </label>
                            <input
                                type="text"
                                name="rip"
                                id="rip"
                                value={formData.rip}
                                onChange={handleInputChange}
                                placeholder="192.168.1.200"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="rp">
                                Realy Port
                            </label>
                            <input
                                type="text"
                                name="rp"
                                id="rp"
                                value={formData.rp}
                                onChange={handleInputChange}
                                placeholder="8080"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => generateQrCode("configuration")}
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

export default GateSetting;
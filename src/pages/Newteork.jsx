import React from 'react';
import { useState } from "react";
import { HomeRoute, QrViewRoute } from "../Routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



const Network = () => {
    const navigate = useNavigate();

    const defaultDataNetwork = localStorage.getItem('defaultDataNetwork');
    const [formData, setFormData] = useState(defaultDataNetwork ? JSON.parse(defaultDataNetwork) : []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataNetwork", data_string);
    };

    const generateQrCode = (type) => {
        //console.log({ type });
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "network":
                let data = { ...formData, h: type };
                setFormData(data);
                //console.log(data)
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64,qrName:"تنظیمات شبکه QR" } });
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
                    <p className="font-bold text-lg pb-3">ساخت QR تنظیمات شبکه </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">

                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="ip">
                                IP
                            </label>
                            <input
                                type="text"
                                name="ip"
                                id="ip"
                                placeholder="192.168.1.1"
                                value={formData.ip}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="port">
                                Port
                            </label>
                            <input
                                type="text"
                                name="port"
                                id="port"
                                value={formData.port}
                                onChange={handleInputChange}
                                placeholder="8080"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="server">
                                Server
                            </label>
                            <input
                                type="text"
                                name="server"
                                id="server"
                                value={formData.server}
                                onChange={handleInputChange}
                                placeholder="192.168.1.2"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="server_port">
                                Server Port
                            </label>
                            <input
                                type="text"
                                name="server_port"
                                id="server_port"
                                value={formData.server_port}
                                onChange={handleInputChange}
                                placeholder="5050"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="gateway">
                                Gateway
                            </label>
                            <input
                                type="text"
                                name="gateway"
                                id="gateway"
                                value={formData.gateway}
                                onChange={handleInputChange}
                                placeholder="255.255.255.0"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => generateQrCode("network")}
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

export default Network;
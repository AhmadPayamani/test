import React from 'react';
import { useEffect, useState } from "react";
import { HomeRoute, NetworkRoute, QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



const Network = () => {
    const navigate = useNavigate();

    // const defualtData = {
    //     h: 'wss://my.yazd.ir',
    //     u: '/ws/qr_device/',
    //     a: 'fava.yazd',
    //     p: '443',
    //     t: '234usdfsr0=',
    //     d: '54848945465',
    // };

    const defaultDataNetwork = localStorage.getItem('defaultDataNetwork');
    const [formData, setFormData] = useState(defaultDataNetwork ? JSON.parse(defaultDataNetwork) : []);
    const [qrBase64, setQrBase64] = useState(null);

    useEffect(() => {
        let data_string = JSON.stringify(formData);
        setQrBase64(btoa(data_string))
    }, [formData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataNetwork", data_string);
        setQrBase64(btoa(data_string))
    };

    const genarateQrCode = (type) => {
        console.log({ type });
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "network":
                let data = { ...formData, h: type };
                setFormData(data);
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                setQrBase64(data_base64)
                navigate(QrViewRoute, { state: { qrCodeString: data_base64 } });
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
            <div className="flex items-center justify-center pt-10" >

                <div className="mx-auto w-full max-w-[550px] px-1">

                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="ip">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="port">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="server">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="server_port">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="gateway">
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
                    <div>
                        <button
                            onClick={() => genarateQrCode("network")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full"
                        >
                            ساخت QR تنظیمات شبکه
                        </button>
                        <button
                            onClick={() => genarateQrCode("back")}
                            className="hover:shadow-form rounded-md bg-[#e34c26] py-3 px-8 text-base font-semibold text-white outline-none w-full  mt-2"
                        >
                            برگشت
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Network;
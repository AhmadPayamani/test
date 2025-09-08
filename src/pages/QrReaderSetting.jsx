import React from 'react';
import { useState} from "react";
import {HomeRoute, QrViewRoute} from "../Routes";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import Select from "react-select";


const options = [
    {value: 1, label: 'درب جلو'},
    {value: 2, label: 'درب عقب'},
];
const QrReaderSetting = () => {
    const navigate = useNavigate();

    const defaultQrReader = localStorage.getItem('defaultQrReader');
    const [formData, setFormData] = useState(defaultQrReader ? JSON.parse(defaultQrReader) : []);
    const [selectedOption, setSelectedOption] = useState(options[(formData.x)-1]);

    // useEffect(() => {
    //     setSelectedOption(]);
    // }, []);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        let data = {...formData, [name]: value};

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultQrReader", data_string);
    };
    const handleChangeSelect = (name, selectedOption) => {
        setSelectedOption(selectedOption);
        let data = {...formData, [name]: selectedOption.value};
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultQrReader", data_string);
    };
    const generateQrCode = (type) => {
        //console.log({type});
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "configuration":
                setFormData(formData);
                let data_string = JSON.stringify(formData);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, {state: {qrCodeString: data_base64, qrName: "تنظیمات کاهنده QR"}});
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
                    <p className="font-bold text-lg pb-3">ساخت QR تنظیمات کاهنده </p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">
                        <div className="mb-5" dir='ltr'>
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="x">
                                Door
                            </label>
                            <Select
                                id='x'
                                value={selectedOption}
                                onChange={(e) => handleChangeSelect('x', e)}
                                options={options}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="b">
                                Bus
                            </label>
                            <input
                                type="text"
                                name="b"
                                id="b"
                                placeholder="---"
                                value={formData.b}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="h">
                                Host
                            </label>
                            <input
                                type="text"
                                name="h"
                                id="h"
                                placeholder="wss://my.pay.ir"
                                value={formData.h}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="u">
                                Connection address
                            </label>
                            <input
                                type="text"
                                name="u"
                                id="u"
                                value={formData.u}
                                onChange={handleInputChange}
                                placeholder="/ws/qr_device/"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="a">
                                APN name
                            </label>
                            <input
                                type="text"
                                name="a"
                                id="a"
                                value={formData.a}
                                onChange={handleInputChange}
                                placeholder="fava.yazd"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="p">
                                Port
                            </label>
                            <input
                                type="text"
                                name="p"
                                id="p"
                                value={formData.p}
                                onChange={handleInputChange}
                                placeholder="8088"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="t">
                                Token
                            </label>
                            <input
                                type="text"
                                name="t"
                                id="t"
                                value={formData.t}
                                onChange={handleInputChange}
                                placeholder="1234"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="d">
                                Device ID
                            </label>
                            <input
                                type="text"
                                name="d"
                                id="d"
                                value={formData.d}
                                onChange={handleInputChange}
                                placeholder="--------"
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

export default QrReaderSetting;
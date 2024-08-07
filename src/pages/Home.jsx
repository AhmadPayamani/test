import React from 'react';
import { useEffect, useState } from "react";
import { NetworkRoute, QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Select from 'react-select';

const options = [
    { value: 1, label: 'Front Door' },
    { value: 2, label: 'Back Door' },
];

const Home = () => {
    const navigate = useNavigate();

    const defualtData = {
        h: 'wss://my.yazd.ir',
        u: '/ws/qr_device/',
        a: 'fava.yazd',
        p: '443',
        t: '234usdfsr0=',
        d: '54848945465',
        x: 1
    };

    const defaultDataLS = localStorage.getItem('defaultDataLS');
    const [formData, setFormData] = useState(defaultDataLS ? JSON.parse(defaultDataLS) : defualtData);

    const [qrBase64, setQrBase64] = useState(null);
    const [selectedOption, setSelectedOption] = useState(1);

    useEffect(() => {
        let data_string = JSON.stringify(formData);
        setQrBase64(btoa(data_string))
    }, [formData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataLS", data_string);
        setQrBase64(btoa(data_string))
    };

    const genarateQrCode = (type) => {
        // console.log({ type });
        switch (type) {
            case "configuration":
                navigate(QrViewRoute, { state: { qrCodeString: qrBase64 } });
                break;
            case "network":
                navigate(NetworkRoute);
                break;
            case "SHOWINFO":
            case "SHOWCONNECTDEBUG":
            case "SHOWDEBUG":
            case "UPDATEURL":
                let data = { ...formData, h: type };
                setFormData(data);
                let data_string = JSON.stringify(data);
                // localStorage.setItem("defaultDataLS", data_string);
                let data_base64 = btoa(data_string);
                setQrBase64(data_base64)
                // console.log(data);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64 } });
                break;

            default:
                navigate(QrViewRoute, { state: { qrCodeString: qrBase64 } });

                break;
        }

    }
    const handleChangeSelect = (name, selectedOption) => {
        setSelectedOption(selectedOption);
        let data = { ...formData, [name]: selectedOption.value };
        // console.log(`Option selected:`, { name,selectedOption })
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataLS", data_string);
        setQrBase64(btoa(data_string))

    };
    useEffect(() => {
        // console.log({formData});
        setSelectedOption(options[(formData.x) - 1])

    }, []);
    return (
        <>
            <Helmet>
                <title>diana | QR Code Generator</title>
            </Helmet>
            <div className="flex items-center justify-center pt-10" >

                <div className="mx-auto w-full max-w-[550px] px-1">

                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="h">
                            Host
                        </label>
                        <input
                            type="text"
                            name="h"
                            id="h"
                            placeholder="gfwss://my.yazd.ir"
                            value={formData.h}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="u">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="a">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="p">
                            Port
                        </label>
                        <input
                            type="text"
                            name="p"
                            id="p"
                            value={formData.p}
                            onChange={handleInputChange}
                            placeholder="443"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="t">
                            Token
                        </label>
                        <input
                            type="text"
                            name="t"
                            id="t"
                            value={formData.t}
                            onChange={handleInputChange}
                            placeholder="token"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="d">
                            Device ID
                        </label>
                        <input
                            type="text"
                            name="d"
                            id="d"
                            value={formData.d}
                            onChange={handleInputChange}
                            placeholder="device id"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5" dir='ltr'>
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="x">
                            Door
                        </label>
                        <Select
                            id='x'
                            value={selectedOption}
                            onChange={(e) => handleChangeSelect('x', e)}
                            options={options}
                        />
                    </div>
                    <div>
                        <button
                            onClick={() => genarateQrCode("SHOWINFO")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full "
                        >
                            ساخت QR نمایش اطلاعات دستگاه
                        </button>
                        <button
                            onClick={() => genarateQrCode("network")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full mt-2"
                        >
                            تنظیمات شبکه
                        </button>
                        <button
                            onClick={() => genarateQrCode("configuration")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full  mt-2"
                        >
                            ساخت QR پیکربندی
                        </button>
                        <button
                            onClick={() => genarateQrCode("UPDATEURL")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full mt-2"
                        >
                            ساخت QR آپدیت از  Connection address
                        </button>
                        <button
                            onClick={() => genarateQrCode("SHOWCONNECTDEBUG")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full mt-2"
                        >
                            ساخت QR نمایش صفحه Debug Connection
                        </button>
                        <button
                            onClick={() => genarateQrCode("SHOWDEBUG")}
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full mt-2"
                        >
                            ساخت QR نمایش صفحه Debug
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;
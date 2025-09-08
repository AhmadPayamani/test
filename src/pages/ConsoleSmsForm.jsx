import React from 'react';
import { useState } from "react";
import {HomeRoute, QrViewRoute} from "../Routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ConsoleSmsForm = () => {
    const navigate = useNavigate();
    let defaultData = {
        action : "sms",
        data:{
            mobile: null,
            sms: null
        }
    }
    const defaultDataConsoleDriverSms = localStorage.getItem('defaultDataConsoleDriverSms');
    const [formData, setFormData] = useState(defaultDataConsoleDriverSms ? JSON.parse(defaultDataConsoleDriverSms) : defaultData);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData};

        switch (name) {
            case 'mobile':
                data.data.mobile = value;
                break
            case 'sms':
                data.data.sms = value;
                break
            default :
                break

        }
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataConsoleDriverSms", data_string);
    };

    const generateQrCode = (type) => {
        //console.log({ type });
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "sms_form":
                // let data = { ...formData, h: type };
                // setFormData(formData);
                let data_string = JSON.stringify(formData);
                console.log(data_string)
                let data_base64 = btoa(unescape(encodeURIComponent(data_string)));
                navigate(QrViewRoute, { state: { qrCodeString: data_base64 ,qrName:" ارسال پیامک با کنسول راننده"} });
                break;

            default:
                navigate(HomeRoute);
                break;
        }

    }

    return (
        <div className="body-style bg-[#1f2e39]">
            <Helmet>
                <title>diana | DDS SMS Send - QR Code Generator</title>
            </Helmet>
            <div className="text-center pt-10 text-white ">
                <p className="font-bold text-lg pb-3">ساخت QR ارسال پیامک با کنسول راننده </p>

            </div>
            <div className="flex items-center justify-center pt-2">

                <div className="mx-auto w-full max-w-[550px] px-1">

                <div className="mb-5">
                        <label className="block text-sm font-bold mb-2 text-left text-white" htmlFor="mobile">
                            mobile
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={formData?.data?.mobile}
                            onChange={handleInputChange}
                            placeholder="شماره موبایل"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-bold mb-2 text-left text-white" htmlFor="sms">
                            sms
                        </label>
                        <textarea
                            name="sms"
                            id="sms"
                            value={formData?.data?.sms}
                            onChange={handleInputChange}
                            placeholder="متن پیامک"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <button
                            onClick={() => generateQrCode("sms_form")}
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
    );
}

export default ConsoleSmsForm;
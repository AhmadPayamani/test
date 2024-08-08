import React from 'react';
import { useEffect, useState } from "react";
import { HomeRoute, QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



const UpdateUrl = () => {
    const navigate = useNavigate();

    const defaultDataUpdateUrl = localStorage.getItem('defaultDataUpdateUrl');
    const [formData, setFormData] = useState(defaultDataUpdateUrl ? JSON.parse(defaultDataUpdateUrl) : []);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };
        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataUpdateUrl", data_string);
    };

    const genarateQrCode = (type) => {
        console.log({ type });
        switch (type) {
            case "back":
                navigate(HomeRoute);
                break;
            case "UPDATEURL":
                let data = { ...formData, h: type };
                setFormData(data);
                let data_string = JSON.stringify(data);
                let data_base64 = btoa(data_string);
                navigate(QrViewRoute, { state: { qrCodeString: data_base64 ,qrName:" لینک بروزرسانی QR  "} });
                break;

            default:
                navigate(HomeRoute);
                break;
        }

    }

    return (
        <div className="body-style bg-[#1f2e39]">
            <Helmet>
                <title>diana | Update Url - QR Code Generator</title>
            </Helmet>
            <div className="text-center pt-10 text-white ">
                <p className="font-bold text-lg pb-3">ساخت QR لینک بروزرسانی </p>
                <small ><span className="text-blue-500">توضیحات :</span> دستگاه از طریق این لینک برای یک بار بروزرسانی
                    دریافت می کند.</small>
            </div>
            <div className="flex items-center justify-center pt-2">

                <div className="mx-auto w-full max-w-[550px] px-1">

                    <div className="mb-5">
                        <label className="block text-sm font-bold mb-2 text-left text-white" htmlFor="u">
                            url
                        </label>
                        <input
                            type="text"
                            name="u"
                            id="u"
                            value={formData.u}
                            onChange={handleInputChange}
                            placeholder="https://your-url.ir"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <button
                            onClick={() => genarateQrCode("UPDATEURL")}
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
    );
}

export default UpdateUrl;
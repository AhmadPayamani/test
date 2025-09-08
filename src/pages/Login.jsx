import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet";
import '../assets/styles/app.css';
import {toast} from "react-toastify";
const Login = () => {
    const [captcha, setCaptcha] = useState({
        "captcha_key": "967f935a-18d4-423b-84f3-bfde8203af63",
        "captcha_image": "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",
        "image_type": "image/png",
        "image_decode": "base64"
    });
    useEffect(() => {
        toast.success('test');
    }, []);
    return (
        <>
            <Helmet>
                <title>diana | Login Page</title>
            </Helmet>
            <div className="body-style bg-[#1f2e39]">
                <div className="text-center pt-10 text-white ">
                    <p className="font-bold text-lg pb-3">ورود به سامانه</p>
                </div>
                <div className="flex items-center justify-center pt-2 m-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="*******"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className={`flex gap-1`}>
                            <div className="flex mb-5  items-end justify-center ">
                                <img src={`data:image/png;base64, ${captcha.captcha_image}`} className={`rounded-md`} alt="" width={160} />
                            </div>
                            <div className="mb-5 grow">
                                <label className="block text-white text-sm font-bold mb-2 text-left" htmlFor="captcha">
                                    Captcha
                                </label>
                                <input
                                    type="text"
                                    name="captcha"
                                    id="captcha"
                                    placeholder="----"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="">
                            <button
                                className="btn-custom btn-create"
                            >
                                ورود
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
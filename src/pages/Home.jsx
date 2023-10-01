import { useEffect, useState } from "react";
import { QrViewRoute } from "../routes";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();
    const defualtData = {
        h: 'gfwss://my.yazd.ir',
        u: '/ws/qr_device/',
        a: 'fava.yazd',
        p: '443',
        t: '234usdfsr0=',
        d: '54848945465',
    };
    const defaultDataLS = localStorage.getItem('defaultDataLS');
    const [formData, setFormData] = useState(defaultDataLS ? JSON.parse(defaultDataLS) : defualtData);
    const [qrBase64, setQrBase64] = useState(null);
    useEffect(() => {
        let data_string = JSON.stringify(formData);
        setQrBase64(btoa(data_string))
      },[]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let data = { ...formData, [name]: value };

        setFormData(data);
        let data_string = JSON.stringify(data);
        localStorage.setItem("defaultDataLS", data_string);
        setQrBase64(btoa(data_string))
    };
    const genarateQrCode = ()=>{

        navigate(QrViewRoute,{state:{ qrCodeString: qrBase64 }});
    }
    
    return (
        <>
            <div className="text-3xl text-center p-12">
                لطفا اطلاعات خواسته شده را وارد کنید
            </div>
            <div className="flex items-center justify-center p-12" >

                <div className="mx-auto w-full max-w-[550px]">
              
                        <div className="mb-5">

                            <input
                                type="text"
                                name="h"
                                placeholder="gfwss://my.yazd.ir"
                                value={formData.h}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="u"
                                value={formData.u}
                                onChange={handleInputChange}
                                placeholder="/ws/qr_device/"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="a"
                                value={formData.a}
                                onChange={handleInputChange}
                                placeholder="fava.yazd"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="p"
                                value={formData.p}
                                onChange={handleInputChange}
                                placeholder="443"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="t"
                                value={formData.t}
                                onChange={handleInputChange}
                                placeholder="token"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                name="d"
                                value={formData.d}
                                onChange={handleInputChange}
                                placeholder="device id"

                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div>
                            <button
                            onClick={genarateQrCode}
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none w-full"
                            >
                                ساخت QR پیکربندی
                            </button>
                        </div>
                        
                </div>
            </div>
            <p dir="ltr">
                            {qrBase64}
                        </p>
            </>
    );
}

export default Home;
import React from 'react';
import { useState } from "react";
import { HomeRoute } from "../routes";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import CryptoJS from 'crypto-js';
import { Bounce, toast } from 'react-toastify';
const LicenceGenerator = () => {
    const navigate = useNavigate();
    const defaultData = {
      data: {
        name: null,
        hardware_serial_number: null,
        serial_number: null,
        expire_date: null,
        support_date: null,
      },
    };
    const defaultLicenceGenerator = localStorage.getItem("defaultLicenceGenerator");
    const [formData, setFormData] = useState(
      defaultLicenceGenerator ? JSON.parse(defaultLicenceGenerator) : defaultData
    );
    const [licence, setLicence] = useState(null);
    function copyToClipboard(value) {
        navigator.clipboard.writeText(value)
            .then(() => {
                toast.success('لایسنس صادر و کپی شد', {});
            })
            .catch(err => {
                console.error("Failed to copy text to clipboard: ", err);
            });
    }
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      let data = { ...formData };
  
      switch (name) {
          case "name":
              data.data.name = value;
              break;
        case "hardware_serial_number":
          data.data.hardware_serial_number = value;
          break;
        case "serial_number":
          data.data.serial_number = value;
          break;
        case "expire_date":
          data.data.expire_date = value;
          break;
        case "support_date":
          data.data.support_date = value;
          break;
        default:
          break;
      }
      setFormData(data);
      let data_string = JSON.stringify(data);
      localStorage.setItem("defaultLicenceGenerator", data_string);
    };
  
    const generateLicence = (type) => {
      switch (type) {
        case "back":
            navigate(HomeRoute);
          break;
        case "LicenceGenerator":
          let data = { ...formData };
          setFormData(data);
          let key = generateKey(data.data.serial_number, data.data.hardware_serial_number);
          let newData = `{"name":"${data.data.name}","expire_date":"${data.data.expire_date}","support_date":"${data.data.support_date}"}`;

          let hash = encrypt(newData, key);

          setLicence(hash);
          copyToClipboard(hash);

          break;
  
        default:
            navigate(HomeRoute);
          break;
      }
    };
  
    const generateKey = (serialNumber, hardwareSerialNumber) => {
      let key = String(serialNumber) + String(hardwareSerialNumber);
      // تبدیل کلید به هگز
      const keyHex = CryptoJS.enc.Utf8.parse(key);
      // استخراج 16 بایت اول (128 بیت)
      const limitedKeyHex = keyHex.toString(CryptoJS.enc.Hex).substring(0, 32); // 16 بایت در هگز معادل 32 کاراکتر هگز است
      return limitedKeyHex;
    };
  
    const encrypt = (plaintext, key) => {
      // رمزنگاری با استفاده از AES در حالت ECB بدون IV
      const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Hex.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
  
      // تبدیل داده رمزنگاری شده به هگز
      const hexCiphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      return hexCiphertext;
    };
  
    const decrypt = (ciphertextHex, key) => {
      // تبدیل هگز به بایت‌ها
      const ciphertextBytes = CryptoJS.enc.Hex.parse(ciphertextHex);
  
      // رمزگشایی با استفاده از AES در حالت ECB بدون IV
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertextBytes },
        CryptoJS.enc.Hex.parse(key),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
  
      // تبدیل داده‌های رمزگشایی شده به رشته
      return decrypted.toString(CryptoJS.enc.Utf8);
    };

    return (
        <>
            <Helmet>
                <title>diana | Licence Generator</title>
            </Helmet>
            <div className="body-style bg-[#1f2e39] ">
                <div className="text-center pt-10 text-white ">
                    <p className="font-bold text-lg pb-3">تولید لایسنس پلاک خوان</p>
                </div>
                <div className="flex items-center justify-center pt-2">

                    <div className="mx-auto w-full max-w-[550px] px-1">
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white"
                                   htmlFor="name">
                               Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="لایسنس 2 ماهه - دمو با پشتیبانی یکساله"
                                value={formData?.data?.name}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white"
                                   htmlFor="hardware_serial_number">
                                HardWare Serial
                            </label>
                            <input
                                type="text"
                                name="hardware_serial_number"
                                id="hardware_serial_number"
                                placeholder="123456789"
                                value={formData?.data?.hardware_serial_number}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white"
                                   htmlFor="serial_number">
                                SoftWare Serial
                            </label>
                            <input
                                type="text"
                                name="serial_number"
                                id="serial_number"
                                placeholder="DJ123456789"
                                value={formData?.data?.serial_number}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="expire_date">
                                Expire Date
                            </label>
                            <input
                                type="text"
                                name="expire_date"
                                id="expire_date"
                                placeholder="2025-12-10"
                                value={formData?.data?.expire_date}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white"
                                   htmlFor="support_date">
                                Support Date
                            </label>
                            <input
                                type="text"
                                name="support_date"
                                id="support_date"
                                placeholder="2025-12-10"
                                value={formData?.data?.support_date}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block  text-sm font-bold mb-2 text-left text-white" htmlFor="licence">
                                Your Licence
                            </label>
                            <input
                                type="text"
                                name="licence"
                                id="licence"
                                disabled
                                placeholder="xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx"
                                value={licence}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                            <button
                                onClick={() => generateLicence("LicenceGenerator")}
                                className="btn-custom btn-create"
                            >
                                تولید لایسنس
                            </button>
                            <button
                                onClick={() => generateLicence("back")}
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

export default LicenceGenerator;
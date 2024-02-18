import React from 'react';
import QRCodeSVG from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeRoute } from '../routes';
import { Helmet } from 'react-helmet';

const QrView = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { qrCodeString } = location.state

  const backToHome = () => {
    navigate(HomeRoute);
  }
  return (
    <>
      <Helmet>
        <title> diana | QR Code Generator </title>
      </Helmet>
      <div className="flex items-center justify-center p-8 bg-[#ffffff]" >
        <QRCodeSVG value={qrCodeString} size={300} />

      </div>
      <div className="flex items-center justify-center p-12">
        <button
          onClick={backToHome}
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-whitegit "
        >
          برگشت به صفحه اصلی
        </button>
      </div>
    </>
  );
}

export default QrView;
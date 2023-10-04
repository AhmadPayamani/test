import QRCodeSVG from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeRoute } from '../routes';

const QrView = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { qrCodeString } = location.state
  console.log({ qrCodeString });
  const backToHome = ()=>{
    navigate(HomeRoute);
  }
  return (
    <>
      <div className="flex items-center justify-center p-12" >
        <QRCodeSVG value={qrCodeString} size={300} />

      </div>
      <div>
        <button
          onClick={backToHome}
          className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          برگشت به صفحه اصلی
        </button>
      </div>
    </>
  );
}

export default QrView;
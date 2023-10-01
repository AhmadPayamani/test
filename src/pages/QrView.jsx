import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

const QrView = () => {
    const location = useLocation();
    console.log(location);
    const { qrCodeString } = location.state
    console.log({qrCodeString});
    return (
        <div>
        <QRCode value={qrCodeString} />
      </div>
    );
}

export default QrView;
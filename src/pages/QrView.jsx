import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {HomeRoute} from '../routes';
import {Helmet} from 'react-helmet';
import QRCode from "qrcode.react";

const QrView = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const [description, setDescription] = useState(null);
    const {qrCodeString,qrName} = location.state
    const backToHome = () => {
        navigate(HomeRoute);
    }
    const goBack = () => {
        window.history.back();
    };

    const downloadQRCode = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            // Create a new canvas to accommodate both the QR code and the text
            const newCanvas = document.createElement('canvas');
            const ctx = newCanvas.getContext('2d');

            // Set the new canvas size (QR code height + text height)
            const qrSize = canvas.width; // Assuming the canvas is square
            newCanvas.width = qrSize;
            newCanvas.height = qrSize + 100;

            // Set the background color
            ctx.fillStyle = '#ffffff'; // Set your desired background color
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

            // Draw the original QR code onto the new canvas
            ctx.drawImage(canvas, 0, 20);

            // Add text below the QR code
            const text = "Diana Electronic Kavir Yazd"; // Customize your text here
            ctx.font = "12px Arial Bold"; // Set the font size and style
            ctx.fillStyle = "black"; // Set the text color
            const xPosition = 25;
            const yPosition = qrSize + 20;
            ctx.fillText(text, xPosition, yPosition);
            if (description) {
                ctx.font = "16px Arial Bold"; // Set the font size and style
                ctx.fillStyle = "black";
                const lineHeight = 20; // Set the line height

                let line = '';
                let yPositionDes = qrSize + 40; // Initial Y position below the QR code

                for (let i = 0; i < description.length; i++) {
                    const testLine = line + description[i];
                    const testWidth = ctx.measureText(testLine).width;

                    if (testWidth > newCanvas.width - 20) { // If the line is too long, draw the current line and start a new one
                        ctx.fillText(line, 10, yPositionDes); // 10px padding from the left
                        line = description[i]; // Start a new line with the current character
                        yPositionDes += lineHeight; // Move to the next line position
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, 10, yPositionDes); // Draw the last line
            }
            if(qrName){
                ctx.font = "16px Arial Bold"; // Set the font size and style
                ctx.fillStyle = "black";
                const textWidthName = ctx.measureText(qrName).width;
                const xPositionName = (newCanvas.width - textWidthName) / 2;
                const yPositionName = 30;
                ctx.fillText(qrName, xPositionName, yPositionName);
            }

            // Convert the new canvas to a PNG
            const pngUrl = newCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode_with_text.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };


    return (
        <div className="body-style bg-[#1f2e39] ">
            <Helmet>
                <title> diana | QR Code Generator </title>
            </Helmet>
            <div className="text-center pt-10 text-white ">
                <p className="font-bold text-lg pb-3" dir={"ltr"}>{qrName}</p>
                </div>
            <div className="mx-auto w-full max-w-[550px] px-1">
                <div className="flex items-center justify-center">
                    <div className="p-4">
                        <QRCode
                            value={qrCodeString}
                            size={300}
                            renderAs="canvas"
                            bgColor="#ffffff"
                            includeMargin={true}
                            imageSettings={{
                                src: "hello"
                            }}
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-bold mb-2 text-left text-white" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="u"
                        id="u"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder="your description"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <button onClick={downloadQRCode} className="btn-custom col-span-12 bg-teal-500">
                        دانلود
                    </button>
                    <button onClick={backToHome} className="btn-custom col-span-8 bg-slate-600">
                        برگشت به صفحه اصلی
                    </button>
                    <button onClick={goBack} className="btn-custom btn-back">
                        برگشت به قبل
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QrView;
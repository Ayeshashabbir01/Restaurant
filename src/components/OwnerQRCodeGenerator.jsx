import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./OwnerQRCodeGenerator.css";

export default function OwnerQRCodeGenerator() {
  const qrRef = useRef();

  const menuURL = "http://localhost:3000/menu"; // apna real menu link

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "menu_qr_code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-container">
      <h2>📲 Generate QR Code for Menu</h2>
      <div ref={qrRef} className="qr-box">
        <QRCodeCanvas value={menuURL} size={200} />
      </div>
      <p className="qr-text">Scan to open menu: {menuURL}</p>
      <button onClick={downloadQR} className="qr-button">
        Download QR Code
      </button>
    </div>
  );
}

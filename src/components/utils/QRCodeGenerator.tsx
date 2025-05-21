
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  showText?: boolean;
};

const QRCodeGenerator = ({
  value,
  size = 200,
  bgColor = "#FFFFFF",
  fgColor = "#0EA5E9",
  showText = true
}: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (error) => {
          if (error) {
            console.error("Error generating QR code:", error);
          }
        }
      );
    }
  }, [value, size, bgColor, fgColor]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />
      {showText && value && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Scan to view patient profile
        </p>
      )}
    </div>
  );
};

export default QRCodeGenerator;

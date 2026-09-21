"use client";

import { useEffect, useRef, useState } from "react";

interface Director {
  full_name: string;
  role: string;
  signature_position: number;
  display_order: number;
}

interface CertificateData {
  participantName: string;
  certificateNumber: string;
  qrCodeDataUrl: string;
  verificationUrl: string;
  directors: Director[];
  issueDate: string;
}

interface CertificateRendererProps {
  certificateData: CertificateData;
  onReady?: (canvas: HTMLCanvasElement) => void;
}

export default function CertificateRenderer({
  certificateData,
  onReady,
}: CertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderCertificate = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Failed to get canvas context");
        return;
      }

      try {
        // Set canvas size to match certificate template
        canvas.width = 3508; // A4 landscape at 300 DPI
        canvas.height = 2480;

        // Load the certificate template image
        const templateImg = new Image();
        templateImg.crossOrigin = "anonymous";

        templateImg.onload = async () => {
          // Draw the template
          ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

          // Set text styles
          ctx.textAlign = "center";
          ctx.fillStyle = "#000000";

          // Draw participant name (large, centered)
          ctx.font = "bold 120px Arial";
          ctx.fillText(
            certificateData.participantName,
            canvas.width / 2,
            canvas.height / 2 + 50
          );

          // Draw decorative line under name
          ctx.strokeStyle = "#16a34a";
          ctx.lineWidth = 5;
          ctx.beginPath();
          const lineY = canvas.height / 2 + 100;
          ctx.moveTo(canvas.width / 2 - 500, lineY);
          ctx.lineTo(canvas.width / 2 + 500, lineY);
          ctx.stroke();

          // Load and draw QR code (bottom right)
          const qrImg = new Image();
          qrImg.onload = () => {
            const qrSize = 250;
            const qrX = canvas.width - qrSize - 200;
            const qrY = canvas.height - qrSize - 150;

            // Draw QR code
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Draw certificate number below QR code
            ctx.font = "bold 40px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(
              certificateData.certificateNumber,
              qrX + qrSize / 2,
              qrY + qrSize + 50
            );
          };
          qrImg.src = certificateData.qrCodeDataUrl;

          // Draw director signatures at the bottom
          const signatureY = canvas.height - 280;
          const signatureAreaWidth = canvas.width - 400;
          const signatureStartX = 200;

          // Group directors by position
          const leftDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 1
          );
          const centerDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 2
          );
          const rightDirectors = certificateData.directors.filter(
            (d) => d.signature_position === 3
          );

          ctx.font = "bold 45px Arial";
          ctx.fillStyle = "#000000";

          // Draw left signatures
          leftDirectors.forEach((director, index) => {
            const x = signatureStartX + 300;
            const y = signatureY + index * 80;

            // Draw line
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 250, y - 10);
            ctx.lineTo(x + 250, y - 10);
            ctx.stroke();

            // Draw name
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y + 30);

            // Draw role
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 75);
          });

          // Draw center signatures
          centerDirectors.forEach((director, index) => {
            const x = canvas.width / 2;
            const y = signatureY + index * 80;

            // Draw line
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 250, y - 10);
            ctx.lineTo(x + 250, y - 10);
            ctx.stroke();

            // Draw name
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y + 30);

            // Draw role
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 75);
          });

          // Draw right signatures (avoid QR code area)
          rightDirectors.forEach((director, index) => {
            const x = canvas.width - signatureStartX - 300;
            const y = signatureY + index * 80;

            // Only draw if not overlapping with QR code
            if (x - 250 > canvas.width - 650) {
              // Skip if too close to QR code
              return;
            }

            // Draw line
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 250, y - 10);
            ctx.lineTo(x + 250, y - 10);
            ctx.stroke();

            // Draw name
            ctx.textAlign = "center";
            ctx.font = "bold 42px Arial";
            ctx.fillText(director.full_name, x, y + 30);

            // Draw role
            ctx.font = "38px Arial";
            ctx.fillText(director.role, x, y + 75);
          });

          setIsLoading(false);
          if (onReady) {
            onReady(canvas);
          }
        };

        templateImg.onerror = () => {
          setError("Failed to load certificate template");
          setIsLoading(false);
        };

        templateImg.src = "/certificate/Certificate Template.png";
      } catch (err) {
        console.error("Certificate rendering error:", err);
        setError("Failed to render certificate");
        setIsLoading(false);
      }
    };

    renderCertificate();
  }, [certificateData, onReady]);

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Rendering certificate...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto border border-gray-300 rounded shadow-lg"
      />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const NOTIFICATION_INTERVAL = 3 * 60 * 1000;
const BUZZ_DURATION = 3000;

export default function WhatsAppButton() {
  const whatsappNumber = '5491234567890'; // Cambia esto por tu número de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20los%20servicios`;
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBuzzing, setIsBuzzing] = useState(false);
  const buzzTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setUnreadCount((prev) => prev + 1);
      setIsBuzzing(true);

      if (buzzTimeoutRef.current) {
        window.clearTimeout(buzzTimeoutRef.current);
      }

      buzzTimeoutRef.current = window.setTimeout(() => {
        setIsBuzzing(false);
      }, BUZZ_DURATION);
    }, NOTIFICATION_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
      if (buzzTimeoutRef.current) {
        window.clearTimeout(buzzTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setUnreadCount(0);
    setIsBuzzing(false);
  };

  const badgeText = unreadCount > 9 ? '9+' : String(unreadCount);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-green-500 p-2.5 text-white shadow-md  transition-all duration-300 hover:scale-110 hover:bg-green-600 ${
        isBuzzing ? 'animate-whatsapp-vibrate' : ''
      }`}
      style={{ boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)' }}
      aria-label="Contactanos por WhatsApp"
      title="Contactanos por WhatsApp"
    >
      <FaWhatsapp size={20} />
      {unreadCount > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white"
          aria-live="polite"
        >
          {badgeText}
        </span>
      )}
    </a>
  );
}

'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '5491234567890'; // Cambia esto por tu número de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola,%20me%20gustaría%20conocer%20más%20sobre%20los%20servicios`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-2.5 shadow-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
      style={{ boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)' }}
      aria-label="Contactanos por WhatsApp"
      title="Contactanos por WhatsApp"
    >
      <FaWhatsapp size={20} />
    </a>
  );
}

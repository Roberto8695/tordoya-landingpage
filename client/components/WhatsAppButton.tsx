'use client';

import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const NOTIFICATION_INTERVAL = 3 * 60 * 1000;
const BUZZ_DURATION = 3000;
const COUNTRY_STORAGE_KEY = 'tordoya_country';
const COUNTRY_CHANGE_EVENT = 'tordoya-country-change';

const whatsappNumbers = {
  mexico: '5215547157971',
  bolivia: '59167676767',
  peru: '51900944014',
} as const;

type CountryKey = keyof typeof whatsappNumbers;

function getCountryFromStorage(): CountryKey {
  if (typeof window === 'undefined') {
    return 'mexico';
  }

  const stored = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
  if (stored === 'bolivia' || stored === 'peru' || stored === 'mexico') {
    return stored;
  }

  return 'mexico';
}

export default function WhatsAppButton() {
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>('mexico');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isBuzzing, setIsBuzzing] = useState(false);
  const buzzTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const syncCountry = () => {
      setSelectedCountry(getCountryFromStorage());
    };

    syncCountry();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === COUNTRY_STORAGE_KEY) {
        syncCountry();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(COUNTRY_CHANGE_EVENT, syncCountry as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(COUNTRY_CHANGE_EVENT, syncCountry as EventListener);
    };
  }, []);

  const whatsappNumber = whatsappNumbers[selectedCountry];
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, me gustaría conocer más sobre los servicios')}`;

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
      <FaWhatsapp size={28} />
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

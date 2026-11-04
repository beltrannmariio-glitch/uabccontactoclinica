import React from 'react';
import { IMAGES } from '../assets/images';

/**
 * Logotipo Oficial FOM (Facultad de Odontología Mexicali - UABC)
 * Utiliza el recurso gráfico oficial importado a través del bundler
 */
export const FomOfficialLogo: React.FC<{
  className?: string;
  imgClassName?: string;
  variant?: 'full' | 'compact' | 'shield-only' | 'logo-only';
  inverted?: boolean;
}> = ({
  className = '',
  imgClassName = 'h-9 sm:h-10 w-auto object-contain',
  variant = 'compact',
  inverted = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Contenedor del Logotipo Oficial FOM proporcionado */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200/60 flex items-center justify-center shrink-0">
        <img
          src={IMAGES.fomLogo}
          alt="Logotipo Oficial FOM - Facultad de Odontología Mexicali UABC"
          className={imgClassName}
          loading="eager"
        />
      </div>

      {variant !== 'shield-only' && variant !== 'logo-only' && (
        <div className="flex flex-col text-left leading-tight">
          <span
            className={`text-[12px] font-black tracking-wider uppercase ${
              inverted ? 'text-white' : 'text-[#0a2540]'
            }`}
          >
            Facultad de Odontología
          </span>
          <span
            className={`text-[10px] font-bold ${
              inverted ? 'text-teal-300' : 'text-teal-700'
            }`}
          >
            UABC Campus Mexicali
          </span>
          {variant === 'full' && (
            <span
              className={`text-[8.5px] font-medium tracking-tight ${
                inverted ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Ciencia en la Salud Oral
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Alias para compatibilidad con componentes que usan UabcCampusMexicaliLogo
export const UabcCampusMexicaliLogo = FomOfficialLogo;

/**
 * Símbolo gráfico complementario para Sonríe UABC
 * Diente estilizado moderno con arco de sonrisa y destello turquesa
 */
export const SonrieUabcSymbol: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 via-[#0284c7] to-[#0a2540] p-1.5 shadow-md shadow-teal-500/20 text-white ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <path
          d="M20 7C14.5 7 11 10.5 11 15C11 19 13 24 15 31C15.8 33.8 17.5 34 19 32C20.2 30.4 20.8 30.4 22 32C23.5 34 25.2 33.8 26 31C28 24 30 19 30 15C30 10.5 26.5 7 20 7Z"
          fill="white"
        />
        <path
          d="M15 17C16.8 20.5 24.2 20.5 26 17"
          stroke="#0284c7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M27 9L28.2 11.8L31 13L28.2 14.2L27 17L25.8 14.2L23 13L25.8 11.8L27 9Z"
          fill="#38bdf8"
        />
      </svg>
    </div>
  );
};

/**
 * Imagen directa del logotipo FOM
 */
export const FomLogoImage: React.FC<{ className?: string; alt?: string }> = ({
  className = 'h-10 w-auto object-contain',
  alt = 'Logotipo Oficial FOM Facultad de Odontología Mexicali',
}) => {
  return (
    <img
      src={IMAGES.fomLogo}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

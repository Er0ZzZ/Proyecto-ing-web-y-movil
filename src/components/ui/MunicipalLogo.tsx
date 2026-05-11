import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

/**
 * Isotipo oficial de la Municipalidad de Santo Domingo.
 * El PNG debe vivir en `public/img/municipal-logo.png` (transparente).
 * Vite sirve `public/` desde la raíz, así que la URL es `/img/...`.
 */
const MunicipalLogo: React.FC<Props> = ({ size = 80, className }) => (
  <img
    src="/img/municipal-logo.png"
    alt="Municipalidad de Santo Domingo"
    width={size}
    className={className}
    style={{ height: 'auto', display: 'block' }}
  />
);

export default MunicipalLogo;

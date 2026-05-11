import React from 'react';

interface Props {
  height?: number;
  className?: string;
}

/**
 * Wordmark del servicio ClaveÚnica (gobierno digital de Chile).
 * El PNG debe vivir en `public/img/claveunica-logo.png` (transparente).
 */
const ClaveUnicaLogo: React.FC<Props> = ({ height = 32, className }) => (
  <img
    src="/img/claveunica-logo.png"
    alt="ClaveÚnica"
    height={height}
    className={className}
    style={{ width: 'auto', display: 'block' }}
  />
);

export default ClaveUnicaLogo;

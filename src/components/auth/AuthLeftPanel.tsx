import React from 'react';
import MunicipalLogo from '../ui/MunicipalLogo';
import './AuthLeftPanel.css';

interface Props {
  title: string;
  description?: string;
}

const AuthLeftPanel: React.FC<Props> = ({
  title,
  description = 'Portal seguro de trámites para\nciudadanos y personal municipal.',
}) => {
  return (
    <aside className="auth-left">
      <div className="auth-left__stripe">
        <span className="s-blue" />
        <span className="s-red" />
      </div>
      <div className="auth-left__content">
        <div className="auth-left__muni">MUNICIPALIDAD DE SANTO DOMINGO</div>
        <div className="auth-left__sub">Dirección de Tránsito</div>
        <h1 className="auth-left__title">{title}</h1>
        <p className="auth-left__desc">{description}</p>
      </div>
      <div className="auth-left__seal" aria-hidden>
        <MunicipalLogo size={110} />
        <div className="auth-left__seal-text">
          MUNICIPALIDAD<br />SANTO DOMINGO
        </div>
      </div>
    </aside>
  );
};

export default AuthLeftPanel;

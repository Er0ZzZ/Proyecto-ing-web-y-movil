import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  notificationsOutline,
  helpCircleOutline,
  archiveOutline,
  logOutOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './AppHeader.css';

interface AppHeaderProps {
  variant: 'landing' | 'simple' | 'top';
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ variant, title = 'Trámites y Servicios' }) => {
  const { user, logout } = useAppContext();
  const history = useHistory();
  const [menu, setMenu] = useState(false);

  if (variant === 'simple') {
    return (
      <header className="app-header app-header--simple">
        <div className="brand-stripe">
          <span className="s-blue" />
          <span className="s-red" />
        </div>
        <div className="app-header__inner">
          <div className="app-header__brand">
            <div className="app-header__muni" style={{ color: '#94a3b8' }}>
              MUNICIPALIDAD DE SANTO DOMINGO
            </div>
            <div className="app-header__sub" style={{ color: '#cbd5e1' }}>
              Dirección de Tránsito
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'top') {
    return (
      <header className="app-header app-header--top">
        <div className="brand-stripe">
          <span className="s-blue" />
          <span className="s-red" />
        </div>
        <div className="app-header__inner">
          <div className="app-header__title-block">
            <div className="app-header__title">{title}</div>
            {user && (
              <div className="app-header__welcome">
                Bienvenido/a, <strong>{user.nombre}</strong>
              </div>
            )}
          </div>
          <div className="app-header__actions">
            <button className="app-header__icon-btn" aria-label="Buzón de Notificaciones">
              <IonIcon icon={notificationsOutline} />
              <span className="app-header__dot" />
            </button>
            <button className="app-header__icon-btn" aria-label="Ayuda">
              <IonIcon icon={helpCircleOutline} />
            </button>
            <button className="app-header__icon-btn" aria-label="Archivados">
              <IonIcon icon={archiveOutline} />
            </button>
            <div className="app-header__profile" onClick={() => setMenu(!menu)}>
              <IonIcon icon={personCircleOutline} />
              <span>{user?.nombre?.split(' ')[0] ?? 'Usuario'}</span>
              {menu && (
                <div className="app-header__menu">
                  <button onClick={() => { logout(); history.push('/'); }}>
                    <IonIcon icon={logOutOutline} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // landing
  return (
    <header className="app-header app-header--landing">
      <div className="brand-stripe">
        <span className="s-blue" />
        <span className="s-red" />
      </div>
      <div className="app-header__inner">
        <div className="app-header__brand">
          <div className="app-header__muni">MUNICIPALIDAD DE SANTO DOMINGO</div>
          <div className="app-header__sub">Dirección de Tránsito</div>
        </div>
        <nav className="app-header__nav">
          <a onClick={() => history.push('/ciudadano/catalogo')}>Catálogo</a>
          <a onClick={() => history.push('/auth/login')}>Ingresar</a>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;

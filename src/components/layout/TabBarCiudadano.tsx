import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  homeOutline,
  calendarOutline,
  documentTextOutline,
  folderOpenOutline,
  listOutline,
  logOutOutline,
} from 'ionicons/icons';
import { useAppContext } from '../../context/AppContext';
import './TabBar.css';

const ITEMS = [
  { label: 'Inicio',    icon: homeOutline,         path: '/ciudadano/home' },
  { label: 'Agendar',   icon: calendarOutline,     path: '/ciudadano/tramite/tipo' },
  { label: 'Estado',    icon: documentTextOutline, path: '/ciudadano/estado' },
  { label: 'Trámites',  icon: folderOpenOutline,   path: '/ciudadano/mis-tramites' },
  { label: 'Catálogo',  icon: listOutline,         path: '/ciudadano/catalogo' },
];

const TabBarCiudadano: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useAppContext();
  return (
    <nav className="tab-bar tab-bar--light tab-bar--6">
      {ITEMS.map((it) => {
        const active = pathname.startsWith(it.path);
        return (
          <button
            key={it.path}
            className={`tab-bar__item ${active ? 'tab-bar__item--active' : ''}`}
            onClick={() => history.push(it.path)}
          >
            <IonIcon icon={it.icon} />
            <span>{it.label}</span>
          </button>
        );
      })}
      <button
        className="tab-bar__item tab-bar__item--logout"
        onClick={() => { logout(); history.push('/'); }}
        aria-label="Cerrar sesión"
      >
        <IonIcon icon={logOutOutline} />
        <span>Salir</span>
      </button>
    </nav>
  );
};

export default TabBarCiudadano;

import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  homeOutline,
  calendarOutline,
  documentTextOutline,
  folderOpenOutline,
  listOutline,
  settingsOutline,
  logOutOutline,
  callOutline,
} from 'ionicons/icons';
import { useAppContext } from '../../context/AppContext';
import './Sidebar.css';

const MAIN_ITEMS = [
  { key: 'home',     label: 'Inicio',              icon: homeOutline,         path: '/ciudadano/home' },
  { key: 'agendar',  label: 'Reserva tu hora',     icon: calendarOutline,     path: '/ciudadano/tramite/tipo' },
  { key: 'estado',   label: 'Estado Solicitud',    icon: documentTextOutline, path: '/ciudadano/estado' },
  { key: 'tramites', label: 'Mis Trámites',        icon: folderOpenOutline,   path: '/ciudadano/mis-tramites' },
  { key: 'catalogo', label: 'Catálogo de Licencias', icon: listOutline,       path: '/ciudadano/catalogo' },
  { key: 'config',   label: 'Configuración',       icon: settingsOutline,     path: '/ciudadano/home' },
];

const Sidebar: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useAppContext();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-stripe" style={{ width: 80, marginBottom: 12 }}>
          <span className="s-blue" />
          <span className="s-red" />
        </div>
        <div className="sidebar__brand-title">Dirección de Tránsito</div>
        <div className="sidebar__brand-sub">Municipalidad Santo Domingo</div>
      </div>

      <div className="sidebar__section-label">MENÚ PRINCIPAL</div>
      <nav className="sidebar__nav">
        {MAIN_ITEMS.map((it) => {
          const active = pathname.startsWith(it.path) && it.key !== 'config';
          return (
            <button
              key={it.key}
              className={`sidebar__item ${active ? 'sidebar__item--active' : ''}`}
              onClick={() => history.push(it.path)}
            >
              <IonIcon icon={it.icon} />
              <span>{it.label}</span>
            </button>
          );
        })}
        <button
          className="sidebar__item"
          onClick={() => { logout(); history.push('/'); }}
        >
          <IonIcon icon={logOutOutline} />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      <div className="sidebar__divider" />
      <div className="sidebar__section-label">INFORMACIÓN</div>
      <div className="sidebar__info">
        <div className="sidebar__info-title">Ingreso de Solicitud de Ayuda</div>
        <div className="sidebar__info-line">
          <IonIcon icon={callOutline} />
          <div>
            <div>Horario: Lu – Vi / 9:00 – 18:00</div>
            <div className="sidebar__info-phone">600 397 0000</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

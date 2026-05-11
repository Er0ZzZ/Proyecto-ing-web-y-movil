import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  speedometerOutline,
  calendarNumberOutline,
  documentTextOutline,
  barChartOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';
import { useAppContext } from '../../context/AppContext';
import './TabBar.css';

const ITEMS = [
  { key: 'dash',  label: 'Inicio',       icon: speedometerOutline,    path: '/admin/dashboard' },
  { key: 'aforo', label: 'Aforos',       icon: calendarNumberOutline, path: '/admin/gestion' },
  { key: 'valid', label: 'Validación',   icon: documentTextOutline,   path: '/admin/validacion' },
  { key: 'rep',   label: 'Reportes',     icon: barChartOutline,       path: '/admin/dashboard' },
  { key: 'conf',  label: 'Config',       icon: settingsOutline,       path: '/admin/dashboard' },
];

const activeKeyFor = (pathname: string): string => {
  if (pathname.startsWith('/admin/gestion'))    return 'aforo';
  if (pathname.startsWith('/admin/validacion')) return 'valid';
  return 'dash';
};

const TabBarAdmin: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useAppContext();
  const activeKey = activeKeyFor(pathname);

  return (
    <nav className="tab-bar tab-bar--dark tab-bar--6">
      {ITEMS.map((it) => {
        const active = it.key === activeKey;
        return (
          <button
            key={it.key}
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

export default TabBarAdmin;

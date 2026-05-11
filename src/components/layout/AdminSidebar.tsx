import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  homeOutline,
  calendarNumberOutline,
  documentTextOutline,
  settingsOutline,
  logOutOutline,
  lockClosedOutline,
} from 'ionicons/icons';
import { useAppContext } from '../../context/AppContext';
import './Sidebar.css';

const ITEMS = [
  { key: 'home',  label: 'Inicio',                icon: homeOutline,           path: '/admin/dashboard' },
  { key: 'aforo', label: 'Gestión de Aforos',     icon: calendarNumberOutline, path: '/admin/gestion' },
  { key: 'valid', label: 'Validación Documentos', icon: documentTextOutline,   path: '/admin/validacion' },
  { key: 'conf',  label: 'Configuración',         icon: settingsOutline,       path: '/admin/dashboard' },
];

/** Determina qué ítem del menú admin debe iluminarse según la ruta actual.
 *  "Configuración" reusa la ruta de Inicio (sección no implementada), por
 *  lo que en /admin/dashboard siempre marcamos "Inicio" como activo. */
const activeKeyFor = (pathname: string): string => {
  if (pathname.startsWith('/admin/gestion'))    return 'aforo';
  if (pathname.startsWith('/admin/validacion')) return 'valid';
  return 'home';
};

const AdminSidebar: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useAppContext();
  const activeKey = activeKeyFor(pathname);

  return (
    <aside className="sidebar sidebar--admin">
      <div className="sidebar__brand">
        <div className="brand-stripe" style={{ width: 80, marginBottom: 12 }}>
          <span className="s-blue" />
          <span className="s-red" />
        </div>
        <div className="sidebar__brand-title">Admin Tránsito</div>
        <div className="sidebar__brand-sub">Panel de Administración</div>
        <div className="sidebar__admin-badge">
          <IonIcon icon={lockClosedOutline} />
          <span>ACCESO RESTRINGIDO</span>
        </div>
      </div>

      <div className="sidebar__section-label">MENÚ</div>
      <nav className="sidebar__nav">
        {ITEMS.map((it) => {
          const active = it.key === activeKey;
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
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

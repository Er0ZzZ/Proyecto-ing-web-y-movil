import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  calendarOutline,
  checkmarkCircleOutline,
  documentTextOutline,
  hourglassOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import AdminLayout from '../../components/layout/AdminLayout';
import './admin.css';

const KPIS = [
  { icon: calendarOutline,         value: '24',  label: 'Citas Hoy',       detail: '18 atendidas · 6 pendientes', trend: '+12% vs ayer',      trendUp: true  },
  { icon: checkmarkCircleOutline,  value: '75%', label: 'Tasa Asistencia', detail: 'De las citas programadas',    trend: '▼ 5% vs semana',    trendUp: false },
  { icon: documentTextOutline,     value: '8',   label: 'Docs Pendientes', detail: 'Esperando revisión admin',    trend: '3 urgentes',         trendUp: false, urgent: true },
  { icon: hourglassOutline,        value: '11',  label: 'Fila Virtual',    detail: 'Personas en la cola virtual', trend: 'Próx. cupo: 14:30',  trendUp: true  },
];

const DEMANDADOS = [
  { name: 'Lic. No Prof. Clase B', count: 38, pct: 52 },
  { name: 'Renovación Licencia',   count: 20, pct: 27 },
  { name: 'Lic. Prof. Clase A',    count: 9,  pct: 12 },
  { name: 'Duplicado',             count: 6,  pct: 8 },
  { name: 'Lic. Clase E (Moto)',   count: 4,  pct: 5 },
];

const ACTIVIDAD = [
  { who: 'Juan Pérez',    what: 'Documentos aprobados',                  time: '14:32', type: 'success' },
  { who: 'María García',  what: 'Cita reagendada para 15/06',            time: '14:15', type: 'info'    },
  { who: 'Carlos Rojas',  what: 'Documentos rechazados',                 time: '13:50', type: 'error'   },
  { who: '',              what: 'Bloque 10:00–11:00 bloqueado por feriado', time: '13:20', type: 'warning' },
  { who: 'Ana Martínez',  what: 'Cita confirmada',                       time: '12:45', type: 'success' },
];

const MenuPrincipalAdmin: React.FC = () => {
  const history = useHistory();
  return (
    <AdminLayout title="Dashboard" subtitle="Resumen del día">
      <div className="kpi-grid">
        {KPIS.map((k) => (
          <div key={k.label} className={`kpi-card ${k.urgent ? 'kpi-card--urgent' : ''}`}>
            <div className="kpi-card__head">
              <div className="kpi-card__icon"><IonIcon icon={k.icon} /></div>
              <div className="kpi-card__label">{k.label}</div>
            </div>
            <div className="kpi-card__value">{k.value}</div>
            <div className="kpi-card__sub">{k.detail}</div>
            <div className={`kpi-card__trend ${k.trendUp ? 'is-up' : 'is-down'}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="quick-grid">
        <div className="quick-card" onClick={() => history.push('/admin/gestion')}>
          <div className="quick-card__head">
            <h4>Gestión de Aforos</h4>
            <span className="quick-card__cta">Abrir panel <IonIcon icon={arrowForwardOutline} /></span>
          </div>
          <p>Crea, modifica y bloquea bloques de atención en el calendario. Define la capacidad máxima por hora según disponibilidad.</p>
          <div className="quick-card__stats">
            <div><strong>6</strong><span>Bloques hoy</span></div>
            <div><strong>3</strong><span>Disponibles</span></div>
            <div><strong>1</strong><span>Bloqueados</span></div>
          </div>
        </div>

        <div className="quick-card" onClick={() => history.push('/admin/validacion')}>
          <div className="quick-card__head">
            <h4>Validación de Documentos</h4>
            <span className="quick-card__cta">Revisar cola <IonIcon icon={arrowForwardOutline} /></span>
          </div>
          <p>Revisa los documentos subidos por los ciudadanos. Aprueba o rechaza con comentario. Gestiona el estado de cada solicitud.</p>
          <div className="quick-card__stats">
            <div><strong>8</strong><span>Pendientes</span></div>
            <div><strong>14</strong><span>Aprobados hoy</span></div>
            <div><strong>2</strong><span>Rechazados</span></div>
          </div>
        </div>
      </div>

      <div className="panel-grid">
        <div className="panel-card">
          <div className="panel-card__head">
            <h3>Trámites más demandados</h3>
            <span className="panel-card__sub">Esta semana</span>
          </div>
          {DEMANDADOS.map((d) => (
            <div key={d.name} className="bar-row">
              <span className="bar-row__name">{d.name}</span>
              <span className="bar-row__track">
                <span className="bar-row__fill" style={{ width: `${d.pct}%` }} />
              </span>
              <span className="bar-row__val">{d.count} ({d.pct}%)</span>
            </div>
          ))}
        </div>

        <div className="panel-card">
          <div className="panel-card__head">
            <h3>Actividad Reciente</h3>
          </div>
          {ACTIVIDAD.map((a, i) => (
            <div key={i} className={`activity-item activity-item--${a.type}`}>
              <span className="activity-item__bullet" />
              <div className="activity-item__body">
                <div>
                  {a.who && <strong>{a.who} — </strong>}
                  {a.what}
                </div>
                <time>{a.time}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MenuPrincipalAdmin;

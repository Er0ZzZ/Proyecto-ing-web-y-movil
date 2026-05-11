import React from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline, checkmarkCircle, ellipseOutline, ellipse, timeOutline } from 'ionicons/icons';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import './ciudadano.css';

type StageState = 'done' | 'active' | 'next' | 'final';

const STAGES: Array<{ state: StageState; title: string; date: string; desc: string }> = [
  {
    state: 'done',
    title: 'Ingreso y Carga de Documentos',
    date: '10 Abril 2026',
    desc: 'Tus documentos fueron recibidos y registrados correctamente.',
  },
  {
    state: 'active',
    title: 'Validación Documental Asíncrona',
    date: 'En curso · 1–2 días hábiles',
    desc: 'Un funcionario está revisando tu carpeta de documentos. Te notificaremos por correo cuando finalice.',
  },
  {
    state: 'next',
    title: 'Rendición de Exámenes Presenciales',
    date: 'Cita: Vie 22 Mayo · 10:30',
    desc: 'Asiste a la oficina con tu cédula a la hora agendada para rendir los exámenes teórico y práctico.',
  },
  {
    state: 'final',
    title: 'Emisión y Entrega de Licencia',
    date: 'Estimado: 5 días hábiles',
    desc: 'Tras aprobar los exámenes, podrás retirar tu licencia en la Dirección de Tránsito.',
  },
];

const STAGE_LABEL: Record<StageState, string> = {
  done: 'Etapa Anterior',
  active: 'Etapa Actual',
  next: 'Etapa Siguiente',
  final: 'Etapa Final',
};

const ICONS: Record<StageState, any> = {
  done: checkmarkCircle,
  active: ellipse,
  next: ellipseOutline,
  final: ellipseOutline,
};

const EstadoSolicitud: React.FC = () => (
  <CiudadanoLayout title="Estado de Solicitud">
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-hint)' }}>Trámite</div>
          <strong style={{ fontSize: 16 }}>Licencia No Profesional Clase B</strong>
        </div>
        <StatusBadge status="validacion" />
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <span><strong>Folio:</strong> 67699659</span>
        <span><strong>Ingresado:</strong> 10 Abril 2026</span>
        <span><strong>Solicitante:</strong> Juan Pérez R. · 12.345.678-9</span>
      </div>
    </div>

    <div className="search-bar">
      <IonIcon icon={searchOutline} />
      <input placeholder="Buscar por folio o tipo de trámite" />
    </div>
    <div className="filter-row">
      <span className="chip chip--active">Todos</span>
      <span className="chip">En validación</span>
      <span className="chip">Aprobados</span>
      <span className="chip">Rechazados</span>
    </div>

    <h3 className="section-title">Línea de tiempo del trámite</h3>

    <div className="hstep-grid">
      {STAGES.map((s, i) => (
        <div key={i} className={`hstep-card hstep-card--${s.state}`}>
          <div className="hstep-card__label">{STAGE_LABEL[s.state]}</div>
          <div className="hstep-card__icon">
            <IonIcon icon={ICONS[s.state]} />
          </div>
          <div className="hstep-card__title">{s.title}</div>
          <div className="hstep-card__date">
            <IonIcon icon={timeOutline} /> {s.date}
          </div>
          <p className="hstep-card__desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </CiudadanoLayout>
);

export default EstadoSolicitud;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  calendarOutline,
  listOutline,
  documentTextOutline,
  folderOpenOutline,
  calendarNumberOutline,
  chevronDown,
  cloudUploadOutline,
  checkmarkDoneOutline,
  carSportOutline,
} from 'ionicons/icons';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import './ciudadano.css';
// useAppContext intentionally not imported — banner uses static copy per Figma

const ACTIONS = [
  { icon: calendarOutline,     title: 'Agendar\nHora',          desc: 'Reserva tu cita en línea',  path: '/ciudadano/tramite/tipo' },
  { icon: listOutline,         title: 'Catálogo de\nLicencias', desc: 'Requisitos y documentos',   path: '/ciudadano/catalogo' },
  { icon: documentTextOutline, title: 'Estado de\nSolicitud',   desc: 'Revisa tu trámite activo',  path: '/ciudadano/estado' },
  { icon: folderOpenOutline,   title: 'Mis\nTrámites',          desc: 'Historial y gestión',       path: '/ciudadano/mis-tramites' },
];

const STEPS = [
  { n: 1, icon: cloudUploadOutline,     title: 'Sube tus documentos', desc: 'Cédula, certificado de residencia\ny antecedentes de manejo' },
  { n: 2, icon: calendarNumberOutline,  title: 'Agenda tu hora',      desc: 'Elige el día y bloque\nhorario disponible' },
  { n: 3, icon: checkmarkDoneOutline,   title: 'Validación',          desc: 'Revisamos tus documentos\nen 1–2 días hábiles' },
  { n: 4, icon: carSportOutline,        title: 'Asiste y recibe',     desc: 'Rinde los exámenes\ny recibe tu licencia' },
];

const FAQS = [
  {
    q: '¿Qué documentos necesito para mi primera licencia?',
    a: 'Cédula de identidad vigente, certificado de residencia, certificado de estudios, certificado de antecedentes para fines especiales y una declaración jurada de no consumo de drogas.',
  },
  {
    q: '¿Puedo cancelar o reprogramar mi cita?',
    a: 'Sí, con al menos 48 horas de anticipación. Cancelaciones fuera de plazo generan un bloqueo temporal de 30 días para agendar nuevamente.',
  },
  {
    q: '¿Cuál es el costo del trámite?',
    a: 'El valor varía según la clase de licencia. Consulta los aranceles vigentes en la sección Catálogo de Licencias. Valores fijados por el Ministerio de Hacienda.',
  },
  {
    q: '¿Qué ocurre si repruebo?',
    a: 'Si un postulante reprueba el examen teórico o el práctico, la normativa le concede una segunda oportunidad para rendirlo sin costo adicional dentro de un plazo de 25 días.',
  },
  {
    q: '¿Con cuánta anticipación debo agendar mi hora?',
    a: 'Recomendamos al menos un mes de anticipación. En períodos de alta demanda los cupos se agotan rápidamente. La lista de espera es automática.',
  },
];

const MenuPrincipal: React.FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <CiudadanoLayout title="Inicio" mobileBack={false}>
      <div className="menu-hero">
        <h1>Trámites de Tránsito</h1>
        <p>Agenda tu hora, revisa el estado de tu solicitud y consulta los requisitos para obtener o renovar tu licencia.</p>
      </div>

      <div className="action-grid">
        {ACTIONS.map((a) => (
          <div key={a.title} className="action-card" onClick={() => history.push(a.path)}>
            <div className="action-card__icon"><IonIcon icon={a.icon} /></div>
            <div className="action-card__title" style={{ whiteSpace: 'pre-line' }}>{a.title}</div>
            <div className="action-card__desc">{a.desc}</div>
          </div>
        ))}
      </div>

      <div className="appointment-banner">
        <div className="appointment-banner__icon">
          <IonIcon icon={calendarOutline} />
        </div>
        <div className="appointment-banner__text">
          <strong>No tienes citas agendadas próximamente</strong>
          <span>Agenda tu hora para obtener o renovar tu licencia de conducir.</span>
        </div>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '0 20px', height: 40 }}
          onClick={() => history.push('/ciudadano/tramite/tipo')}
        >
          Agendar hora
        </button>
      </div>

      <h3 className="section-title">¿Cómo funciona el proceso?</h3>
      <div className="steps-grid">
        {STEPS.map((s) => (
          <div key={s.n} className="step-card">
            <div className="step-card__num">{s.n}</div>
            <div className="step-card__icon"><IonIcon icon={s.icon} /></div>
            <div className="step-card__title">{s.title}</div>
            <div className="step-card__desc" style={{ whiteSpace: 'pre-line' }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Preguntas Frecuentes</h3>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div className={`faq-item ${open === i ? 'faq-item--open' : ''}`} key={i}>
            <button className="faq-item__head" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <IonIcon icon={chevronDown} />
            </button>
            {open === i && <div className="faq-item__body">{f.a}</div>}
          </div>
        ))}
      </div>
    </CiudadanoLayout>
  );
};

export default MenuPrincipal;

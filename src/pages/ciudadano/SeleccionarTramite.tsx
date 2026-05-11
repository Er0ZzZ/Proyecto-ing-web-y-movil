import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import './ciudadano.css';

const TRAMITES = [
  { id: 'A',         cat: 'Profesional',     title: 'Clase A',          desc: 'Transporte colectivo de pasajeros y vehículos de carga' },
  { id: 'B',         cat: 'No Profesional',  title: 'Clase B',          desc: 'Automóviles, jeep, station wagon y similares' },
  { id: 'B17',       cat: 'No Profesional',  title: 'Clase B (17)',     desc: 'Para mayores de 17 años conduciendo con tutor habilitado' },
  { id: 'C',         cat: 'No Profesional',  title: 'Clase C',          desc: 'Camiones, buses y vehículos de carga mayor' },
  { id: 'CR',        cat: 'No Profesional',  title: 'Clase CR',         desc: 'Vehículos con remolque o semirremolque acoplado' },
  { id: 'D',         cat: 'Especial',        title: 'Clase D',          desc: 'Tractores agrícolas y maquinaria industrial especial' },
  { id: 'E',         cat: 'Especial',        title: 'Clase E',          desc: 'Motocicletas, motonetas y triciclos motorizados' },
  { id: 'RENOVAR',   cat: 'Renovación',      title: 'Renovar Licencia', desc: 'Renueva tu licencia vigente o vencida recientemente' },
  { id: 'DUPLICADO', cat: 'Duplicado',       title: 'Duplicado',        desc: 'Solicita un duplicado por extravío, daño o robo' },
];

const STEPS = [
  { n: 1, label: 'Seleccionar Trámite' },
  { n: 2, label: 'Carga de Documentos' },
  { n: 3, label: 'Calendarización' },
];

const SeleccionarTramite: React.FC = () => {
  const history = useHistory();
  const [sel, setSel] = useState<string | null>('B');

  return (
    <CiudadanoLayout title="Seleccionar Trámite">
      <div className="stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className={`stepper__step ${i === 0 ? 'stepper__step--active' : ''}`}>
              <span className="stepper__num">{s.n}</span>
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="stepper__line" />}
          </React.Fragment>
        ))}
      </div>

      <h2 className="section-title" style={{ marginBottom: 4 }}>¿Qué tipo de licencia necesitas?</h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 24 }}>
        Selecciona la licencia que deseas obtener o renovar. Puedes consultar los requisitos en el Catálogo de Licencias.
      </p>

      <div className="tramite-grid">
        {TRAMITES.map((t) => (
          <div
            key={t.id}
            className={`tramite-card ${sel === t.id ? 'tramite-card--selected' : ''}`}
            onClick={() => setSel(t.id)}
          >
            <div className="tramite-card__head">
              <span className="tramite-card__cat">{t.cat}</span>
              <span className="tramite-card__radio" />
            </div>
            <div className="tramite-card__title">{t.title}</div>
            <div className="tramite-card__desc">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="actions-row">
        <button className="btn-ghost" onClick={() => history.push('/ciudadano/home')}>← Cancelar y volver</button>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '0 32px' }}
          disabled={!sel}
          onClick={() => history.push('/ciudadano/tramite/documentos')}
        >
          Continuar →
        </button>
      </div>
    </CiudadanoLayout>
  );
};

export default SeleccionarTramite;

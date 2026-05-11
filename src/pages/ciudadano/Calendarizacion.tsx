import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  locationOutline,
  checkmarkCircle,
  chevronBackOutline,
  chevronForwardOutline,
  flashOutline,
} from 'ionicons/icons';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import { useAppContext } from '../../context/AppContext';
import './ciudadano.css';

const STEPS = [
  { n: 1, label: 'Seleccionar Trámite' },
  { n: 2, label: 'Carga de Documentos' },
  { n: 3, label: 'Calendarización' },
];

// Mayo 2026 — 1 cae viernes
const WEEK_HEADERS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const buildMay2026 = () => {
  const offset = 5; // 1 May = Viernes
  const days = 31;
  const cells: Array<number | null> = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'];
const FULL = ['09:30', '11:00'];

const Calendarizacion: React.FC = () => {
  const history = useHistory();
  const { setTramiteActivo, filaVirtual, setFilaVirtual } = useAppContext();
  const [day, setDay] = useState<number>(8);
  const [slot, setSlot] = useState<string | null>('10:30');
  const cells = buildMay2026();

  const confirmar = () => {
    if (!slot) return;
    setTramiteActivo({
      tipo: 'Licencia No Profesional Clase B',
      documentos: [],
      fechaCita: `2026-05-${String(day).padStart(2, '0')} ${slot}`,
      estado: 'validacion',
    });
    history.push('/ciudadano/estado');
  };

  return (
    <CiudadanoLayout title="Calendarización">
      <div className="stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className={`stepper__step ${i < 2 ? 'stepper__step--done' : 'stepper__step--active'}`}>
              <span className="stepper__num">{i < 2 ? '✓' : s.n}</span>
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="stepper__line" />}
          </React.Fragment>
        ))}
      </div>

      <div className="cal-toolbar">
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-text-hint)' }}>Trámite seleccionado</div>
          <strong>Licencia No Profesional Clase B</strong>
        </div>
        <a onClick={() => history.push('/ciudadano/tramite/tipo')}>← Cambiar tipo de licencia</a>
      </div>

      <div className="cal-location">
        <IonIcon icon={locationOutline} />
        <div>
          <div className="cal-location__label">Ubicación de Atención</div>
          <div className="cal-location__addr">Av. Argentina 864, Valparaíso</div>
        </div>
      </div>

      <div className="cal-split">
        <div>
          <div className="cal-month-head">
            <button className="cal-nav" aria-label="Anterior"><IonIcon icon={chevronBackOutline} /></button>
            <strong>Mayo 2026</strong>
            <button className="cal-nav" aria-label="Siguiente"><IonIcon icon={chevronForwardOutline} /></button>
          </div>
          <div className="cal-month">
            {WEEK_HEADERS.map((h) => (
              <div key={h} className="cal-month__head">{h}</div>
            ))}
            {cells.map((c, i) => (
              <button
                key={i}
                disabled={!c}
                className={`cal-month__day ${c === day ? 'cal-month__day--active' : ''}`}
                onClick={() => c && setDay(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 15, margin: '4px 0 12px' }}>Horas Disponibles ({day} de Mayo)</h3>
          <div className="slots">
            {SLOTS.map((s) => {
              const full = FULL.includes(s);
              return (
                <button
                  key={s}
                  disabled={full}
                  className={`slot ${full ? 'slot--full' : ''} ${slot === s ? 'slot--active' : ''}`}
                  onClick={() => !full && setSlot(s)}
                >
                  {s}
                  {full && <div style={{ fontSize: 10 }}>Lleno</div>}
                </button>
              );
            })}
          </div>

          {!slot && (
            <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-hint)' }}>
              Seleccione una hora de atención
            </p>
          )}

          {slot && (
            <div className="summary-card">
              <IonIcon icon={checkmarkCircle} style={{ fontSize: 20, color: 'var(--color-success)' }} />
              <div>
                Has seleccionado el <strong>Viernes {day} de Mayo a las {slot} hrs</strong>. Tu documentación previa ya ha sido cargada con éxito.
              </div>
            </div>
          )}

          {/* Fila virtual de adelantamiento */}
          <button
            type="button"
            className={`fila-virtual ${filaVirtual ? 'fila-virtual--on' : ''}`}
            onClick={() => setFilaVirtual(!filaVirtual)}
            aria-pressed={filaVirtual}
          >
            <div className="fila-virtual__icon">
              <IonIcon icon={flashOutline} />
            </div>
            <div className="fila-virtual__body">
              <div className="fila-virtual__title">Unirme a la fila virtual de adelantamiento</div>
              <div className="fila-virtual__desc">
                Si alguien cancela, el sistema te notificará para que puedas adelantar tu hora automáticamente.
              </div>
            </div>
            <div className="fila-virtual__check" aria-hidden>
              <span />
            </div>
          </button>

          <button
            className="btn-primary"
            style={{ marginTop: 16 }}
            disabled={!slot}
            onClick={confirmar}
          >
            Confirmar cita
          </button>
        </div>
      </div>

      <div className="actions-row">
        <button className="btn-ghost" onClick={() => history.goBack()}>← Volver</button>
      </div>
    </CiudadanoLayout>
  );
};

export default Calendarizacion;

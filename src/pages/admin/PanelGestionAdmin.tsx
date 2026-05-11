import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  chevronBackOutline,
  chevronForwardOutline,
  addOutline,
  banOutline,
  downloadOutline,
} from 'ionicons/icons';
import AdminLayout from '../../components/layout/AdminLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import './admin.css';

const WEEK_HEADERS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

interface Cell {
  num?: number;
  intensity?: 'low' | 'med' | 'high';
  blocked?: boolean;
  bloques?: string[];
}

// Junio 2026 — 1 cae lunes (offset 1)
const buildJune2026 = (): Cell[] => {
  const offset = 1;
  const days = 30;
  const cells: Cell[] = [];
  for (let i = 0; i < offset; i++) cells.push({});
  for (let d = 1; d <= days; d++) {
    const cell: Cell = { num: d };
    if (d === 15) {
      cell.blocked = true;
    } else if (d === 12) {
      cell.intensity = 'med';
      cell.bloques = ['09:00 — 3/4 cupos', '10:00 — 4/4 lleno', '11:00 — 2/4 cupos'];
    } else if (d === 11) {
      cell.intensity = 'high';
      cell.bloques = ['11:00 — 7/7 lleno', '09:00 — 4/4 lleno'];
    } else {
      cell.intensity = (d % 4 === 0 ? 'med' : d % 7 === 0 ? 'high' : 'low');
    }
    cells.push(cell);
  }
  while (cells.length % 7 !== 0) cells.push({});
  return cells;
};

const BLOQUES_DIA = [
  { hora: '09:00–10:00', ocupados: 3, cupos: 4, estado: 'disponible' as const },
  { hora: '10:00–11:00', ocupados: 4, cupos: 4, estado: 'lleno' as const },
  { hora: '11:00–12:00', ocupados: 2, cupos: 4, estado: 'disponible' as const },
  { hora: '14:00–15:00', ocupados: 1, cupos: 4, estado: 'disponible' as const },
];

const PanelGestionAdmin: React.FC = () => {
  const cells = buildJune2026();
  const [sel, setSel] = useState<number>(12);
  const [recurrente, setRecurrente] = useState(false);

  return (
    <AdminLayout title="Gestión de Aforos y Disponibilidad" subtitle="Crea, modifica y bloquea bloques de atención">
      <div className="cal-toolbar-admin">
        <div className="cal-toolbar-admin__nav">
          <button><IonIcon icon={chevronBackOutline} /> Anterior</button>
          <strong>Junio 2026</strong>
          <button>Siguiente <IonIcon icon={chevronForwardOutline} /></button>
        </div>
        <div className="cal-toolbar-admin__actions">
          <button><IonIcon icon={banOutline} /> Bloquear día</button>
          <button><IonIcon icon={downloadOutline} /> Exportar</button>
          <button className="primary"><IonIcon icon={addOutline} /> Agregar bloque</button>
        </div>
      </div>

      <div className="panel-grid">
        <div>
          <div className="cal-month-admin">
            {WEEK_HEADERS.map((h) => (
              <div key={h} className="cal-month-admin__head">{h}</div>
            ))}
            {cells.map((c, i) => {
              const cls = [
                'cal-cell',
                !c.num && 'cal-cell--out',
                c.blocked && 'cal-cell--block',
                c.intensity && `cal-cell--${c.intensity}`,
                c.num === sel && 'cal-cell--sel',
              ].filter(Boolean).join(' ');
              return (
                <div key={i} className={cls} onClick={() => c.num && setSel(c.num)}>
                  {c.num && (
                    <>
                      <span className="cal-cell__num">{c.num}</span>
                      {c.blocked && <span className="cal-cell__block-tag">Bloqueado</span>}
                      {c.bloques && c.bloques.slice(0, 2).map((b, k) => (
                        <span key={k} className="cal-cell__bloque">{b}</span>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="legend">
            <span><span className="legend__dot legend__dot--low" /> Disponible</span>
            <span><span className="legend__dot legend__dot--med" /> Medio</span>
            <span><span className="legend__dot legend__dot--high" /> Lleno</span>
            <span><span className="legend__dot legend__dot--block" /> Bloqueado</span>
          </div>
        </div>

        <div>
          <div className="panel-card config-form" style={{ marginBottom: 16 }}>
            <h3 style={{ marginTop: 0, fontSize: 15 }}>Configurar Bloque de Atención</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-hint)', margin: '0 0 12px' }}>
              Día seleccionado: <strong>Jue {sel} Jun 2026</strong>
            </p>

            <div className="row-2">
              <div>
                <label className="field-label">Hora de inicio</label>
                <input className="input-field" type="time" defaultValue="09:00" />
              </div>
              <div>
                <label className="field-label">Hora de término</label>
                <input className="input-field" type="time" defaultValue="10:00" />
              </div>
            </div>

            <label className="field-label">Cupos máximos</label>
            <input className="input-field" type="number" defaultValue={4} min={1} />

            <label className="field-label">Tipo de atención</label>
            <select className="input-field" defaultValue="ambos">
              <option value="teorico">Examen teórico</option>
              <option value="practico">Examen práctico</option>
              <option value="ambos">Examen teórico + práctico</option>
              <option value="renovacion">Renovación</option>
            </select>

            <label
              style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, fontSize: 12, color: 'var(--color-text-secondary)' }}
            >
              <input
                type="checkbox"
                checked={recurrente}
                onChange={(e) => setRecurrente(e.target.checked)}
              />
              Bloque recurrente (repetir semanalmente)
            </label>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn-primary" style={{ flex: 1 }}>Guardar bloque</button>
              <button className="btn-nav" style={{ flex: 1, color: 'var(--color-error)' }}>Eliminar este bloque</button>
            </div>
          </div>

          <div className="panel-card">
            <h3 style={{ marginTop: 0, fontSize: 15 }}>Bloques del día seleccionado</h3>
            {BLOQUES_DIA.map((b) => (
              <div key={b.hora} className="bloque-row">
                <div>
                  <div className="bloque-row__hora">{b.hora}</div>
                  <div className="bloque-row__cap">{b.ocupados}/{b.cupos} cupos</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <StatusBadge status={b.estado === 'lleno' ? 'rechazado' : 'aprobado'}>
                    {b.estado === 'lleno' ? 'Lleno' : 'Disponible'}
                  </StatusBadge>
                  <button className="btn-nav" style={{ padding: '4px 12px', height: 28 }}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PanelGestionAdmin;

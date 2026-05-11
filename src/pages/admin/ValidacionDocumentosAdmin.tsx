import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import { IonIcon } from '@ionic/react';
import {
  documentTextOutline,
  checkmarkOutline,
  closeOutline,
  arrowBackOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import './admin.css';

interface Solicitante {
  id: number;
  inicial: string;
  nombre: string;
  rut: string;
  tipo: string;
  pendientes: string;
  urgente?: boolean;
}

const SOLICITANTES: Solicitante[] = [
  { id: 1, inicial: 'J', nombre: 'Juan Pérez R.',     rut: '12.345.678-9', tipo: 'Lic. Clase B',         pendientes: '2/5 docs pendientes', urgente: true },
  { id: 2, inicial: 'A', nombre: 'Ana Martínez L.',   rut: '15.678.901-2', tipo: 'Renovación Licencia',  pendientes: '1/3 docs pendientes' },
  { id: 3, inicial: 'M', nombre: 'María González P.', rut: '18.765.432-1', tipo: 'Duplicado',            pendientes: '1/2 docs pendientes' },
  { id: 4, inicial: 'C', nombre: 'Carlos Rojas V.',   rut: '11.222.333-4', tipo: 'Lic. Clase A',         pendientes: '5/5 docs pendientes', urgente: true },
  { id: 5, inicial: 'P', nombre: 'Pedro Soto M.',     rut: '14.555.666-7', tipo: 'Lic. Clase E',         pendientes: '3/4 docs pendientes' },
];

const DOCS = [
  { id: 0, label: 'Cédula de Identidad' },
  { id: 1, label: 'Cert. Residencia' },
  { id: 2, label: 'Cert. Estudios' },
  { id: 3, label: 'Cert. Antecedentes' },
  { id: 4, label: 'Decl. Jurada Drogas' },
];

const ValidacionDocumentosAdmin: React.FC = () => {
  const [selId, setSelId] = useState(1);
  const [filter, setFilter] = useState<'todos' | 'urgente' | 'normal'>('todos');
  const [tab, setTab] = useState(1);
  const [comentario, setComentario] = useState('');
  const solicitante = SOLICITANTES.find((s) => s.id === selId)!;

  const filtered = SOLICITANTES.filter(
    (s) => filter === 'todos' || (filter === 'urgente' ? s.urgente : !s.urgente)
  );

  return (
    <AdminLayout title="Validación de Documentos" subtitle="Revisión asíncrona de carpetas">
      <div className="validation-grid">
        {/* Cola */}
        <div className="queue-list">
          <div className="queue-list__head">
            <h3>Cola de Revisión</h3>
            <span className="count">{SOLICITANTES.length}</span>
          </div>
          <div className="queue-filters">
            <button
              className={`queue-filter ${filter === 'todos' ? 'queue-filter--active' : ''}`}
              onClick={() => setFilter('todos')}
            >Todos</button>
            <button
              className={`queue-filter ${filter === 'urgente' ? 'queue-filter--active' : ''}`}
              onClick={() => setFilter('urgente')}
            >Urgente</button>
            <button
              className={`queue-filter ${filter === 'normal' ? 'queue-filter--active' : ''}`}
              onClick={() => setFilter('normal')}
            >Normal</button>
          </div>

          {filtered.map((s) => (
            <div
              key={s.id}
              className={`queue-item ${selId === s.id ? 'queue-item--active' : ''}`}
              onClick={() => setSelId(s.id)}
            >
              <div className="queue-item__avatar">{s.inicial}</div>
              <div className="queue-item__body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                  <div>
                    <div className="queue-item__name">{s.nombre}</div>
                    <div className="queue-item__rut">{s.rut}</div>
                  </div>
                  {s.urgente && <StatusBadge status="urgente" />}
                </div>
                <div className="queue-item__meta">
                  {s.tipo} · {s.pendientes}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="doc-preview">
          <div className="doc-preview__head">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div className="doc-preview__head-title">
                  {solicitante.nombre.replace(' R.', ' Rodríguez').replace(' L.', ' López').replace(' P.', ' Pérez').replace(' V.', ' Valenzuela').replace(' M.', ' Muñoz')} — RUT {solicitante.rut}
                </div>
                <div className="doc-preview__head-meta">
                  {solicitante.tipo.replace('Lic.', 'Licencia')} · Solicitado 25 May 2026
                </div>
              </div>
              <StatusBadge status="validacion">En Revisión</StatusBadge>
            </div>
          </div>

          <div className="doc-tabs">
            {DOCS.map((d) => (
              <button
                key={d.id}
                className={`doc-tab ${tab === d.id ? 'doc-tab--active' : ''}`}
                onClick={() => setTab(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="preview-area">
            <div className="preview-area__inner">
              <IonIcon icon={documentTextOutline} style={{ fontSize: 48, color: 'var(--color-brand-primary)' }} />
              <div className="preview-area__doc">{DOCS[tab].label}</div>
              <div className="preview-area__file">
                certificado_{DOCS[tab].label.toLowerCase().replace(/[. ]+/g, '_')}_juan_perez.pdf · 245 KB
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-hint)' }}>
                Vista previa del documento subido por el solicitante.
              </div>
            </div>
          </div>
        </div>

        {/* Decisión */}
        <div className="decision-panel">
          <h4>Decisión</h4>
          <div className="dec-meta">
            <div className="dec-meta__row">
              <span className="dec-meta__label">Documento</span>
              <span className="dec-meta__value">{DOCS[tab].label}</span>
            </div>
            <div className="dec-meta__row">
              <span className="dec-meta__label">Subido el</span>
              <span className="dec-meta__value">10 Abril 2026 · 09:14</span>
            </div>
            <div className="dec-meta__row">
              <span className="dec-meta__label">Formato</span>
              <span className="dec-meta__value">PDF · 245 KB</span>
            </div>
            <div className="dec-meta__row">
              <span className="dec-meta__label">Estado</span>
              <span className="dec-meta__value">Pendiente de revisión</span>
            </div>
          </div>

          <div>
            <label className="field-label">Comentario (opcional)</label>
            <textarea
              placeholder="Escriba el motivo si rechaza o un comentario para el ciudadano..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          <div className="decision-buttons">
            <button className="btn-approve"><IonIcon icon={checkmarkOutline} /> Aprobar documento</button>
            <button className="btn-reject"><IonIcon icon={closeOutline} /> Rechazar documento</button>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-hint)', letterSpacing: '.06em', marginBottom: 6 }}>NAVEGACIÓN</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button className="btn-nav" onClick={() => setTab(Math.max(0, tab - 1))}>
                <IonIcon icon={arrowBackOutline} /> Anterior
              </button>
              <button className="btn-nav" onClick={() => setTab(Math.min(DOCS.length - 1, tab + 1))}>
                Siguiente <IonIcon icon={arrowForwardOutline} />
              </button>
            </div>
          </div>

          <button className="btn-primary">Confirmar revisión completa</button>
          <button className="btn-ghost" style={{ marginTop: -8 }}>← Volver a la cola</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ValidacionDocumentosAdmin;

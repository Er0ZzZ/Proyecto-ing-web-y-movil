import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import StatusBadge, { Status } from '../../components/ui/StatusBadge';
import { useIsDesktop } from '../../hooks/useBreakpoint';
import './ciudadano.css';

const TRAMITES: Array<{
  folio: string;
  tipo: string;
  fecha: string;
  estado: Status;
  cita: string;
  reagendable: boolean;
}> = [
  { folio: '67699659', tipo: 'Obtención Lic. Clase B', fecha: '10 Abr 2026', estado: 'validacion', cita: '22/05 · 10:30', reagendable: true },
  { folio: '67556684', tipo: 'Renovación Licencia',    fecha: '03 Abr 2026', estado: 'aprobado',   cita: '06/04 · 11:00', reagendable: false },
  { folio: '67556455', tipo: 'Duplicado',              fecha: '21 Mar 2026', estado: 'rechazado',  cita: '24/03 · 09:30', reagendable: false },
];

const FILTROS: Array<{ key: string; label: string }> = [
  { key: 'todos',      label: 'Todos' },
  { key: 'validacion', label: 'En validación' },
  { key: 'aprobado',   label: 'Aprobados' },
  { key: 'rechazado',  label: 'Rechazados' },
];

const MisTramites: React.FC = () => {
  const isDesktop = useIsDesktop();
  const history = useHistory();
  const [f, setF] = useState('todos');
  const [q, setQ] = useState('');

  const items = TRAMITES.filter(
    (t) =>
      (f === 'todos' || t.estado === f) &&
      (q === '' || t.folio.includes(q) || t.tipo.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <CiudadanoLayout title="Mis Trámites" mobileBack={false}>
      <h2 className="section-title" style={{ marginBottom: 4 }}>Mis Trámites</h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 16 }}>
        Historial completo de solicitudes. Puedes cancelar o reprogramar trámites con más de 48 horas de anticipación.
      </p>

      <div className="search-bar">
        <IonIcon icon={searchOutline} />
        <input
          placeholder="Buscar por folio o tipo de trámite"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {FILTROS.map((x) => (
          <span
            key={x.key}
            className={`chip ${f === x.key ? 'chip--active' : ''}`}
            onClick={() => setF(x.key)}
          >
            {x.label}
          </span>
        ))}
      </div>

      {isDesktop ? (
        <table className="tabla">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Tipo de trámite</th>
              <th>Fecha ingreso</th>
              <th>Cita</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.folio}>
                <td><strong>{t.folio}</strong></td>
                <td>{t.tipo}</td>
                <td>{t.fecha}</td>
                <td>{t.cita}</td>
                <td><StatusBadge status={t.estado} /></td>
                <td>
                  <div className="row-actions">
                    <button onClick={() => history.push('/ciudadano/estado')}>Ver detalle</button>
                    {t.reagendable && <button>Reprogramar</button>}
                    {t.reagendable && <button className="danger">Cancelar</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          {items.map((t) => (
            <div className="list-card" key={t.folio}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <strong>{t.tipo}</strong>
                <StatusBadge status={t.estado} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Folio <strong>{t.folio}</strong> · Cita {t.cita} · Ingreso {t.fecha}
              </div>
              <div className="row-actions" style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <button onClick={() => history.push('/ciudadano/estado')}>Ver detalle</button>
                {t.reagendable && <button>Reprogramar</button>}
                {t.reagendable && <button className="danger">Cancelar</button>}
              </div>
            </div>
          ))}
        </>
      )}

      <div className="warn-note">
        ⚠ Solo puedes reprogramar o cancelar trámites con al menos <strong>48 horas</strong> de anticipación a la cita. Cancelaciones fuera de plazo generan un bloqueo temporal de 30 días.
      </div>
    </CiudadanoLayout>
  );
};

export default MisTramites;

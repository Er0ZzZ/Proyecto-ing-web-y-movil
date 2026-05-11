import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import { IonIcon } from '@ionic/react';
import { cloudUploadOutline, chevronDown, openOutline, businessOutline } from 'ionicons/icons';
import './ciudadano.css';

interface Doc {
  num: number;
  name: string;
  tipo: 'obligatorio' | 'condicional';
  desc: string;
  action?: { label: string; org: string };
  presencial?: boolean;
}

const DOCS: Doc[] = [
  {
    num: 1,
    name: 'Cédula de Identidad Vigente',
    tipo: 'obligatorio',
    desc: 'Presenta el documento original vigente: cédula para chilenos, o cédula de identidad para extranjeros que acredite residencia en el país.',
  },
  {
    num: 2,
    name: 'Certificado de Residencia',
    tipo: 'condicional',
    desc: 'Requerido si el domicilio actual no coincide con el de tu cédula o licencia anterior, o si realizas el trámite en una comuna distinta a la de tu última licencia.',
    action: { label: 'Obtener en Registro Civil', org: 'Registro Civil' },
  },
  {
    num: 3,
    name: 'Certificado de Estudios',
    tipo: 'obligatorio',
    desc: 'Certifica la aprobación de al menos 8º año de enseñanza básica. Puede descargarse de forma gratuita desde el portal del Ministerio de Educación.',
    action: { label: 'Descargar en MINEDUC', org: 'MINEDUC' },
  },
  {
    num: 4,
    name: 'Certificado de Antecedentes para Fines Especiales',
    tipo: 'obligatorio',
    desc: 'Emitido por el Registro Civil. Utilizado por el Director de Tránsito para evaluar la idoneidad moral del solicitante.',
    action: { label: 'Obtener en Registro Civil', org: 'Registro Civil' },
  },
  {
    num: 5,
    name: 'Declaración Jurada de no Consumo de Drogas',
    tipo: 'obligatorio',
    desc: 'Acredita no ser consumidor de drogas, estupefacientes o sustancias psicotrópicas prohibidas. Este documento es proporcionado y firmado directamente en la Dirección de Tránsito.',
    presencial: true,
  },
];

const STEPS = [
  { n: 1, label: 'Seleccionar Trámite' },
  { n: 2, label: 'Carga de Documentos' },
  { n: 3, label: 'Calendarización' },
];

const CargaDocumentos: React.FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <CiudadanoLayout title="Carga de Documentos">
      <div className="stepper">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className={`stepper__step ${i === 0 ? 'stepper__step--done' : i === 1 ? 'stepper__step--active' : ''}`}>
              <span className="stepper__num">{i === 0 ? '✓' : s.n}</span>
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <span className="stepper__line" />}
          </React.Fragment>
        ))}
      </div>

      <div className="docs-split">
        {/* Panel izquierdo: catálogo de documentos requeridos */}
        <div>
          <h2 className="section-title" style={{ marginBottom: 4 }}>Documentación Requerida</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 16 }}>
            Reúne los siguientes documentos antes de subir archivos. Los marcados como <strong>"Condicional"</strong> solo aplican según tu situación.
          </p>

          {DOCS.map((d) => (
            <div className="doc-spec" key={d.num}>
              <div className="doc-spec__num">{d.num}</div>
              <div className="doc-spec__content">
                <div className="doc-spec__head">
                  <span className="doc-spec__name">{d.name}</span>
                  <StatusBadge status={d.tipo} />
                </div>
                <p className="doc-spec__desc">{d.desc}</p>
                {d.action && (
                  <a className="doc-spec__link">
                    {d.action.label} <IonIcon icon={openOutline} />
                  </a>
                )}
                {d.presencial && (
                  <span className="doc-spec__presencial">
                    <IonIcon icon={businessOutline} /> Presencial: se proporciona y firma en la oficina de la Dirección de Tránsito.
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Panel derecho: subida */}
        <div>
          <h2 className="section-title" style={{ marginBottom: 4 }}>Documentación Requerida (3 obligatorios)</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 16 }}>
            Sube los archivos necesarios. Para los marcados con <strong>"Realizar Trámite"</strong>, obtén el documento desde el organismo indicado.
          </p>

          {DOCS.map((d, i) => (
            <div className="accordion" key={i}>
              <div className="accordion__head" onClick={() => setOpen(open === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                  {d.action && <a className="doc-spec__link" style={{ fontSize: 11 }}>{d.action.org} → Realizar Trámite</a>}
                  {d.presencial && <span style={{ fontSize: 11, color: 'var(--color-text-hint)' }}>Se firma en la Dirección de Tránsito</span>}
                </div>
                <IonIcon icon={chevronDown} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: '.2s' }} />
              </div>
              {open === i && (
                <div className="accordion__body">
                  <div className="upload-zone">
                    <IonIcon icon={cloudUploadOutline} style={{ fontSize: 28, color: 'var(--color-brand-primary)' }} />
                    <div style={{ marginTop: 8 }}>Arrastra el archivo o haz clic para subir</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-hint)', marginTop: 4 }}>
                      PDF, JPG o PNG · máx 5 MB
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            className="btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => history.push('/ciudadano/tramite/calendario')}
          >
            Guardar y Enviar
          </button>
        </div>
      </div>

      <div className="actions-row" style={{ marginTop: 12 }}>
        <button className="btn-ghost" onClick={() => history.goBack()}>← Volver</button>
      </div>
    </CiudadanoLayout>
  );
};

export default CargaDocumentos;

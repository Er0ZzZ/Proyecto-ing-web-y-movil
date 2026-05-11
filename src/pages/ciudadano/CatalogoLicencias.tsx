import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { addOutline, removeOutline, arrowUpOutline } from 'ionicons/icons';
import CiudadanoLayout from '../../components/layout/CiudadanoLayout';
import './ciudadano.css';

interface AccordionItem {
  title: string;
  body?: React.ReactNode;
}

const NO_PROFESIONALES: AccordionItem[] = [
  { title: 'CLASE B: Vehículos de hasta 3.500 kg y no más de 9 asientos de pasajeros.' },
  { title: 'CLASE C: Vehículos motorizados de dos o tres ruedas, con motor fijo o agregado.' },
];

const PROFESIONALES: AccordionItem[] = [
  {
    title: 'CLASE A1* y A2*: Para aquellas licencias antiguas, obtenidas antes del 8 de marzo de 1997, deben rendir examen teórico para su renovación.',
    body: (
      <div>
        <h4 className="lic-req__title">REQUISITOS</h4>

        <div className="lic-req__section">
          <div className="lic-req__subtitle">EXTENSIÓN LICENCIA</div>
          <ul>
            <li>Tener al menos 20 años de edad cumplidos.</li>
            <li>Poseer Licencia Clase B vigente, con al menos 2 años de antigüedad.</li>
            <li>Aprobar exámenes teórico, práctico y psicotécnico.</li>
          </ul>
        </div>

        <div className="lic-req__section">
          <div className="lic-req__subtitle">RENOVACIÓN LICENCIA</div>
          <ul>
            <li>Licencia vigente o vencida por menos de 30 días.</li>
            <li>Examen teórico solo para licencias previas al 08/03/1997.</li>
          </ul>
        </div>

        <div className="lic-req__section">
          <div className="lic-req__subtitle">VALORES</div>
          <ul>
            <li>Examen teórico: <strong>$8.500</strong></li>
            <li>Examen práctico: <strong>$11.200</strong></li>
            <li>Emisión licencia: <strong>$14.700</strong></li>
          </ul>
        </div>

        <div className="lic-req__section">
          <div className="lic-req__subtitle">EXÁMENES A RENDIR</div>
          <ul>
            <li>Examen teórico de normativa de tránsito.</li>
            <li>Examen práctico en vehículo de la clase correspondiente.</li>
            <li>Examen psicotécnico (sensométrico y psicológico).</li>
            <li>Examen médico (visión, audición y físico).</li>
          </ul>
        </div>
      </div>
    ),
  },
  { title: 'CLASE A3*: Licencia profesional para conducir vehículos de transporte de carga superior a 3.500 kg.' },
  { title: 'CLASE A4*: Licencia profesional para conducir vehículos de transporte de pasajeros.' },
  { title: 'CLASE A5*: Licencia para conductores de buses interurbanos y carga peligrosa.' },
];

const ESPECIALES: AccordionItem[] = [
  { title: 'CLASE D: Tractores agrícolas, maquinaria automotriz como retroexcavadoras, palas mecánicas y grúas.' },
  { title: 'CLASE E: Vehículos a tracción animal (carretelas).' },
  { title: 'CLASE F: Vehículos de Carabineros, Fuerzas Armadas, Investigaciones y Gendarmería.' },
];

const Section: React.FC<{ title: string; items: AccordionItem[]; defaultOpen?: number }> = ({
  title,
  items,
  defaultOpen = -1,
}) => {
  const [open, setOpen] = useState<number>(defaultOpen);
  return (
    <>
      <h3 className="lic-section-title">{title}</h3>
      <div className="lic-accordion">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`lic-acc-item ${isOpen ? 'lic-acc-item--open' : ''}`}>
              <button className="lic-acc-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                <IonIcon icon={isOpen ? removeOutline : addOutline} className="lic-acc-icon" />
                <span>{it.title}</span>
              </button>
              {isOpen && it.body && <div className="lic-acc-body">{it.body}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};

const CatalogoLicencias: React.FC = () => {
  return (
    <CiudadanoLayout title="Catálogo de Licencias" mobileBack={false}>
      <div className="catalogo-wrap">
        <div className="catalogo-header">
          <IonIcon icon={arrowUpOutline} />
          <span>TIPOS DE LICENCIAS (A, B, C, D, E, F)</span>
        </div>

        <div className="catalogo-body">
          <p className="catalogo-intro">
            Información oficial sobre las clases de licencia vigentes en Chile. Cada clase
            cuenta con sus propios requisitos, valores y exámenes.
          </p>

          <Section title="LICENCIAS NO PROFESIONALES" items={NO_PROFESIONALES} />

          <div className="lic-divider" />
          <h3 className="lic-section-title">LICENCIAS PROFESIONALES</h3>
          <div className="lic-subtitle">LICENCIAS PROFESIONALES LEY 18.290:</div>
          <Section title="" items={PROFESIONALES} defaultOpen={0} />

          <div className="lic-divider" />
          <Section title="LICENCIAS ESPECIALES" items={ESPECIALES} />
        </div>
      </div>
    </CiudadanoLayout>
  );
};

export default CatalogoLicencias;

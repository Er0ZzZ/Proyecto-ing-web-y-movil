import React from 'react';
import './StatusBadge.css';

export type Status =
  | 'pendiente'
  | 'validacion'
  | 'aprobado'
  | 'rechazado'
  | 'urgente'
  | 'completado'
  | 'obligatorio'
  | 'condicional';

interface Props {
  status: Status;
  children?: React.ReactNode;
}

const LABELS: Record<Status, string> = {
  pendiente:    'Pendiente',
  validacion:   'En validación',
  aprobado:     'Aprobado',
  rechazado:    'Rechazado',
  urgente:      'Urgente',
  completado:   'Completado',
  obligatorio:  'Obligatorio',
  condicional:  'Condicional',
};

const StatusBadge: React.FC<Props> = ({ status, children }) => {
  return <span className={`status-badge status-badge--${status}`}>{children ?? LABELS[status]}</span>;
};

export default StatusBadge;

import React from 'react';
import { IonIcon } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
import { useAppContext } from '../../context/AppContext';
import './AdminTopbar.css';

interface Props {
  title?: string;
  subtitle?: string;
}

const AdminTopbar: React.FC<Props> = ({ title = 'Dashboard', subtitle }) => {
  const { user } = useAppContext();
  return (
    <div className="admin-topbar">
      <div className="admin-topbar__title-block">
        <div className="admin-topbar__title">{title}</div>
        {subtitle && <div className="admin-topbar__subtitle">{subtitle}</div>}
      </div>
      <div className="admin-topbar__actions">
        <button className="admin-topbar__icon-btn" aria-label="Notificaciones">
          <IonIcon icon={notificationsOutline} />
          <span className="admin-topbar__dot" />
        </button>
        <div className="admin-topbar__user">
          <div className="admin-topbar__avatar">A</div>
          <div className="admin-topbar__user-meta">
            <div className="admin-topbar__user-name">Funcionario: {user?.nombre || 'Admin 01'}</div>
            <div className="admin-topbar__user-role">Administrador</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;

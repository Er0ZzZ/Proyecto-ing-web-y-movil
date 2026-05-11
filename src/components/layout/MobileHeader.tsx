import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowBack, ellipsisVertical } from 'ionicons/icons';
import './MobileHeader.css';

interface Props {
  title: string;
  back?: boolean;
  onBack?: () => void;
}

const MobileHeader: React.FC<Props> = ({ title, back = true, onBack }) => {
  const history = useHistory();
  return (
    <header className="mobile-header">
      <div className="brand-stripe">
        <span className="s-blue" />
        <span className="s-red" />
      </div>
      <div className="mobile-header__bar">
        {back ? (
          <button
            className="mobile-header__back"
            onClick={() => (onBack ? onBack() : history.goBack())}
            aria-label="Volver"
          >
            <IonIcon icon={arrowBack} />
          </button>
        ) : (
          <span style={{ width: 32 }} />
        )}
        <div className="mobile-header__title">{title}</div>
        <button className="mobile-header__action" aria-label="Más">
          <IonIcon icon={ellipsisVertical} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;

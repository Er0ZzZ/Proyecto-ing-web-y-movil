import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import ClaveUnicaLogo from '../../components/ui/ClaveUnicaLogo';
import { useAppContext } from '../../context/AppContext';
import './auth.css';

const InicioClaveUnica: React.FC = () => {
  const history = useHistory();
  const { loginCiudadano } = useAppContext();
  const [rut, setRut] = useState('');
  const [clave, setClave] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCiudadano();
    history.push('/ciudadano/home');
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="auth-split">
          <AuthLeftPanel title={'Ingresa con\nClaveÚnica'} />
          <div className="auth-split__right">
            <form className="auth-card" onSubmit={onSubmit}>
              <div className="cu-logo-row">
                <ClaveUnicaLogo height={36} />
              </div>

              <h2 style={{ textAlign: 'center', marginTop: 4 }}>Ingresa con ClaveÚnica</h2>
              <p className="sub" style={{ textAlign: 'center' }}>
                Servicio del Registro Civil del Estado de Chile
              </p>
              <hr />

              <div className="field">
                <label>RUT *</label>
                <input
                  type="text"
                  placeholder="ej: 12.345.678-9"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </div>
              <div className="field">
                <label>ClaveÚnica *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary">Ingresar</button>

              <div className="cu-links">
                <a>Recupera tu ClaveÚnica</a>
                <span className="cu-links__sep">·</span>
                <a>Solicita tu ClaveÚnica</a>
              </div>

              <div className="register-line" style={{ marginTop: 16 }}>
                <a onClick={() => history.push('/auth/login')}>← Volver al inicio de sesión</a>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InicioClaveUnica;

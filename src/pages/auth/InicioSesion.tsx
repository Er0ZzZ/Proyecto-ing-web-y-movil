import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import { useAppContext } from '../../context/AppContext';
import './auth.css';

const InicioSesion: React.FC = () => {
  const history = useHistory();
  const { loginCiudadano, loginAdmin } = useAppContext();
  const [rut, setRut] = useState('');
  const [pass, setPass] = useState('');

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginCiudadano();
    history.push('/ciudadano/home');
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="auth-split">
          <AuthLeftPanel title={'Dirección de\nTránsito en Línea'} />
          <div className="auth-split__right">
            <form className="auth-card" onSubmit={onLogin}>
              <h2>Iniciar sesión</h2>
              <p className="sub">Para usuarios con cuenta y administradores</p>
              <hr />
              <div className="field">
                <label>RUT o correo electrónico *</label>
                <input
                  type="text"
                  placeholder="ej: 12.345.678-9"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Contraseña *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <a className="forgot">¿Olvidaste tu contraseña?</a>
              <button type="submit" className="btn-primary">Iniciar sesión</button>
              <div className="separator"><span>o</span></div>
              <button
                type="button"
                className="alt"
                onClick={() => history.push('/auth/clave-unica')}
              >
                Ingresar con ClaveÚnica
              </button>
              <div className="register-line">
                ¿No tienes cuenta? <a onClick={() => history.push('/auth/registro')}>Regístrate aquí</a>
              </div>

              <div className="auth-demo">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => { loginAdmin(); history.push('/admin/dashboard'); }}
                >
                  Iniciar como Administrador (para demo)
                </button>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InicioSesion;

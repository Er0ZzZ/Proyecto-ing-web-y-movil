import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import AuthLeftPanel from '../../components/auth/AuthLeftPanel';
import { useAppContext } from '../../context/AppContext';
import './auth.css';

const CrearCuenta: React.FC = () => {
  const history = useHistory();
  const { loginCiudadano } = useAppContext();
  const [accept, setAccept] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCiudadano();
    history.push('/ciudadano/home');
  };

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="auth-split">
          <AuthLeftPanel title={'Crea tu\ncuenta'} />
          <div className="auth-split__right">
            <form className="auth-card" onSubmit={onSubmit}>
              <h2>Crear cuenta</h2>
              <p className="sub">Completa tus datos para registrarte</p>
              <hr />

              <div className="field">
                <label>Nombre completo *</label>
                <input type="text" placeholder="Nombre y apellidos" />
              </div>

              <div className="grid-2">
                <div className="field">
                  <label>RUT *</label>
                  <input type="text" placeholder="12.345.678-9" />
                </div>
                <div className="field">
                  <label>Correo electrónico *</label>
                  <input type="email" placeholder="correo@ejemplo.cl" />
                </div>
              </div>

              <div className="grid-2">
                <div className="field">
                  <label>Región *</label>
                  <select defaultValue="">
                    <option value="" disabled>Selecciona</option>
                    <option>Valparaíso</option>
                    <option>Metropolitana</option>
                  </select>
                </div>
                <div className="field">
                  <label>Comuna *</label>
                  <select defaultValue="">
                    <option value="" disabled>Selecciona</option>
                    <option>Santo Domingo</option>
                    <option>San Antonio</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="field">
                  <label>Fecha de nacimiento *</label>
                  <input type="date" />
                </div>
                <div className="field">
                  <label>Género</label>
                  <select defaultValue="">
                    <option value="" disabled>Selecciona</option>
                    <option>Femenino</option>
                    <option>Masculino</option>
                    <option>Otro</option>
                    <option>Prefiero no decir</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Contraseña *</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="field">
                <label>Confirmar contraseña *</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <label className="check-row">
                <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                <span>
                  Acepto los <a style={{ color: 'var(--color-brand-primary)' }}>Términos y condiciones</a> y la
                  política de privacidad del portal municipal.
                </span>
              </label>

              <button type="submit" className="btn-primary" disabled={!accept}>Crear cuenta</button>
              <div className="register-line" style={{ marginTop: 16 }}>
                ¿Ya tienes cuenta? <a onClick={() => history.push('/auth/login')}>Inicia sesión</a>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CrearCuenta;

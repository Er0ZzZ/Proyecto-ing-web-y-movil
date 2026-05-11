import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import MunicipalLogo from '../../components/ui/MunicipalLogo';
import './auth.css';

const PantallaInicial: React.FC = () => {
  const history = useHistory();
  const { loginCiudadano } = useAppContext();

  return (
    <IonPage>
      <IonContent className="page-content">
        <div className="landing">
          <section className="landing__left">
            <div className="landing__brand">
              <div className="landing__muni">MUNICIPALIDAD DE SANTO DOMINGO</div>
              <div className="landing__sub">Dirección de Tránsito</div>
            </div>
            <div className="landing__hero">
              <h1>Plataforma de Dirección de Tránsito en Línea</h1>
              <p>Bienvenido al portal de trámites de Dirección de Tránsito de la Municipalidad Santo Domingo</p>
            </div>
            <div className="landing__seal" aria-hidden>
              <MunicipalLogo size={130} />
              <div className="landing__seal-text">
                MUNICIPALIDAD<br />SANTO DOMINGO
              </div>
            </div>
          </section>

          <section className="landing__right">
            <div className="landing__stripe">
              <span className="s-blue" />
              <span className="s-red" />
            </div>
            <div className="landing__form">
              <div className="landing__head">MUNICIPALIDAD DE SANTO DOMINGO</div>
              <div className="landing__head-sub">Dirección de Tránsito</div>

              <h2 className="landing__title">Accede a tu cuenta</h2>
              <p className="landing__desc">Selecciona cómo deseas continuar</p>

              <button
                className="btn-cu"
                onClick={() => history.push('/auth/clave-unica')}
              >
                <span className="btn-cu__accent" />
                Ingresar con ClaveÚnica
              </button>

              <div className="separator"><span>o</span></div>

              <button
                className="btn-outline"
                onClick={() => history.push('/auth/login')}
              >
                Iniciar sesión con cuenta
              </button>
              <button
                className="btn-soft"
                onClick={() => history.push('/auth/registro')}
              >
                Crear cuenta
              </button>

              <button
                className="btn-guest"
                onClick={() => { loginCiudadano(); history.push('/ciudadano/home'); }}
              >
                Continuar como invitado →
              </button>

              <div className="landing__legal">© 2026 Municipalidad de Santo Domingo · Política de privacidad</div>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PantallaInicial;

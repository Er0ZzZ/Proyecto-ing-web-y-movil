import React from 'react';
import MunicipalLogo from '../ui/MunicipalLogo';
import './AppFooter.css';

interface Props {
  admin?: boolean;
}

const AppFooter: React.FC<Props> = ({ admin }) => {
  if (admin) {
    return (
      <footer className="admin-footer">
        <div className="admin-footer__inner">
          <div className="admin-footer__user">
            <div className="admin-footer__logo"><MunicipalLogo size={56} /></div>
            <div>
              <div className="admin-footer__name">Administrador</div>
              <div className="admin-footer__email">admin@mun-santodomingo.cl</div>
            </div>
          </div>
          <div className="admin-footer__copy">
            © 2026 Municipalidad de Santo Domingo · Dirección de Tránsito · Panel de Administración Interna
          </div>
          <div className="admin-footer__version">
            <div>v1.0.0</div>
            <div>Uso interno</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__col">
          <div className="app-footer__logo">
            <MunicipalLogo size={90} />
          </div>
          <div className="app-footer__title" style={{ marginTop: 12 }}>Dirección de Tránsito</div>
          <div className="app-footer__line">Municipalidad Santo Domingo</div>
          <div className="app-footer__line">Av. Argentina 864, Valparaíso</div>
          <div className="app-footer__line" style={{ marginTop: 8 }}>
            <strong>600 397 0000</strong>
          </div>
        </div>
        <div className="app-footer__col">
          <div className="app-footer__title">ENLACES INTERNOS</div>
          <a href="#">Políticas de Privacidad</a>
          <a href="#">Normativas</a>
          <a href="#">Términos y Condiciones</a>
          <a href="#">Sitios Relacionados</a>
        </div>
        <div className="app-footer__col">
          <div className="app-footer__title">INFORMACIÓN</div>
          <a href="#">Ingreso de Solicitud de Ayuda</a>
          <div className="app-footer__line">Horario: Lu – Vi / 9:00 – 18:00</div>
        </div>
        <div className="app-footer__col">
          <div className="app-footer__title">Sitio Oficial</div>
          <div className="app-footer__line">Portal seguro de la Municipalidad de Santo Domingo.</div>
        </div>
      </div>
      <div className="app-footer__copy">
        © 2026 Municipalidad de Santo Domingo · Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default AppFooter;

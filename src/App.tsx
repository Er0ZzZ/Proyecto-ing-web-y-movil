import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/variables.css';
import './theme/typography.css';

/* Context */
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './routes/ProtectedRoute';

/* Auth */
import PantallaInicial from './pages/auth/PantallaInicial';
import InicioSesion from './pages/auth/InicioSesion';
import InicioClaveUnica from './pages/auth/InicioClaveUnica';
import CrearCuenta from './pages/auth/CrearCuenta';

/* Ciudadano */
import MenuPrincipal from './pages/ciudadano/MenuPrincipal';
import SeleccionarTramite from './pages/ciudadano/SeleccionarTramite';
import CargaDocumentos from './pages/ciudadano/CargaDocumentos';
import Calendarizacion from './pages/ciudadano/Calendarizacion';
import EstadoSolicitud from './pages/ciudadano/EstadoSolicitud';
import MisTramites from './pages/ciudadano/MisTramites';
import CatalogoLicencias from './pages/ciudadano/CatalogoLicencias';

/* Admin */
import MenuPrincipalAdmin from './pages/admin/MenuPrincipalAdmin';
import PanelGestionAdmin from './pages/admin/PanelGestionAdmin';
import ValidacionDocumentosAdmin from './pages/admin/ValidacionDocumentosAdmin';

setupIonicReact({ mode: 'md' });

const App: React.FC = () => (
  <AppProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {/* Público */}
            <Route exact path="/" component={PantallaInicial} />
            <Route exact path="/auth/login" component={InicioSesion} />
            <Route exact path="/auth/clave-unica" component={InicioClaveUnica} />
            <Route exact path="/auth/registro" component={CrearCuenta} />

            {/* Ciudadano (protegido) */}
            <ProtectedRoute exact path="/ciudadano/home" rol="ciudadano">
              <MenuPrincipal />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/tramite/tipo" rol="ciudadano">
              <SeleccionarTramite />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/tramite/documentos" rol="ciudadano">
              <CargaDocumentos />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/tramite/calendario" rol="ciudadano">
              <Calendarizacion />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/estado" rol="ciudadano">
              <EstadoSolicitud />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/mis-tramites" rol="ciudadano">
              <MisTramites />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ciudadano/catalogo" rol="ciudadano">
              <CatalogoLicencias />
            </ProtectedRoute>

            {/* Admin (protegido) */}
            <ProtectedRoute exact path="/admin/dashboard" rol="admin">
              <MenuPrincipalAdmin />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin/gestion" rol="admin">
              <PanelGestionAdmin />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin/validacion" rol="admin">
              <ValidacionDocumentosAdmin />
            </ProtectedRoute>

            <Redirect to="/" />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AppProvider>
);

export default App;

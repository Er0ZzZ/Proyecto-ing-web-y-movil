# Portal de Trámites Digitales — Licencias de Conducir

Plataforma web/móvil para la **Ilustre Municipalidad de Santo Domingo** orientada a
modernizar la obtención y renovación de licencias de conducir. El sistema permite a
los ciudadanos agendar horas en línea, cargar antecedentes y dar seguimiento a su
trámite, mientras los funcionarios municipales gestionan aforos y validan
documentación de forma asíncrona desde un panel administrativo dedicado.

---

##  Integrantes

| Integrante | Rol |
|------------|-----|
| Andrés Garcia    | Desarrollo / Diseño |
| Nicolás Reed   | Desarrollo / Diseño |
| Eros Pérez   | Desarrollo / Diseño |

---

##  Prototipo Figma

Diseño de alta fidelidad de las 28 pantallas (14 desktop + 14 mobile) más la página
de componentes reutilizables:

**[Abrir prototipo en Figma](https://www.figma.com/design/muLFkM59BxwvQ4Rs91LiRe/Proyecto)**

---

##  Información Adicional

En la carpeta **`otros`** encontrarás documentación complementaria y screenshots del proyecto:

**[Información del Proyecto](otros/Informacion%20del%20Proyecto.pdf)** — Accede al documento PDF que contiene detalles del proyecto, especificaciones adicionales y captura de pantallas de la interfaz en la carpeta.

---

##  Características principales

### Rol Ciudadano
- **Inicio de sesión** con cuenta municipal, **ClaveÚnica** o ingreso como invitado.
- **Selección de trámite** entre 9 clases de licencia (A, B, B-17, C, CR, D, E,
  Renovación, Duplicado) con stepper de 3 etapas.
- **Pre-validación documental:** carga de documentos (cédula, certificado de
  residencia, estudios, antecedentes y declaración jurada) con badges
  *Obligatorio / Condicional* y links al organismo emisor.
- **Agendamiento inteligente:** calendario mensual + bloques horarios con cupos en
  tiempo real, ubicación de atención y resumen de la cita.
- **Fila virtual de adelantamiento:** opción para ser notificado y adelantar la
  hora si otro ciudadano cancela.
- **Trazabilidad continua:** línea de tiempo horizontal de 4 etapas (Ingreso →
  Validación → Exámenes → Emisión) con la etapa actual destacada.
- **Mis Trámites:** historial filtrable, con reprogramación/cancelación sujeta a la
  política de 48 hrs de anticipación.
- **Catálogo de licencias:** acordeones expandibles con requisitos, valores y
  exámenes según clase profesional, no profesional o especial.

### Rol Administrador (Funcionario Municipal)
- **Dashboard** con KPIs del día (citas, asistencia, documentos pendientes, fila
  virtual), trámites más demandados y actividad reciente.
- **Gestión de Aforos:** calendario mensual con código de colores por
  disponibilidad, configuración de bloques (hora, cupos, tipo de atención,
  recurrencia) y listado de bloques del día seleccionado.
- **Validación Asíncrona de Documentos:** cola de solicitudes filtrable
  (Todos/Urgente/Normal), previsualización por documento con tabs, panel de
  decisión (Aprobar / Rechazar) con comentario al ciudadano.

---

##  Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework UI       | [Ionic Framework](https://ionicframework.com/) 8 |
| Librería de vista  | [React](https://react.dev/) 19 |
| Routing            | React Router 5 + `@ionic/react-router` |
| Build / Dev server | [Vite](https://vitejs.dev/) 5 |
| Lenguaje           | TypeScript 5.9 |
| Íconos             | [Ionicons](https://ionic.io/ionicons) |
| Tipografía         | Inter (Google Fonts) |
| Testing            | Vitest + Testing Library + Cypress |
| Empaquetado nativo | Capacitor (opcional, ya integrado) |

---

##  Estructura del proyecto

```
portal-tramites/
├── public/
│   ├── img/                       # PNGs (logo municipal, ClaveÚnica)
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── App.tsx                    # IonRouterOutlet + rutas públicas/protegidas
│   ├── main.tsx                   # Entry point
│   ├── context/
│   │   └── AppContext.tsx         # Estado global (user, trámite, fila virtual)
│   ├── routes/
│   │   └── ProtectedRoute.tsx     # Guard de autenticación y rol
│   ├── hooks/
│   │   └── useBreakpoint.ts       # mobile / tablet / desktop
│   ├── theme/
│   │   ├── variables.css          # Design tokens + overrides Ionic
│   │   └── typography.css         # Escala tipográfica y utilidades
│   ├── components/
│   │   ├── layout/                # AppHeader, Sidebar, AdminSidebar,
│   │   │                          # AdminTopbar, TabBar*, MobileHeader,
│   │   │                          # AppFooter, CiudadanoLayout, AdminLayout
│   │   ├── auth/                  # AuthLeftPanel
│   │   └── ui/                    # StatusBadge, MunicipalLogo, ClaveUnicaLogo
│   └── pages/
│       ├── auth/                  # PantallaInicial, InicioSesion,
│       │                          # InicioClaveUnica, CrearCuenta
│       ├── ciudadano/             # MenuPrincipal, SeleccionarTramite,
│       │                          # CargaDocumentos, Calendarizacion,
│       │                          # EstadoSolicitud, MisTramites,
│       │                          # CatalogoLicencias
│       └── admin/                 # MenuPrincipalAdmin, PanelGestionAdmin,
│                                  # ValidacionDocumentosAdmin
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

##  Cómo ejecutar el proyecto

### Requisitos previos

- **Node.js** ≥ 18 (recomendado 20+) — [descargar](https://nodejs.org)
- **npm** ≥ 9 (viene con Node) o **pnpm/yarn** equivalente
- **Git** para clonar el repositorio

> No es obligatorio instalar el CLI de Ionic globalmente: el proyecto se levanta
> con `npm run dev` (Vite) sin depender de `ionic serve`.

### 1. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd portal-tramites
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará React 19, Ionic 8, React Router 5, ionicons, TypeScript y demás
dev-dependencies declaradas en `package.json`.

### 3. Levantar el servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en **http://localhost:5173/** con hot-reload
activado.

### 4. Compilar para producción

```bash
npm run build
```

El bundle optimizado se genera en `dist/`. Para previsualizarlo localmente:

```bash
npm run preview
```

### 5. (Opcional) Tests

```bash
npm run test.unit    # Vitest
npm run test.e2e     # Cypress (requiere navegador instalado)
npm run lint         # ESLint
```

### Resumen de scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev`       | Levanta el dev server de Vite con HMR. |
| `npm run build`     | Compila TypeScript y produce el bundle de producción. |
| `npm run preview`   | Sirve el bundle compilado para inspección. |
| `npm run test.unit` | Corre los tests unitarios con Vitest. |
| `npm run test.e2e`  | Ejecuta tests end-to-end con Cypress. |
| `npm run lint`      | Análisis estático con ESLint. |

---

##  Cómo probar la aplicación

Una vez en `http://localhost:5173/`, el flujo recomendado para validar la entrega:

1. **Pantalla inicial** → "Continuar como invitado" o "Ingresar con ClaveÚnica"
   para acceder al rol ciudadano.
2. **Para acceder como administrador**, ir a `/auth/login` y pulsar el botón
   morado **"Iniciar como Administrador (para demo)"** al final de la tarjeta de
   login. Esto redirige a `/admin/dashboard`.
3. **Probar el flujo de agendamiento completo**:
   `Menú Principal` → `Agendar Hora` → seleccionar clase → continuar →
   subir documentos → continuar → seleccionar fecha y hora → marcar "Unirme a la
   fila virtual de adelantamiento" → `Confirmar cita` → `Estado de Solicitud`.
4. **Probar el modo móvil**: redimensionar la ventana a un ancho menor a
   1024 px o usar el inspector responsive del navegador. El layout cambia
   automáticamente: sidebar desaparece, aparece tab bar inferior con opción de
   `Salir` al final.

---

##  Rutas y control de acceso

| Ruta | Acceso | Vista |
|------|--------|-------|
| `/`                                | Público          | Pantalla Inicial |
| `/auth/login`                      | Público          | Inicio de Sesión |
| `/auth/clave-unica`                | Público          | Inicio ClaveÚnica |
| `/auth/registro`                   | Público          | Crear Cuenta |
| `/ciudadano/home`                  | Rol `ciudadano`  | Menú Principal |
| `/ciudadano/tramite/tipo`          | Rol `ciudadano`  | Seleccionar Trámite |
| `/ciudadano/tramite/documentos`    | Rol `ciudadano`  | Carga de Documentos |
| `/ciudadano/tramite/calendario`    | Rol `ciudadano`  | Calendarización |
| `/ciudadano/estado`                | Rol `ciudadano`  | Estado de Solicitud |
| `/ciudadano/mis-tramites`          | Rol `ciudadano`  | Mis Trámites |
| `/ciudadano/catalogo`              | Rol `ciudadano`  | Catálogo de Licencias |
| `/admin/dashboard`                 | Rol `admin`      | Dashboard Admin |
| `/admin/gestion`                   | Rol `admin`      | Gestión de Aforos |
| `/admin/validacion`                | Rol `admin`      | Validación de Documentos |

El componente `<ProtectedRoute rol="…">` verifica el contexto: sin sesión → redirige
a `/auth/login`; con rol incorrecto → redirige al `home` del rol del usuario.

---

##  Notas técnicas

- **Sin backend:** todos los datos son mocks consistentes con el Figma (folios
  `67699659`, `67556684`, `67556455`; usuario demo Juan Pérez / Camila Rojas;
  KPIs admin `24/75%/8/11`, etc.). Los formularios no hacen `fetch`.
- **Design tokens** definidos en `src/theme/variables.css`, también mapeados a
  las variables nativas de Ionic (`--ion-color-primary`, etc.).
- **Tipografía:** Inter cargada desde Google Fonts en `index.html`. El stack
  fallback es `'Inter', 'Roboto', system-ui, -apple-system, sans-serif` (en el
  Figma original era *42dot Sans*, que no está disponible públicamente).
- **Layouts responsivos:** un hook `useBreakpoint` decide qué chrome renderizar
  (sidebar+header desktop vs. tab bar+mobile header) reusando las mismas
  páginas para ambos modos.
- **Logos:** el isotipo municipal y el wordmark de ClaveÚnica se cargan como
  PNG transparentes desde `public/img/`.


##  Licencia

Proyecto académico desarrollado en el contexto de la asignatura **Ingeniería Web
y Móvil**. Uso interno de la Municipalidad de Santo Domingo para fines de
prototipado.

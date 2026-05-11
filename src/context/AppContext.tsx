import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Rol = 'ciudadano' | 'admin';
export type EstadoTramite = 'pendiente' | 'validacion' | 'aprobado' | 'rechazado';

export interface Usuario {
  nombre: string;
  rut: string;
  rol: Rol;
}

export interface TramiteActivo {
  tipo: string;
  documentos: string[];
  fechaCita: string | null;
  estado: EstadoTramite;
}

interface AppState {
  user: Usuario | null;
  tramiteActivo: TramiteActivo | null;
  filaVirtual: boolean;
}

interface AppContextValue extends AppState {
  loginCiudadano: () => void;
  loginAdmin: () => void;
  logout: () => void;
  setTramiteActivo: (t: TramiteActivo | null) => void;
  setFilaVirtual: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [tramiteActivo, setTramiteActivo] = useState<TramiteActivo | null>({
    tipo: 'Obtención Clase B',
    documentos: ['Cédula de identidad', 'Certificado médico'],
    fechaCita: '2026-05-22 10:30',
    estado: 'validacion',
  });
  const [filaVirtual, setFilaVirtual] = useState(false);

  const loginCiudadano = () =>
    setUser({ nombre: 'Camila Rojas', rut: '17.456.789-2', rol: 'ciudadano' });
  const loginAdmin = () =>
    setUser({ nombre: 'Felipe Castro', rut: '12.345.678-9', rol: 'admin' });
  const logout = () => setUser(null);

  return (
    <AppContext.Provider
      value={{
        user,
        tramiteActivo,
        filaVirtual,
        loginCiudadano,
        loginAdmin,
        logout,
        setTramiteActivo,
        setFilaVirtual,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

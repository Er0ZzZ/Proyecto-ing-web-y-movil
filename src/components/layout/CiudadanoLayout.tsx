import React, { ReactNode } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useIsDesktop } from '../../hooks/useBreakpoint';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import TabBarCiudadano from './TabBarCiudadano';
import MobileHeader from './MobileHeader';
import './Layout.css';

interface Props {
  children: ReactNode;
  title: string;
  mobileBack?: boolean;
}

const CiudadanoLayout: React.FC<Props> = ({ children, title, mobileBack }) => {
  const isDesktop = useIsDesktop();
  return (
    <IonPage>
      {isDesktop ? (
        <div className="layout-desktop">
          <Sidebar />
          <div className="layout-desktop__main">
            <AppHeader variant="top" />
            <IonContent className="page-content">
              <div className="page-shell">
                <div className="layout-desktop__body">{children}</div>
                <AppFooter />
              </div>
            </IonContent>
          </div>
        </div>
      ) : (
        <>
          <MobileHeader title={title} back={mobileBack ?? true} />
          <IonContent className="page-content">
            <div className="layout-mobile__body">{children}</div>
          </IonContent>
          <TabBarCiudadano />
        </>
      )}
    </IonPage>
  );
};

export default CiudadanoLayout;

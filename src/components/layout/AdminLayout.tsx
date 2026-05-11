import React, { ReactNode } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useIsDesktop } from '../../hooks/useBreakpoint';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import AdminFooter from './AdminFooter';
import TabBarAdmin from './TabBarAdmin';
import MobileHeader from './MobileHeader';
import './Layout.css';

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout: React.FC<Props> = ({ children, title, subtitle }) => {
  const isDesktop = useIsDesktop();
  return (
    <IonPage>
      {isDesktop ? (
        <div className="layout-desktop layout-desktop--admin">
          <AdminSidebar />
          <div className="layout-desktop__main">
            <AdminTopbar title={title} subtitle={subtitle} />
            <IonContent className="page-content">
              <div className="page-shell">
                <div className="layout-desktop__body">{children}</div>
                <AdminFooter />
              </div>
            </IonContent>
          </div>
        </div>
      ) : (
        <>
          <MobileHeader title={title} back />
          <IonContent className="page-content">
            <div className="layout-mobile__body">{children}</div>
          </IonContent>
          <TabBarAdmin />
        </>
      )}
    </IonPage>
  );
};

export default AdminLayout;

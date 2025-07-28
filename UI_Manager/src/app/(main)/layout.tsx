"use client";
import Header from "../../components/layout/Header";
import Sidebar, { useSidebar } from "../../components/layout/Sidebar";

function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  
  return (
    <main style={{ 
      flex: 1, 
      minHeight: 'calc(100vh - 48px)', 
      background: 'transparent', 
      padding: 0,
      marginLeft: collapsed ? '44px' : '250px',
      transition: 'margin-left 0.2s'
    }}>
      {children}
    </main>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
} 
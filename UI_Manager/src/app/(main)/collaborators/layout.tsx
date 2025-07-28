'use client';
import TabsNav from '../../../components/collaborators/TabsNav';
import { usePathname } from 'next/navigation';
import CollaboratorsOverview from '../../../components/collaborators/CollaboratorsOverview';

export default function CollaboratorsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCreatePage = pathname === '/collaborators/create';
  const isDetailPage = pathname.includes('/detail/');
  const isProfilePage = pathname.includes('/profile/');
  const isEvaluatePage = pathname.includes('/recruited/evaluate/');

  return (
    <div style={{ 
      paddingLeft: 10, 
      paddingRight: 10, 
      transition: 'padding-left 0.2s', 
      background: '#f4f6fb',
      position: 'relative'
      }}>
      {!isCreatePage && !isDetailPage && !isProfilePage && !isEvaluatePage && <CollaboratorsOverview />}
      {!isCreatePage && !isDetailPage && !isProfilePage && !isEvaluatePage && <TabsNav />}
      {children}
    </div>
  );
} 
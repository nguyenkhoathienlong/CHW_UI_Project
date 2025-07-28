"use client";
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r z-40">
        <Sidebar />
      </div>
      <div className="md:pl-64">
        <main className="py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 
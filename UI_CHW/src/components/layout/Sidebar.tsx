"use client";
import Link from 'next/link';
import { Home, User, Briefcase, FileText, LogOut, ListChecks, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Hồ sơ cá nhân', href: '/dashboard/profile', icon: User },
  { name: 'Tin tuyển dụng', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Ứng tuyển của tôi', href: '/dashboard/applications', icon: FileText },
  { name: 'Chương trình tham gia', href: '/dashboard/programs', icon: ListChecks },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Sidebar content
  const sidebarContent = (
    <>
      {/* Mobile: chỉ icon */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-4 py-8 md:hidden">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors text-2xl ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'}`}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-7 w-7" />
            </Link>
          );
        })}
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full transition-colors text-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-700 mt-4"
          onClick={() => { setOpen(false); router.push('/login'); }}
        >
          <LogOut className="h-7 w-7" />
        </button>
      </nav>
      {/* Desktop: icon + text */}
      <nav className="hidden md:block flex-1 space-y-2 px-3 py-20">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 text-base md:text-sm font-medium rounded-lg transition-colors
                ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-700'}`}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="hidden md:block border-t border-gray-200 p-4">
        <button
          className="flex w-full items-center gap-3 px-3 py-2 text-base md:text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-700 rounded-lg transition-colors"
          onClick={() => { setOpen(false); router.push('/login'); }}
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </>
  );
  return (
    <>
      {/* Hamburger for mobile */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow border border-gray-200" onClick={() => setOpen(true)}>
        <Menu className="w-6 h-6 text-blue-700" />
      </button>
      {/* Sidebar overlay for mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 flex">
          <aside className="bg-white w-64 h-full shadow-lg flex flex-col relative animate-slideInLeft">
            <button className="absolute top-3 right-3 p-1" onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
            {sidebarContent}
          </aside>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col h-full bg-white border-r w-64 fixed top-0 left-0 z-40">
        {sidebarContent}
      </aside>
    </>
  );
} 
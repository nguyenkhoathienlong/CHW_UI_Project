"use client";
import Image from 'next/image';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function Header() {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/globe.svg" alt="Logo" width={28} height={28} className="min-w-[28px]" />
        <span className="font-extrabold text-xl text-blue-600 tracking-wide hidden sm:inline">CHW Portal</span>
        <div className="ml-4">
          <Breadcrumb/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-sm font-medium text-white">NV</span>
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">Nguyễn Văn A</span>
      </div>
    </header>
  );
} 
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { pendingCollaboratorsData } from '@/components/collaborators/pending/TableContent';
import { approvedCollaborators } from '@/components/collaborators/approved/TableContent';
import { trainingCollaborators } from '@/components/collaborators/training/TableContent';
import { completeTrainingCollaborators } from '@/components/collaborators/complete-training/TableContent';
import { recruitedCollaborators } from '@/components/collaborators/recruited/TableContent';

const tabs = [
  { label: "Mới đăng ký", href: "/collaborators/pending", count: pendingCollaboratorsData.length },
  { label: "Đã tuyển chọn", href: "/collaborators/approved", count: approvedCollaborators.length },
  { label: "Đào tạo", href: "/collaborators/training", count: trainingCollaborators.length },
  { label: "Sẵn sàng huy động", href: "/collaborators/complete-training", count: completeTrainingCollaborators.length },
  { label: "Được tuyển dụng", href: "/collaborators/recruited", count: recruitedCollaborators.length },
];

export default function TabsNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-4 px-4 py-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
              isActive 
                ? "border-blue-600 text-blue-600 font-semibold" 
                : "border-transparent text-gray-500 font-medium hover:text-blue-600 hover:border-blue-300"
            }`}
          >
            <span className="text-sm">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-500 hover:bg-blue-100 hover:text-blue-600"
              }`}>
                {tab.count}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
} 
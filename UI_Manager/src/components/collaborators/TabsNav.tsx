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
    <div style={{ display: "flex", gap: 0, margin: '10px 10px 0 10px', background: '#f4f6fb', borderRadius: 10, padding: 4, alignItems: 'center', minWidth: 0 }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: "5px 10px",
              borderRadius: 7,
              background: isActive ? "#2563eb" : "#f1f5f9",
              color: isActive ? "#fff" : "#222",
              fontWeight: isActive ? 700 : 500,
              border: "none",
              marginRight: 3,
              fontSize: 13,
              boxShadow: isActive ? "0 2px 8px #2563eb22" : undefined,
              transition: "all 0.15s",
              cursor: 'pointer',
              minWidth: 'fit-content',
              textAlign: 'center',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = "#e0e7ef";
                e.currentTarget.style.color = "#2563eb";
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.color = "#222";
              }
            }}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span style={{
                marginLeft: 6,
                background: '#fff',
                color: '#2563eb',
                fontWeight: 700,
                borderRadius: 8,
                padding: '0 7px',
                fontSize: 12,
                minWidth: 18,
                display: 'inline-block',
                textAlign: 'center',
                boxShadow: '0 1px 4px #2563eb11'
              }}>
                {tab.count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
} 
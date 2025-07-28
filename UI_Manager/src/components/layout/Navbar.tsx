"use client";
import { ArrowLeftCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{ width: '100%', height: 56, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #eee', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ArrowLeftCircle size={24} style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16 }}>
        JD
      </div>
    </nav>
  );
} 
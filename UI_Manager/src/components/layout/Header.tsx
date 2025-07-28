"use client";
import { Home, User } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import React from "react";

export default function Header() {
  return (
    <header style={{
      width: '100%',
      height: 65,
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 15px 0 15px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px #0001'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img src="/globe.svg" alt="Logo" style={{ width: 26, height: 26, objectFit: 'contain' }} />
        <span style={{ fontWeight: 800, fontSize: 20, color: '#2563eb', letterSpacing: 1 }}>CHW</span>
        <Breadcrumb />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#2563eb', boxShadow: '0 2px 8px #2563eb22', cursor: 'pointer' }}>
          <User size={14} />
        </div>
      </div>
    </header>
  );
} 
"use client";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Add real authentication logic here
    router.push("/");
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f4f6fb 0%, #e0e7ef 100%)' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #2563eb22', padding: 40, minWidth: 380, maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        {/* Logo */}
        <Image src="/globe.svg" alt="CHW Logo" width={56} height={56} style={{ marginBottom: 8 }} />
        {/* Hình ảnh đại diện */}
        <Image src="/window.svg" alt="Login Illustration" width={120} height={120} style={{ marginBottom: 8 }} />
        {/* Tiêu đề */}
        <h1 style={{ fontWeight: 800, fontSize: 26, color: '#2563eb', marginBottom: 8, letterSpacing: 1, textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif' }}>Community Health Worker (CHW)</h1>
        {/* Form đăng nhập */}
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={{ fontWeight: 600, color: '#222', fontSize: 15, marginBottom: 4, display: 'block' }}>Tên tài khoản</label>
            <Input id="username" placeholder="Nhập tên tài khoản" className="border border-[#e5e7eb] focus:border-[#2563eb] outline-none bg-white text-[#222] font-medium transition-colors" style={{ marginBottom: 8 }} />
          </div>
          <div>
            <label htmlFor="password" style={{ fontWeight: 600, color: '#222', fontSize: 15, marginBottom: 4, display: 'block' }}>Mật khẩu</label>
            <Input id="password" type="password" placeholder="Nhập mật khẩu" className="border border-[#e5e7eb] focus:border-[#2563eb] outline-none bg-white text-[#222] font-medium transition-colors" style={{ marginBottom: 8 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: '#475569', fontWeight: 500 }}>
              <input type="checkbox" style={{ accentColor: '#2563eb', width: 16, height: 16 }} />
              Ghi nhớ mật khẩu
            </label>
            <a href="#" style={{ color: '#2563eb', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>Quên mật khẩu?</a>
          </div>
          <Button type="submit">Đăng nhập</Button>
        </form>
      </div>
    </div>
  );
} 
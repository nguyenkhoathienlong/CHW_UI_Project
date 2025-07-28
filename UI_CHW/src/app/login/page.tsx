'use client'
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LoginPage() {
  const [step, setStep] = useState<'welcome' | 'login' | 'register' | 'register-success'>('welcome');
  const router = useRouter();
  // State cho form đăng ký
  const [register, setRegister] = useState({
    name: '',
    birthDate: '',
    gender: '',
    phone: '',
    education: '',
    email: '',
    cccd: '',
    province: '',
    ward: '',
    residenceTime: '',
    confirm: false,
    organization: '',
  });
  // Đăng nhập giả lập
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push('/dashboard');
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#2563eb] via-[#38bdf8] to-[#60a5fa] transition-all duration-500">
      {/* Wrapper for transition */}
      <div className={`w-full flex flex-col md:flex-row items-stretch justify-center transition-all duration-500 ${step === 'welcome' ? '' : 'md:pl-0'}`} style={{ minHeight: '100vh' }}>
        {/* Welcome block: full width when welcome, co lại khi form */}
        <div className={`flex flex-col items-center justify-center transition-all duration-500
          ${step === 'welcome' ? 'w-full md:w-full' : 'w-full md:w-9/12'}
          px-4 py-10 md:py-0 min-h-screen bg-transparent`}
        >
          <div className={`w-[1000px] mx-auto flex flex-col gap-6 transition-all duration-500
            ${step === 'welcome' ? 'items-center text-center' : 'md:items-start md:text-center items-center text-center'}`}
          >
            {/* SVG Illustration */}
            <div className="w-full flex justify-center">
              <svg width="100" height="100" className="sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="#fff" fillOpacity="0.13" />
                <path d="M60 30c-8 0-15 6.5-15 15 0 8.5 7 15 15 15s15-6.5 15-15c0-8.5-7-15-15-15zm0 40c-13.3 0-40 6.7-40 20v8h80v-8c0-13.3-26.7-20-40-20z" fill="#fff" fillOpacity="0.7" />
                <path d="M60 35c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12z" fill="#38bdf8" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg text-center leading-tight">Cộng tác viên sức khỏe cộng đồng</h1>
            <div className="text-base sm:text-lg md:text-xl font-bold text-white/90 drop-shadow-md text-center leading-snug">Kết nối - Lan tỏa - Chăm sóc cộng đồng</div>
            <div className="text-white/90 text-sm sm:text-base text-center w-full font-medium leading-normal">Chào mừng bạn đến với hệ thống cộng tác viên sức khỏe cộng đồng. Hãy bắt đầu hành trình đóng góp cho cộng đồng cùng chúng tôi!</div>
            {/* Card chọn đăng ký/đăng nhập */}
            {step === 'welcome' && (
              <div className="w-full bg-white/90 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 flex flex-col items-center gap-4 sm:gap-6">
                <div className="text-base sm:text-lg font-semibold text-[#222] text-center w-full">Bạn đã từng đăng ký để trở thành cộng tác viên y tế cộng đồng chưa?</div>
                <div className="flex gap-3 sm:gap-4 mt-2 flex-col sm:flex-row w-full sm:justify-center">
                  <Button className="w-full sm:w-48 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white shadow-md hover:brightness-110 transition-all duration-200" onClick={() => setStep('login')}>Tôi là cộng tác viên</Button>
                  <Button variant="outline" className="w-full sm:w-48 border-[#60a5fa] text-[#2563eb] bg-white/90 hover:bg-white/100 shadow-md transition-all duration-200" onClick={() => setStep('register')}>Tôi chưa đăng ký</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Form block: chỉ hiện khi không phải welcome */}
        {(step === 'login' || step === 'register' || step === 'register-success') && (
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#f4f6fb] min-h-screen px-2 py-10 transition-all duration-500">
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px] gap-4 sm:gap-6">
              {step === 'login' && (
                <Card className="w-full max-w-2xl p-2 sm:p-4 md:p-6 shadow-lg border-blue-200 bg-white rounded-2xl mx-auto flex flex-col">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-600 text-center">Đăng nhập để tham gia hoạt động cộng tác viên</h2>
                  <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                    <div>
                      <label htmlFor="email" className="block text-blue-800 font-medium mb-1">Tài khoản</label>
                      <Input id="text" type="email" placeholder="Nhập tài khoản" className="focus-visible:ring-blue-600 focus-visible:border-blue-600 text-gray-900 placeholder:text-gray-400" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-blue-800 font-medium mb-1">Mật khẩu</label>
                      <Input id="password" type="password" placeholder="Nhập mật khẩu" className="focus-visible:ring-blue-600 focus-visible:border-blue-600 text-gray-900 placeholder:text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-[-5px]">
                      <input type="checkbox" id="remember" className="accent-blue-600 w-4 h-4" />
                      <label htmlFor="remember" className="text-xs text-blue-700 font-medium select-none">Ghi nhớ mật khẩu</label>
                    </div>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 rounded-md transition-colors">Đăng nhập</Button>
                  </form>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-[#2563eb] text-sm" onClick={() => setStep('welcome')}>Quay lại</Button>
                  </div>
                </Card>
              )}
              {step === 'register' && (
                <Card className="w-[650px] p-2 sm:p-4 md:p-6 shadow-lg border-blue-100 bg-white rounded-2xl flex flex-col">
                  <h2 className="text-lg sm:text-xl font-bold text-[#2563eb] mb-2 text-left">Đăng ký trở thành cộng tác viên</h2>
                  <div className="text-[#64748b] text-left mb-4 sm:mb-6">Điền thông tin để trở thành cộng tác viên sức khỏe cộng đồng</div>
                  <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setStep('register-success'); }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Select value={register.organization} onValueChange={val => setRegister(r => ({ ...r, organization: val }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Đăng ký cho đơn vị nào" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Trạm Y tế Phường 1">Trạm Y tế Phường 1</SelectItem>
                              <SelectItem value="Trạm Y tế Phường 2">Trạm Y tế Phường 2</SelectItem>
                              <SelectItem value="Trung tâm Y tế Quận 3">Trung tâm Y tế Quận 3</SelectItem>
                              <SelectItem value="Bệnh viện Đa khoa A">Bệnh viện Đa khoa A</SelectItem>
                              <SelectItem value="Bệnh viện Đa khoa B">Bệnh viện Đa khoa B</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input placeholder="Họ và tên" className="w-full" value={register.name} onChange={e => setRegister(r => ({ ...r, name: e.target.value }))} />
                      <Input placeholder="Ngày sinh (dd/mm/yyyy)" className="w-full" value={register.birthDate} onChange={e => setRegister(r => ({ ...r, birthDate: e.target.value }))} />
                      <select className="w-full border border-[#e5e7eb] rounded px-2 py-2 text-xs" value={register.gender} onChange={e => setRegister(r => ({ ...r, gender: e.target.value }))}>
                        <option value="">Giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                      <Input placeholder="Số điện thoại" className="w-full" value={register.phone} onChange={e => setRegister(r => ({ ...r, phone: e.target.value }))} />
                      <select className="w-full border border-[#e5e7eb] rounded px-2 py-2 text-xs" value={register.education} onChange={e => setRegister(r => ({ ...r, education: e.target.value }))}>
                        <option value="">Trình độ học vấn</option>
                        <option value="Trung học">Trung học</option>
                        <option value="Cao đẳng">Cao đẳng</option>
                        <option value="Đại học">Đại học</option>
                      </select>
                      <Input placeholder="Email" className="w-full" value={register.email} onChange={e => setRegister(r => ({ ...r, email: e.target.value }))} />
                      <Input placeholder="Số CC/CCCD" className="w-full" value={register.cccd} onChange={e => setRegister(r => ({ ...r, cccd: e.target.value }))} />
                      <Input placeholder="Thành phố/Tỉnh" className="w-full" value={register.province} onChange={e => setRegister(r => ({ ...r, province: e.target.value }))} />
                      <Input placeholder="Phường/Xã" className="w-full" value={register.ward} onChange={e => setRegister(r => ({ ...r, ward: e.target.value }))} />
                      <Input placeholder="Thời gian cư trú (Năm)" className="w-full" value={register.residenceTime} onChange={e => setRegister(r => ({ ...r, residenceTime: e.target.value }))} />
                    </div>
                    {/* Ứng viên tự đánh giá */}
                    <div className="mt-2">
                      <div className="font-semibold text-blue-700 mb-2">Ứng viên tự đánh giá</div>
                      <div className="flex flex-col gap-2">
                        {[
                          { label: 'Tự nguyện đăng ký tham gia mạng lưới cộng tác viên địa phương', key: 'comm' },
                          { label: 'Có sức khỏe', key: 'team' },
                          { label: 'Có hiểu biết về cộng đồng mình đăng ký làm cộng tác viên và có điều kiện để gắn bó và phục vụ cho cộng đồng.', key: 'active' },
                          { label: 'Có uy tín trong cộng đồng', key: 'learn' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center min-h-[40px] rounded px-2 py-1">
                            <span className="text-sm text-blue-900 flex-1">{item.label}</span>
                            <input type="checkbox" className="accent-blue-600 w-4 h-4 ml-2 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center gap-2 text-blue-700 text-[15px] font-medium">
                        <input
                          type="checkbox"
                          className="accent-blue-600 w-4 h-4"
                          checked={register.confirm}
                          onChange={e => setRegister(r => ({ ...r, confirm: e.target.checked }))}
                        />
                        Tôi cam kết thông tin đăng ký là đúng sự thật
                      </label>
                      <Button disabled={!register.confirm} className="bg-[#2563eb] text-white mt-2">Đăng ký</Button>
                    </div>
                  </form>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-[#2563eb] text-sm" onClick={() => setStep('welcome')}>Quay lại</Button>
                  </div>
                </Card>
              )}
              {step === 'register-success' && (
                <Card className="w-[650px] p-2 sm:p-4 md:p-6 shadow-lg border-blue-100 bg-white rounded-2xl flex flex-col items-center text-center gap-6">
                  <svg width="80" height="80" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#2563eb"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div className="text-2xl font-bold text-blue-700">Đăng ký thành công!</div>
                  <div className="text-base text-[#334155]">Thông tin đăng ký của bạn đã được gửi thành công!<br/>Vui lòng chờ kết quả xét duyệt từ Đơn vị quản lý. Chúng tôi sẽ liên hệ với bạn qua email hoặc số điện thoại khi có kết quả.</div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
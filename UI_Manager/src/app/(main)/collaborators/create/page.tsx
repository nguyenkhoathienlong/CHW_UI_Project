"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function CollaboratorCreatePage() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-[#f4f6fb] min-h-screen flex flex-col items-center py-[30px]">
      <div className="w-full max-w-screen-xl mb-2 flex items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>
      <div className="mb-6 w-full max-w-screen-xl">
        <h1 className="font-bold text-[26px] text-[#222] mb-1 tracking-tight">Tuyển chọn cộng tác viên</h1>
        <div className="text-[#64748b] text-[15px]">Nhập thông tin để đăng ký tham gia cộng tác viên</div>
      </div>
      <Card className="w-full max-w-screen-xl bg-white rounded-[10px] shadow-lg px-4 md:px-[40px] py-[30px] mx-auto">
        <div className="font-bold text-[22px] mb-3 text-[#2563eb] leading-tight">Thông tin ứng viên đăng ký</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Họ và Tên <span className="text-red-500">*</span></label>
            <Input placeholder="Nhập họ và tên" className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10" />
          </div>
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Ngày sinh <span className="text-red-500">*</span></label>
            <DatePicker
              selected={birthDate}
              onChange={date => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              customInput={<Input className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10 px-[14px] font-medium" />}
              wrapperClassName="datepicker-wrapper"
              popperPlacement="bottom"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Giới tính <span className="text-red-500">*</span></label>
            <select className="custom-select w-full h-10 rounded-[5px] border border-[#e5e7eb] px-[14px] mb-4 bg-white text-[#222] text-[14px] shadow-none">
              <option className="custom-option">Lựa chọn</option>
              <option className="custom-option">Nam</option>
              <option className="custom-option">Nữ</option>
              <option className="custom-option">Khác</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b]">Số điện thoại <span className="text-red-500">*</span></label>
            <Input placeholder="Nhập số điện thoại" className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10" />
            <div className="mt-0 flex flex-col">
              <label className="font-semibold text-[#64748b]">Trình độ học vấn <span className="text-red-500">*</span></label>
              <select className="custom-select w-full h-10 rounded-[5px] border border-[#e5e7eb] px-[14px] mb-4 bg-white text-[#222] text-[14px] shadow-none">
                <option className="custom-option">Lựa chọn</option>
                <option className="custom-option">Trung học</option>
                <option className="custom-option">Cao đẳng</option>
                <option className="custom-option">Đại học</option>
              </select>
            </div>
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="font-semibold text-[#64748b]">Email <span className="text-red-500">*</span></label>
            <Input placeholder="Nhập email" className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="font-semibold text-[#64748b]">Số CC/CCCD <span className="text-red-500">*</span></label>
            <Input placeholder="Nhập số CC/CCCD" className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10" />
          </div>
        </div>
        <div className="font-bold text-[22px] mt-4 mb-3 text-[#2563eb] leading-tight">Nơi cư trú</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Thành phố/Tỉnh <span className="text-red-500">*</span></label>
            <select className="custom-select w-full h-10 rounded-[5px] border border-[#e5e7eb] px-[14px] mb-4 bg-white text-[#222] text-[14px] shadow-none">
              <option className="custom-option">Lựa chọn</option>
            </select>
          </div>
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Phường/Xã <span className="text-red-500">*</span></label>
            <select className="custom-select w-full h-10 rounded-[5px] border border-[#e5e7eb] px-[14px] mb-4 bg-white text-[#222] text-[14px] shadow-none">
              <option className="custom-option">Lựa chọn</option>
            </select>
          </div>
          <div className="flex-1 min-w-[220px] flex flex-col">
            <label className="font-semibold text-[#64748b] mb-1">Thời gian cư trú (Năm) <span className="text-red-500">*</span></label>
            <Input type="number" min={0} placeholder="Nhập số năm" className="mb-4 bg-white border border-[#e5e7eb] text-[#222] text-[14px] rounded-[5px] shadow-none h-10" />
          </div>
        </div>
        <div className="font-bold text-[22px] mt-4 mb-3 text-[#2563eb] leading-tight">Tiêu chí tuyển chọn</div>
        <div className="flex gap-6 mb-8 flex-wrap">
          {/* Ứng viên tự tích */}
          <div className="flex-1 min-w-[260px] bg-[#f8fafc] rounded-[5px] p-5 border border-[#e5e7eb] shadow-sm">
            <div className="font-semibold text-[17px] mb-3 text-[#2563eb]">Ứng viên tự đánh giá</div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 text-[#64748b] text-sm">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Tự nguyện đăng ký tham gia mạng lưới cộng tác viên địa phương
              </label>
              <label className="flex items-center gap-3 text-[#64748b] text-sm">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Có sức khỏe
              </label>
              <label className="flex items-center gap-3 text-[#64748b] text-sm">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Có hiểu biết về cộng đồng mình đăng ký làm cộng tác viên và có điều kiện để gắn bó và phục vụ cho cộng đồng.
              </label>
              <label className="flex items-center gap-3 text-[#64748b] text-sm">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                Có uy tín trong cộng đồng
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-6">
          <label className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-3">
            <input
              type="checkbox"
              className="accent-blue-600 w-4 h-4"
              checked={isConfirmed}
              onChange={e => setIsConfirmed(e.target.checked)}
            />
            Tôi cam kết thông tin đăng ký là đúng sự thật
          </label>
          <div className="flex gap-4">
            <Button disabled={!isConfirmed}>Đăng ký</Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 
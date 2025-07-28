import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Mail, User, CreditCard, Calendar, Award, Phone } from 'lucide-react';
import React from 'react';

export function PersonalInfoSection({ profileData, isEditing, onChange }: {
  profileData: any;
  isEditing: boolean;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Mã CTV</label>
        {isEditing ? (
          <Input value={profileData.code} onChange={e => onChange('code', e.target.value)} />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <User className="h-4 w-4 text-gray-500" />
            <span>{profileData.code}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
        {isEditing ? (
          <Input value={profileData.fullName} onChange={e => onChange('fullName', e.target.value)} className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <User className="h-4 w-4 text-gray-500" />
            <span>{profileData.fullName}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        {isEditing ? (
          <Input value={profileData.email} onChange={e => onChange('email', e.target.value)} className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{profileData.email}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Số CC/CCCD</label>
        {isEditing ? (
          <Input value={profileData.idNumber} onChange={e => onChange('idNumber', e.target.value)} className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span>{profileData.idNumber}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
        {isEditing ? (
          <Input type="date" value={profileData.dateOfBirth} onChange={e => onChange('dateOfBirth', e.target.value)} className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{profileData.dateOfBirth}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Trình độ học vấn</label>
        {isEditing ? (
          <Select value={profileData.education} onValueChange={v => onChange('education', v)}>
            <SelectTrigger className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base h-9" />
            <SelectContent>
              <SelectItem value="Trung học">Trung học</SelectItem>
              <SelectItem value="Cao đẳng">Cao đẳng</SelectItem>
              <SelectItem value="Đại học">Đại học</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <Award className="h-4 w-4 text-gray-500" />
            <span>{profileData.education}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Giới tính</label>
        {isEditing ? (
          <Select value={profileData.gender} onValueChange={v => onChange('gender', v)}>
            <SelectTrigger/>
            <SelectContent>
              <SelectItem value="Nam">Nam</SelectItem>
              <SelectItem value="Nữ">Nữ</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <User className="h-4 w-4 text-gray-500" />
            <span>{profileData.gender}</span>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
        {isEditing ? (
          <Input value={profileData.phone} onChange={e => onChange('phone', e.target.value)} className="w-full p-3 bg-blue-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
        ) : (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[5px] h-10">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{profileData.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
} 
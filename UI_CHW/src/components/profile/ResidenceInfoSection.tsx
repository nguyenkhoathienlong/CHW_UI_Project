import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import React from 'react';

export function ResidenceInfoSection({ profileData, isEditing, onChange }: {
  profileData: any;
  isEditing: boolean;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <div className="mt-8">
      <div className="text-blue-700 font-semibold text-lg mb-4">Nơi cư trú</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thành phố/Tỉnh</label>
          {isEditing ? (
            <Select value={profileData.residenceProvince} onValueChange={v => onChange('residenceProvince', v)}>
              <SelectTrigger className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base h-9" />
              <SelectContent>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="px-4 py-2 bg-blue-50 rounded-[5px] text-gray-900 font-medium h-9">{profileData.residenceProvince}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
          {isEditing ? (
            <Select value={profileData.residenceWard} onValueChange={v => onChange('residenceWard', v)}>
              <SelectTrigger className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base h-9" />
              <SelectContent>
                <SelectItem value="Phường 1">Phường 1</SelectItem>
                <SelectItem value="Phường 2">Phường 2</SelectItem>
                <SelectItem value="Phường 3">Phường 3</SelectItem>
                <SelectItem value="Phường 4">Phường 4</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="px-4 py-2 bg-blue-50 rounded-[5px] text-gray-900 font-medium h-9">{profileData.residenceWard}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian cư trú (Năm)</label>
          {isEditing ? (
            <Input type="number" min="0" value={profileData.residenceDuration} onChange={e => onChange('residenceDuration', e.target.value)} className="w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-[5px] font-medium text-base" />
          ) : (
            <div className="px-4 py-2 bg-blue-50 rounded-[5px] text-gray-900 font-medium h-9">{profileData.residenceDuration}</div>
          )}
        </div>
      </div>
    </div>
  );
} 
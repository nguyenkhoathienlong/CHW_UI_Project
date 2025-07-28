import React from 'react';

interface JobSalaryFilterProps {
  valueFrom: string;
  valueTo: string;
  negotiable: boolean;
  onChangeFrom: (val: string) => void;
  onChangeTo: (val: string) => void;
  onNegotiableChange: (checked: boolean) => void;
  error?: string;
  onApply: () => void;
  onClear: () => void;
  label?: string;
  buttonLabel: string;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  formatInputMoney: (val: string) => string;
  widthClass?: string;
}

export default function JobSalaryFilter({
  valueFrom, valueTo, negotiable, onChangeFrom, onChangeTo, onNegotiableChange, error, onApply, onClear, label, buttonLabel, showDropdown, setShowDropdown, formatInputMoney, widthClass = "w-64"
}: JobSalaryFilterProps) {
  return (
    <div className={widthClass}>
      {label && <div className="mb-1 text-sm font-medium text-gray-500">{label}</div>}
      <div className={`relative ${widthClass}`}>
        <button
          type="button"
          className={`flex items-center justify-between rounded-[5px] border border-gray-300 bg-white px-5 py-2 text-base text-gray-500 text-[15px] ${widthClass} h-auto truncate focus:bg-[#e0e7ef] focus:text-[#2563eb] hover:bg-blue-50`}
          onClick={() => setShowDropdown(!showDropdown)}
          title={buttonLabel}
          style={{overflow: 'hidden', textOverflow: 'ellipsis'}}
        >
          <span className="text-gray-500 truncate max-w-[180px]">{buttonLabel}</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {showDropdown && (
          <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 min-w-[350px] flex flex-col gap-3" style={{left:0}}>
            <div className="flex gap-2 items-center">
              <div className="relative w-1/2">
                <input
                  type="text"
                  min="0"
                  placeholder="Từ (VNĐ)"
                  value={valueFrom ? formatInputMoney(valueFrom) : ''}
                  onChange={e => { onChangeFrom(e.target.value.replace(/\D/g, '')); onNegotiableChange(false); }}
                  className="px-3 py-2 rounded-[5px] border border-gray-300 bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] text-right w-full text-blue-700 text-[14px] placeholder:text-gray-400 h-8"
                  inputMode="numeric"
                  disabled={negotiable}
                />
              </div>
              <span className="mx-1 text-gray-500">-</span>
              <div className="relative w-1/2">
                <input
                  type="text"
                  min="0"
                  placeholder="Đến (VNĐ)"
                  value={valueTo ? formatInputMoney(valueTo) : ''}
                  onChange={e => { onChangeTo(e.target.value.replace(/\D/g, '')); onNegotiableChange(false); }}
                  className="px-3 py-2 rounded-[5px] border border-gray-300 bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] text-right w-full text-blue-700 text-[14px] placeholder:text-gray-400 h-8"
                  inputMode="numeric"
                  disabled={negotiable}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={e => onNegotiableChange(e.target.checked)}
                className="accent-[#2563eb]"
              />
              Thỏa thuận
            </label>
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-[5px] bg-white border border-gray-300 text-blue-700 text-[14px] hover:bg-blue-50 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] h-9"
                onClick={onClear}
              >Xóa</button>
              <button
                type="button"
                className="px-4 py-1 rounded-[5px] bg-[#2563eb] text-white text-[14px] hover:bg-blue-700 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] h-9"
                onClick={() => { onApply(); setShowDropdown(false); }}
              >Áp dụng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
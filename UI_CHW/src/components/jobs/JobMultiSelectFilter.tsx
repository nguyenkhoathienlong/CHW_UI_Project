import { useState, useRef, useEffect } from 'react';
import { Check, ChevronUp } from 'lucide-react';

interface JobMultiSelectFilterProps {
  label?: string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: string[];
  placeholder: string;
  widthClass?: string;
}

export default function JobMultiSelectFilter({ 
  label, 
  selectedValues, 
  onChange, 
  options, 
  placeholder, 
  widthClass = "w-48" 
}: JobMultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(val => val !== option));
    } else {
      if (option === 'Tất cả') {
        // Khi chọn "Tất cả", bỏ tất cả các lựa chọn khác
        onChange(['Tất cả']);
      } else {
        // Khi chọn option khác, bỏ "Tất cả" nếu có
        const newValues = selectedValues.filter(val => val !== 'Tất cả');
        onChange([...newValues, option]);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedValues.includes('Tất cả')) {
      // Nếu "Tất cả" đang được chọn, bỏ chọn nó
      onChange([]);
    } else {
      // Nếu "Tất cả" chưa được chọn, chỉ chọn "Tất cả"
      onChange(['Tất cả']);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.includes('Tất cả')) return 'Tất cả';
    if (selectedValues.length === 1) return selectedValues[0];
    return `Đã chọn ${selectedValues.length} `;
  };

  return (
    <div className={widthClass} ref={dropdownRef}>
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <div className="relative">
        <button
          type="button"
          className={`${widthClass} h-10 px-5 py-2 rounded-[5px] border border-gray-300 bg-white text-blue-700 placeholder:text-gray-400 focus:bg-[#e0e7ef] focus:text-[#2563eb] flex items-center justify-between`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{getDisplayText()}</span>
          <ChevronUp className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-[5px] shadow-lg z-50">
            {/* Summary Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
              <span className="text-sm font-medium text-gray-700">
                {selectedValues.length} đã chọn
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {/* Select All Option */}
              <div className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes('Tất cả')}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Tất cả</span>
                </div>
              </div>

              {/* Individual Options */}
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggleOption(option)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(option)}
                      onChange={() => handleToggleOption(option)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
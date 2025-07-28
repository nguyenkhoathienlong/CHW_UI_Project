import JobSelectFilter from './JobSelectFilter';
import JobSalaryFilter from './JobSalaryFilter';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface JobFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedPosition: string;
  setSelectedPosition: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedExperience: string;
  setSelectedExperience: (val: string) => void;
  salaryFrom: string;
  setSalaryFrom: (val: string) => void;
  salaryTo: string;
  setSalaryTo: (val: string) => void;
  salaryNegotiable: boolean;
  setSalaryNegotiable: (checked: boolean) => void;
  salaryError?: string;
  validateSalary: () => boolean;
  showSalaryDropdown: boolean;
  setShowSalaryDropdown: (show: boolean) => void;
  salaryButtonLabel: string;
  formatInputMoney: (val: string) => string;
  jobPositions: string[];
  jobTypes: string[];
  onClearFilters: () => void;
}

export default function JobFilterBar({
  searchTerm, setSearchTerm,
  selectedPosition, setSelectedPosition,
  selectedType, setSelectedType,
  selectedExperience, setSelectedExperience,
  salaryFrom, setSalaryFrom,
  salaryTo, setSalaryTo,
  salaryNegotiable, setSalaryNegotiable,
  salaryError, validateSalary,
  showSalaryDropdown, setShowSalaryDropdown,
  salaryButtonLabel, formatInputMoney,
  jobPositions, jobTypes,
  onClearFilters
}: JobFilterBarProps) {
  return (
    <div className="bg-orange-100 border border-orange-300 p-5 mb-5 rounded-[5]">
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center">
          <Input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 rounded-[5px] border border-gray-300 px-5 py-3 text-base bg-white pr-12 shadow-sm focus:border-[#2563eb] focus:border-[1.5px] focus:ring-0 h-10"
            placeholder="Tìm kiếm theo tiêu đề việc làm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-21 mt-3 mb-1 items-center">
          <JobSelectFilter
            value={selectedPosition}
            onChange={setSelectedPosition}
            options={jobPositions}
            placeholder="Vị trí làm việc"
            widthClass="w-56"
          />
          <JobSalaryFilter
            valueFrom={salaryFrom}
            valueTo={salaryTo}
            negotiable={salaryNegotiable}
            onChangeFrom={setSalaryFrom}
            onChangeTo={setSalaryTo}
            onNegotiableChange={setSalaryNegotiable}
            error={salaryError}
            onApply={validateSalary}
            onClear={() => { setSalaryFrom(''); setSalaryTo(''); setSalaryNegotiable(false); setShowSalaryDropdown(false); }}
            buttonLabel={salaryButtonLabel}
            showDropdown={showSalaryDropdown}
            setShowDropdown={setShowSalaryDropdown}
            formatInputMoney={formatInputMoney}
            widthClass="w-56"
          />
          <JobSelectFilter
            value={selectedType}
            onChange={setSelectedType}
            options={jobTypes}
            placeholder="Hình thức"
            widthClass="w-56"
          />
          <JobSelectFilter
            value={selectedExperience}
            onChange={setSelectedExperience}
            options={["Không yêu cầu", "1-2 năm", "2-3 năm", "3-5 năm", "Trên 5 năm"]}
            placeholder="Kinh nghiệm"
            widthClass="w-56"
          />
          <div className="w-40 flex justify-center">
            <button
              className="flex items-center justify-center gap-1 rounded-[5px] border border-gray-300 bg-white px-0.5 py-2 text-base text-gray-500 text-[15px] hover:bg-blue-50 shadow-sm w-40 h-auto"
              onClick={onClearFilters}
              type="button"
            >
              <Filter className="h-4 w-4 mr-1" />
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
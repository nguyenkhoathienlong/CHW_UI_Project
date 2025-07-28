"use client";
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Calendar,
  DollarSign,
  Filter,
  Eye,
  Clock,
  Building
} from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import JobFilterBar from '@/components/jobs/JobFilterBar';
import { jobPositions, jobTypes, jobExperiences } from '@/constants/jobFilterOptions';
import { jobs } from '@/constants/jobsData';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [showSalaryDropdown, setShowSalaryDropdown] = useState(false);
  const salaryDropdownRef = useRef<HTMLDivElement>(null);

  // Di chuyển các useState này lên trước khi dùng trong filter
  const [selectedPosition, setSelectedPosition] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [salaryNegotiable, setSalaryNegotiable] = useState(false);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (salaryDropdownRef.current && !salaryDropdownRef.current.contains(event.target as Node)) {
        setShowSalaryDropdown(false);
      }
    }
    if (showSalaryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSalaryDropdown]);

  // Lọc job theo filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !selectedPosition || selectedPosition === 'Tất cả' || job.position === selectedPosition;
    const matchesType = !selectedType || selectedType === 'Tất cả' || job.type === selectedType;
    const matchesExperience = !selectedExperience || selectedExperience === 'Tất cả' || job.experience === selectedExperience;
    // Lọc mức lương
    let matchesSalary = true;
    if (salaryNegotiable) {
      matchesSalary = job.salary.toLowerCase().includes('thỏa thuận');
    } else if (salaryFrom || salaryTo) {
      const salaryNum = job.salary.match(/\d+/g)?.map(Number) || [];
      const from = salaryFrom ? parseInt(salaryFrom) : 0;
      const to = salaryTo ? parseInt(salaryTo) : 99999999;
      if (salaryNum.length === 2) {
        matchesSalary = salaryNum[0] <= to && salaryNum[1] >= from;
      } else if (salaryNum.length === 1) {
        matchesSalary = salaryNum[0] >= from && salaryNum[0] <= to;
      } else if (job.salary.toLowerCase().includes('thỏa thuận')) {
        matchesSalary = false;
      }
    }
    return matchesSearch && matchesPosition && matchesType && matchesExperience && matchesSalary;
  });

  // Hàm format số tiền
  function formatMoney(numStr: string) {
    if (!numStr) return '';
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('vi-VN');
  }

  // Hàm format số tiền khi nhập
  function formatInputMoney(val: string) {
    const num = val.replace(/\D/g, '');
    if (!num) return '';
    return parseInt(num, 10).toLocaleString('vi-VN');
  }

  let salaryButtonLabel = 'Mức lương';
  if (salaryNegotiable) {
    salaryButtonLabel = 'Thỏa thuận';
  } else if (salaryFrom && salaryTo) {
    salaryButtonLabel = `${formatMoney(salaryFrom)} - ${formatMoney(salaryTo)}`;
  } else if (salaryFrom) {
    salaryButtonLabel = `Từ ${formatMoney(salaryFrom)}`;
  } else if (salaryTo) {
    salaryButtonLabel = `Đến ${formatMoney(salaryTo)}`;
  }
  // Tooltip nếu label quá dài
  const isSalaryLabelLong = salaryButtonLabel.length > 25;

  // State cho lỗi lương
  const [salaryError, setSalaryError] = useState('');

  // Validate lương khi blur hoặc khi bấm Áp dụng
  function validateSalary() {
    if (salaryNegotiable) {
      setSalaryError('');
      return true;
    }
    const from = salaryFrom ? parseInt(salaryFrom, 10) : undefined;
    const to = salaryTo ? parseInt(salaryTo, 10) : undefined;
    if ((from && from < 1000000) || (to && to < 1000000)) {
      setSalaryError('Tối thiểu là 1.000.000');
      return false;
    }
    if ((from && from > 50000000) || (to && to > 50000000)) {
      setSalaryError('Tối đa là 50.000.000');
      return false;
    }
    setSalaryError('');
    return true;
  }

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      {/* Tiêu đề tìm kiếm và lọc */}
      <h2 className="text-lg md:text-xl font-semibold text-[#2563eb] mb-3 ml-1">Tìm kiếm công việc & vị trí phù hợp với bạn</h2>
      <JobFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        salaryFrom={salaryFrom}
        setSalaryFrom={setSalaryFrom}
        salaryTo={salaryTo}
        setSalaryTo={setSalaryTo}
        salaryNegotiable={salaryNegotiable}
        setSalaryNegotiable={setSalaryNegotiable}
        salaryError={salaryError}
        validateSalary={validateSalary}
        showSalaryDropdown={showSalaryDropdown}
        setShowSalaryDropdown={setShowSalaryDropdown}
        salaryButtonLabel={salaryButtonLabel}
        formatInputMoney={formatInputMoney}
        jobPositions={jobPositions}
        jobTypes={jobTypes}
        onClearFilters={() => {
          setSearchTerm('');
          setSelectedPosition('');
          setSalaryFrom('');
          setSalaryTo('');
          setSalaryNegotiable(false);
          setSelectedType('');
          setSelectedExperience('');
        }}
      />
      {/* Results Count + Pagination Controls */}
      {/* Đầu trang, thay vì justify-between, dùng justify-end và đặt cả hai phần vào 1 flex row, sát phải. */}
      <div className="flex justify-between items-center mb-2 gap-4">
        <p className="text-sm text-[#2563eb] whitespace-nowrap">
          Tìm thấy {filteredJobs.length} tin tuyển dụng
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Số tin tuyển dụng hiển thị:</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {/* Job Listings */}
      <div className="space-y-4">
        {paginatedJobs.map((job) => {
          // Tính toán trạng thái sắp hết hạn
          const today = new Date();
          const deadline = new Date(job.deadline.split('/').reverse().join('-'));
          const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const isExpiring = daysLeft <= 7 && daysLeft >= 0;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-gray-200 flex items-stretch p-4 gap-6 hover:shadow-lg transition cursor-pointer group"
              onClick={e => {
                // Nếu click vào nút ứng tuyển thì không chuyển trang
                if ((e.target as HTMLElement).closest('button, a')) return;
                window.location.href = `/dashboard/jobs/${job.id}`;
              }}
            >
              {/* Ảnh đại diện + badge status */}
              <div className="flex flex-col items-center w-28">
                <div className="w-28 h-28 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium border border-gray-200 shrink-0">
                  Không có ảnh
                </div>
                {job.status && (
                  <span className={
                    `mt-2 px-3 py-1 rounded-full text-xs font-semibold ` +
                    (job.status === 'Đang tuyển' ? 'bg-blue-600 text-white' :
                     job.status === 'Sắp hết hạn' ? 'bg-orange-100 text-orange-700' :
                     job.status === 'Tin hết hạn' ? 'bg-gray-200 text-gray-500' :
                     'bg-blue-100 text-blue-700')
                  }>
                    {job.status}
                  </span>
                )}
              </div>
              {/* Nội dung chính */}
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900 truncate max-w-[500px]" style={{maxWidth: '500px', display: 'inline-block'}} title={job.title}>
                    {job.title.length > 50 ? job.title.slice(0, 50) + '…' : job.title}
                  </span>
                  {isExpiring && (
                    <span className="ml-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">Sắp hết hạn</span>
                  )}
                </div>
                <div className="text-base text-gray-700 font-medium">{job.company}</div>
                <div className="flex flex-wrap gap-2 items-center text-xs font-medium">
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <MapPin className="h-4 w-4" /> {job.locationProvince}, {job.locationWard}
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <Briefcase className="h-4 w-4" /> {job.experience}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-gray-600">Số lượng</span>
                  <span className="font-semibold">{job.vacancies}</span>
                  <span className="text-gray-600"><Briefcase className="inline h-4 w-4" /></span>
                  <span className="truncate text-gray-700">{job.position}</span>
                </div>
              </div>
              {/* Thông tin phụ */}
              <div className="flex flex-col items-end justify-between min-w-[180px]">
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-base font-semibold text-gray-900">
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="h-5 w-5" />
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold">{job.postedDate}</span>
                  </div>
                  <Link href={`/dashboard/jobs/${job.id}/apply`} onClick={e => e.stopPropagation()}>
                    <Button
                      onClick={e => e.stopPropagation()}
                    >
                      Ứng tuyển ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Không tìm thấy tin tuyển dụng</h3>
              <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination cuối trang */}
      <div className="flex justify-end items-center mt-6 gap-4">
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded text-gray-500 hover:text-blue-600 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          <span className="text-sm font-medium text-gray-700">
            {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 rounded text-gray-500 hover:text-blue-600 disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
} 
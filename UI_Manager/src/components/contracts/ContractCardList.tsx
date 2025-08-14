import { Card } from "@/components/ui/card";
import React from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';

export interface Contract {
  id: string;
  project: string;
  type: string;
  duration: string;
  logo?: string;
  code: string;
  form: string;
  level: string;
  salary: string;
  workLocation: string;
  signDate: string;
  startDate: string;
  endDate: string;
  status: string;
  contractTitle?: string;
}

const STATUS_OPTIONS = [
  { label: 'Tất cả', value: '' },
  { label: 'Đang hiệu lực', value: 'Đang hiệu lực' },
  { label: 'Hết hiệu lực', value: 'Hết hiệu lực' },
];
const PAGE_SIZE = 5;

export default function ContractCardList({ contracts, onSelect }:{ contracts: Contract[], onSelect: (contract: Contract) => void }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return contracts.filter(contract =>
      (!search || contract.contractTitle?.toLowerCase().includes(search.toLowerCase())) &&
      (!status || contract.status === status)
    );
  }, [contracts, search, status]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full mt-4">
      {/* Filter/Search UI */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex gap-2 w-full md:w-auto h-8">
          <Input
            placeholder="Tìm theo tiêu đề hợp đồng..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full md:w-64"
          />
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            className="border border-[#d1d5db] rounded-[5px] px-3 py-1 text-[14px] bg-white h-8"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Card List */}
      <div className="flex flex-col gap-4 w-full">
        {paged.length === 0 && (
          <div className="text-center py-8 text-[#64748b] italic">Không có hợp đồng nào</div>
        )}
        {paged.map(contract => (
          <Card
            key={contract.id}
            className="flex items-center justify-between gap-6 px-4 w-full min-h-[96px] border border-[#e5e7eb] bg-white shadow-sm hover:shadow-lg transition-all duration-200"
            onClick={() => onSelect(contract)}
          >
            {/* Center: Title & Info (chiếm flex-1, căn giữa) */}
            <div className="flex-1 flex flex-col min-w-0 px-2">
              <div className="text-lg font-bold text-[#2563eb] mb-1">
                {contract.contractTitle || 'Hợp đồng cộng tác viên'}
              </div>
              <div className="flex flex-wrap justify-left gap-6 text-sm text-[#374151]">
                <div><span className="font-semibold">Hình thức:</span> {contract.form}</div>
                <div><span className="font-semibold">Cấp bậc:</span> {contract.level}</div>
                <div><span className="font-semibold">Lương:</span> {contract.salary}</div>
              </div>
            </div>
            {/* Right: Dates & Status */}
            <div className="flex flex-col items-end gap-2 min-w-[220px]">
              <div className="flex gap-4 text-xs text-[#64748b]">
                <div><span className="font-semibold text-[#222]">Ngày tạo:</span> {contract.startDate || '--'}</div>
                <div><span className="font-semibold text-[#222]">Ngày ký:</span> {contract.signDate || '--'}</div>
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold mt-2 ${contract.status === 'Đang hiệu lực' ? 'bg-green-100 text-green-700' : contract.status === 'Hết hiệu lực' ? 'bg-gray-100 text-gray-500' : contract.status === 'Đã ký' ? 'bg-blue-100 text-blue-700' : contract.status === 'Chờ ký' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{contract.status}</span>
            </div>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-6">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Trước</Button>
          <span className="text-sm">Trang {page} / {totalPages}</span>
          <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Sau</Button>
        </div>
      )}
    </div>
  );
} 
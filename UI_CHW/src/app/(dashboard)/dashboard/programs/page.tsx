'use client';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Users, Calendar, Tag, Sparkles, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useMemo } from 'react';
import { useRef } from 'react';

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${className}`}>{children}</span>;
}

// Hàm lấy class màu cho badge trạng thái
function getStatusColor(status: string) {
  if (status === 'Chưa bắt đầu') return 'bg-blue-600 text-white';
  if (status === 'Đang diễn ra') return 'bg-yellow-200 text-yellow-800';
  if (status === 'Đã kết thúc') return 'bg-gray-200 text-gray-600';
  return 'bg-gray-100 text-gray-700';
}

const programs = [
  {
    id: 'uctc-829102',
    name: 'Chương trình tầm soát ung thư cổ tử cung',
    code: 'UTCTC-829102',
    desc: 'Mục tiêu chính của chương trình là phát hiện sớm các dấu hiệu ung thư cổ tử cung ở phụ nữ từ 25-55 tuổi.',
    status: 'Chưa bắt đầu',
    members: 2,
    type: 'Tầm soát & phát hiện sớm bệnh lý',
    time: '12/02/2025 - 12/12/2025',
  },
  {
    id: 'pcd-123456',
    name: 'Chương trình phòng chống dịch bệnh truyền nhiễm',
    code: 'GD-123456',
    desc: 'Nâng cao nhận thức và phòng chống dịch bệnh trong cộng đồng.',
    status: 'Đã kết thúc',
    statusColor: 'bg-gray-200 text-gray-600',
    members: 2,
    type: 'Phòng bệnh & kiểm soát dịch bệnh',
    time: '01/01/2024 - 31/12/2024',
  },
  {
    id: 'luudong-789123',
    name: 'Chương trình khám chữa bệnh lưu động',
    code: 'PTCD-789123',
    desc: 'Khám chữa bệnh cho người dân vùng sâu vùng xa.',
    status: 'Đang diễn ra',
    statusColor: 'bg-yellow-100 text-yellow-800',
    members: 2,
    type: 'Khám, chữa bệnh & nâng cao sức khỏe',
    time: '01/03/2024 - 01/03/2025',
  },
  {
    id: 'daithaoduong-456789',
    name: 'Chương trình tầm soát đái tháo đường',
    code: 'BVMT-456789',
    desc: 'Phát hiện sớm bệnh đái tháo đường trong cộng đồng.',
    status: 'Chưa bắt đầu',
    statusColor: 'bg-blue-100 text-blue-700',
    members: 2,
    type: 'Tầm soát & phát hiện sớm bệnh lý',
    time: '01/06/2025 - 01/06/2026',
  },
];

function CardProgram({ program, onClick }: { program: any; onClick: () => void }) {
  // Cắt mục tiêu 100 ký tự
  const desc = program.desc.length > 100 ? program.desc.slice(0, 100) + '...' : program.desc;
  return (
    <Card
      className="flex flex-col sm:flex-row items-stretch p-4 rounded-2xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition cursor-pointer w-full min-h-[170px] max-h-none relative group bg-white"
      onClick={onClick}
      style={{ minWidth: 0, flex: 1 }}
    >
      {/* Badge trạng thái góc phải */}
      <div className="absolute top-3 right-2 z-10">
        <Badge className={getStatusColor(program.status) + ' text-xs font-semibold px-2 py-0.5 rounded-full mt-1 mr-1'}>{program.status}</Badge>
      </div>
      {/* Logo lớn bên trái hoặc trên mobile */}
      <div className="flex flex-col items-center justify-top w-full sm:w-20 min-w-[64px] pt-1 sm:mb-0">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
          <Tag className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      {/* Nội dung phải: tên, mã, mục tiêu */}
      <div className="flex-1 flex flex-col min-w-0 sm:pl-2">
        <span className="font-bold text-base lg:text-lg text-gray-900 line-clamp-1 break-words">{program.name}</span>
        <span className="text-sm text-gray-500 font-medium line-clamp-1 break-words">{program.code}</span>
        <span className="text-sm text-gray-700 mt-1 line-clamp-2 break-words">{desc}</span>
      </div>
      {/* Info dưới cùng, chiếm toàn bộ chiều ngang card */}
      <div className="w-full flex flex-wrap items-center gap-x-3 md:gap-x-10 gap-y-1 text-sm text-gray-500 sm:mt-0 sm:absolute sm:left-0 sm:right-0 sm:bottom-3 sm:px-4 break-all">
        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {program.members} cộng tác viên</span>
        <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {program.type}</span>
        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {program.time}</span>
      </div>
    </Card>
  );
}

const programTypes = Array.from(new Set(programs.map(p => p.type)));

export default function ProgramsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => programs.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!type || p.type === type)
  ), [search, type]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasPrograms = programs.length > 0;
  return (
    <div className="w-full min-h-screen via-white to-blue-100 py-2 flex flex-col items-center">
      <div className="w-full mx-auto mb-4">
        <div className="bg-gradient-to-br from-[#e0f2fe] to-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 border border-[#bae6fd] relative overflow-hidden">
          <div className="flex flex-col flex-1 items-center sm:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-10 h-10 text-[#38bdf8] drop-shadow" />
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">Chương trình tham gia</span>
            </div>
            <div className="text-base sm:text-lg text-blue-500 font-semibold mb-1">Cùng lan tỏa sức khỏe cộng đồng!</div>
            <div className="text-sm text-blue-400">Khám phá, tham gia và đồng hành cùng các chương trình ý nghĩa, góp phần nâng cao sức khỏe cho mọi người. Hãy chủ động tham gia các chương trình để phát triển bản thân và cộng đồng.</div>
          </div>
          <div className="hidden sm:block absolute right-6 top-6 opacity-20 pointer-events-none select-none">
            <div className="w-24 h-24 bg-blue-50 border border-[#bae6fd] rounded-full flex items-center justify-center">
              <Tag className="w-16 h-16 text-[#38bdf8]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 px-1">
          <Input
            placeholder="Tìm kiếm theo tên chương trình..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          <select
            className="min-w-[160px] h-8 rounded-[5px] px-2 text-[12px] bg-white border border-[#e5e7eb]"
            value={type}
            onChange={e => { setType(e.target.value); setPage(1); }}
          >
            <option value="">Loại chương trình</option>
            {programTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {hasPrograms ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full">
            {paged.map(p => (
              <div key={p.id} className="w-full flex">
                <CardProgram
                  program={p}
                  onClick={() => router.push(`/dashboard/programs/${p.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-16">
            <Sparkles className="w-16 h-16 text-blue-300 mb-4" />
            <div className="text-xl font-bold text-blue-700 mb-2">Chưa có chương trình nào!</div>
            <div className="text-gray-500 text-center max-w-md">Hãy chủ động tham gia các chương trình để phát triển bản thân và đóng góp cho cộng đồng.</div>
          </div>
        )}
        {/* Pagination */}
        <div className="w-full flex items-center justify-end mt-6 px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Số chương trình/dự án hiển thị:</span>
            <input
              ref={inputRef}
              type="number"
              min={1}
              max={filtered.length}
              value={pageSize}
              onChange={e => {
                let val = Number(e.target.value);
                if (!val || val < 1) val = 1;
                if (val > filtered.length) val = filtered.length;
                setPageSize(val);
                setPage(1);
              }}
              className="w-15 h-7 border border-gray-300 rounded-[5px] px-2 text-center text-sm mx-1"
              style={{ outline: 'none' }}
            />
            <button
              className="w-7 h-7 flex items-center justify-center rounded-[5px] border border-gray-300 bg-white text-gray-700 font-bold disabled:opacity-50 ml-2"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >&lt;</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`w-7 h-7 flex items-center justify-center rounded-[5px] border font-bold mx-0.5 ${page === i + 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                onClick={() => setPage(i + 1)}
              >{i + 1}</button>
            ))}
            <button
              className="w-7 h-7 flex items-center justify-center rounded-[5px] border border-gray-300 bg-white text-gray-700 font-bold disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
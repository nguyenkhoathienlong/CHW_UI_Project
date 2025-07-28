"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tag, Calendar, FileText, Users, Info, Download, Activity } from "lucide-react";

const mockPrograms = [
  {
    id: "uctc-829102",
    name: "Chương trình tầm soát ung thư cổ tử cung",
    code: "UTCTC-829102",
    type: "Tầm soát & phát hiện sớm bệnh lý",
    logo: "",
    goal: "Phát hiện sớm các dấu hiệu ung thư cổ tử cung ở phụ nữ từ 25-55 tuổi.",
    start: "12/02/2025",
    end: "12/12/2025",
    desc: "Chương trình nhằm nâng cao nhận thức, phát hiện sớm và hỗ trợ điều trị ung thư cổ tử cung cho phụ nữ Việt Nam. Tham gia chương trình, cộng tác viên sẽ được đào tạo, cung cấp tài liệu, và đồng hành cùng các chuyên gia đầu ngành.",
    files: [
      { name: "Tài liệu hướng dẫn.pdf", url: "#" },
      { name: "Kế hoạch chương trình.docx", url: "#" },
    ],
    members: 12,
    activities: [
      { name: "Tập huấn cộng tác viên", date: "15/02/2025", desc: "Đào tạo kiến thức cơ bản về ung thư cổ tử cung." },
      { name: "Khám sàng lọc đợt 1", date: "01/03/2025", desc: "Tổ chức khám sàng lọc tại địa phương." },
    ],
  },
  // ... các chương trình khác ...
];

export default function ProgramDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState<'info'|'activity'>('info');
  const program = mockPrograms.find(p => p.id === id) || mockPrograms[0];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-blue-50 py-4 px-1">
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold text-base transition-all ${tab==='info' ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border-b-2 border-blue-100'}`}
            onClick={()=>setTab('info')}
          >Thông tin chương trình</button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold text-base transition-all ${tab==='activity' ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border-b-2 border-blue-100'}`}
            onClick={()=>setTab('activity')}
          >Hoạt động</button>
        </div>
        {/* Card content */}
        <Card className="w-full p-6 rounded-2xl shadow-lg border border-blue-100 bg-white flex flex-col gap-6">
          {tab === 'info' ? (
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Logo + meta */}
              <div className="flex flex-col items-center md:items-start gap-3 min-w-[120px]">
                <div className="w-24 h-24 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center">
                  <Tag className="w-12 h-12 text-blue-400" />
                </div>
                <span className="text-lg font-bold text-blue-700 text-center md:text-left">{program.name}</span>
                <span className="text-sm text-blue-500 font-medium">{program.code}</span>
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-100 rounded px-2 py-0.5 mt-1"><Tag className="w-4 h-4" /> {program.type}</span>
              </div>
              {/* Info */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 mb-2">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-700"><Info className="w-4 h-4 text-blue-400" /> <b>Mục tiêu:</b> {program.goal}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-700"><Calendar className="w-4 h-4 text-blue-400" /> <b>Thời gian:</b> {program.start} - {program.end}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-700"><Users className="w-4 h-4 text-blue-400" /> <b>Cộng tác viên:</b> {program.members}</span>
                </div>
                <div className="text-base text-gray-800 mb-2"><b>Mô tả chi tiết:</b> {program.desc}</div>
                <div className="flex flex-col gap-1">
                  <b className="text-sm text-blue-700 mb-1">Tài liệu đính kèm:</b>
                  <div className="flex flex-wrap gap-2">
                    {program.files.map(f => (
                      <a key={f.name} href={f.url} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 text-sm hover:bg-blue-100 transition">
                        <FileText className="w-4 h-4" /> {f.name} <Download className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <b className="text-blue-700 text-lg flex items-center gap-2"><Activity className="w-5 h-5" /> Danh sách hoạt động</b>
              <ul className="flex flex-col gap-3">
                {program.activities.map((a, idx) => (
                  <li key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <span className="font-semibold text-blue-700 min-w-[120px] flex items-center gap-1"><Calendar className="w-4 h-4" /> {a.date}</span>
                    <span className="text-gray-800 flex-1">{a.name}</span>
                    <span className="text-gray-500 text-sm">{a.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
} 
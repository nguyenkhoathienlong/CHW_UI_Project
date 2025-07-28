'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const data = [
  { id: "CTV01", name: "Nguyen Van A", unit: "Trung tâm Y tế B", project: "Chương trình tầm soát ung thư cổ tử cung", joinDate: "01/06/2024", status: "Đang tham gia" },
  { id: "CTV03", name: "Le Van C", unit: "Trung tâm Y tế B", project: "Chương trình tầm soát Lao", joinDate: "10/06/2024", status: "Đang tham gia" },
];

export const recruitedCollaborators = data;

export default function TableContent({ title }: { title: string }) {
  const [selectedProject, setSelectedProject] = useState('');
  const router = useRouter();
  const projectOptions = [
    { value: '', label: 'Tất cả chương trình/dự án' },
    ...Array.from(new Set(data.map(row => row.project))).map(project => ({ value: project, label: project }))
  ];
  const filteredData = data.filter(row => row.status === 'Đang tham gia' && (selectedProject === '' || row.project === selectedProject));
  const pageSize = 10;
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  const currentPage = 1; // giả lập trang đầu tiên
  const pagedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ margin: '10px 10px 0 10px', background: '#f4f6fb', borderRadius: 18, minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: 'none' }}>
      <Card style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', overflow: 'hidden', width: '100%', minHeight: 600, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '25px 20px 20px 20px' }}>
          <h2 style={{ fontWeight: 600, fontSize: 20, color: '#222'}}>{title}</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '0 16px 10px 20px', paddingTop: 10 }}>
          <Input
            placeholder="Nhập ký tự tìm kiếm..."
            className="border border-[#e5e7eb] focus-visible:ring-[#2563eb] bg-white text-[#222] font-medium transition-colors"
            style={{ maxWidth: 300, fontSize: 12, height: 28, padding: '2px 8px', borderRadius: 5, marginBottom: 0, lineHeight: 'normal' }}
          />
          <select
            value={selectedProject}
            onChange={e => setSelectedProject(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: 5, padding: '2px 8px', color: '#222', background: '#fff', fontSize: 12, height: 28, marginBottom: 0, lineHeight: 'normal' }}
          >
            {projectOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1, overflow: 'auto', margin: '0 0 0 0' }}>
          <Table style={{ minWidth: 800, width: '100%' }}>
            <TableHeader>
              <TableRow style={{ background: '#f8fafc' }}>
                <TableHead style={{ padding: '8px 20px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80 }}>Mã CTV</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Họ và Tên</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Đơn vị tuyển dụng</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Chương trình/dự án tham gia</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80 }}>Ngày tham gia</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80, verticalAlign: 'middle' }}>Trạng thái</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 60, verticalAlign: 'middle' }}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedData.map((row, idx) => (
                <TableRow key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', fontSize: 12 }}>
                  <TableCell style={{ padding: '6px 20px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 80 }}>{row.id}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.name}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.unit}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.project}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', color: '#222', verticalAlign: 'middle', minWidth: 80 }}>{row.joinDate}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 80 }}>
                    <Badge style={{ fontWeight: 600, background: '#d1fae5', color: '#059669', borderRadius: 10, padding: '2px 8px', minWidth: 50, display: 'inline-block', textAlign: 'center', fontSize: 11 }}>{row.status}</Badge>
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 60 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{ border: '1.5px solid #e5e7eb', color: '#2563eb', background: '#fff', fontWeight: 600, borderRadius: 6, transition: 'all 0.18s', fontSize: 12, padding: '2px 8px', height: 24 }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#2563eb';
                        e.currentTarget.style.color = '#1d4ed8';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.color = '#2563eb';
                      }}
                      onClick={() => router.push(`/collaborators/recruited/evaluate/${row.id}`)}
                    >Chi tiết</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Phân trang */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 12px 8px 12px', position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '1px solid #e5e7eb', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, minHeight: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#64748b', fontWeight: 500, fontSize: 12 }}>Số hàng</span>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '2px 8px', color: '#222', background: '#fff', fontSize: 12, height: 24 }}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span style={{ color: '#64748b', fontWeight: 500, fontSize: 12 }}>Trang {currentPage} trên {totalPages}</span>
            <Button variant="ghost" size="icon" className="text-[#64748b] hover:bg-[#e0e7ef] hover:text-[#2563eb]" style={{ width: 22, height: 22 }}><ChevronsLeft size={12} /></Button>
            <Button variant="ghost" size="icon" className="text-[#64748b] hover:bg-[#e0e7ef] hover:text-[#2563eb]" style={{ width: 22, height: 22 }}><ChevronLeft size={12} /></Button>
            <Button variant="ghost" size="icon" className="text-[#64748b] hover:bg-[#e0e7ef] hover:text-[#2563eb]" style={{ width: 22, height: 22 }}><ChevronRight size={12} /></Button>
            <Button variant="ghost" size="icon" className="text-[#64748b] hover:bg-[#e0e7ef] hover:text-[#2563eb]" style={{ width: 22, height: 22 }}><ChevronsRight size={12} /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 
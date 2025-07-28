'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

// Mock data: CTV chưa tham gia hoạt động/dự án nào, sẵn sàng huy động
const data = [
  { id: "CTV201", name: "Nguyễn Thị H", phone: "0911222333", email: "nguyenthih@email.com", status: "Sẵn sàng huy động", province: "Thành phố Hồ Chí Minh", ward: "Đa Kao" },
  { id: "CTV202", name: "Lê Văn I", phone: "0922333444", email: "levani@email.com", status: "Sẵn sàng huy động", province: "Thành phố Hồ Chí Minh", ward: "Thủ đức" },
  { id: "CTV203", name: "Trần Văn K", phone: "0933444555", email: "tranvank@email.com", status: "Sẵn sàng huy động", province: "Thành phố Hồ Chí Minh", ward: "Gò Vấp" },
  { id: "CTV204", name: "Phạm Thị L", phone: "0944555666", email: "phamthil@email.com", status: "Sẵn sàng huy động", province: "Thành phố Hồ Chí Minh", ward: "Bình Chánh" },
];

export const completeTrainingCollaborators = data;

export default function TableContent({ title }: { title: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Lấy danh sách unique tỉnh/thành và phường từ data
  const provinces = Array.from(new Set(data.map(d => d.province)));
  const [selectedProvince, setSelectedProvince] = useState('');
  const wards = useMemo(() => {
    if (!selectedProvince) return Array.from(new Set(data.map(d => d.ward)));
    return Array.from(new Set(data.filter(d => d.province === selectedProvince).map(d => d.ward)));
  }, [selectedProvince]);
  const [selectedWard, setSelectedWard] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvince = !selectedProvince || item.province === selectedProvince;
      const matchesWard = !selectedWard || item.ward === selectedWard;
      return matchesSearch && matchesProvince && matchesWard;
    });
  }, [searchTerm, selectedProvince, selectedWard]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // Xác định đã chọn hết chưa (chỉ các dòng đang hiển thị)
  const allChecked = filteredData.length > 0 && filteredData.every(row => selectedRows.includes(row.id));
  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map(row => row.id));
    } else {
      setSelectedRows(selectedRows.filter(id => !filteredData.some(row => row.id === id)));
    }
  };
  const handleCheckRow = (id: string, checked: boolean) => {
    setSelectedRows(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };

  return (
    <div style={{ margin: '10px 10px 0 10px', background: '#f4f6fb', borderRadius: 18, minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: 'none' }}>
      <Card style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', border: '1px solid #e5e7eb', overflow: 'hidden', width: '100%', minHeight: 500, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '25px 20px 20px 20px' }}>
          <h2 style={{ fontWeight: 600, fontSize: 20, color: '#222'}}>{title}</h2>
          <button
            style={{
              background: selectedRows.length > 0 ? '#2563eb' : '#e0e7ef',
              color: selectedRows.length > 0 ? '#fff' : '#64748b',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 13,
              padding: '6px 16px',
              cursor: selectedRows.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.18s',
              marginLeft: 12,
              minWidth: 120,
            }}
            disabled={selectedRows.length === 0}
            onClick={() => {
              if (selectedRows.length > 0) alert('Đã gửi lời mời đến: ' + selectedRows.join(', '));
            }}
          >
            Gửi lời mời ({selectedRows.length})
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '0 16px 10px 20px', paddingTop: 10, flexWrap: 'wrap' }}>
          <Input
            placeholder="Nhập ký tự tìm kiếm..."
            className="border border-[#e5e7eb] focus-visible:ring-[#2563eb] bg-white text-[#222] font-medium transition-colors"
            style={{ maxWidth: 300, fontSize: 12, height: 28, padding: '2px 8px', borderRadius: 5, marginBottom: 0, lineHeight: 'normal' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedProvince}
            onChange={e => { setSelectedProvince(e.target.value); setSelectedWard(''); }}
            style={{ border: '1px solid #e5e7eb', borderRadius: 5, padding: '2px 8px', color: '#222', background: '#fff', fontSize: 12, height: 28, marginBottom: 0, lineHeight: 'normal', minWidth: 140 }}
          >
            <option value="">Tất cả thành phố/tỉnh</option>
            {provinces.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={selectedWard}
            onChange={e => setSelectedWard(e.target.value)}
            style={{ border: '1px solid #e5e7eb', borderRadius: 5, padding: '2px 8px', color: '#222', background: '#fff', fontSize: 12, height: 28, marginBottom: 0, lineHeight: 'normal', minWidth: 120 }}
          >
            <option value="">Tất cả phường</option>
            {wards.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Table style={{ minWidth: 700, width: '100%' }}>
            <TableHeader>
              <TableRow style={{ background: '#f8fafc' }}>
                <TableHead style={{ width: 28, padding: '12px 20px', textAlign: 'center', borderBottom: '2px solid #e5e7eb' }}>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleCheckAll}
                    style={{ width: 12, height: 12, accentColor: '#2563eb', cursor: 'pointer' }}
                    aria-label="Chọn tất cả"
                  />
                </TableHead>
                <TableHead style={{ padding: '8px 20px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80 }}>Mã CTV</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Họ và Tên</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Số điện thoại</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Email</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Nơi cư trú</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Trạng thái</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80 }}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, idx) => (
                <TableRow key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', fontSize: 12 }}>
                  <TableCell style={{ width: 28, padding: '6px 4px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={e => handleCheckRow(row.id, e.target.checked)}
                      style={{ width: 12, height: 12, accentColor: '#2563eb', cursor: 'pointer' }}
                      aria-label={`Chọn ${row.id}`}
                    />
                  </TableCell>
                  <TableCell style={{ padding: '6px 20px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 80 }}>{row.id}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.name}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.phone}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.email}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.province}, {row.ward} </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 100 }}>
                    <Badge style={{ fontWeight: 600, background: '#e0e7ef', color: '#2563eb', borderRadius: 10, padding: '2px 8px', minWidth: 50, display: 'inline-block', textAlign: 'center', fontSize: 11 }}>{row.status}</Badge>
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 80 }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal size={14} color="#64748b" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/collaborators/profile/${row.id}`)}>
                          Xem hồ sơ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert('Đã gửi lời mời đến ' + row.name)}>
                          Gửi lời mời
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 
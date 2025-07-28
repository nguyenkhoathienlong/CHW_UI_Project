"use client";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Filter, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState, useMemo } from 'react';

const collaborators = [
  {
    id: 'CTV201',
    fullName: 'Nguyễn Thị H',
    cccd: '555566667777',
    phone: '0911222333',
    email: 'nguyenthih@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Đang đào tạo',
    certificateIssued: false,
    certificateDate: '',
    startDate: '10/06/2024',
    endDate: '',
  },
  {
    id: 'CTV202',
    fullName: 'Lê Văn I',
    cccd: '888899990000',
    phone: '0922333444',
    email: 'levani@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Đang đào tạo',
    certificateIssued: false,
    certificateDate: '',
    startDate: '10/06/2024',
    endDate: '',
  },
  {
    id: 'CTV203',
    fullName: 'Trần Văn K',
    cccd: '999900001111',
    phone: '0933444555',
    email: 'tranvank@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Chờ đánh giá',
    certificateIssued: true,
    certificateDate: '20/06/2024',
    startDate: '10/06/2024',
    endDate: '20/06/2024',
  },
  {
    id: 'CTV204',
    fullName: 'Phạm Thị L',
    cccd: '222211110000',
    phone: '0944555666',
    email: 'phamthil@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Chờ đánh giá',
    certificateIssued: true,
    certificateDate: '12/06/2024',
    startDate: '12/05/2024',
    endDate: '12/06/2024',
  },
  {
    id: 'CTV205',
    fullName: 'Lý Minh M',
    cccd: '333322221111',
    phone: '0955666777',
    email: 'lyminhm@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Chờ đánh giá',
    certificateIssued: true,
    certificateDate: '15/06/2024',
    startDate: '12/05/2024',
    endDate: '15/06/2024',
  },
  {
    id: 'CTV206',
    fullName: 'Đỗ Thị N',
    cccd: '444433332222',
    phone: '0966777888',
    email: 'dothin@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Chờ đánh giá',
    certificateIssued: true,
    certificateDate: '18/06/2024',
    startDate: '18/06/2024',
    endDate: '28/06/2024',
  },
  {
    id: 'CTV207',
    fullName: 'Ngô Văn O',
    cccd: '555544443333',
    phone: '0977888999',
    email: 'ngovano@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Chờ đánh giá',
    certificateIssued: true,
    certificateDate: '20/06/2024',
    startDate: '18/05/2024',
    endDate: '20/06/2024',
  },
  {
    id: 'CTV208',
    fullName: 'Bùi Thị P',
    cccd: '666655554444',
    phone: '0988999000',
    email: 'buithip@email.com',
    district: 'Thành phố Hồ Chí Minh',
    ward: 'Gò Vấp',
    status: 'Đang đào tạo',
    certificateIssued: false,
    certificateDate: '',
    startDate: '18/05/2024',
    endDate: '',
  },
];

const trainingStatusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'Chờ đánh giá', label: 'Chờ đánh giá' },
  { value: 'Đang đào tạo', label: 'Đang đào tạo' },
];

export const trainingCollaborators = collaborators;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Đang đào tạo':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-yellow-100 text-yellow-700';
  }
};

export default function TableContent({ title }: { title: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainingStatus, setSelectedTrainingStatus] = useState("");

  const filteredData = useMemo(() => {
    return collaborators.filter(item => {
      const matchesSearch = searchTerm === "" ||
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.cccd.includes(searchTerm);
      const matchesStatus = selectedTrainingStatus === "" || item.status === selectedTrainingStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedTrainingStatus]);

  return (
    <div style={{
      margin: '10px 10px 0 10px',
      background: '#f4f6fb',
      borderRadius: 18,
      minHeight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      boxShadow: 'none',
    }}>
      <Card
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px #0001',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          width: '100%',
          minHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '25px 20px 20px 20px' }}>
          <h2 style={{ fontWeight: 600, fontSize: 20, color: '#222'}}> {title} </h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '8px 12px 12px 20px' }}>
          <Input
            placeholder="Nhập ký tự tìm kiếm..."
            className="border border-[#e5e7eb] focus-visible:ring-[#2563eb] bg-white text-[#222] font-medium transition-colors"
            style={{ maxWidth: 300, fontSize: 12, height: 28, padding: '2px 8px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                style={{ 
                  fontSize: 12, 
                  padding: '4px 10px', 
                  height: 28, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4,
                  border: '1px solid #e5e7eb',
                  borderRadius: 5,
                  background: selectedTrainingStatus ? '#f0f9ff' : '#fff',
                  color: selectedTrainingStatus ? '#2563eb' : '#222'
                }}
              >
                <Filter size={12} />
                {trainingStatusOptions.find(opt => opt.value === selectedTrainingStatus)?.label || "Trạng thái đào tạo"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ minWidth: 180 }}>
              {trainingStatusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSelectedTrainingStatus(option.value)}
                  style={{
                    background: selectedTrainingStatus === option.value ? '#e0e7ef' : 'transparent',
                    color: selectedTrainingStatus === option.value ? '#2563eb' : '#222',
                    fontWeight: selectedTrainingStatus === option.value ? 600 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div style={{ flex: 1, overflow: 'auto', margin: '0 0 0 0' }}>
          <Table style={{ minWidth: 800, width: '100%' }}>
            <TableHeader>
              <TableRow style={{ background: '#f8fafc' }}>
                <TableHead style={{ padding: '8px 20px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Mã CTV</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Họ và Tên</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Số điện thoại</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Nơi cư trú</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Ngày bắt đầu</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Ngày hoàn thành</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Chứng chỉ</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Trạng thái</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 60, verticalAlign: 'middle' }}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((collaborator, idx) => (
                <TableRow
                  key={collaborator.id}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                    borderBottom: '1px solid #e5e7eb',
                    transition: 'background 0.2s',
                    fontSize: 12
                  }}
                >
                  <TableCell style={{ padding: '6px 20px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{collaborator.id}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{collaborator.fullName}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{collaborator.phone}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{collaborator.district}, {collaborator.ward}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{collaborator.startDate}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{collaborator.endDate}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>
                    {collaborator.certificateIssued
                      ? <span className="text-green-600 font-bold">Đã cấp ({collaborator.certificateDate})</span>
                      : <span className="text-gray-400">Chưa cấp</span>
                    }
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 100 }}>
                    <Badge className={getStatusColor(collaborator.status)}>
                      {collaborator.status}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 60, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal size={14} color="#64748b" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {collaborator.status === "Chờ đánh giá" ? (
                          <DropdownMenuItem asChild className="hover:bg-[#e0e7ef] hover:text-[#2563eb]">
                            <Link href={`/collaborators/training/detail/${collaborator.id}?tabs=training`}> Đánh giá </Link>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem asChild className="hover:bg-[#e0e7ef] hover:text-[#2563eb]">
                            <Link href={`/collaborators/training/detail/${collaborator.id}?tabs=training`}> Xem quá trình đào tạo </Link>
                          </DropdownMenuItem>
                        )}
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
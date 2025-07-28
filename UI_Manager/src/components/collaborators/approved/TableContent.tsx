'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Filter, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";

const data = [
  { id: "CTV1", name: "Tran Van A", cccd: "12312312312312", phone: "0967291123", status: "Đã tuyển chọn", hasAccount: true, accountStatus: "Đã cấp tài khoản", district: "Thành phố Hồ Chí Minh", ward: "Thủ Đức" },
  { id: "CTV2", name: "Tran Van B", cccd: "12312312312312", phone: "0967291124", status: "Đã tuyển chọn", hasAccount: false, accountStatus: "Chưa cấp tài khoản", district: "Thành phố Hồ Chí Minh", ward: "Bến Nghé" },
  { id: "CTV3", name: "Tran Van C", cccd: "12312312312312", phone: "0967291125", status: "Đã tuyển chọn", hasAccount: true, accountStatus: "Đã cấp tài khoản", district: "Thành phố Hồ Chí Minh", ward: "Bình Thạnh" },
  { id: "CTV4", name: "Tran Van D", cccd: "12312312312312", phone: "0967291126", status: "Đã tuyển chọn", hasAccount: false, accountStatus: "Chưa cấp tài khoản", district: "Thành phố Hồ Chí Minh", ward: "Bình Chánh" },
  { id: "CTV5", name: "Tran Van E", cccd: "12312312312312", phone: "0967291127", status: "Đã tuyển chọn", hasAccount: true, accountStatus: "Đã cấp tài khoản", district: "Thành phố Hồ Chí Minh", ward: "Bình Chánh" },
];

export const approvedCollaborators = data;

// Tính toán số lượng cho mỗi trạng thái tài khoản
const getAccountStatusCounts = (data: any[]) => {
  const counts: { [key: string]: number } = {};
  data.forEach(item => {
    counts[item.accountStatus] = (counts[item.accountStatus] || 0) + 1;
  });
  return counts;
};

const accountStatusCounts = getAccountStatusCounts(data);

const accountStatusOptions = [
  { value: "", label: "Tất cả trạng thái", count: data.length },
  { value: "Đã cấp tài khoản", label: "Đã cấp tài khoản", count: accountStatusCounts["Đã cấp tài khoản"] || 0 },
  { value: "Chưa cấp tài khoản", label: "Chưa cấp tài khoản", count: accountStatusCounts["Chưa cấp tài khoản"] || 0 },
];

function renderAccountStatusBadge(hasAccount: boolean) {
  if (hasAccount) {
    return (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-green-600" />
        <span className="bg-green-100 text-green-700 font-semibold rounded-full px-3 py-1 text-xs">
          Đã cấp tài khoản
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2">
        <UserPlus className="h-4 w-4 text-orange-600" />
        <span className="bg-orange-100 text-orange-700 font-semibold rounded-full px-3 py-1 text-xs">
          Chưa cấp tài khoản
        </span>
      </div>
    );
  }
}

// Mock data hợp đồng cho mỗi CTV
export const contractListMock = [
  {
    id: 'HD-2024-001',
    project: 'Chương trình tầm soát ung thư cổ tử cung',
    type: 'Dự án',
    duration: '01/2024 - 12/2024',
    logo: '/logo1.svg',
    code: 'DA-001',
    form: 'Toàn thời gian',
    level: 'Cộng tác viên',
    salary: '8.000.000 - 12.000.000',
    workLocation: 'Hà Nội',
    signDate: '10-01-2024',
    startDate: '10-01-2024',
    endDate: '31-12-2024',
    status: 'Đang hiệu lực',
  },
  {
    id: 'HD-2024-002',
    project: 'Chương trình chăm sóc sức khỏe cộng đồng',
    type: 'Miễn phí từ nguồn ngân sách nhà nước',
    duration: '03/2024 - 09/2024',
    logo: '/logo2.svg',
    code: 'CT-002',
    form: 'Bán thời gian',
    level: 'Cộng tác viên',
    salary: '7.000.000 - 10.000.000',
    workLocation: 'TP.HCM',
    signDate: '05-03-2024',
    startDate: '05-03-2024',
    endDate: '30-09-2024',
    status: 'Hết hiệu lực',
  },
];

export default function TableContent({ title }: { title: string }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountStatus, setSelectedAccountStatus] = useState("");

  // Lọc dữ liệu theo search term và account status filter
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.cccd.includes(searchTerm);
      
      const matchesAccountStatus = selectedAccountStatus === "" || item.accountStatus === selectedAccountStatus;
      
      return matchesSearch && matchesAccountStatus;
    });
  }, [searchTerm, selectedAccountStatus]);

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 20px 20px 20px' }}>
          <h2 style={{ fontWeight: 600, fontSize: 20, color: '#222'}}> {title} </h2>
          <div style={{ display: 'flex', gap: 6, paddingTop: 15 }}>
            <Button style={{ fontSize: 12, padding: '4px 10px', height: 28 }}>Xuất Danh Sách</Button>
            <Button variant="outline" style={{ fontSize: 12, padding: '4px 10px', height: 28 }}>Nhập File Excel</Button>
          </div>
        </div>
        <div style={{ margin: '0 16px 10px 20px', display: 'flex', gap: 8, alignItems: 'center' }}>
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
                  background: selectedAccountStatus ? '#f0f9ff' : '#fff',
                  color: selectedAccountStatus ? '#2563eb' : '#222'
                }}
              >
                <Filter size={12} />
                {selectedAccountStatus || "Trạng thái tài khoản"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ minWidth: 180 }}>
              {accountStatusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSelectedAccountStatus(option.value)}
                  style={{
                    background: selectedAccountStatus === option.value ? '#e0e7ef' : 'transparent',
                    color: selectedAccountStatus === option.value ? '#2563eb' : '#222',
                    fontWeight: selectedAccountStatus === option.value ? 600 : 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <span>{option.label}</span>
                  <span style={{ 
                    background: selectedAccountStatus === option.value ? '#2563eb' : '#e5e7eb', 
                    color: selectedAccountStatus === option.value ? '#fff' : '#64748b',
                    borderRadius: 8, 
                    padding: '2px 6px', 
                    fontSize: 10, 
                    fontWeight: 600,
                    minWidth: 20,
                    textAlign: 'center'
                  }}>
                    {option.count}
                  </span>
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
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 100 }}>Nơi cư trú</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 120 }}>Tài khoản</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 80, verticalAlign: 'middle' }}>Trạng thái</TableHead>
                <TableHead style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: '#222', borderBottom: '2px solid #e5e7eb', minWidth: 60, verticalAlign: 'middle' }}>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, idx) => (
                <TableRow
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                    borderBottom: '1px solid #e5e7eb',
                    transition: 'background 0.2s',
                    fontSize: 12
                  }}
                >
                  <TableCell style={{ padding: '6px 20px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{row.id}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 120 }}>{row.name}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{row.phone}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', color: '#222', verticalAlign: 'middle', minWidth: 100 }}>{row.district}, {row.ward}</TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'left', verticalAlign: 'middle', minWidth: 120 }}>
                    {renderAccountStatusBadge(row.hasAccount)}
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 80 }}>
                    <Badge style={{ fontWeight: 600, background: '#d1fae5', color: '#059669', borderRadius: 10, padding: '2px 8px', minWidth: 50, display: 'inline-block', textAlign: 'center', fontSize: 11 }}>{row.status}</Badge>
                  </TableCell>
                  <TableCell style={{ padding: '6px 10px', textAlign: 'center', verticalAlign: 'middle', minWidth: 60, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal size={14} color="#64748b" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/collaborators/approved/detail/${row.id}`)} className="hover:bg-[#e0e7ef] hover:text-[#2563eb]">Xem hồ sơ</DropdownMenuItem>
                        {!row.hasAccount && (
                          <DropdownMenuItem onClick={() => router.push(`/collaborators/approved/detail/${row.id}?tab=account`)} className="hover:bg-[#e0e7ef] hover:text-[#2563eb]">Tạo tài khoản</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="hover:bg-[#fee2e2] hover:text-[#b91c1c]">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
            <span style={{ color: '#64748b', fontWeight: 500, fontSize: 12 }}>Trang 1 trên 4</span>
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
"use client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { SidebarContext } from "@/components/layout/Sidebar";

const mockApplications = [
  {
    id: 1,
    collaboratorId: "CTV101",
    candidateName: "Nguyễn Văn A",
    position: "Cộng tác viên y tế cộng đồng",
    project: "Chương trình tầm soát ung thư cổ tử cung",
    appliedDate: "2024-06-01",
    status: "Đang xem xét",
    statusColor: "yellow",
  },
  {
    id: 2,
    collaboratorId: "CTV102",
    candidateName: "Trần Thị B",
    position: "Nhân viên chăm sóc sức khỏe",
    project: "Chương trình chăm sóc sức khỏe cộng đồng",
    appliedDate: "2024-06-02",
    status: "Đã duyệt",
    statusColor: "green",
  },
  {
    id: 3,
    collaboratorId: "CTV103",
    candidateName: "Lê Văn C",
    position: "Cộng tác viên tuyên truyền y tế",
    project: "Chương trình phòng chống sốt xuất huyết",
    appliedDate: "2024-06-03",
    status: "Từ chối",
    statusColor: "red",
  },
  {
    id: 4,
    collaboratorId: "CTV104",
    candidateName: "Phạm Thị D",
    position: "Nhân viên hỗ trợ y tế dự phòng",
    project: "Chương trình tiêm chủng mở rộng",
    appliedDate: "2024-06-04",
    status: "Đang xem xét",
    statusColor: "yellow",
  },
];

const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "Đang xem xét", label: "Đang xem xét" },
  { value: "Đã duyệt", label: "Đã duyệt" },
  { value: "Từ chối", label: "Từ chối" },
];

function getStatusBadge(status: string, color: string) {
  let style = {};
  let icon = null;
  if (color === "green") { style = { background: "#d1fae5", color: "#059669" }; icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; }
  if (color === "yellow") { style = { background: "#fef9c3", color: "#b45309" }; icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; }
  if (color === "red") { style = { background: "#fee2e2", color: "#dc2626" }; icon = <AlertCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; }
  return (
    <span style={{ ...style, fontWeight: 600, borderRadius: 10, padding: "2px 12px 2px 6px", fontSize: 13, display: "inline-flex", alignItems:'center', minWidth: 90, textAlign: "center" }}>{icon}{status}</span>
  );
}

// Hàm format ngày từ yyyy-mm-dd sang dd/mm/yyyy
function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function ApplicationsListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { collapsed } = useContext(SidebarContext);
  const marginLeft = collapsed ? 44 : 250;

  const filtered = useMemo(() => {
    return mockApplications.filter(app => {
      const matchSearch =
        search === "" ||
        app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "" || app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  // Tổng hợp số lượng theo trạng thái
  const total = mockApplications.length;
  const reviewing = mockApplications.filter(a => a.status === "Đang xem xét").length;
  const approved = mockApplications.filter(a => a.status === "Đã duyệt").length;
  const rejected = mockApplications.filter(a => a.status === "Từ chối").length;

  return (
    <div className={`w-full p-6 bg-[#f4f6fb] min-h-screen rounded-2xl transition-all duration-200`}>
      <h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Quản lý đơn ứng tuyển</h1>
      <div className="text-[#64748b] text-base mb-5">Theo dõi, xét duyệt và quản lý các đơn ứng tuyển vào vị trí của đơn vị bạn.</div>
      {/* Card tổng quan */}
      <div className="flex gap-4 mb-5 flex-wrap">
        <Card className="flex-1 flex items-center gap-3 p-5 rounded-2xl shadow bg-white border border-[#e5e7eb]">
          <Users className="w-8 h-8 text-blue-600 bg-blue-100 rounded-lg p-1" />
          <div>
            <div className="font-bold text-lg text-[#222]">{total}</div>
            <div className="text-xs text-[#64748b]">Tổng đơn ứng tuyển</div>
          </div>
        </Card>
        <Card className="flex-1 flex items-center gap-3 p-5 rounded-2xl shadow bg-white border border-[#e5e7eb]">
          <Clock className="w-8 h-8 text-yellow-700 bg-yellow-100 rounded-lg p-1" />
          <div>
            <div className="font-bold text-lg text-yellow-700">{reviewing}</div>
            <div className="text-xs text-yellow-700">Đang xem xét</div>
          </div>
        </Card>
        <Card className="flex-1 flex items-center gap-3 p-5 rounded-2xl shadow bg-white border border-[#e5e7eb]">
          <CheckCircle className="w-8 h-8 text-green-600 bg-green-100 rounded-lg p-1" />
          <div>
            <div className="font-bold text-lg text-green-600">{approved}</div>
            <div className="text-xs text-green-600">Đã duyệt</div>
          </div>
        </Card>
        <Card className="flex-1 flex items-center gap-3 p-5 rounded-2xl shadow bg-white border border-[#e5e7eb]">
          <AlertCircle className="w-8 h-8 text-red-600 bg-red-100 rounded-lg p-1" />
          <div>
            <div className="font-bold text-lg text-red-600">{rejected}</div>
            <div className="text-xs text-red-600">Từ chối</div>
          </div>
        </Card>
      </div>
      {/* Bộ lọc & tìm kiếm */}
      <Card className="bg-white rounded-2xl shadow border border-[#e5e7eb] w-full min-h-[500px] mb-5">
        <div className="flex gap-3 items-center p-5 flex-wrap">
          <Input
            placeholder="Tìm kiếm ứng viên, vị trí..."
            className="max-w-xs text-sm h-8 px-2 bg-white border border-[#e5e7eb]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-sm h-8 border border-[#e5e7eb] rounded px-3 bg-white font-medium"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="px-0 pb-5 overflow-x-auto w-full">
          <Table className="min-w-[900px] w-full">
            <TableHeader>
              <TableRow className="bg-[#f8fafc] text-sm">
                <TableHead className="px-4 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Mã ứng viên</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Tên ứng viên</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Vị trí ứng tuyển</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Chương trình/dự án tham gia</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Ngày ứng tuyển</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb]">Trạng thái đơn</TableHead>
                <TableHead className="px-2 py-2 font-bold text-sm text-[#222] border-b-2 border-[#e5e7eb] text-center align-middle">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(app => (
                <TableRow key={app.id} className="bg-white border-b border-[#e5e7eb] text-sm">
                  <TableCell className="px-4 py-2 text-sm text-[#222]">{app.collaboratorId}</TableCell>
                  <TableCell className="px-2 py-2 text-sm text-[#222]">{app.candidateName}</TableCell>
                  <TableCell className="px-2 py-2 text-sm text-[#222]">{app.position}</TableCell>
                  <TableCell className="px-2 py-2 text-sm text-[#222]">{app.project}</TableCell>
                  <TableCell className="px-2 py-2 text-sm text-[#222]">{formatDate(app.appliedDate)}</TableCell>
                  <TableCell className="px-2 py-2 text-sm">{getStatusBadge(app.status, app.statusColor)}</TableCell>
                  <TableCell className="px-2 py-2 text-center align-middle text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} color="#64748b" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/recruitment-list/applications/${app.id}`)}
                          className="hover:bg-[#e0e7ef] hover:text-[#2563eb]"
                        >
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-[#fee2e2] hover:text-[#b91c1c]"
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-[#64748b] py-6 text-sm">
                    Không có đơn ứng tuyển nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 
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
    status: "Chờ xử lý",
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
    statusColor: "indigo",
  },
  {
    id: 3,
    collaboratorId: "CTV103",
    candidateName: "Lê Văn C",
    position: "Cộng tác viên tuyên truyền y tế",
    project: "Chương trình phòng chống sốt xuất huyết",
    appliedDate: "2024-06-03",
    status: "Đã từ chối",
    statusColor: "red",
  },
  {
    id: 4,
    collaboratorId: "CTV104",
    candidateName: "Phạm Thị D",
    position: "Nhân viên hỗ trợ y tế dự phòng",
    project: "Chương trình tiêm chủng mở rộng",
    appliedDate: "2024-06-04",
    status: "Chờ xử lý",
    statusColor: "yellow",
  },
  {
    id: 5,
    collaboratorId: "CTV105",
    candidateName: "Hoàng Văn E",
    position: "Cộng tác viên y tế cộng đồng",
    project: "Chương trình phòng chống dịch bệnh",
    appliedDate: "2024-06-05",
    status: "Đã duyệt",
    statusColor: "indigo",
  },
  {
    id: 6,
    collaboratorId: "CTV106",
    candidateName: "Nguyễn Thị F",
    position: "Cộng tác viên y tế cộng đồng",
    project: "Chương trình phòng chống dịch bệnh",
    appliedDate: "2024-06-06",
    status: "Hoàn tất tuyển dụng",
    statusColor: "green",
  },
];

// Lấy danh sách unique positions và projects
const uniquePositions = [...new Set(mockApplications.map(app => app.position))];
const uniqueProjects = [...new Set(mockApplications.map(app => app.project))];

function getStatusBadge(status: string, color: string) {
  let style = {};
  let icon = null;
  if (color === "green") { style = { background: "#d1fae5", color: "#059669" }; icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; }
  if (color === "yellow") { style = { background: "#fef9c3", color: "#b45309" }; icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; }
  if (color === "red") { style = { background: "#fee2e2", color: "#dc2626" }; icon = <AlertCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; }
  if (color === "indigo") { style = { background: "#e0e7ff", color: "#4338ca" }; icon = <CheckCircle size={15} style={{marginRight:5, color:'#4338ca'}}/>; }
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
  const [activeTab, setActiveTab] = useState("all");
  const [positionFilter, setPositionFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const { collapsed } = useContext(SidebarContext);

  // Tính toán số lượng theo trạng thái
  const total = mockApplications.length;
  const pending = mockApplications.filter(a => a.status === "Chờ xử lý").length;
  const approved = mockApplications.filter(a => a.status === "Đã duyệt").length;
  const rejected = mockApplications.filter(a => a.status === "Đã từ chối").length;
  const completed = mockApplications.filter(a => a.status === "Hoàn tất tuyển dụng").length;

  // Lọc dữ liệu theo tab đang chọn và các filter
  const filtered = useMemo(() => {
    let filteredData = mockApplications.filter(app => {
      const matchSearch =
        search === "" ||
        app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase()) ||
        app.project.toLowerCase().includes(search.toLowerCase());
      
      const matchPosition = positionFilter === "" || app.position === positionFilter;
      const matchProject = projectFilter === "" || app.project === projectFilter;
      
      return matchSearch && matchPosition && matchProject;
    });

    // Lọc theo tab
    if (activeTab === "pending") {
      filteredData = filteredData.filter(app => app.status === "Chờ xử lý");
    } else if (activeTab === "approved") {
      filteredData = filteredData.filter(app => app.status === "Đã duyệt");
    } else if (activeTab === "rejected") {
      filteredData = filteredData.filter(app => app.status === "Đã từ chối");
    } else if (activeTab === "completed") {
      filteredData = filteredData.filter(app => app.status === "Hoàn tất tuyển dụng");
    }
    // "all" tab hiển thị tất cả

    return filteredData;
  }, [search, activeTab, positionFilter, projectFilter]);

  return (
    <div className={`w-full p-6 bg-[#f4f6fb] min-h-screen rounded-2xl transition-all duration-200`}>
      <h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Quản lý đơn ứng tuyển</h1>
      <div className="text-[#64748b] text-base mb-5">Theo dõi, xét duyệt và quản lý các đơn ứng tuyển vào vị trí của đơn vị bạn.</div>
      
      {/* Horizontal Tabs */}
      <div className="flex gap-4 mb-4 rounded-2xl p-0">
        <div 
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
            activeTab === "all" 
              ? "border-blue-600 text-blue-600 font-semibold" 
              : "border-transparent text-gray-500 font-medium hover:text-blue-600 hover:border-blue-300"
          }`}
        >
          <span className="text-sm">Tất cả</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
            activeTab === "all" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-200 text-gray-500 hover:bg-blue-100 hover:text-blue-600"
          }`}>
            {total}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
            activeTab === "pending" 
              ? "border-yellow-500 text-yellow-500 font-semibold" 
              : "border-transparent text-gray-500 font-medium hover:text-yellow-600 hover:border-yellow-300"
          }`}
        >
          <span className="text-sm">Chờ xử lý</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
            activeTab === "pending" 
              ? "bg-yellow-500 text-white" 
              : "bg-gray-200 text-gray-500 hover:bg-yellow-100 hover:text-yellow-600"
          }`}>
            {pending}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("approved")}
          className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
            activeTab === "approved" 
              ? "border-indigo-600 text-indigo-600 font-semibold" 
              : "border-transparent text-gray-500 font-medium hover:text-indigo-600 hover:border-indigo-300"
          }`}
        >
          <span className="text-sm">Đã duyệt</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
            activeTab === "approved" 
              ? "bg-indigo-600 text-white" 
              : "bg-gray-200 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600"
          }`}>
            {approved}
          </div>
        </div>
        
        <div 
          onClick={() => setActiveTab("rejected")}
          className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
            activeTab === "rejected" 
              ? "border-red-600 text-red-600 font-semibold" 
              : "border-transparent text-gray-500 font-medium hover:text-red-600 hover:border-red-300"
          }`}
        >
          <span className="text-sm">Đã từ chối</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
            activeTab === "rejected" 
              ? "bg-red-600 text-white" 
              : "bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-600"
          }`}>
            {rejected}
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("completed")}
          className={`flex items-center gap-2 px-2 py-2 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 ${
            activeTab === "completed" 
              ? "border-green-600 text-green-600 font-semibold" 
              : "border-transparent text-gray-500 font-medium hover:text-green-600 hover:border-green-300"
          }`}
        >
          <span className="text-sm">Hoàn tất tuyển dụng</span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
            activeTab === "completed" 
              ? "bg-green-600 text-white" 
              : "bg-gray-200 text-gray-500 hover:bg-green-100 hover:text-green-600"
          }`}>
            {completed}
          </div>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex gap-3 items-center mb-5">
        <Input
          placeholder="Nhập ký tự tìm kiếm..."
          className="max-w-xs text-sm px-4 bg-white border border-[#e5e7eb]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
        <select
          value={positionFilter}
          onChange={e => setPositionFilter(e.target.value)}
          className="text-sm h-8 px-2 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả vị trí</option>
          {uniquePositions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
        
        <select
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
          className="text-sm h-8 px-4 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả chương trình/dự án</option>
          {uniqueProjects.map(project => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
      </div>

      {/* Table Card */}
      <Card className="bg-white rounded-2xl shadow border border-[#e5e7eb] w-full min-h-[500px] mb-5">
        <div className="p-5 overflow-x-auto w-full">
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
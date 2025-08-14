"use client";
import { useState, useMemo, useContext } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  StopCircle
} from "lucide-react";
import { SidebarContext } from "@/components/layout/Sidebar";

// Mock data cho hợp đồng
const mockContracts = [
  {
    id: 1,
    title: "Hợp đồng cộng tác viên y tế cộng đồng",
    collaboratorName: "Nguyễn Văn A",
    collaboratorId: "CTV001",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "8.000.000 - 12.000.000",
    createDate: "10-01-2024",
    signDate: "10-01-2024",
    startDate: "15-01-2024",
    endDate: "15-01-2025",
    status: "Đang hiệu lực",
    statusColor: "green",
    project: "Chương trình tầm soát ung thư cổ tử cung",
  },
  {
    id: 2,
    title: "Hợp đồng cộng tác viên chăm sóc sức khỏe",
    collaboratorName: "Trần Thị B",
    collaboratorId: "CTV002",
    form: "Bán thời gian",
    level: "Cộng tác viên",
    salary: "7.000.000 - 10.000.000",
    createDate: "05-03-2024",
    signDate: "05-03-2024",
    startDate: "10-03-2024",
    endDate: "10-03-2025",
    status: "Hết hiệu lực",
    statusColor: "gray",
    project: "Chương trình chăm sóc sức khỏe cộng đồng",
  },
  {
    id: 3,
    title: "Hợp đồng cộng tác viên tuyên truyền y tế",
    collaboratorName: "Lê Văn C",
    collaboratorId: "CTV003",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "9.000.000 - 13.000.000",
    createDate: "20-04-2024",
    signDate: "20-04-2024",
    startDate: "25-04-2024",
    endDate: "25-04-2025",
    status: "Tạm ngưng",
    statusColor: "yellow",
    project: "Chương trình phòng chống sốt xuất huyết",
  },
  {
    id: 4,
    title: "Hợp đồng cộng tác viên hỗ trợ y tế dự phòng",
    collaboratorName: "Phạm Thị D",
    collaboratorId: "CTV004",
    form: "Bán thời gian",
    level: "Cộng tác viên",
    salary: "6.000.000 - 9.000.000",
    createDate: "15-05-2024",
    signDate: "15-05-2024",
    startDate: "20-05-2024",
    endDate: "20-05-2025",
    status: "Đã hủy",
    statusColor: "red",
    project: "Chương trình tiêm chủng mở rộng",
  },
  {
    id: 5,
    title: "Hợp đồng cộng tác viên y tế cộng đồng",
    collaboratorName: "Hoàng Văn E",
    collaboratorId: "CTV005",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "8.500.000 - 12.500.000",
    createDate: "01-06-2024",
    signDate: "01-06-2024",
    startDate: "05-06-2024",
    endDate: "05-06-2025",
    status: "Đã kết thúc sớm",
    statusColor: "purple",
    project: "Chương trình phòng chống dịch bệnh",
  },
  {
    id: 6,
    title: "Hợp đồng cộng tác viên khám sức khỏe định kỳ",
    collaboratorName: "Vũ Thị F",
    collaboratorId: "CTV006",
    form: "Toàn thời gian",
    level: "Cộng tác viên",
    salary: "7.500.000 - 11.000.000",
    createDate: "15-12-2024",
    signDate: "15-12-2024",
    startDate: "01-01-2025",
    endDate: "01-01-2026",
    status: "Chờ hiệu lực",
    statusColor: "blue",
    project: "Chương trình khám sức khỏe định kỳ cho người cao tuổi",
  },
];

// Lấy danh sách unique projects và forms
const uniqueProjects = [...new Set(mockContracts.map(contract => contract.project))];
const uniqueForms = [...new Set(mockContracts.map(contract => contract.form))];

function getStatusBadge(status: string, color: string) {
  let style = {};
  let icon = null;
  
  if (color === "green") { 
    style = { background: "#d1fae5", color: "#059669" }; 
    icon = <CheckCircle size={15} style={{marginRight:5, color:'#059669'}}/>; 
  }
  if (color === "yellow") { 
    style = { background: "#fef9c3", color: "#b45309" }; 
    icon = <Clock size={15} style={{marginRight:5, color:'#b45309'}}/>; 
  }
  if (color === "gray") { 
    style = { background: "#f3f4f6", color: "#6b7280" }; 
    icon = <XCircle size={15} style={{marginRight:5, color:'#6b7280'}}/>; 
  }
  if (color === "red") { 
    style = { background: "#fee2e2", color: "#dc2626" }; 
    icon = <XCircle size={15} style={{marginRight:5, color:'#dc2626'}}/>; 
  }
  if (color === "purple") { 
    style = { background: "#e0e7ff", color: "#7c3aed" }; 
    icon = <StopCircle size={15} style={{marginRight:5, color:'#7c3aed'}}/>; 
  }
  if (color === "blue") { 
    style = { background: "#dbeafe", color: "#2563eb" }; 
    icon = <Clock size={15} style={{marginRight:5, color:'#2563eb'}}/>; 
  }
  
  return (
    <span style={{ 
      ...style, 
      fontWeight: 600, 
      borderRadius: 10, 
      padding: "4px 12px", 
      fontSize: 13, 
      display: "inline-flex", 
      alignItems:'center', 
      minWidth: 100, 
      textAlign: "center" 
    }}>
      {icon}{status}
    </span>
  );
}

export default function ContractsListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [formFilter, setFormFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { collapsed } = useContext(SidebarContext);

  // Lọc dữ liệu theo search và filter
  const filteredContracts = useMemo(() => {
    return mockContracts.filter(contract => {
      const matchSearch = search === "" || 
        contract.title.toLowerCase().includes(search.toLowerCase()) ||
        contract.collaboratorName.toLowerCase().includes(search.toLowerCase()) ||
        contract.collaboratorId.toLowerCase().includes(search.toLowerCase()) ||
        contract.project.toLowerCase().includes(search.toLowerCase());
      
      const matchProject = projectFilter === "" || contract.project === projectFilter;
      const matchForm = formFilter === "" || contract.form === formFilter;
      const matchStatus = statusFilter === "" || contract.status === statusFilter;
      
      return matchSearch && matchProject && matchForm && matchStatus;
    });
  }, [search, projectFilter, formFilter, statusFilter]);

  const handleCardClick = (contractId: number) => {
    // Chuyển đến trang chi tiết hợp đồng
    router.push(`/contracts/${contractId}`);
  };

  return (
    <div className={`w-full p-6 bg-[#f4f6fb] min-h-screen rounded-2xl transition-all duration-200`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Danh sách hợp đồng</h1>
        <div className="text-[#64748b] text-base">Quản lý tất cả hợp đồng của cộng tác viên đã ký với đơn vị tuyển dụng.</div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex gap-3 items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm theo tiêu đề hợp đồng, tên cộng tác viên..."
            className="pl-10 text-sm bg-white border border-[#e5e7eb]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <select
          value={projectFilter}
          onChange={e => setProjectFilter(e.target.value)}
          className="text-sm h-8 px-3 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả chương trình/dự án</option>
          {uniqueProjects.map(project => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
        
        <select
          value={formFilter}
          onChange={e => setFormFilter(e.target.value)}
          className="text-sm h-8 px-3 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả hình thức</option>
          {uniqueForms.map(form => (
            <option key={form} value={form}>{form}</option>
          ))}
        </select>
        
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-sm h-8 px-3 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang hiệu lực">Đang hiệu lực</option>
          <option value="Hết hiệu lực">Hết hiệu lực</option>
          <option value="Tạm ngưng">Tạm ngưng</option>
          <option value="Chờ hiệu lực">Chờ hiệu lực</option>
          <option value="Đã hủy">Đã hủy</option>
          <option value="Đã kết thúc sớm">Đã kết thúc sớm</option>
        </select>

        <Button
          variant="outline"
          size="sm"
          className="h-8 px-4 bg-white border border-[#e5e7eb] hover:bg-gray-50"
          onClick={() => {
            setSearch("");
            setProjectFilter("");
            setFormFilter("");
            setStatusFilter("");
          }}
        >
          <RefreshCw size={16} className="mr-2" />
          Làm mới
        </Button>
      </div>

      {/* Contracts List */}
      <div className="space-y-3">
        {filteredContracts.map(contract => (
          <Card 
            key={contract.id} 
            className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
            onClick={() => handleCardClick(contract.id)}
          >
            <div className="px-6 py-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={20} className="text-blue-600" />
                    <h3 className="font-bold text-lg text-blue-600">{contract.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Cộng tác viên:</strong> {contract.collaboratorName} ({contract.collaboratorId})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Hình thức:</strong> {contract.form}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Cấp bậc:</strong> {contract.level}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Lương:</strong> {contract.salary}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Ngày tạo:</strong> {contract.createDate}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        <strong>Ngày ký:</strong> {contract.signDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>Chương trình/dự án:</strong> {contract.project}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  {getStatusBadge(contract.status, contract.statusColor)}
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredContracts.length === 0 && (
          <Card className="bg-white rounded-xl shadow-sm border border-[#e5e7eb]">
            <div className="p-12 text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">Không tìm thấy hợp đồng nào</h3>
              <p className="text-gray-400">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

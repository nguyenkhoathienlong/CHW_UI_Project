"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Users, 
  Info, 
  Download, 
  Activity,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Building,
  Mail,
  Globe,
  MapPin as LocationIcon
} from "lucide-react";

const mockPrograms = [
  {
    id: "uctc-829102",
    name: "Chương trình tầm soát ung thư cổ tử cung",
    subtitle: "Chương trình sức khỏe cộng đồng",
    code: "UTCTC-829102",
    type: "Tầm soát & phát hiện sớm bệnh lý",
    status: "Đang diễn ra",
    logo: "",
    goal: "Phát hiện sớm các dấu hiệu ung thư cổ tử cung ở phụ nữ từ 25-55 tuổi.",
    start: "12/02/2025",
    end: "12/12/2025",
    desc: "Chương trình nhằm nâng cao nhận thức, phát hiện sớm và hỗ trợ điều trị ung thư cổ tử cung cho phụ nữ Việt Nam. Tham gia chương trình, cộng tác viên sẽ được đào tạo, cung cấp tài liệu, và đồng hành cùng các chuyên gia đầu ngành.",
    files: [
      { name: "Tài liệu hướng dẫn.pdf", url: "#" },
      { name: "Kế hoạch chương trình.docx", url: "#" },
      { name: "Báo cáo kết quả.pdf", url: "#" },
    ],
    managementUnit: {
      code: "BV-001",
      name: "Bệnh viện Đa khoa Trung ương",
      email: "info@bvtw.edu.vn",
      website: "www.bvtw.edu.vn",
      address: "Số 1 Tràng Thi, Hoàn Kiếm, Hà Nội"
    },
    members: [
      { id: 1, name: "Nguyễn Thị Anh", role: "Cộng tác viên chính", status: "Đang tham gia", activities: 5 },
      { id: 2, name: "Trần Văn Bình", role: "Cộng tác viên", status: "Đang tham gia", activities: 3 },
      { id: 3, name: "Lê Thị Cẩm", role: "Cộng tác viên", status: "Đang tham gia", activities: 2 },
    ],
    activities: [
      { 
        id: 1, 
        name: "Tập huấn cộng tác viên", 
        date: "15/02/2025", 
        desc: "Đào tạo kiến thức cơ bản về ung thư cổ tử cung.",
        collaborator: "Nguyễn Thị Anh",
        status: "Hoàn thành"
      },
      { 
        id: 2, 
        name: "Khám sàng lọc đợt 1", 
        date: "01/03/2025", 
        desc: "Tổ chức khám sàng lọc tại địa phương.",
        collaborator: "Trần Văn Bình",
        status: "Đang thực hiện"
      },
      { 
        id: 3, 
        name: "Tuyên truyền cộng đồng", 
        date: "10/03/2025", 
        desc: "Tổ chức các buổi tuyên truyền tại các xã phường.",
        collaborator: "Lê Thị Cẩm",
        status: "Chưa bắt đầu"
      },
    ],
  },
];

export default function ProgramDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const program = mockPrograms.find(p => p.id === id) || mockPrograms[0];

  const tabs = [
    { id: 'info', label: 'Thông tin chi tiết', count: null },
    { id: 'members', label: 'Cộng tác viên', count: program.members.length },
    { id: 'activities', label: 'Hoạt động', count: program.activities.length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Đang diễn ra':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Chưa bắt đầu':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-2 sm:px-4 lg:px-6">
          <div className="py-4">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            
            {/* Title Section */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {program.name}
                </h1>
                <p className="text-gray-600 mt-2">{program.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-orange-200 text-orange-700">
                  {program.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex gap-8 pl-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-2 py-4 cursor-pointer border-b-4 transition-all duration-200 hover:bg-gray-50 hover: ${
                    isActive 
                      ? "border-blue-600 text-blue-600 font-semibold" 
                      : "border-transparent text-gray-500 font-medium hover:text-blue-600 hover:border-blue-300"
                  }`}
                >
                  <span className="text-sm">{tab.label}</span>
                  {tab.count !== null && (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                      isActive 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-500 hover:bg-blue-100 hover:text-blue-600"
                    }`}>
                      {tab.count}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Program Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      Thông tin chương trình
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mã chương trình</label>
                        <p className="text-gray-900 font-medium">{program.code}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Loại chương trình</label>
                        <p className="text-gray-900">{program.type}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                        <p className="text-gray-900">{program.start}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Ngày kết thúc</label>
                        <p className="text-gray-900">{program.end}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mục tiêu</label>
                      <p className="text-gray-900">{program.goal}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                      <p className="text-gray-900 leading-relaxed">{program.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'members' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Danh sách cộng tác viên
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {program.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-green-200 text-green-700">
                            {member.status}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {member.activities} hoạt động
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'activities' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Danh sách hoạt động
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {program.activities.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{activity.name}</h4>
                            <p className="text-sm text-gray-600">{activity.desc}</p>
                          </div>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {activity.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {activity.collaborator}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Management Unit Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Thông tin đơn vị quản lý
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    Mã cơ quan đơn vị
                  </label>
                  <p className="text-gray-900">{program.managementUnit.code}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    Tên cơ quan đơn vị
                  </label>
                  <p className="text-gray-900">{program.managementUnit.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email
                  </label>
                  <p className="text-gray-900">{program.managementUnit.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    Website
                  </label>
                  <p className="text-gray-900">{program.managementUnit.website}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <LocationIcon className="h-4 w-4 text-gray-500" />
                    Địa chỉ
                  </label>
                  <p className="text-gray-900">{program.managementUnit.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Thời gian triển khai
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                  <p className="text-gray-900">{program.start}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ngày kết thúc</label>
                  <p className="text-gray-900">{program.end}</p>
                </div>
              </CardContent>
            </Card>

            {/* Attached Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Thông tin đính kèm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {program.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 text-sm">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Briefcase, 
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Filter,
  Search,
  BarChart2
} from 'lucide-react';
import Link from 'next/link';
// TODO: Fix import path if '@/components/ui/dialog' does not exist or is incorrect
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function ApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showStats, setShowStats] = useState(false);

  // Mock data - trong thực tế sẽ lấy từ API
  const applications = [
    {
      id: 1,
      jobTitle: 'Cộng tác viên y tế cộng đồng',
      company: 'Bệnh viện Đa khoa Hà Nội',
      location: 'Hà Nội',
      appliedDate: '20/12/2024',
      status: 'Chờ xử lý',
      statusColor: 'yellow',
      salary: '8.000.000 - 12.000.000',
      deadline: '30/12/2024',
      cv: 'CV_NguyenVanA.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ sơ cấp cứu'
      ],
      coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu công việc...',
      notes: 'Ứng viên có hồ sơ tốt, cần phỏng vấn thêm',
      contractId: null,
    },
    {
      id: 2,
      jobTitle: 'Nhân viên chăm sóc sức khỏe',
      company: 'Trung tâm Y tế Quận 1',
      location: 'TP.HCM',
      appliedDate: '18/12/2024',
      status: 'Đã duyệt',
      statusColor: 'blue',
      salary: '7.000.000 - 10.000.000',
      deadline: '25/12/2024',
      cv: 'CV_NguyenVanA_Updated.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ đào tạo nâng cao',
        'Chứng chỉ kỹ năng giao tiếp'
      ],
      coverLetter: 'Với kinh nghiệm trong lĩnh vực y tế và đam mê chăm sóc sức khỏe cộng đồng...',
      notes: 'Ứng viên xuất sắc, đã lên lịch phỏng vấn',
      contractId: 123,
    },
    // Thêm mock data đã duyệt
    {
      id: 3,
      jobTitle: 'Nhân viên hỗ trợ y tế dự phòng',
      company: 'Trung tâm Kiểm soát Bệnh tật',
      location: 'Hà Nội',
      appliedDate: '15/12/2024',
      status: 'Đã từ chối',
      statusColor: 'green',
      salary: '9.000.000 - 13.000.000',
      deadline: '28/12/2024',
      cv: 'CV_NguyenVanB.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ đào tạo nâng cao'
      ],
      coverLetter: 'Tôi có kiến thức về dịch tễ học và mong muốn được tham gia...',
      notes: 'Hồ sơ phù hợp, chờ tạo hợp đồng',
      contractId: null,
    },
    {
      id: 4,
      jobTitle: 'Cộng tác viên truyền thông',
      company: 'Sở Y tế Đà Nẵng',
      location: 'Đà Nẵng',
      appliedDate: '10/12/2024',
      status: 'Đã có hợp đồng',
      statusColor: 'green',
      salary: '6.000.000 - 9.000.000',
      deadline: '20/12/2024',
      cv: 'CV_NguyenVanC.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản'
      ],
      coverLetter: 'Tôi mong muốn được đóng góp vào công tác truyền thông y tế...',
      notes: 'Đã duyệt, chờ hợp đồng',
      contractId: null,
    }
  ];

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'Chờ xử lý', label: 'Chờ xử lý' },
    { value: 'Đã duyệt', label: 'Đã duyệt' },
    { value: 'Đã từ chối', label: 'Đã từ chối' },
    { value: 'Phỏng vấn', label: 'Phỏng vấn' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã duyệt':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Đã từ chối':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Chờ xử lý':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã duyệt':
        return 'bg-green-100 text-green-800';
      case 'Đã từ chối':
        return 'bg-red-100 text-red-800';
      case 'Chờ xử lý':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  function getStatusBadge(status: string, statusColor: string) {
    switch (status) {
      case 'Chờ xử lý':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Chờ xử lý</span>;
      case 'Đã duyệt':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Đã duyệt</span>;
      case 'Đã từ chối':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Đã từ chối</span>;
      case 'Đã có hợp đồng':
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" /></svg>
            Đã có hợp đồng
          </span>
        );
      default:
        return null;
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || app.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main content (col-span-2) */}
      <div className="md:col-span-2 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ứng tuyển của tôi</h1>
          <p className="text-gray-600">Theo dõi trạng thái các đơn ứng tuyển đã gửi</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm đơn ứng tuyển..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <select
              className="w-full px-2 border border-gray-300 rounded-[5px] h-8"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow pt-4">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{app.jobTitle}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 sm:mt-0 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1">{app.status}</span>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {app.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {app.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {app.salary}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600"><strong>Ngày ứng tuyển:</strong> {app.appliedDate}</p>
                        <p className="text-gray-600"><strong>Hạn nộp:</strong> {app.deadline}</p>
                      </div>
                      <div>
                        <p className="text-gray-600"><strong>CV:</strong> {app.cv}</p>
                        <p className="text-gray-600"><strong>Chứng chỉ:</strong> {app.certificates.length} chứng chỉ</p>
                      </div>
                    </div>
                    {app.coverLetter && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600"><strong>Thư xin việc:</strong></p>
                        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{app.coverLetter}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
                    <Link href={`/dashboard/applications/${app.id}`} className="w-full md:w-auto">
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Tải CV
                    </Button>
                    {app.status === 'Đã duyệt' && (
                      <Button size="sm" className="w-full md:w-auto">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Liên hệ
                      </Button>
                    )}
                  </div>
                </div>
                {/* Certificates */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Chứng chỉ đã đính kèm:</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.certificates.map((cert, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Không tìm thấy đơn ứng tuyển</h3>
                <p className="text-sm">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar thống kê + lưu ý (bên phải, sticky, chỉ desktop) */}
      <div className="hidden md:block md:col-span-1 pr-0">
        <div className="sticky top-16 flex flex-col gap-4 w-full">
          {/* Stats */}
          <Card className="w-full pt-6">
            <CardContent className="p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng ứng tuyển</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full pt-6">
            <CardContent className="p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter(app => app.status === 'Chờ xử lý').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full pt-6">
            <CardContent className="p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === 'Đã duyệt').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full pt-6">
            <CardContent className="p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã từ chối</p>
                  <p className="text-2xl font-bold text-red-600">
                    {applications.filter(app => app.status === 'Đã từ chối').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          {/* Lưu ý */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base"><span className="text-red-500 text-md">*</span> Lưu ý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span><strong>Chờ xử lý:</strong> Hồ sơ đang chờ được đánh giá</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span><strong>Đã duyệt:</strong> Hồ sơ đã được chấp nhận, chờ phỏng vấn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span><strong>Đã từ chối:</strong> Hồ sơ không phù hợp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    </svg>
                    <span><strong>Đã có hợp đồng:</strong> Đã có hợp đồng tuyển dụng</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nút icon show thống kê + lưu ý - chỉ hiện trên mobile */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-4 right-4 z-50 block md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
            aria-label="Xem thống kê và lưu ý"
          >
            <BarChart2 className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-xs max-h-[90vh] overflow-y-auto">
          <DialogTitle className="font-bold text-lg mb-4">Thống kê & lưu ý</DialogTitle>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              <span>Tổng ứng tuyển: <b>{applications.length}</b></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              <span>Chờ xử lý: <b>{applications.filter(a => a.status === 'Chờ xử lý').length}</b></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span>Đã duyệt: <b>{applications.filter(a => a.status === 'Đã duyệt').length}</b></span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <span>Đã từ chối: <b>{applications.filter(a => a.status === 'Đã từ chối').length}</b></span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="text-base font-semibold mb-2">Lưu ý</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span><strong>Chờ xử lý:</strong> Hồ sơ đang chờ được đánh giá</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span><strong>Đã duyệt:</strong> Hồ sơ đã được chấp nhận, chờ phỏng vấn</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span><strong>Đã từ chối:</strong> Hồ sơ không phù hợp</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
                <span><strong>Đã có hợp đồng:</strong> Đã có hợp đồng tuyển dụng</span>
              </div>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded"
            onClick={() => setShowStats(false)}
          >
            Đóng
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
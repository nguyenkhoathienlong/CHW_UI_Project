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
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - trong thực tế sẽ lấy từ API
  const applications = [
    {
      id: 1,
      jobTitle: 'Cộng tác viên y tế cộng đồng',
      company: 'Bệnh viện Đa khoa Hà Nội',
      location: 'Hà Nội',
      appliedDate: '20/12/2024',
      status: 'Đang xem xét',
      statusColor: 'yellow',
      salary: '8-12 triệu',
      deadline: '30/12/2024',
      cv: 'CV_NguyenVanA.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ sơ cấp cứu'
      ],
      coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu công việc...',
      notes: 'Ứng viên có hồ sơ tốt, cần phỏng vấn thêm'
    },
    {
      id: 2,
      jobTitle: 'Nhân viên chăm sóc sức khỏe',
      company: 'Trung tâm Y tế Quận 1',
      location: 'TP.HCM',
      appliedDate: '18/12/2024',
      status: 'Đã duyệt',
      statusColor: 'green',
      salary: '7-10 triệu',
      deadline: '25/12/2024',
      cv: 'CV_NguyenVanA_Updated.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ đào tạo nâng cao',
        'Chứng chỉ kỹ năng giao tiếp'
      ],
      coverLetter: 'Với kinh nghiệm trong lĩnh vực y tế và đam mê chăm sóc sức khỏe cộng đồng...',
      notes: 'Ứng viên xuất sắc, đã lên lịch phỏng vấn'
    },
    {
      id: 3,
      jobTitle: 'Cộng tác viên tuyên truyền y tế',
      company: 'Sở Y tế Đà Nẵng',
      location: 'Đà Nẵng',
      appliedDate: '15/12/2024',
      status: 'Từ chối',
      statusColor: 'red',
      salary: '6-9 triệu',
      deadline: '20/12/2024',
      cv: 'CV_NguyenVanA.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản'
      ],
      coverLetter: 'Tôi mong muốn được đóng góp vào công tác tuyên truyền y tế...',
      notes: 'Không đáp ứng yêu cầu về kinh nghiệm'
    },
    {
      id: 4,
      jobTitle: 'Nhân viên hỗ trợ y tế dự phòng',
      company: 'Trung tâm Kiểm soát Bệnh tật',
      location: 'Hà Nội',
      appliedDate: '12/12/2024',
      status: 'Đang xem xét',
      statusColor: 'yellow',
      salary: '9-13 triệu',
      deadline: '28/12/2024',
      cv: 'CV_NguyenVanA_Specialized.pdf',
      certificates: [
        'Chứng chỉ đào tạo cơ bản',
        'Chứng chỉ đào tạo nâng cao',
        'Chứng chỉ sơ cấp cứu'
      ],
      coverLetter: 'Tôi có kiến thức về dịch tễ học và mong muốn được tham gia...',
      notes: 'Hồ sơ phù hợp, đang đánh giá chi tiết'
    }
  ];

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'Đang xem xét', label: 'Đang xem xét' },
    { value: 'Đã duyệt', label: 'Đã duyệt' },
    { value: 'Từ chối', label: 'Từ chối' },
    { value: 'Phỏng vấn', label: 'Phỏng vấn' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã duyệt':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Từ chối':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Đang xem xét':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã duyệt':
        return 'bg-green-100 text-green-800';
      case 'Từ chối':
        return 'bg-red-100 text-red-800';
      case 'Đang xem xét':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || app.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ứng tuyển của tôi</h1>
        <p className="text-gray-600">Theo dõi trạng thái các đơn ứng tuyển đã gửi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content (col-span-2) */}
        <div className="md:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="h-4 w-4" />
                Tìm kiếm và lọc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Tìm theo tên công việc, công ty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full h-8 pl-2 border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value} className='text-sm'>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow pt-4">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{app.jobTitle}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1">{app.status}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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

                      {/* Đã xóa phần hiển thị ghi chú (notes) */}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Link href={`/dashboard/applications/${app.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Tải CV
                      </Button>
                      {app.status === 'Đã duyệt' && (
                        <Button size="sm" className="w-full">
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

        {/* Sidebar Lưu ý + Thống kê */}
        <div className="md:col-span-1 pr-0">
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
                    <p className="text-sm font-medium text-gray-600">Đang xem xét</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {applications.filter(app => app.status === 'Đang xem xét').length}
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
                    <p className="text-sm font-medium text-gray-600">Từ chối</p>
                    <p className="text-2xl font-bold text-red-600">
                      {applications.filter(app => app.status === 'Từ chối').length}
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
                      <span><strong>Đang xem xét:</strong> Hồ sơ đang được đánh giá</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span><strong>Đã duyệt:</strong> Hồ sơ đã được chấp nhận, chờ phỏng vấn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span><strong>Từ chối:</strong> Hồ sơ không phù hợp</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
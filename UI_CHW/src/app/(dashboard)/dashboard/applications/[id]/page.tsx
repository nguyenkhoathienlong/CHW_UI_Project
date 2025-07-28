"use client";
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Upload,
  FileText,
  Award,
  CheckCircle,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Calendar
} from 'lucide-react';

// Danh sách ứng tuyển giống trang applications/page.tsx
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
    coverLetter: 'Tôi rất quan tâm đến vị trí này và tin rằng kinh nghiệm của tôi phù hợp với yêu cầu công việc...'
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
    coverLetter: 'Với kinh nghiệm trong lĩnh vực y tế và đam mê chăm sóc sức khỏe cộng đồng...'
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
    coverLetter: 'Tôi mong muốn được đóng góp vào công tác tuyên truyền y tế...'
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
    coverLetter: 'Tôi có kiến thức về dịch tễ học và mong muốn được tham gia...'
  }
];

// Hàm helper để lấy màu sắc cho trạng thái
const getStatusColor = (statusColor: string) => {
  switch (statusColor) {
    case 'green':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'yellow':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'red':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = Number(params.id);
  const application = applications.find(app => app.id === applicationId);

  if (!application) return <div className="text-center text-red-500 py-10">Không tìm thấy đơn ứng tuyển</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
        </Button>
      </div>
      {/* Tiêu đề và trạng thái ngang hàng */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Đơn ứng tuyển</h1>
          <p className="text-gray-600 text-base">Thông tin chi tiết đơn ứng tuyển của bạn</p>
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.statusColor)}`}>
          {application.status}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Thông tin công việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Vị trí:</strong> {application.jobTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Công ty:</strong> {application.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Địa điểm:</strong> {application.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Mức lương:</strong> {application.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Hạn nộp hồ sơ:</strong> {application.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Ngày ứng tuyển:</strong> {application.appliedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CV Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Upload CV/Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{application.cv}</p>
                        {/* Không có size thực, chỉ hiển thị tên file */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Chọn chứng chỉ phù hợp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Chọn các chứng chỉ phù hợp với yêu cầu công việc để tăng cơ hội được tuyển chọn:
                </p>
                <div className="space-y-3">
                  {application.certificates.map((cert, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-4 border rounded-lg bg-blue-50 border-blue-200`}>
                      <Checkbox
                        id={`cert-${idx}`}
                        checked
                        disabled
                        onChange={() => {}}
                      />
                      <div className="flex-1">
                        <label htmlFor={`cert-${idx}`} className="flex items-center gap-2 cursor-pointer">
                          <span className="font-medium text-gray-900">{cert}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Có hiệu lực
                          </span>
                        </label>
                        {/* Không có mô tả chi tiết */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Thư xin việc (Tùy chọn)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Viết thư xin việc để giới thiệu bản thân và lý do bạn phù hợp với vị trí này:
                </p>
                <textarea
                  value={application.coverLetter}
                  disabled
                  placeholder="Viết thư xin việc của bạn ở đây..."
                  className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100"
                  rows={6}
                />
                <p className="text-xs text-gray-500">
                  Tối đa 1000 ký tự. Hiện tại: {application.coverLetter.length}/1000
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tóm tắt đơn ứng tuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Thông tin công việc</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vị trí:</span>
                    <span className="font-medium">{application.jobTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Công ty:</span>
                    <span className="font-medium">{application.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Địa điểm:</span>
                    <span className="font-medium">{application.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mức lương:</span>
                    <span className="font-medium">{application.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn nộp hồ sơ:</span>
                    <span className="font-medium">{application.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày ứng tuyển:</span>
                    <span className="font-medium">{application.appliedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạng thái:</span>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.statusColor)}`}>
                      {application.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Hồ sơ đính kèm</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CV/Resume:</span>
                    <span className={application.cv ? "text-green-600 font-medium" : "text-red-600"}>
                      {application.cv ? "✓ Đã chọn" : "✗ Chưa chọn"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chứng chỉ:</span>
                    <span className="font-medium">{application.certificates.length} chứng chỉ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thư xin việc:</span>
                    <span className={application.coverLetter ? "text-green-600 font-medium" : "text-gray-500"}>
                      {application.coverLetter ? "✓ Có" : "Tùy chọn"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lưu ý quan trọng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Đảm bảo CV của bạn cập nhật và phù hợp với vị trí ứng tuyển</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Chọn các chứng chỉ phù hợp để tăng cơ hội được tuyển chọn</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Viết thư xin việc ngắn gọn, súc tích và thể hiện động lực</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Kiểm tra kỹ thông tin trước khi gửi đơn ứng tuyển</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Nếu bạn gặp vấn đề trong quá trình ứng tuyển, vui lòng liên hệ:
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> support@chw-portal.vn</p>
                  <p><strong>Hotline:</strong> 1900-1234</p>
                  <p><strong>Thời gian:</strong> 8:00 - 18:00 (T2-T6)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
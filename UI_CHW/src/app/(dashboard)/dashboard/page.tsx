"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Briefcase, 
  FileText, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - trong thực tế sẽ lấy từ API
  const collaboratorInfo = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    education: 'Đại học',
    trainingStatus: 'Đã hoàn thành',
    joinDate: '15/03/2024',
    totalApplications: 5,
    pendingApplications: 2,
    approvedApplications: 3
  };

  const recentJobs = [
    {
      id: 1,
      title: 'Cộng tác viên y tế cộng đồng',
      company: 'Bệnh viện Đa khoa Hà Nội',
      location: 'Hà Nội',
      salary: '8-12 triệu',
      deadline: '30/12/2024',
      status: 'Đang tuyển'
    },
    {
      id: 2,
      title: 'Nhân viên chăm sóc sức khỏe',
      company: 'Trung tâm Y tế Quận 1',
      location: 'TP.HCM',
      salary: '7-10 triệu',
      deadline: '25/12/2024',
      status: 'Đang tuyển'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trang chủ</h1>
        <p className="text-gray-600">Chào mừng bạn trở lại, {collaboratorInfo.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng ứng tuyển</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaboratorInfo.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              +2 so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang chờ</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaboratorInfo.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              Cần theo dõi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaboratorInfo.approvedApplications}</div>
            <p className="text-xs text-muted-foreground">
              +1 so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ngày tham gia</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaboratorInfo.joinDate}</div>
            <p className="text-xs text-muted-foreground">
              Đã hoạt động 9 tháng
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Info & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{collaboratorInfo.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{collaboratorInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{collaboratorInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{collaboratorInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Trình độ: {collaboratorInfo.education}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Đào tạo: {collaboratorInfo.trainingStatus}</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full">
                  Xem chi tiết thông tin
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Job Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Tin tuyển dụng mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Hạn nộp: {job.deadline}</span>
                    <Link href={`/dashboard/jobs/${job.id}`}>
                      <Button size="sm">Xem chi tiết</Button>
                    </Link>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/dashboard/jobs">
                  <Button variant="outline" className="w-full">
                    Xem tất cả tin tuyển dụng
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/jobs">
              <Button className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <Briefcase className="h-6 w-6" />
                <span>Tìm việc làm</span>
              </Button>
            </Link>
            <Link href="/dashboard/applications">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <FileText className="h-6 w-6" />
                <span>Ứng tuyển của tôi</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                <User className="h-6 w-6" />
                <span>Cập nhật hồ sơ</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
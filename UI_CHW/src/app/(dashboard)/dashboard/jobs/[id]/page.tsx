"use client";
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  MapPin, 
  Briefcase, 
  Calendar,
  DollarSign,
  Building,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Award,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { jobs } from '@/constants/jobsData';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);

  // Lấy job theo id từ danh sách chung
  const job = jobs.find(j => j.id === jobId);
  if (!job) return <div className="text-center text-red-500 py-10">Không tìm thấy tin tuyển dụng</div>;

  return (
    <div className="space-y-6">
      {/* Nút quay lại trên tiêu đề */}
      <div className="mb-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{job.title}</h1>
        <p className="text-gray-600 text-base mb-2">Chi tiết tin tuyển dụng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Thông tin tổng quan + mô tả chi tiết */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Thông tin tổng quan */}
          <Card className="pt-4 pb-4">
            <CardContent className="p-4 pb-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-2 text-gray-800 text-base">
                    <div className="flex items-center gap-4"><DollarSign className="h-5 w-5 text-blue-600" /><span className="font-medium text-[15px]">Mức lương:</span> <span className="font-bold">{job.salary}</span></div>
                    <div className="flex items-center gap-4"><Briefcase className="h-5 w-5 text-blue-600" /><span className="font-medium text-[15px]">Kinh nghiệm:</span> <span className="font-bold">{job.experience}</span></div>
                    <div className="flex items-center gap-4"><Clock className="h-5 w-5 text-blue-600" /><span className="font-medium text-[15px]">Hình thức tuyển dụng:</span> <span className="font-bold">{job.type}</span></div>
                    <div className="flex items-center gap-4"><MapPin className="h-5 w-5 text-blue-600" /><span className="font-medium text-[15px]">Địa điểm làm việc:</span> <span className="font-bold">{job.locationProvince}, {job.locationWard}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[220px]">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Hạn nộp hồ sơ:</span>
                    <span className="font-bold">{job.deadline}</span>
                  </div>
                  <Link href={`/dashboard/jobs/${job.id}/apply`}>
                    <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-sm px-6 py-2">
                      Ứng tuyển ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mô tả chi tiết công việc (gom tất cả) */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                Mô tả chi tiết công việc
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line mb-5">
                {job.description}
              </div>
              <div className="mt-6">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-base"><CheckCircle className="h-5 w-5 text-blue-600" /> Yêu cầu ứng viên</div>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {job.requirements.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="mt-6">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-base"><Briefcase className="h-5 w-5 text-blue-600" /> Quyền lợi</div>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {job.benefits.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              {/* Có thể thêm các phần khác ở đây, ví dụ: "Cơ hội phát triển", "Môi trường làm việc"... */}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar phải */}
        <div className="flex flex-col gap-6">
          {/* Thông tin công ty */}
          <Card className="pt-4">
            <CardContent className="flex flex-col items-left gap-1 px-4">
              <div className="flex items-center gap-3 mb-1 w-auto">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-lg font-bold">Logo</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-semibold text-base text-gray-900 mb-1 mt-1">{job.company}</div>
                </div>
              </div>
              <div className="w-full text-sm text-gray-700 space-y-1 mt-0.5">
                <div className="flex items-center gap-2"><Building className="h-4 w-4 text-blue-600" /><span className="font-medium">Địa chỉ:</span> <span>{job.companyAddress}</span></div>
                <div className="flex items-center gap-2"><span className="font-bold">☎</span><span className="font-medium">Liên hệ:</span> <span>{job.companyPhone}</span></div>
                <div className="flex items-center gap-2"><span className="font-bold">✉</span><span className="font-medium">Email:</span> <span>{job.companyEmail}</span></div>
                <div className="flex items-center gap-2"><span className="font-bold">🌐</span><span className="font-medium">Website:</span> <a href={job.companyWebsite} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{job.companyWebsite}</a></div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin dự án/chương trình */}
          <Card className="pt-4">
            <CardContent className="px-4">
              <div className="flex items-center gap-3 mb-1 w-auto">
                <div className="flex flex-col items-center justify-center">
                  <span className="bg-gray-100 rounded px-2 py-0.5 text-xs font-mono text-gray-700 mb-1">{job.projectCode}</span>
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-lg font-bold">Logo</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-bold text-lg text-gray-900 leading-tight">{job.projectName}</div>
                  <div className="text-[12px] text-gray-500 mt-1">{job.projectSent}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm mt-2">
                <div className="flex items-center gap-1 text-gray-700"><span className="font-medium flex items-center"><Building className="h-4 w-4 text-blue-600 mr-1"/>Loại chương trình/dự án</span></div>
                <div className="text-gray-900">{job.projectType}</div>
                <div className="flex items-center gap-1 text-gray-700"><span className="font-medium flex items-center"><Calendar className="h-4 w-4 text-blue-600 mr-1"/>Thời gian diễn ra</span></div>
                <div className="text-gray-900">{job.projectTime}</div>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin chung */}
          <Card className="pt-4 pb-4">
            <CardContent className="px-4 py-0">
              <div className="font-semibold text-base text-gray-900 mb-2">Thông tin chung</div>
              <div className="flex flex-col gap-1 text-sm text-gray-700">
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-blue-600" /> Cấp bậc: <span className="font-medium">{job.level}</span></div>
                <div className="flex items-center gap-2"><Award className="h-4 w-4 text-blue-600" /> Trình độ học vấn: <span className="font-medium">{job.education}</span></div>
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-blue-600" /> Vị trí tuyển dụng: <span className="font-medium">{job.position}</span></div>
                <div className="flex items-center gap-2"><span className="font-bold text-blue-600">♂♀</span> Giới tính: <span className="font-medium">{job.gender}</span></div>
                {job.vacancies && (
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-blue-600" /> Số lượng: <span className="font-medium">{job.vacancies} người</span></div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
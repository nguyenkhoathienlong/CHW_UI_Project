"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Briefcase,
  Check,
  Save,
  Mail,
  Phone,
  Award,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data cho ứng viên và đơn ứng tuyển
const mockCandidates = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    education: "Cử nhân",
    address: "Hà Nội"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0987654321",
    education: "Đại học",
    address: "TP.HCM"
  }
];

const mockProjects = [
  {
    code: 'PRJ-001',
    name: 'Chương trình tầm soát ung thư cổ tử cung',
    type: 'Chương trình y tế',
    duration: '01/06/2024 - 31/12/2024',
    logo: '/logo-cervical.png'
  },
  {
    code: 'PRJ-002',
    name: 'Chương trình chăm sóc sức khỏe cộng đồng',
    type: 'Chương trình cộng đồng',
    duration: '01/01/2024 - 30/06/2024',
    logo: '/logo-community.png'
  }
];

const mockApplications = [
  {
    id: 1,
    candidateId: 1,
    jobTitle: 'Cộng tác viên y tế cộng đồng',
    company: 'Bệnh viện Đa khoa Hà Nội',
    location: 'Hà Nội',
    salary: '8.000.000 - 12.000.000',
    appliedDate: '20/12/2024',
    form: 'Toàn thời gian',
    level: 'Cộng tác viên',
    jobDescription: 'Thực hiện các hoạt động tuyên truyền, giáo dục sức khỏe cộng đồng, hỗ trợ công tác phòng chống dịch bệnh và chăm sóc sức khỏe ban đầu.',
    project: 'Chương trình tầm soát ung thư cổ tử cung',
    projectCode: 'PRJ-001'
  },
  {
    id: 2,
    candidateId: 2,
    jobTitle: 'Nhân viên chăm sóc sức khỏe',
    company: 'Trung tâm Y tế Quận 1',
    location: 'TP.HCM',
    salary: '7.000.000 - 10.000.000',
    appliedDate: '18/12/2024',
    form: 'Bán thời gian',
    level: 'Cộng tác viên',
    jobDescription: 'Thực hiện công tác chăm sóc sức khỏe, tư vấn dinh dưỡng và hỗ trợ các hoạt động y tế cộng đồng.',
    project: 'Chương trình chăm sóc sức khỏe cộng đồng',
    projectCode: 'PRJ-002'
  }
];

export default function ContractCreationPage() {
  const router = useRouter();
  const params = useParams();
  const applicationId = Number(params.id);
  const application = mockApplications.find(app => app.id === applicationId);
  const candidate = application ? mockCandidates.find(c => c.id === application.candidateId) : null;

  const [isCreating, setIsCreating] = useState(false);
  const [contractData, setContractData] = useState({
    contractType: 'full-time',
    startDate: '',
    endDate: '',
    probationPeriod: '2',
    salary: '',
    workLocation: '',
    workSchedule: '8:00 - 17:00',
    benefits: '',
    responsibilities: '',
    contractCode: '',
    contractTitle: '',
    signDate: '',
    level: '',
    form: ''
  });

  if (!application || !candidate) return <div className="text-center text-red-500 py-10">Không tìm thấy đơn ứng tuyển</div>;

  const handleInputChange = (field: string, value: string) => {
    setContractData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateContract = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      alert('Tạo hợp đồng thành công!');
      router.push('/recruitment-list');
    }, 1000);
  };

  // Parse salary range to get min and max
  const salaryRange = application.salary.split('-').map(s => s.trim().replace(' triệu', ''));
  const minSalary = parseInt(salaryRange[0]) * 1000000;
  const maxSalary = parseInt(salaryRange[1]) * 1000000;

  const projectInfo = application.projectCode ? mockProjects.find(p => p.code === application.projectCode) : null;

  return (
    <div className="max-w-[1200px] mx-auto p-5 pt-0 bg-[#f4f6fb] min-h-screen rounded-[18px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>
      {/* Tiêu đề */}
      <div className="mb-6">
        <h1 className="font-bold text-[26px] text-[#222] mb-1 tracking-tight">Tạo hợp đồng tuyển dụng</h1>
        <div className="text-[#64748b] text-[15px]">Nhập thông tin để tạo hợp đồng lao động cho cộng tác viên đã được duyệt</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3">
        {/* Main Content - Contract Form */}
        <div className="flex flex-col gap-3">
          {/* Basic Information */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-6 pt-5 pb-0">
              <div className="flex items-center gap-2 text-[18px] font-bold text-[#222]">
                <FileText className="text-[#2563eb] w-5 h-5" />
                Thông tin cơ bản
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Mã hợp đồng <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={contractData.contractCode}
                    onChange={e => handleInputChange('contractCode', e.target.value)}
                    placeholder="VD: HD-2024-001"
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Tiêu đề hợp đồng <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={contractData.contractTitle}
                    onChange={e => handleInputChange('contractTitle', e.target.value)}
                    placeholder="VD: Hợp đồng cộng tác viên chương trình X"
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Loại hợp đồng <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={contractData.contractType}
                    onChange={e => handleInputChange('contractType', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px] bg-white"
                  >
                    <option value="full-time">Toàn thời gian</option>
                    <option value="part-time">Bán thời gian</option>
                    <option value="temporary">Tạm thời</option>
                    <option value="probation">Thử việc</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Cấp bậc <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={contractData.level || ''}
                    onChange={e => handleInputChange('level', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] rounded-[5px] text-[14px] bg-white"
                  >
                    <option value="">Chọn cấp bậc</option>
                    <option value="cong-tac-vien">Cộng tác viên</option>
                    <option value="nhan-vien">Nhân viên</option>
                    <option value="quan-ly">Quản lý</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Thời gian thử việc
                  </label>
                  <select
                    value={contractData.probationPeriod}
                    onChange={e => handleInputChange('probationPeriod', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] rounded-[5px] text-[14px] bg-white"
                  >
                    <option value="0">Không thử việc</option>
                    <option value="1">1 tháng</option>
                    <option value="2">2 tháng</option>
                    <option value="3">3 tháng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Ngày bắt đầu hiệu lực <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={contractData.startDate}
                    onChange={e => handleInputChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Ngày ký hợp đồng <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={contractData.signDate}
                    onChange={e => handleInputChange('signDate', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Ngày kết thúc
                  </label>
                  <Input
                    type="date"
                    value={contractData.endDate}
                    onChange={e => handleInputChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* Salary and Benefits */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-6 pt-5 pb-0">
              <div className="flex items-center gap-2 text-[18px] font-bold text-[#222]">
                <DollarSign className="text-[#2563eb] w-5 h-5" />
                Lương và phúc lợi
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Mức lương (VNĐ/tháng) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={contractData.salary}
                    onChange={e => handleInputChange('salary', e.target.value)}
                    placeholder={`VD: ${minSalary.toLocaleString()}`}
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                  <div className="text-xs text-[#64748b] mt-1">
                    Đề xuất: {minSalary.toLocaleString()} - {maxSalary.toLocaleString()} VNĐ
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Địa điểm làm việc <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={contractData.workLocation}
                    onChange={e => handleInputChange('workLocation', e.target.value)}
                    placeholder="VD: Hà Nội"
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                    Lịch làm việc
                  </label>
                  <Input
                    value={contractData.workSchedule}
                    onChange={e => handleInputChange('workSchedule', e.target.value)}
                    placeholder="VD: 8:00 - 17:00"
                    className="w-full px-3 py-2 border border-[#d1d5db] text-[14px]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-[14px] font-semibold text-[#374151] mb-1">
                  Phúc lợi và đãi ngộ
                </label>
                <textarea
                  value={contractData.benefits}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('benefits', e.target.value)}
                  placeholder="Mô tả các phúc lợi như bảo hiểm, thưởng, nghỉ phép..."
                  className="w-full px-3 py-3 border border-[#d1d5db] rounded-[5px] text-[14px] min-h-[80px] resize-y"
                  rows={4}
                />
              </div>
            </div>
          </Card>
          {/* Job Responsibilities */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-6 pt-5 pb-0">
              <div className="flex items-center gap-2 text-[18px] font-bold text-[#222]">
                <Briefcase className="text-[#2563eb] w-5 h-5" />
                Trách nhiệm công việc
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <textarea
                value={contractData.responsibilities}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('responsibilities', e.target.value)}
                placeholder="Mô tả chi tiết trách nhiệm và nhiệm vụ công việc..."
                className="w-full px-3 py-3 border border-[#d1d5db] rounded-[5px] text-[14px] min-h-[120px] resize-y"
                rows={6}
              />
            </div>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          {/* Candidate Information */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-5 pt-4 pb-0">
              <div className="flex items-center gap-2 text-[16px] font-bold text-[#222]">
                <User className="text-[#2563eb] w-4 h-4" />
                Thông tin ứng viên
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <div className="flex flex-col gap-1">
                <div className="text-center py-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center mx-auto mb-2 text-white font-bold text-[16px]">
                    {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h3 className="font-bold text-[16px] text-[#222] mb-0">{candidate.name}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-md border border-[#e2e8f0]">
                    <Mail className="text-[#2563eb] w-3.5 h-3.5" />
                    <span className="text-[13px] text-[#374151] font-medium">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-md border border-[#e2e8f0]">
                    <Phone className="text-[#2563eb] w-3.5 h-3.5" />
                    <span className="text-[13px] text-[#374151] font-medium">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#f8fafc] rounded-md border border-[#e2e8f0]">
                    <Award className="text-[#2563eb] w-3.5 h-3.5" />
                    <span className="text-[13px] text-[#374151] font-medium">{candidate.education}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* Job Information */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-5 pt-4 pb-0">
              <div className="flex items-center gap-2 text-[16px] font-bold text-[#222]">
                <Briefcase className="text-[#2563eb] w-4 h-4" />
                Tóm tắt thông tin công việc
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <div className="flex flex-col gap-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Vị trí:</span>
                  <span className="font-bold">{application.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Công ty:</span>
                  <span className="font-bold">{application.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Địa điểm:</span>
                  <span className="font-bold">{application.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Mức lương đề xuất:</span>
                  <span className="font-bold">{application.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Hình thức:</span>
                  <span className="font-bold">{application.form}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Cấp bậc:</span>
                  <span className="font-bold">{application.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Ngày ứng tuyển:</span>
                  <span className="font-bold">{application.appliedDate}</span>
                </div>
              </div>
            </div>
          </Card>
          {/* Thông tin chương trình/dự án */}
          {projectInfo && (
            <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-0 max-w-[400px]">
              <div className="flex items-center gap-2 text-[16px] font-bold text-[#222] px-6 pt-6 pb-0 tracking-tight">
                <Briefcase className="text-[#2563eb] w-4 h-4" />
                Tuyển dụng cho chương trình
              </div>
              <div className="relative px-4 pt-5 pb-4">
                <div className="absolute top-2 left-4 bg-[#f1f5f9] text-[#64748b] font-light text-xs rounded px-3 py-0.5 tracking-wide">{projectInfo.code}</div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-16 h-16 bg-[#f1f5f9] rounded flex items-center justify-center font-bold text-[#94a3b8] text-xl border border-[#e5e7eb]">
                    {projectInfo.logo ? (
                      <img src={projectInfo.logo} alt="logo" className="w-11 h-11 object-contain rounded" />
                    ) : (
                      'Logo'
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[18px] font-bold text-[#222] mb-0.5 tracking-tight">{projectInfo.name}</div>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 mt-4">
                  <div className="text-[#64748b] flex items-center gap-1 text-[13px]">Loại chương trình/dự án:</div>
                  <div className="text-[#222] font-bold text-[13px]">{projectInfo.type}</div>
                  <div className="text-[#64748b] flex items-center gap-1 text-[13px]">Thời gian diễn ra:</div>
                  <div className="text-[#222] font-bold text-[13px]">{projectInfo.duration}</div>
                </div>
              </div>
            </Card>
          )}
          {/* Action Buttons */}
          <Card className="bg-white rounded-2xl shadow-md border border-[#e5e7eb]">
            <div className="px-6 pt-5 pb-0">
              <div className="text-[16px] font-bold text-[#222]">Thao tác</div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full bg-emerald-600 text-white border-none py-3 font-bold text-[14px] flex items-center justify-center gap-2 transition-opacity"
                  style={{ opacity: isCreating ? 0.7 : 1 }}
                  onClick={handleCreateContract}
                  disabled={isCreating}
                >
                  <Save className="w-4 h-4" />
                  {isCreating ? "Đang tạo..." : "Tạo hợp đồng"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border border-[#d1d5db] text-[#374151] bg-white py-3 font-bold text-[14px] flex items-center justify-center gap-2"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 
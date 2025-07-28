"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  User, 
  GraduationCap, 
  CreditCard, 
  FileText,
  CheckCircle,
  ArrowLeft,
  Download,
  Eye,
  Edit,
  KeyRound,
  Mail,
  CalendarDays,
  LogIn,
  RefreshCcw
} from 'lucide-react';
import ContractCardList, { Contract } from '@/components/contracts/ContractCardList';

const contractListMock = [
  {
    id: 'HD-001',
    contractTitle: 'Hợp đồng cộng tác viên',
    form: 'Toàn thời gian',
    startDate: '01/06/2024',
    endDate: '31/12/2024',
    salary: '10.000.000',
    workLocation: 'Hà Nội',
    signDate: '01/06/2024',
    level: 'Cộng tác viên',
    status: 'Đang hiệu lực',
    code: 'PRJ-001',
    project: 'Chương trình tầm soát ung thư cổ tử cung',
    type: 'Chương trình y tế',
    duration: '01/06/2024 - 31/12/2024',
    logo: '/logo-cervical.png'
  },
  {
    id: 'HD-002',
    contractTitle: 'Hợp đồng thử việc',
    form: 'Bán thời gian',
    startDate: '01/01/2024',
    endDate: '30/03/2024',
    salary: '5.000.000',
    workLocation: 'TP.HCM',
    signDate: '01/01/2024',
    level: 'Thử việc',
    status: 'Hết hiệu lực',
    code: 'PRJ-002',
    project: 'Chương trình tiêm chủng mở rộng',
    type: 'Chương trình y tế',
    duration: '01/01/2024 - 30/03/2024',
    logo: '/logo-vaccine.png'
  }
];

const candidates = [
  {
    id: "CTV101",
    name: "Trần Thị B",
    cccd: "12312312312312",
    phone: "0987654321",
    email: "tranthib@email.com",
    status: "Đang đào tạo",
    birthDate: "15/03/1995",
    gender: "Nữ",
    education: "Đại học",
    address: "456 Đường DEF, Quận UVW, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    ward: "Quận 1",
    residenceTime: "3",
    hasAccount: true,
    accountInfo: {
      username: 'ctv101',
      createdAt: '01/06/2024 | 09:30 ',
      lastLogin: '10/06/2024 | 14:22 ',
    },
    joinDate: "01/06/2024",
    trainingCourses: [
      {
        name: 'Đào tạo lý thuyết',
        status: 'Hoàn thành',
        startDate: '01/06/2024',
        endDate: '15/06/2024',
        certificate: {
          name: 'Chứng chỉ lý thuyết',
          issuedDate: '16/06/2024',
          organization: 'Bệnh viện Ung Bướu TP.HCM',
          method: 'Trực tiếp',
          duration: '150 ngày',
          fileUrl: '#'
        }
      },
      {
        name: 'Đào tạo thực hành',
        status: 'Hoàn thành',
        startDate: '20/06/2024',
        endDate: '15/07/2024',
        certificate: {
          name: 'Chứng chỉ thực hành',
          issuedDate: '16/07/2024',
          organization: 'Bệnh viện Phụ sản Trung ương',
          method: 'Trực tuyến',
          duration: '230 ngày',
          fileUrl: '#'
        }
      },
      {
        name: 'Đào tạo nâng cao',
        status: 'Hoàn thành',
        startDate: '20/07/2024',
        endDate: '05/08/2024',
        certificate: {
          name: 'Chứng chỉ nâng cao',
          issuedDate: '06/08/2024',
          organization: 'Trung tâm Y tế Dự phòng',
          method: 'Kết hợp',
          duration: '100 ngày',
          fileUrl: '#'
        }
      }
    ]
  }
];

const inputCriteria = [
  { label: 'Tự nguyện đăng ký tham gia mạng lưới cộng tác viên địa phương', self: true },
  { label: 'Có sức khỏe', self: true },
  { label: 'Có hiểu biết về cộng đồng mình đăng ký làm cộng tác viên và có điều kiện để gắn bó và phục vụ cho cộng đồng.', self: true },
  { label: 'Có uy tín trong cộng đồng', self: false },
];

const inputCriteriaManager = [
  { label: 'Có khả năng sử dụng các ứng dụng trên Smart-Phone hoặc máy tính bảng', self: true, org: true },
  { label: 'Có khả năng tiếp thu chương trình đào tạo cơ bản dành cho cộng tác viên', self: true, org: false },
  { label: 'Có kỹ năng giao tiếp người - người', self: true, org: false },
  { label: 'Có khả năng phối hợp hoạt động với các cộng tác viên cùng nhóm và gắn kết được với y tế địa phương', self: true, org: false },
];

export default function ProfilePage() {
  const [tab, setTab] = useState("info");
  const router = useRouter();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const candidateInfo = candidates[0];

  // State cho quản lý tài khoản cá nhân
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernamePassword, setUsernamePassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const [editPersonal, setEditPersonal] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: candidateInfo.name,
    cccd: candidateInfo.cccd,
    education: candidateInfo.education,
    birthDate: candidateInfo.birthDate,
    gender: candidateInfo.gender,
    phone: candidateInfo.phone,
    email: candidateInfo.email,
    province: candidateInfo.province,
    ward: candidateInfo.ward,
    residenceTime: candidateInfo.residenceTime,
  });

  const tabs = [
    { id: 'info', name: 'Thông tin cá nhân', icon: User },
    { id: 'training', name: 'Đào tạo', icon: GraduationCap },
    { id: 'account', name: 'Tài khoản', icon: CreditCard },
    { id: 'contract', name: 'Hợp đồng', icon: FileText },
    { id: 'review', name: 'Đánh giá', icon: CheckCircle },
  ];

  // Mock data đánh giá
  const reviewStats = {
    total: 5,
    avg: 4.2,
    excellent: 3,
    good: 1,
    average: 1,
    poor: 0,
    bad: 0,
  };
  type Review = {
    id: number;
    org: string;
    date: string;
    program: string;
    summary: string;
    detail: {
      criteria: { label: string; value: number }[];
      comment: string;
    };
  };
  const reviewList: Review[] = [
    {
      id: 1,
      org: 'Hội y tế công cộng',
      date: '10/06/2024',
      program: 'Tầm soát ung thư cổ tử cung',
      summary: 'Cộng tác viên làm việc rất tốt, chủ động và hợp tác.',
      detail: {
        criteria: [
          { label: 'Chuyên môn', value: 5 },
          { label: 'Thái độ', value: 5 },
          { label: 'Kỹ năng giao tiếp', value: 4 },
          { label: 'Đóng góp', value: 5 },
        ],
        comment: 'Rất hài lòng với sự đóng góp của cộng tác viên.'
      }
    },
    {
      id: 2,
      org: 'Bệnh viện B',
      date: '05/05/2024',
      program: 'Phòng chống sốt xuất huyết',
      summary: 'Có tinh thần trách nhiệm, cần cải thiện kỹ năng giao tiếp.',
      detail: {
        criteria: [
          { label: 'Chuyên môn', value: 4 },
          { label: 'Thái độ', value: 4 },
          { label: 'Kỹ năng giao tiếp', value: 3 },
          { label: 'Đóng góp', value: 4 },
        ],
        comment: 'Cần giao tiếp chủ động hơn với đồng nghiệp.'
      }
    },
    {
      id: 3,
      org: 'Trung tâm Y tế A',
      date: '01/04/2024',
      program: 'Tiêm chủng mở rộng',
      summary: 'Hoàn thành tốt nhiệm vụ được giao, luôn đúng giờ.',
      detail: { criteria: [], comment: ''}
    },
    {
      id: 4,
      org: 'Trạm Y tế Phường C',
      date: '15/03/2024',
      program: 'Tầm soát ung thư cổ tử cung',
      summary: 'Nhiệt tình, hòa đồng nhưng cần nắm vững hơn quy trình.',
      detail: { criteria: [], comment: ''}
    },
    {
      id: 5,
      org: 'Bệnh viện B',
      date: '20/02/2024',
      program: 'Phòng chống sốt xuất huyết',
      summary: 'Năng nổ, sáng tạo trong công việc.',
      detail: { criteria: [], comment: ''}
    }
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const programs = [...new Set(reviewList.map(r => r.program))];
  const orgs = [...new Set(reviewList.map(r => r.org))];
  const filteredReviews = reviewList.filter(review => {
    const matchesSearch = review.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = programFilter ? review.program === programFilter : true;
    const matchesOrg = orgFilter ? review.org === orgFilter : true;
    return matchesSearch && matchesProgram && matchesOrg;
  });
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const renderProgressBar = (label: string, count: number, total: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="w-24 text-gray-600">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="w-8 font-semibold">{count}</span>
      </div>
    );
  };
  const renderReviewTab = () => (
    <div className="space-y-4 w-full">
      <Card className="p-4 w-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-blue-700">{reviewStats.avg.toFixed(1)}/5</div>
            <div className="text-sm text-gray-500">({reviewStats.total} đánh giá)</div>
          </div>
          <div className="w-full flex-1 space-y-2">
            {renderProgressBar("Xuất sắc", reviewStats.excellent, reviewStats.total)}
            {renderProgressBar("Tốt", reviewStats.good, reviewStats.total)}
            {renderProgressBar("Trung bình", reviewStats.average, reviewStats.total)}
            {renderProgressBar("Kém", reviewStats.poor, reviewStats.total)}
            {renderProgressBar("Rất kém", reviewStats.bad, reviewStats.total)}
          </div>
        </div>
      </Card>
      <Card className="p-4 w-full">
        <h3 className="font-semibold text-base mb-3">Danh sách đánh giá </h3>
        <div className="flex flex-col md:flex-row gap-3">
          <Input 
            placeholder="Tìm kiếm đánh giá..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="flex-1"
          />
          <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} className="border rounded-[5px] px-2 py-1 text-sm">
            <option value="">Tất cả chương trình</option>
            {programs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={orgFilter} onChange={(e) => setOrgFilter(e.target.value)} className="border rounded-[5px] px-2 py-1 text-sm">
            <option value="">Tất cả đơn vị</option>
            {orgs.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
            </div>
        </Card>
            <div className="space-y-2">
        {paginatedReviews.map((r: Review) => (
          <Card 
            key={r.id} 
            className="p-4 cursor-pointer hover:shadow-lg transition" 
            onClick={() => router.push(`/dashboard/profile/review/${r.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">Chương trình tham gia</div>
                <div className="font-semibold text-blue-700">{r.program}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Đơn vị đánh giá</div>
                <div className="font-semibold">{r.org}</div>
                <div className="text-xs text-gray-400">{r.date}</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2 italic">"{r.summary}"</p>
        </Card>
        ))}
        {paginatedReviews.length === 0 && <p className="text-center text-gray-500 py-4">Không có đánh giá nào phù hợp.</p>}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>Đầu</Button>
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Trước</Button>
          <span className="text-sm">Trang {currentPage} / {totalPages}</span>
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Sau</Button>
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Cuối</Button>
        </div>
      )}
      </div>
    );

  const handleSelectContract = (contract: Contract) => {
    router.push(`/dashboard/profile/contract/${contract.id}`);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="mb-2 mt-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-700">Thông tin cá nhân</h3>
        {editPersonal ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white text-[#2563eb] border border-[#2563eb]" onClick={() => { setEditPersonal(false); }}>
              Hủy
            </Button>
            <Button size="sm" className="bg-[#2563eb] text-white w-[50px]" onClick={() => { setEditPersonal(false); /* Gọi API cập nhật nếu cần */ }}>
              Lưu
            </Button>
          </div>
        ) : (
          <Button size="sm" className="bg-[#2563eb] text-white" onClick={() => setEditPersonal(true)}>
            Cập nhật
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mã CTV</label>
          <Input value={candidateInfo.id} disabled className="bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số CC/CCCD</label>
          {editPersonal ? (
            <Input value={personalInfo.cccd} onChange={e => setPersonalInfo({ ...personalInfo, cccd: e.target.value })} />
          ) : (
            <Input value={personalInfo.cccd} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          {editPersonal ? (
            <Input value={personalInfo.name} onChange={e => setPersonalInfo({ ...personalInfo, name: e.target.value })} />
          ) : (
            <Input value={personalInfo.name} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trình độ học vấn</label>
          {editPersonal ? (
            <Input value={personalInfo.education} onChange={e => setPersonalInfo({ ...personalInfo, education: e.target.value })} />
          ) : (
            <Input value={personalInfo.education} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
          {editPersonal ? (
            <Input value={personalInfo.birthDate} onChange={e => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })} />
          ) : (
            <Input value={personalInfo.birthDate} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
          {editPersonal ? (
            <Input value={personalInfo.gender} onChange={e => setPersonalInfo({ ...personalInfo, gender: e.target.value })} />
          ) : (
            <Input value={personalInfo.gender} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
          {editPersonal ? (
            <Input value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
          ) : (
            <Input value={personalInfo.phone} disabled className="bg-gray-50" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          {editPersonal ? (
            <Input value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
          ) : (
            <Input value={personalInfo.email} disabled className="bg-gray-50" />
          )}
            </div>
            </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-blue-700">Nơi cư trú</h3>
            </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố/Tỉnh</label>
          {editPersonal ? (
            <Input value={personalInfo.province} onChange={e => setPersonalInfo({ ...personalInfo, province: e.target.value })} />
          ) : (
            <Input value={personalInfo.province} disabled className="bg-gray-50" />
          )}
            </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
          {editPersonal ? (
            <Input value={personalInfo.ward} onChange={e => setPersonalInfo({ ...personalInfo, ward: e.target.value })} />
          ) : (
            <Input value={personalInfo.ward} disabled className="bg-gray-50" />
          )}
            </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian cư trú (Năm)</label>
          {editPersonal ? (
            <Input value={personalInfo.residenceTime} onChange={e => setPersonalInfo({ ...personalInfo, residenceTime: e.target.value })} />
          ) : (
            <Input value={personalInfo.residenceTime} disabled className="bg-gray-50" />
          )}
            </div>
      </div>
    </div>
  );

  const renderTrainingInfo = () => (
    <div className="space-y-6 mt-4">
      <h3 className="text-lg font-semibold text-blue-700">Thông tin đào tạo cộng tác viên</h3>
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">1. Tiêu chí tuyển chọn</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Ứng viên tự đánh giá</div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <ul className="space-y-3">
                {inputCriteria.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">2. Quá trình đào tạo & chứng chỉ</h3>
        </div>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khoá đào tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Chứng chỉ</TableHead>
                <TableHead>Đơn vị đào tạo</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Ngày tải lên</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidateInfo.trainingCourses.map((course, idx) => (
                <TableRow key={idx}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>{course.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-500">{course.startDate} - {course.endDate}</span>
                  </TableCell>
                  <TableCell>{course.certificate.name}</TableCell>
                  <TableCell>{course.certificate.organization}</TableCell>
                  <TableCell>{course.certificate.method}</TableCell>
                  <TableCell>{course.certificate.duration}</TableCell>
                  <TableCell>{course.certificate.issuedDate}</TableCell>
                  <TableCell className="text-center flex gap-2 justify-center">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={course.certificate.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Download size={18} />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={course.certificate.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Eye size={18} />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <Card className="mt-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">3. Đánh giá sau đào tạo</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Đơn vị quản lý đánh giá</div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <ul className="space-y-3">
                {inputCriteriaManager.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAccountInfo = () => (
    <div className="space-y-6 mt-4">
      <h3 className="text-lg font-semibold text-[#2563eb]">Quản lý tài khoản cá nhân</h3>
      <div className="flex flex-col gap-2">
        {/* Tên đăng nhập */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-semibold">Tên đăng nhập</div>
              <div className="font-bold text-lg text-[#222]">{candidateInfo.accountInfo?.username}</div>
            </div>
            {showChangeUsername ? (
              <Button variant="outline" size="sm" className="bg-white text-[#2563eb] border border-[#2563eb]" onClick={() => setShowChangeUsername(false)}>Đóng</Button>
            ) : (
              <Button variant="default" size="sm" className="bg-[#2563eb] text-white" onClick={() => setShowChangeUsername(true)}>Đổi tên</Button>
            )}
          </div>
          {showChangeUsername && (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newUsername || !usernamePassword) {
                  alert("Vui lòng nhập đầy đủ thông tin");
                  return;
                }
                alert("Tên đăng nhập đã được thay đổi thành công!");
                setShowChangeUsername(false);
              }}
              className="flex flex-col md:flex-row items-center gap-2 border-t border-gray-100 pt-3 mt-2"
            >
              <Input
                placeholder="Tên đăng nhập mới"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                className="max-w-xs"
              />
              <Input
                type="password"
                placeholder="Nhập mật khẩu xác nhận"
                value={usernamePassword}
                onChange={e => setUsernamePassword(e.target.value)}
                className="max-w-xs"
              />
              <Button type="submit" size="sm" className="bg-[#2563eb] text-white w-[50px]">Lưu</Button>
            </form>
          )}
        </div>
        {/* Email */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex items-center">
          <div>
            <div className="text-xs text-gray-500 font-semibold">Email liên kết</div>
            <div className="font-semibold text-base text-[#222]">{candidateInfo.email}</div>
          </div>
        </div>
        {/* Ngày tạo tài khoản */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex items-center">
          <div>
            <div className="text-xs text-gray-500 font-semibold">Ngày tạo tài khoản</div>
            <div className="font-semibold text-base text-[#222]">{candidateInfo.accountInfo?.createdAt}</div>
          </div>
        </div>
        {/* Lần đăng nhập gần nhất */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex items-center">
            <div>
            <div className="text-xs text-gray-500 font-semibold">Lần đăng nhập gần nhất</div>
            <div className="font-semibold text-base text-[#222]">{candidateInfo.accountInfo?.lastLogin}</div>
          </div>
            </div>
        {/* Đổi mật khẩu */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-semibold">Mật khẩu</div>
              <div className="font-semibold text-base text-[#222]">********</div>
            </div>
            {showChangePassword ? (
              <Button variant="outline" size="sm" className="bg-white text-[#2563eb] border border-[#2563eb]" onClick={() => setShowChangePassword(false)}>Đóng</Button>
            ) : (
              <Button variant="default" size="sm" className="bg-[#2563eb] text-white" onClick={() => setShowChangePassword(true)}>Đổi mật khẩu</Button>
            )}
          </div>
          {showChangePassword && (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!oldPassword || !newPassword || !confirmPassword) {
                  alert("Vui lòng nhập đầy đủ thông tin");
                  return;
                }
                if (newPassword !== confirmPassword) {
                  alert("Mật khẩu mới không khớp");
                  return;
                }
                alert("Đổi mật khẩu thành công!");
                setShowChangePassword(false);
              }}
              className="flex flex-col md:flex-row items-center gap-2 border-t border-gray-100 pt-3 mt-2"
            >
              <Input
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="max-w-xs"
              />
              <Input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="max-w-xs"
              />
              <Input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="max-w-xs"
              />
              <Button type="submit" size="sm" className="bg-[#2563eb] text-white w-[50px]">Lưu</Button>
            </form>
          )}
        </div>
        {/* Quên mật khẩu */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-5 py-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 font-semibold">Quên mật khẩu?</div>
            </div>
            {showForgotPassword ? (
              <Button variant="outline" size="sm" className="bg-white text-[#2563eb] border border-[#2563eb]" onClick={() => setShowForgotPassword(false)}>Đóng</Button>
            ) : (
              <Button variant="default" size="sm" className="bg-[#2563eb] text-white" onClick={() => setShowForgotPassword(true)}>Khôi phục</Button>
            )}
          </div>
          {showForgotPassword && (
            <div className="flex flex-col md:flex-row items-center gap-2 border-t border-gray-100 pt-3 mt-2">
              <div className="text-sm text-gray-600">Gửi email khôi phục mật khẩu đến: <b>{candidateInfo.email}</b></div>
              <Button
                size="sm"
                className="bg-[#2563eb] text-white"
                onClick={() => {
                  setForgotEmailSent(true);
                  setTimeout(() => setForgotEmailSent(false), 2000);
                }}
              >
                Gửi email
              </Button>
              {forgotEmailSent && <div className="text-green-600 text-sm">Đã gửi email khôi phục mật khẩu!</div>}
            </div>
          )}
        </div>
      </div>
          </div>
  );

  const renderContractInfo = () => (
    <div className="space-y-6 mt-4">
      <h3 className="text-lg font-semibold text-blue-700">Danh sách hợp đồng</h3>
      <ContractCardList contracts={contractListMock} onSelect={handleSelectContract} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
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
          <div className="flex items-center justify-between">
      <div>
              <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cộng tác viên</h1>
              <p className="text-gray-600 mt-1">Xem thông tin chi tiết cộng tác viên</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 min-h-[500px] w-full">
          <nav className="flex flex-col w-50 min-w-[180px] bg-transparent">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`flex items-center gap-2 px-3 py-3 border-l-2 font-medium text-sm transition-all
                  ${tab === tabItem.id
                    ? 'border-blue-500 text-blue-600 bg-white rounded-tr-[5px] rounded-br-[5px]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                `}
              >
                <tabItem.icon className="h-4 w-4" />
                {tabItem.name}
              </button>
            ))}
          </nav>
          <div className="flex-1 w-full p-0">
            {tab === 'info' && renderPersonalInfo()}
            {tab === 'training' && renderTrainingInfo()}
            {tab === 'account' && renderAccountInfo()}
            {tab === 'contract' && renderContractInfo()}
            {tab === 'review' && renderReviewTab()}
          </div>
        </div>
      </div>
      {/* {showCertificateModal && (
        <CertificateModal
          open={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          onSubmit={(data) => {
            setShowCertificateModal(false);
          }}
        />
      )} */}
    </div>
  );
} 
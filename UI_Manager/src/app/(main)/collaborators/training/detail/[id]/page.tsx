"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";
import CertificateModal from '@/components/collaborators/CertificateModal';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  User, 
  GraduationCap, 
  CreditCard, 
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  XCircle,
  Download,
  Eye
} from 'lucide-react';
import ContractCardList, { Contract } from '@/components/contracts/ContractCardList';
import { contractListMock } from '@/components/collaborators/approved/TableContent';

// Mock data chỉ lấy trường hợp đã có tài khoản
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
      createdAt: '2024-06-01 09:30',
      lastLogin: '2024-06-10 14:22',
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
          fileUrl: '#'
        }
      },
      {
        name: 'Đào tạo thực hành',
        status: 'Đang học',
        startDate: '20/06/2024',
        endDate: '',
        certificate: null
      },
      {
        name: 'Đào tạo nâng cao',
        status: 'Chưa học',
        startDate: '',
        endDate: '',
        certificate: null
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Hoàn thành':
      return 'bg-green-100 text-green-800';
    case 'Đang học':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

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

export default function TrainingDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const router = useRouter();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract|null>(null);
  const [managerCriteria, setManagerCriteria] = useState(
    inputCriteriaManager.map(item => ({ ...item, checked: false }))
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleCheck = (idx: number) => {
    setManagerCriteria(prev =>
      prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item)
    );
  };
  const handleSave = () => {
    setIsSaved(true);
    // Có thể gửi dữ liệu lên server tại đây nếu cần
  };

  // Tìm ứng viên dựa trên ID từ URL
  const candidateInfo = candidates.find(candidate => candidate.id === id) || candidates[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'account') setTab('account');
    }
  }, []);

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
  const [selectedReview, setSelectedReview] = useState<Review|null>(null);

  // State cho filter, search, pagination của tab Đánh giá
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
  
  const renderReviewInfo = () => {
    return (
      <Card className="flex flex-col items-center justify-center p-10 my-8">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Chưa có thông tin đánh giá</h3>
        <p className="text-gray-600 text-center">
          Cộng tác viên này chưa được tuyển dụng nên chưa có thông tin đánh giá.
        </p>
      </Card>
    );
  };

  const handleSelectContract = (contract: Contract) => {
    router.push(`/collaborators/profile/${id}/contract/${contract.id}`);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div>
        <div className="mb-2 mt-4">
          <h3 className="text-lg font-semibold text-blue-700">Thông tin cá nhân</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mã CTV</label>
            <Input value={candidateInfo.id} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số CC/CCCD</label>
            <Input value={candidateInfo.cccd} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <Input value={candidateInfo.name} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trình độ học vấn</label>
            <Input value={candidateInfo.education} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <Input value={candidateInfo.birthDate} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <Input value={candidateInfo.gender} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <Input value={candidateInfo.phone} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input value={candidateInfo.email} disabled className="bg-gray-50" />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-blue-700">Nơi cư trú</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố/Tỉnh</label>
            <Input value={candidateInfo.province} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
            <Input value={candidateInfo.ward} disabled className="bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian cư trú (Năm)</label>
            <Input value={candidateInfo.residenceTime} disabled className="bg-gray-50" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrainingInfo = () => (
    <div className="space-y-6 mt-4">
      <h3 className="text-lg font-semibold text-blue-700">Thông tin đào tạo cộng tác viên</h3>
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">1. Đánh giá đầu vào</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Ứng viên tự đánh giá</div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <ul className="space-y-3">
                {inputCriteria.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    {item.self ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
      {/* Gộp quá trình đào tạo và chứng chỉ vào 1 Card */}
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>{course.status}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-500">{course.startDate} - {course.endDate}</span>
                  </TableCell>
                  {course.certificate ? (
                    <>
                      <TableCell>{course.certificate.name}</TableCell>
                <TableCell>Bệnh viện Ung Bướu TP.HCM</TableCell>
                <TableCell>Trực tiếp</TableCell>
                <TableCell>150 ngày</TableCell>
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
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={5} className="text-gray-400 text-xs italic text-center">Chưa có chứng chỉ</TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" onClick={() => setShowCertificateModal(true)}>Thêm chứng chỉ</Button>
                </TableCell>
                    </>
                  )}
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      {/* Đánh giá sau đào tạo cho đơn vị quản lý */}
      <Card className="mt-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">3. Đánh giá sau đào tạo</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Đơn vị quản lý đánh giá</div>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {managerCriteria.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(idx)}
                  disabled={isSaved}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
          {!isSaved ? (
            <Button className="mt-6" onClick={handleSave}>Lưu đánh giá</Button>
          ) : (
            <div className="flex gap-2 mt-6">
              <Button className="bg-blue-600 hover:bg-blue-800">Tuyển chọn</Button>
              <Button className="bg-red-600 hover:bg-red-700">Từ chối</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderAccountInfo = () => (
    <div className="space-y-6 mt-4">
      <h3 className="text-lg font-semibold text-blue-700">Thông tin tài khoản</h3>
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                <Input value={candidateInfo.accountInfo?.username} disabled className="bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email liên kết</label>
                <Input value={candidateInfo.email} disabled className="bg-gray-50" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tạo tài khoản</label>
                <Input value={candidateInfo.accountInfo?.createdAt} disabled className="bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lần đăng nhập gần nhất</label>
                <Input value={candidateInfo.accountInfo?.lastLogin} disabled className="bg-gray-50" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline">Khóa tài khoản</Button>
            <Button variant="outline">Đặt lại mật khẩu</Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700">Thu hồi tài khoản</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderContractInfo = () => {
    return (
      <Card className="flex flex-col items-center justify-center p-10 my-8">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Chưa có thông tin hợp đồng</h3>
        <p className="text-gray-600 text-center">
          Cộng tác viên này chưa được tuyển dụng nên chưa có thông tin hợp đồng.
        </p>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Tabs dọc + Nội dung giữ style cũ */}
        <div className="flex gap-6 min-h-[500px] w-full">
          {/* Tabs dọc */}
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
          {/* Nội dung tab */}
          <div className="flex-1 w-full max-w-full p-0">
            {tab === 'info' && renderPersonalInfo()}
            {tab === 'training' && renderTrainingInfo()}
            {tab === 'account' && renderAccountInfo()}
            {tab === 'contract' && renderContractInfo()}
            {tab === 'review' && renderReviewInfo()}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          open={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          onSubmit={(data) => {
            console.log('Certificate data:', data);
            setShowCertificateModal(false);
          }}
        />
      )}
    </div>
  );
} 
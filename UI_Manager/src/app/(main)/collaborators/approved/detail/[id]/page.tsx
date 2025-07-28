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
  UserPlus,
  XCircle
} from 'lucide-react';

// Mock data cho tất cả ứng viên approved
const approvedCandidates = [
  {
    id: "CTV1",
    name: "Tran Van A",
    cccd: "12312312312312",
    phone: "0967291123",
    email: "a@gmail.com",
    status: "Đã tuyển chọn",
    birthDate: "01/01/2000",
    gender: "Nam",
    education: "Đại học",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    ward: "Quận 1",
    residenceTime: "5",
    hasAccount: true,
    accountInfo: {
      username: 'ctv1',
      createdAt: '2024-06-01 09:30',
      lastLogin: '2024-06-10 14:22',
    }
  },
  {
    id: "CTV2",
    name: "Tran Van B",
    cccd: "12312312312312",
    phone: "0967291124",
    email: "b@gmail.com",
    status: "Đã tuyển chọn",
    birthDate: "15/03/1995",
    gender: "Nữ",
    education: "Cao đẳng",
    address: "456 Đường DEF, Quận UVW, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    ward: "Quận 2",
    residenceTime: "3",
    hasAccount: false,
    accountInfo: null
  },
  {
    id: "CTV3",
    name: "Tran Van C",
    cccd: "12312312312312",
    phone: "0967291125",
    email: "c@gmail.com",
    status: "Đã cấp tài khoản",
    birthDate: "20/07/1998",
    gender: "Nam",
    education: "Đại học",
    address: "789 Đường GHI, Quận RST, TP.HCM",
    province: "Thành phố Hồ Chí Minh",
    ward: "Quận 3",
    residenceTime: "2",
    hasAccount: true,
    accountInfo: {
      username: 'ctv3',
      createdAt: '2024-06-05 11:15',
      lastLogin: '2024-06-12 09:45',
    }
  },
];

// Thêm hàm getStatusColor dùng chung cho badge trạng thái
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Đã tuyển chọn':
      return 'bg-green-100 text-green-800';
    case 'Chờ tuyển chọn':
      return 'bg-yellow-100 text-yellow-800';
    case 'Đã cấp tài khoản':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function ApprovedDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState("info");
  const router = useRouter();
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Tìm ứng viên dựa trên ID từ URL
  const candidateInfo = approvedCandidates.find(candidate => candidate.id === id) || approvedCandidates[0];

  // Tự động chuyển tab nếu có query tab=account
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

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Thông tin cá nhân */}
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

      {/* Nơi cư trú */}
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

  const inputCriteria = [
    { label: 'Tự nguyện đăng ký tham gia mạng lưới cộng tác viên địa phương', self: true },
    { label: 'Có sức khỏe', self: true },
    { label: 'Có hiểu biết về cộng đồng mình đăng ký làm cộng tác viên và có điều kiện để gắn bó và phục vụ cho cộng đồng.', self: true },
    { label: 'Có uy tín trong cộng đồng', self: false },
  ];

  const renderTrainingInfo = () => {
    const hasAccount = candidateInfo.hasAccount;
    return (
      <div className="space-y-6 mt-4">
        <h3 className="text-lg font-semibold text-blue-700">Thông tin đào tạo cộng tác viên</h3>
        {/* 1. Đánh giá đầu vào */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-semibold">1. Tiêu chí tuyển chọn</h3>
            <div className="text-xs font-normal text-gray-500 mt-1">Ứng viên tự đánh giá</div>
          </div>
          <div className="p-6">
            {/* Khôi phục lại phần đánh giá đầu vào như ban đầu */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Box 1: Ứng viên tự đánh giá */}
              <div className="flex-1">
                <ul className="space-y-3">
                  {/* Map qua các tiêu chí đánh giá của ứng viên */}
                  {inputCriteria.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      {item.self ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
        {/* 2. Quá trình đào tạo */}
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-semibold">2. Quá trình đào tạo & chứng chỉ</h3>
          </div>
          
            <div className="p-6 flex flex-col items-center justify-center text-gray-500 italic">
              Chưa có dữ liệu quá trình đào tạo.
            </div>
          
        </Card>
        {/* 3. Danh sách chứng chỉ */}
        <Card>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold">3. Đánh giá sau đào tạo</h3>
          <div className="text-xs font-normal text-gray-500 mt-1">Đơn vị quản lý đánh giá</div>
        </div>
          
            <div className="p-6 flex flex-col items-center justify-center text-gray-500 italic">
              Chưa có dữ liệu.
            </div>
          
        </Card>
      </div>
    );
  };

  const renderAccountInfo = () => {
    if (candidateInfo.hasAccount) {
      return (
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
    } else {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <UserPlus className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Chưa có tài khoản</h3>
            <p className="text-gray-600 max-w-md">
              Ứng viên này chưa được cấp tài khoản. Bạn có thể tạo tài khoản ngay bây giờ.
            </p>
            <Button 
              className="mt-4"
              onClick={() => {
                // Logic tạo tài khoản
                console.log('Tạo tài khoản cho:', candidateInfo.id);
              }}
            >
              Tạo tài khoản
            </Button>
          </div>
        </div>
      );
    }
  };

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
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidateInfo.status)}`}>{candidateInfo.status}</span>
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